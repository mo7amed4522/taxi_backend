import { ObjectType, registerEnumType } from '@nestjs/graphql';
import { Point } from '../../../index';
import { ServiceCategoryDTO } from '../../service/dto/service-category.dto';
import { LatLngLiteral } from '@googlemaps/google-maps-services-js';

export enum CalculateFareError {
  RegionUnsupported = 'REGION_UNSUPPORTED',
  NoServiceInRegion = 'NO_SERVICE_IN_REGION',
}

registerEnumType(CalculateFareError, { name: 'CalculateFareError' });

@ObjectType()
export class CalculateFareDTO {
  currency: string;
  distance: number;
  duration: number;
  directions: LatLngLiteral[];
  services: ServiceCategoryDTO[];
  error?: CalculateFareError;
}
