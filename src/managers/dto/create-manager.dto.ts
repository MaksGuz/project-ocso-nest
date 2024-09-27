import { IsEmail, IsNumber, IsString, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity";

export class CreateManagerDto extends Manager {
    @IsString()
    @MaxLength(80)
    managerFullName: string;
    @IsEmail()
    @IsString()
    managerEmail: string;
    @IsNumber()
    managerSalary: number;
    @IsString()
    @MaxLength(16)
    managerPhoneNumber: string;
}
