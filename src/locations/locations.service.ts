import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    return await this.locationRepository.save(createLocationDto);
  }

  async findAll() {
    return await this.locationRepository.find();
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findOneBy({
      locationId: id,
    });
    if (!location) throw new NotFoundException("Location not found");
    return location; 
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const location = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto,
    });
    if (!location) throw new NotFoundException("Location not found");
    return await this.locationRepository.save(location); 
  }

  async remove(id: number) {
    const result = await this.locationRepository.delete({
      locationId: id,
    });
    if (result.affected === 0) {
      throw new NotFoundException("Location not found");
    }
    return {
      message: `Location with id ${id} removed successfully`,
    };
  }
}
