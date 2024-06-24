import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtResponseDto } from "./dtos/jwt.reponse.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./persistence/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'mySecret'
    });
  }
  public async validate(jwtResponseDto: JwtResponseDto): Promise<UserEntity> {
    const username = jwtResponseDto.username;
    const userEntity = await this.userRepository.findOneBy({ username });
    if (!userEntity) {
      throw new UnauthorizedException('Username does not exists!');
    }
    return userEntity;
  }
}
