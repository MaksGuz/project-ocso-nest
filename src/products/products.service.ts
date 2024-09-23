import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ProductsService {
  products: any;
  constructor(
    @InjectRepository(Product)
  private productRepository: Repository<Product>
){}
  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    await this.productRepository.save(product); // Falta guardar el producto en la BD
    return product;
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    const product = this.productRepository.findBy({
      productId: id,
    })
    if(!product) throw new NotFoundException()
      return product;
  }

  findByProvider(id: string) {
   return this.productRepository.findBy({
    provider: {
      providerId: id,
    }
   })
  }

   async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productId: id,
      ...UpdateProductDto
    })
    if(!productToUpdate) throw new NotFoundException()
    this.productRepository.save(productToUpdate);
    return productToUpdate;
  }

  remove(id: string) {
    return this.productRepository.delete({
      productId: id,
    })
    return{
      message: `Objeto con id ${id} eliminado`
    }
  }
}
