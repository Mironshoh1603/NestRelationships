import { Injectable } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { SubCategory } from './entities/subcategory.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private subCategoryRepository: Repository<SubCategory>,
  ) {}

  async createSubCategory(
    createSubCategoryDto: CreateSubCategoryDto,
  ): Promise<SubCategory> {
    const { name } = createSubCategoryDto;

    // Create and save the new subcategory
    const subCategory = this.subCategoryRepository.create({
      name,
    });

    return this.subCategoryRepository.save(subCategory);
  }

  // Get all subcategories
  async getAllSubCategories(): Promise<SubCategory[]> {
    return this.subCategoryRepository.find({ relations: ['lessons'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} subcategory`;
  }

  update(id: number, updateSubcategoryDto: UpdateSubcategoryDto) {
    return `This action updates a #${id} subcategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} subcategory`;
  }
}
