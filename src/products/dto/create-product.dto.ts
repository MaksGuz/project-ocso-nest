import { IsInt, IsNumber, IsObject, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { Product } from '../entities/product.entity';
import { Provider } from 'src/providers/entities/provider.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto extends Product{
    @IsString()
    @IsUUID("4")
    @IsOptional()
    @ApiProperty({
        default: "uuid"
    })
    productId: string;
    @IsString()
    @MaxLength(40)
    @ApiProperty({
        default: "Sabritones"
    })
    productName: string;
    @IsNumber()
    @ApiProperty({
        default: "$45"
    })
    price: number;
    @IsInt()
    @ApiProperty({
        default: "3"
    })
    countSeal: number;
    @IsObject()
    provider: Provider;
}
