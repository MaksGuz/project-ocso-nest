import { IsArray, IsString, MaxLength } from "class-validator";
import { Region } from "../entities/region.entity";
import { MaxKey } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRegionDto extends Region {
    @IsString()
    @MaxLength(100)
    @ApiProperty({
        default: "El Marques"
    })
    regionName: string;
    @IsArray()
    regionStates: string[];
}
