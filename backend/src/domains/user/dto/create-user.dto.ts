import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

class CreateUserDto {
  @IsNotEmpty()
  userId: string | undefined;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(24)
  password: string;
}
