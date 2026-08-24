import {
  DeepPartial,
  QueryService,
  UpdateOneOptions,
} from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Inject, Query } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserContext } from '../auth/authenticated-user';
import { UpdateDriverInput } from './dto/update-driver.input';
import { DriverEntity } from './../../entities/driver.entity';
import { ServiceEntity } from './../../entities/service.entity';
import { DriverRedisService } from './../../redis/driver-redis.service';
import { DriverStatus } from './../../entities/enums/driver-status.enum';

@QueryService(DriverEntity)
export class DriverQueryService extends TypeOrmQueryService<DriverEntity> {
  constructor(
    @InjectRepository(DriverEntity)
    private driverReposotriy: Repository<DriverEntity>,
    @InjectRepository(ServiceEntity)
    private serviceRepository: Repository<ServiceEntity>,
    private driverRedisService: DriverRedisService,
    @Inject(CONTEXT)
    private context: UserContext,
  ) {
    super(driverReposotriy);
  }

  override async updateOne(
    id: string | number,
    update: UpdateDriverInput,
    opts?: UpdateOneOptions<DriverEntity>,
  ): Promise<DriverEntity> {
    id = this.context.req.user.id;
    const allowedStatuses = [
      DriverStatus.Offline,
      DriverStatus.Online,
      DriverStatus.WaitingDocuments,
      DriverStatus.SoftReject,
    ];
    const isNotAllowed =
      update.status && !allowedStatuses.includes(update.status);
    if (update.status && isNotAllowed) {
      delete update.status;
    }
    if (
      update.status == DriverStatus.PendingApproval &&
      process.env.DEMO_MODE != null
    ) {
      update.status = DriverStatus.Offline;
      this.serviceRepository.find().then((services) =>
        this.driverReposotriy.save({
          id: id,
          enabledServices: services,
        }),
      );
    }
    if (update.status == DriverStatus.Offline) {
      await this.driverRedisService.expire([id]);
    }
    return super.updateOne(id, update, opts);
  }
}
