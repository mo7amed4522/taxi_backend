import { Inject, UseGuards } from "@nestjs/common";
import { Args, CONTEXT, ID, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ForbiddenError } from "apollo-server-core";
import { getRepository } from "typeorm";
import { UserContext } from "../auth/authenticated-admin";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { DriverService } from "./driver.service";
import { OnlineDriver, OnlineDriverWithData } from "./dto/driver-location.dto";
import { DriverTransactionInput } from "./dto/driver-transaction.input";
import { DriverWalletDTO } from "./dto/driver-wallet.dto";
import { DriverDTO } from "./dto/driver.dto";
import { TransactionAction } from "src/entities/enums/transaction-action.enum";
import { OperatorEntity } from "src/entities/operator.entity";
import { OperatorPermission } from "src/entities/enums/operator-permission.enum";
import { TransactionStatus } from "src/entities/enums/transaction-status.enum";
import { SharedDriverService } from "src/order/shared-driver.service";
import { GraphQLPoint } from "src/entities/dto/graphql-point.dto";
import { Point } from 'src/interfaces/point';

@Resolver()
@UseGuards(JwtAuthGuard)
export class DriverResolver {
    constructor(
        private driverService: DriverService,
        private sharedDriverService: SharedDriverService,
        @Inject(CONTEXT)
        private context: UserContext
    ) {}

    @Query(() => [OnlineDriver])
    async getDriversLocation(@Args('center', { type: () => GraphQLPoint }) center: Point, @Args('count', { type: () => Int }) count: number): Promise<OnlineDriver[]> {
        return this.driverService.getDriversLocation(center, count);
    }

    @Query(() => [OnlineDriverWithData])
    async getDriversLocationWithData(@Args('center', { type: () => GraphQLPoint }) center: Point, @Args('count', { type: () => Int }) count: number): Promise<OnlineDriverWithData[]> {
        return this.driverService.getDriversLocationWithData(center, count);
    }

    @Mutation(() => DriverWalletDTO)
    async createDriverTransaction(@Args('input', { type: () => DriverTransactionInput }) input: DriverTransactionInput) {
        input.amount = input.action == TransactionAction.Recharge ? Math.abs(input.amount) : Math.abs(input.amount) * -1;
        return this.sharedDriverService.rechargeWallet({...input, operatorId: this.context.req.user.id, status: TransactionStatus.Done});
    }

    @Mutation(() => DriverDTO)
    async deleteOneDriver(@Args('id', { type: () => ID }) id: number): Promise<DriverDTO> {
        const operator = await getRepository(OperatorEntity).findOne({ where: { id: this.context.req.user.id }, relations: ['role'] });
        if (!operator || !operator.role) {
            throw new ForbiddenError('PERMISSION_NOT_GRANTED');
        }
        if(!operator.role.permissions.includes(OperatorPermission.Drivers_Edit)) {
            throw new ForbiddenError('PERMISSION_NOT_GRANTED');
        }
        return this.sharedDriverService.deleteById(id);
    }
}