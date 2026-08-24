import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionService } from './region.service';
import { RegionEntity } from './../../entities/region.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegionEntity])],
  providers: [RegionService],
  exports: [RegionService],
})
export class RegionModule {}
