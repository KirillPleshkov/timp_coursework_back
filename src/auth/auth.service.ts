import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const user = await this.validateUser(loginDto);
      return await this.generateToken(user);
    } catch (e) {
      throw new HttpException(
        'Неверный логин или пароль',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async registration(registrationDto: RegistrationDto) {
    const userByEmail = await this.userService.getUserByEmail(
      registrationDto.email,
    );

    if (userByEmail) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const password = await bcrypt.hash(registrationDto.password, 5);

    const user = await this.userService.create({
      ...registrationDto,
      password,
    });

    return this.generateToken(user);
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);

    if (!user) {
      throw new HttpException(
        'Неверный логин или пароль',
        HttpStatus.BAD_REQUEST,
      );
    }
    const passwordEquals = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (user && passwordEquals) {
      return user;
    }

    throw new HttpException(
      'Неверный логин или пароль',
      HttpStatus.BAD_REQUEST,
    );
  }

  generateToken(user: User) {
    const payload = { id: user.id, email: user.email, name: user.name };

    return { token: this.jwtService.sign(payload) };
  }
}
