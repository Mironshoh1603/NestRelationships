import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Create an address and link it to a user
  async createAddress(
    userId: number,
    createAddressDto: CreateAddressDto,
  ): Promise<Address> {
    const user = await this.userRepository.findOneBy({ id: userId });

    console.log(user);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if the user already has an address
    if (user.address) {
      throw new Error('User already has an address');
    }

    // Create and save the new address
    const newAddress = this.addressRepository.create({
      ...createAddressDto,
      user: user, // Link the address to the user
    });

    return this.addressRepository.save(newAddress);
  }

  // Get the address by user ID
  async getAddressByUserId(userId: number): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!address) {
      throw new NotFoundException('Address not found for this user');
    }

    return address;
  }

  findAll() {
    return `This action returns all address`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
