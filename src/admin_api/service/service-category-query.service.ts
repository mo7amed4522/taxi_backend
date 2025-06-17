import { DeleteOneOptions, QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Inject } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserContext } from '../auth/authenticated-admin';
import { OperatorService } from '../operator/operator.service';

import { ServiceCategoryDTO } from './dto/service-category.dto';
import { ServiceCategoryEntity } from 'src/entities/service-category.entity';
import { OperatorPermission } from 'src/entities/enums/operator-permission.enum';


@QueryService(ServiceCategoryDTO)
export class ServiceCategoryQueryService extends TypeOrmQueryService<ServiceCategoryDTO> {
    constructor(
        @InjectRepository(ServiceCategoryEntity)
        serviceRepo: Repository<ServiceCategoryEntity>,
        private operatorService: OperatorService,
        @Inject(CONTEXT)
        private userContext: UserContext
    ) {
        super(serviceRepo, { useSoftDelete: true });
    }

    async deleteOne(id: string | number, opts?: DeleteOneOptions<ServiceCategoryDTO>): Promise<ServiceCategoryDTO> {
        await this.operatorService.hasPermission(this.userContext.req.user.id, OperatorPermission.Services_Edit);
        return super.deleteOne(id, opts);
    }
}