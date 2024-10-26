import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { Manager } from 'src/managers/entities/manager.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>
  ) { }

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
    // Set manager to null
    this.managerRepository
      .createQueryBuilder()
      .update()
      .set({ location: null })
      .where("locationId = :id", {
        id,
      }).execute();

    const location = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto,
    });
    const savedLocation = this.locationRepository.save(location);

    const updatedManager = await this.managerRepository.preload({
      managerId: updateLocationDto.manager,
      location: location,
    })
    this.managerRepository.save(updatedManager)
    return savedLocation;
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
