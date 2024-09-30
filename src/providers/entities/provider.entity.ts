import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Provider{
@PrimaryGeneratedColumn('uuid')

providerId: string;
@Column('text')
@ApiProperty({
    default: "Pepsi"
})
providerName: string;
@Column('text',{
    unique: true
})
@ApiProperty({
    default: "pepsi@gmail.com"
})
providerEmail: string;
@Column({
    type: "text",
    nullable: true,
})
@ApiProperty({
    default: "5523876512"
})
providerPhoneNumber: string;
@OneToMany(() => Product, (product) => product.provider)
    products: Product[]
}