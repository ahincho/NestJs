import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDto } from './dtos/user.create.dto';
import { UserLoginDto } from './dtos/user.login.dto';
import { JwtResponseDto } from './dtos/jwt.reponse.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from './persistence/user.entity';
import { GetUser } from './decorators/get.user.decorator';

@Controller('/api/v1/auth')
export class AuthController {
  constructor (
    private readonly authService: AuthService
  ) { }
  @Post('/register')
  @UsePipes(ValidationPipe)
  public async register(@Body() userCreateDto: UserCreateDto): Promise<string> {
    return this.authService.createUser(userCreateDto);
  }
  @Post('/login')
  @UsePipes(ValidationPipe)
  public async login(@Body() userLoginDto: UserLoginDto): Promise<JwtResponseDto> {
    return this.authService.login(userLoginDto);
  }
  @Post('/test')
  @UseGuards(AuthGuard())
  public test(@Req() request): void {
    console.log(request);
  }
  @Post('/validate')
  @UseGuards(AuthGuard())
  public validate(@GetUser() user: UserEntity): void {
    console.log(user);
  }
}
