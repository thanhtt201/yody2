import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsString({ message: 'Email không được để trống' })
    @Transform(({ value }) => value.trim())
    email: string;

    @IsNotEmpty()
    @IsString({ message: 'Password không được để trống' })
    @Transform(({ value }) => value.trim())
    password: string;
}