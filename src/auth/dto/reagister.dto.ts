import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(['user', 'teacher'], {
    message: 'Role must be either user or teacher',
  })
  role?: string = 'user'; // Optional field, default is 'user'

  // Optionally include Address properties if it's part of registration
  // e.g.
  // @IsNotEmpty()
  // @IsString()
  // address: string;
}
