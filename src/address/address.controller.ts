import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { NotFoundError } from 'rxjs';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('user')
  async createAddressByUser(
    @Body() createAddressDto: CreateAddressDto,
    @Request() req: Request,
  ) {
    const user = req['user'];
    console.log(user);

    if (!user) {
      throw new NotFoundError('User not fund');
    }
    const userId = user.sub;
    return this.addressService.createAddress(userId, createAddressDto);
  }

  // Endpoint to get an address by user ID
  @Get('user')
  async getAddressByUserId(@Request() req: Request) {
    console.log(req['user']);
    const userId = req['user'].sub;

    return this.addressService.getAddressByUserId(userId);
  }

  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
