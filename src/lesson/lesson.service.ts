import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { User } from 'src/user/entities/user.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from 'src/subcategory/entities/subcategory.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(SubCategory)
    private subCategoryRepository: Repository<SubCategory>,
  ) {}

  // Create a new lesson
  async createLesson(
    teacherId: number,
    createLessonDto: CreateLessonDto,
  ): Promise<Lesson> {
    const { name, video_link, difficulty, subcategories } = createLessonDto;

    // Find the teacher (user)
    const teacher = await this.userRepository.findOneBy({ id: teacherId });
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }
    const subCategories = await this.subCategoryRepository.find({
      where: { id: In([...subcategories]) },
    });
    if (!subCategories.length) {
      throw new NotFoundException('subCategories not found');
    }
    // Create and save the new lesson
    const lesson = this.lessonRepository.create({
      name,
      video_link,
      difficulty,
      teacher,
      subCategories,
    });

    return this.lessonRepository.save(lesson);
  }

  // Get all lessons
  async getAllLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find({
      relations: ['teacher', 'subCategories'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} lesson`;
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
