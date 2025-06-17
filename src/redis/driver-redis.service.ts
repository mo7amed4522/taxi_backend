import { Injectable } from "@nestjs/common";
import { RedisService } from '@liaoliaots/nestjs-redis';
import { Redis } from "ioredis";
import {Point} from '../index';
@Injectable()
export class DriverRedisService {
    private readonly redisService: Redis;

    constructor(
        private readonly redis: RedisService
    ) {
        this.redisService = this.redis.getOrThrow();
    }

    async setLocation(driverId: number, point: Point) {
        await Promise.all([
            this.redisService.geoadd(RedisKeys.Driver, point.lng, point.lat, driverId.toString()),
            this.redisService.zadd(RedisKeys.DriverLocationTime, Date.now(), driverId)]);
    }

    async getDriverCoordinate(driverId: number): Promise<Point | null> {
        const pos = await this.redisService.geopos(RedisKeys.Driver, driverId.toString());
        return pos[0] ? new Point(parseFloat(pos[0][0]), parseFloat(pos[0][1])) : null;
    }

    async getClose(point: Point, distance: number): Promise<DriverLocationWithId[]> {
        const bare = await this.redisService.georadius(RedisKeys.Driver, point.lng, point.lat, distance, 'm', 'WITHCOORD') as string[][];
        return bare.map((item: string[]) => ({
            driverId: parseInt(item[0] as string),
            location: new Point(parseFloat(item[1][0]), parseFloat(item[1][1]))
        }));
    }

    async getCloseWithoutIds(point: Point, distance: number): Promise<Point[]> {
        const bare = await this.redisService.georadius(RedisKeys.Driver, point.lng, point.lat, distance, 'm', 'WITHCOORD') as string[][];
        return bare.map((item: string[]) => new Point(parseFloat(item[1][0]), parseFloat(item[1][1])));
    }

    async getAllOnline(center: Point, count: number): Promise<IOnlineDriver[]> {
        const bare = await this.redisService.georadius(RedisKeys.Driver, center.lng, center.lat, '22000', 'km', 'WITHCOORD', 'COUNT', count, 'ASC') as string[][];
        const times: string[] = await this.redisService.zrangebyscore(RedisKeys.DriverLocationTime, 0, new Date().getTime(), 'WITHSCORES');
        return bare.map((x: string[]) => ({
            driverId: parseInt(x[0] as string),
            location: new Point(parseFloat(x[1][0]), parseFloat(x[1][1])),
            lastUpdatedAt: parseInt(times[times.indexOf(x[0]) + 1])
        }));
    }

    async expire(userId: number[]) {
        await this.redisService.zrem(RedisKeys.Driver, userId);
        await this.redisService.zrem(RedisKeys.DriverLocationTime, userId);
    }
}

enum RedisKeys {
    Driver = 'driver',
    DriverLocationTime = 'driver-location-time'
}

export type DriverLocation = {
    location: Point
}
export type DriverLocationWithId = DriverLocation & { driverId: number }

export type DriverLocationWithDist = DriverLocation & { distance: number }

export type DriverLocationWithDistAndId = DriverLocationWithDist & { driverId: number }

export interface IOnlineDriver {
    driverId: number,
    location: Point,
    lastUpdatedAt: number
}