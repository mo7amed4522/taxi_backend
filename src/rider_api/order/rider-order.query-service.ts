import { QueryService } from '@nestjs-query/core';
import { InjectPubSub } from '@nestjs-query/query-graphql';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ForbiddenError } from 'apollo-server-core';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Repository } from 'typeorm';

import { UpdateOrderInput } from './dto/update-order.input';
import { RiderOrderService } from './rider-order.service';
import { CommonCouponService } from 'src/coupon/common-coupon.service';
import { OrderStatus } from 'src/entities/enums/order-status.enum';
import { RequestEntity } from 'src/entities/request.entity';

@QueryService(RequestEntity)
export class RiderOrderQueryService extends TypeOrmQueryService<RequestEntity> {
  constructor(
    @InjectRepository(RequestEntity)
    public orderRepository: Repository<RequestEntity>,
    private orderService: RiderOrderService,
    private commonCouponService: CommonCouponService,
    @InjectPubSub()
    private pubSub: RedisPubSub,
  ) {
    super(orderRepository);
  }

  async updateOne(
    id: number,
    update: UpdateOrderInput,
  ): Promise<RequestEntity> {
    let order = await this.orderRepository.findOne({
      where: { id },
      relations: ['service', 'coupon'],
    });
    if (!order) throw new ForbiddenError('Order not found');
    if (update.couponCode != null) {
      await this.commonCouponService.applyCoupon(
        update.couponCode,
        id,
        order.riderId,
      );
    }
    delete update['couponCode'];
    order = await this.orderRepository.findOne({
      where: { id },
      relations: ['service', 'coupon'],
    });
    if (!order) throw new ForbiddenError('Order not found');
    if (update.status != null && update.status != OrderStatus.RiderCanceled) {
      throw new ForbiddenError('Update status to this is not possible');
    }
    let costAfterCoupon = order.costAfterCoupon;
    if (update.waitMinutes != null && order.service && order.coupon) {
      costAfterCoupon = this.commonCouponService.applyCouponOnPrice(
        order.coupon,
        order.costBest + order.service.perMinuteWait * update.waitMinutes,
      );
    }
    const result = await super.updateOne(id, { ...update, costAfterCoupon });
    if (update.status != null && update.status == OrderStatus.RiderCanceled) {
      await this.orderService.cancelOrder(id);
    }
    this.pubSub.publish('orderUpdated', { orderUpdated: result });
    return result;
  }
}
