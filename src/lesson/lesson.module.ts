import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { JwtMiddleware } from 'src/auth/jwt.middleware';
import { RoleMiddleware } from 'src/auth/role.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { User } from 'src/user/entities/user.entity';
import { SubCategory } from 'src/subcategory/entities/subcategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, User, SubCategory])],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware, RoleMiddleware)

      .forRoutes(
        { path: 'lesson', method: RequestMethod.POST },
        { path: 'lesson', method: RequestMethod.GET },
      ); // Apply middleware to specific route or controller
  }
}
