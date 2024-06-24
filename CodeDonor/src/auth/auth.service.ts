import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './persistence/user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dtos/user.create.dto';
import { UserLoginDto } from './dtos/user.login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtResponseDto } from './dtos/jwt.reponse.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService')
  constructor (
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) { }
  public async createUser(userCreateDto: UserCreateDto): Promise<string> {
    const userEntity = new UserEntity();
    userEntity.username = userCreateDto.username;
    userEntity.salt = await bcrypt.genSalt();
    userEntity.password = await this.hashPassword(userCreateDto.password, userEntity.salt);
    try {
      return (await this.userRepository.save(userEntity)).username;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  public async login(userLoginDto: UserLoginDto): Promise<JwtResponseDto> {
    const { username, password } = userLoginDto;
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new ConflictException('Username does not exists!');
    }
    const grantAccess = await this.validatePassword(password, user.password, user.salt);
    if (!grantAccess) {
      throw new BadRequestException('Credentials are invalid!');
    }
    const payload = { username };
    return new JwtResponseDto(this.jwtService.sign(payload));
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
  private async validatePassword(givenPassword: string, savedPassword: string, salt: string): Promise<boolean> {
    const hash = await bcrypt.hash(givenPassword, salt);
    return hash === savedPassword;
  }
}
