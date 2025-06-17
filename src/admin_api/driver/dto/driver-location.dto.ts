import { ObjectType } from "@nestjs/graphql";
import { DriverStatus } from "src/entities/enums/driver-status.enum";
import { Gender } from "src/entities/enums/gender.enum";
import { Point } from "src/interfaces/point";

@ObjectType()
export class OnlineDriver {
    location: Point;
    driverId: number;
    lastUpdatedAt: number;
}

@ObjectType()
export class OnlineDriverWithData {
    id: number;
    location: Point;
    lastUpdatedAt: number;
    firstName?: string;
    lastName?: string;
    mobileNumber: string;
    status: DriverStatus;
    gender?: Gender;
    rating?: number;
    reviewCount: number;
}