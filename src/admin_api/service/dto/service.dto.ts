import { Authorize, FilterableField, IDField, PagingStrategies, Relation, UnPagedRelation } from "@nestjs-query/query-graphql";
import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

import { RegionDTO } from "../../region/dto/region.dto";
import { MediaDTO } from "../../upload/media.dto";
import { ServiceOptionDTO } from "./service-option.dto";
import { ServiceAuthorizer } from "./service.authorizer";
import { ServicePaymentMethod } from "src/entities/enums/service-payment-method.enum";
import { TimeMultiplier } from "src/interfaces/time-multiplier.dto";
import { DistanceMultiplier } from "src/interfaces/distance-multiplier.dto";

@ObjectType('AdminService')
@UnPagedRelation('regions', () => RegionDTO, { pagingStrategy: PagingStrategies.NONE })
@Relation('media', () => MediaDTO)
@UnPagedRelation('options', () => ServiceOptionDTO)
@Authorize(ServiceAuthorizer)
export class ServiceDTO {
    @IDField(() => ID)
    id!: number;
    name!: string;
    description?: string;
    @Field(() => Int)
    personCapacity?: number;
    @FilterableField(() => ID)
    categoryId: number;
    baseFare!: number;
    roundingFactor?: number;
    perHundredMeters: number;
    perMinuteDrive!: number;
    perMinuteWait!: number;
    prepayPercent!: number;
    minimumFee!: number;
    @Field(() => Int)
    searchRadius!: number;
    paymentMethod!: ServicePaymentMethod;
    cancellationTotalFee!: number;
    cancellationDriverShare!: number;
    @Field(() => Int)
    providerSharePercent!: number;
    providerShareFlat!: number;
    twoWayAvailable!: boolean;
    @Field(() => Int)
    maximumDestinationDistance!: number;
    timeMultipliers!: TimeMultiplier[];
    distanceMultipliers!: DistanceMultiplier[];
    @Field(() => ID)
    mediaId!: number;
}