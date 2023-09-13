/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegistrationDto {
  @IsNotEmpty({ message: 'Имя не должно быть пустым' })
  @IsString()
  readonly name: string;

  @IsEmail(undefined, { message: 'Некорректный email' })
  @IsString()
  readonly email: string;

  @MinLength(6, { message: 'Минимальная длина пароля - 6 символов' })
  @IsString()
  readonly password: string;
}
