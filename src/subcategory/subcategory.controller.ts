import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';

@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Post()
  async createSubCategory(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.subcategoryService.createSubCategory(createSubCategoryDto);
  }

  // Get all subcategories
  @Get()
  async getAllSubCategories() {
    return this.subcategoryService.getAllSubCategories();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcategoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubcategoryDto: UpdateSubcategoryDto,
  ) {
    return this.subcategoryService.update(+id, updateSubcategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcategoryService.remove(+id);
  }
}
