import { PartialType } from '@nestjs/mapped-types';
import { CreateSubCategoryDto } from './create-subcategory.dto';

export class UpdateSubcategoryDto extends PartialType(CreateSubCategoryDto) {}
