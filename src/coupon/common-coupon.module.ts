import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonCouponService } from './common-coupon.service';
import { RequestEntity } from './../entities/request.entity';
import { CouponEntity } from './../entities/coupon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestEntity, CouponEntity])],
  providers: [CommonCouponService],
  exports: [CommonCouponService],
})
export class CommonCouponModule {}
