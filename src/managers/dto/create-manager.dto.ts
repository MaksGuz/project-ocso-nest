import { IsEmail, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity";
import { Location } from "src/locations/entities/location.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateManagerDto extends Manager {
    @IsString()
    @MaxLength(80)
    @ApiProperty({
        default: "Max Guzman"
    })
    managerFullName: string;
    @IsEmail()
    @IsString()
    @ApiProperty({
        default: "max@gmail.com"
    })
    managerEmail: string;
    @IsNumber()
    @ApiProperty({
        default: "$60,000"
    })
    managerSalary: number;
    @IsString()
    @MaxLength(16)
    @ApiProperty({
        default: "5549131781"
    })
    managerPhoneNumber: string;
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    location: Location;
}
