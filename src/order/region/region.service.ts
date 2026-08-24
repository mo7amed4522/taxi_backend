import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionEntity } from './../../entities/region.entity';
import { Repository } from 'typeorm';
import { Point } from '../../index';
import { ServiceEntity } from './../../entities/service.entity';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(RegionEntity)
    private regionRepository: Repository<RegionEntity>,
  ) {}

  async getRegionWithPoint(point: Point): Promise<RegionEntity[]> {
    const regions: RegionEntity[] = await this.regionRepository.query(
      `SELECT * FROM region WHERE enabled=TRUE AND ST_Within(st_geomfromtext('POINT(? ?)'), region.location)`,
      [point.lng, point.lat],
    );
    return regions;
  }

  async getRegionServices(regionId: number): Promise<ServiceEntity[]> {
    return (
      (
        await this.regionRepository.findOne({
          where: { id: regionId },
          relations: ['services'],
        })
      )?.services ?? []
    );
  }
}
