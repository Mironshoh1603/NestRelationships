import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LessonModule } from './lesson/lesson.module';
import { AddressModule } from './address/address.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { User } from './user/entities/user.entity';
import { Address } from './address/entities/address.entity';
import { ConfigModule } from '@nestjs/config';
import { Lesson } from './lesson/entities/lesson.entity';
import { SubCategory } from './subcategory/entities/subcategory.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'school',
      entities: [User, Address, Lesson, SubCategory],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    AuthModule,
    LessonModule,
    AddressModule,
    SubcategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
