import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenError } from 'apollo-server-core';
import { OperatorPermission } from 'src/entities/enums/operator-permission.enum';
import { OperatorEntity } from 'src/entities/operator.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OperatorService {
    constructor(
        @InjectRepository(OperatorEntity)
        public repo: Repository<OperatorEntity>
    ) { }

    async validateCredentials(userName: string, password: string): Promise<OperatorEntity | null> {
        return this.repo.findOne({ where: { userName, password } });
    }

    async getById(id: number): Promise<OperatorEntity | null> {
        return this.repo.findOne({ where: { id } });
    }

    async hasPermission(id: number, permission: OperatorPermission): Promise<OperatorEntity> {
        const operator = await this.repo.findOneOrFail({ where: { id }, relations: ['role'] });
        if (!operator.role) {
            throw new ForbiddenError('PERMISSION_NOT_GRANTED');
        }
        const hasPermission = operator.role.permissions.includes(permission);
        if(!hasPermission) throw new ForbiddenError('PERMISSION_NOT_GRANTED');
        return operator;
    }
}
