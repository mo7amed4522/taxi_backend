import { DeleteOneOptions, QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Inject } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UserContext } from '../auth/authenticated-admin';
import { OperatorService } from '../operator/operator.service';
import { ServiceOptionDTO } from './dto/service-option.dto';
import { ServiceOptionEntity } from 'src/entities/service-option.entity';
import { OperatorPermission } from 'src/entities/enums/operator-permission.enum';

@QueryService(ServiceOptionDTO)
export class ServiceOptionQueryService extends TypeOrmQueryService<ServiceOptionDTO> {
  constructor(
    @InjectRepository(ServiceOptionEntity)
    serviceRepo: Repository<ServiceOptionEntity>,
    private operatorService: OperatorService,
    @Inject(CONTEXT)
    private userContext: UserContext,
  ) {
    super(serviceRepo, { useSoftDelete: true });
  }

  async deleteOne(
    id: string | number,
    opts?: DeleteOneOptions<ServiceOptionDTO>,
  ): Promise<ServiceOptionDTO> {
    await this.operatorService.hasPermission(
      this.userContext.req.user.id,
      OperatorPermission.Services_Edit,
    );
    return super.deleteOne(id, opts);
  }
}
