import { IsArray, IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { Location } from '../entities/location.entity';

export class CreateLocationDto extends Location {
    @IsString()
    @MaxLength(35)
    locationName: string;

    @IsString()
    @MaxLength(160)
    locationAdress: string;

    @IsArray()
    @IsNotEmpty() 
    locationLatLng: number[];
}
