import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { User } from 'src/user/entities/user.entity';
import { JwtMiddleware } from 'src/auth/jwt.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Address, User])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)

      .forRoutes(
        { path: 'address/user', method: RequestMethod.POST },
        { path: 'address/user', method: RequestMethod.GET },
      ); // Apply middleware to specific route or controller
  }
}
