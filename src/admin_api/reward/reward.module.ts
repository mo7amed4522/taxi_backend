import { NestjsQueryGraphQLModule, PagingStrategies } from "@nestjs-query/query-graphql";
import { NestjsQueryTypeOrmModule } from "@nestjs-query/query-typeorm";
import { Module } from "@nestjs/common";
import { RewardDTO } from "./dto/reward.dto";
import { RewardEntity } from "src/entities/reward.entity";

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([RewardEntity])],
            resolvers: [
                {
                    EntityClass: RewardEntity,
                    DTOClass: RewardDTO,
                    create: { many: { disabled: true } },
                    update: { many: { disabled: true } },
                    delete: { many: { disabled: true } },
                    pagingStrategy: PagingStrategies.OFFSET,
                    enableTotalCount: true
                }
            ]
        })
    ]
})
export class RewardModule {}