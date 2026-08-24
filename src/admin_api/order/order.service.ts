import { InjectPubSub } from '@nestjs-query/query-graphql';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { RequestActivityEntity } from './../../entities/request-activity.entity';
import { RequestEntity } from './../../entities/request.entity';
import { OrderRedisService } from './../../redis/order-redis.service';
import { Repository } from 'typeorm';
import { RequestActivityType } from './../../entities/enums/request-activity-type.enum';
import { OrderStatus } from './../../entities/enums/order-status.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(RequestEntity)
    private orderRepository: Repository<RequestEntity>,
    @InjectRepository(RequestActivityEntity)
    private activityRepository: Repository<RequestActivityEntity>,
    private orderRedisService: OrderRedisService,
    @InjectPubSub()
    private pubSub: RedisPubSub,
  ) {}

  async cancelOrder(orderId: number): Promise<RequestEntity> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['service'],
    });
    if (!order) {
      throw new Error('Order not found');
    }
    this.activityRepository.insert({
      requestId: order.id,
      type: RequestActivityType.CanceledByOperator,
    });
    await this.orderRepository.update(order.id, {
      status: OrderStatus.Expired,
      finishTimestamp: new Date(),
      costAfterCoupon: 0,
    });
    this.orderRedisService.expire([order.id]);
    this.pubSub.publish('orderRemoved', { orderRemoved: order });
    return order;
  }
}
