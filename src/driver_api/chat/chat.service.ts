import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';

import { OrderMessageDTO } from './dto/order-message.dto';
import { OrderMessageInput } from './dto/order-message.input';
import { OrderMessageEntity } from './../../entities/request-message.entity';
import { RequestEntity } from './../../entities/request.entity';
import { RiderNotificationService } from './../../order/firebase-notification-service/rider-notification.service';

@QueryService(OrderMessageEntity)
export class ChatService extends TypeOrmQueryService<OrderMessageEntity> {
  constructor(
    @InjectRepository(OrderMessageEntity)
    public repository: Repository<OrderMessageEntity>,
    @InjectRepository(RequestEntity)
    private requestRepository: Repository<RequestEntity>,
    @Inject('PUB_SUB')
    private pubSub: RedisPubSub,
    private riderNotificationService: RiderNotificationService,
  ) {
    super(repository);
  }

  override async createOne(input: OrderMessageInput) {
    let message = await super.createOne({ ...input, sentByDriver: true });
    const order = await this.requestRepository.findOne({
      where: { id: message.requestId },
      relations: ['rider', 'driver'],
    });
    if (!order) {
      throw new Error('Order not found');
    }
    message = await this.getById(message.id);
    this.riderNotificationService.message(order.rider, message);
    this.pubSub.publish<{
      newMessageReceived: OrderMessageDTO;
      riderId: number;
    }>('newMessageForRider', {
      newMessageReceived: message,
      riderId: order.riderId,
    });
    return message;
  }
}
