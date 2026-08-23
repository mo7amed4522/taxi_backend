import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenError } from 'apollo-server-fastify';
import { OperatorService } from '../operator/operator.service';
import { OperatorEntity } from 'src/entities/operator.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private adminService: OperatorService,
  ) {}

  async getAdmin(id: number): Promise<OperatorEntity> {
    const admin = await this.adminService.getById(id);
    if (!admin) {
      throw new ForbiddenError('Admin not found');
    }
    return admin;
  }

  async loginAdmin(args: {
    userName: string;
    password: string;
  }): Promise<string> {
    const admin = await this.adminService.validateCredentials(
      args.userName,
      args.password,
    );
    if (admin == null) {
      throw new ForbiddenError('Invalid Credentials');
    }
    return this.jwtService.sign({ id: admin.id });
  }
}
