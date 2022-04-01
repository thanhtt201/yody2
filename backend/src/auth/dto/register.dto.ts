import { IsNotEmpty, MinLength, MaxLength, IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'FirstName không được để trống' })
  // @IsOptional()
  // @Transform(({ value }) => value.trim())
  firstname: string;

  @IsString()
  @IsNotEmpty({ message: 'Lastname không được để trống' })
  // @IsOptional()
  // @Transform(({ value }) => value.trim())
  lastname: string;

  @IsString()
  @IsNotEmpty({ message: 'Email không được để trống' })
  @MinLength(8, { message: 'Email phải ít nhất 8 kí tự' })
  @MaxLength(127, { message: 'Email không quá 127 kí tự' })
  // @IsOptional()
  // @Transform(({ value }) => value.trim())
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password không được để trống' })
  // @IsOptional()
  // @Transform(({ value }) => value.trim())
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone không được để trống' })
  // @IsOptional()
  // @Transform(({ value }) => value.trim())
  phone: string;
}
