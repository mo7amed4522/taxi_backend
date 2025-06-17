import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { FleetEntity } from './fleet.entity';

@Entity('fleet_wallet')
export class FleetWalletEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('numeric', {
        default: 0.0,
        name: 'amount',
        precision: 10,
        scale: 2
    })
    balance!: number;

    @Column()
    currency!: string;

    @ManyToOne(() => FleetEntity, fleet => fleet.wallet)
    fleet!: FleetEntity;

    @Column()
    fleetId!: number;
}