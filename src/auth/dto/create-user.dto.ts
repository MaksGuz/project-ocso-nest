import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  static userPassword(userPassword: any, userPassword1: any) {
    throw new Error('Method not implemented.');
  }
  @IsEmail()
  userEmail: string;

  @IsString()
  @MinLength(8)
  userPassword: string;
  static userEmail: any;
}
