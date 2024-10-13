import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtMiddleware } from './jwt.middleware';
import { RoleMiddleware } from './role.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: 'Nimadir', // Replace with an environment variable in production
      signOptions: { expiresIn: '1h' }, // Token expiry
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware, RoleMiddleware)

      .forRoutes({ path: 'auth', method: RequestMethod.GET }); // Apply middleware to specific route or controller
  }
}
