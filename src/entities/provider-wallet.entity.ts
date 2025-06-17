import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('admin_wallet')
export class ProviderWalletEntity {
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
}