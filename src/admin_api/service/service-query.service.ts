import { DeleteOneOptions, QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Inject } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserContext } from '../auth/authenticated-admin';
import { OperatorService } from '../operator/operator.service';

import { ServiceDTO } from './dto/service.dto';
import { ServiceEntity } from './../../entities/service.entity';
import { OperatorPermission } from './../../entities/enums/operator-permission.enum';

@QueryService(ServiceDTO)
export class ServiceQueryService extends TypeOrmQueryService<ServiceDTO> {
  constructor(
    @InjectRepository(ServiceEntity)
    serviceRepo: Repository<ServiceEntity>,
    private operatorService: OperatorService,
    @Inject(CONTEXT)
    private userContext: UserContext,
  ) {
    super(serviceRepo, { useSoftDelete: true });
  }

  async deleteOne(
    id: string | number,
    opts?: DeleteOneOptions<ServiceDTO>,
  ): Promise<ServiceDTO> {
    await this.operatorService.hasPermission(
      this.userContext.req.user.id,
      OperatorPermission.Services_Edit,
    );
    return super.deleteOne(id, opts);
  }
}
