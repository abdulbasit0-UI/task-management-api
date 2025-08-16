import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule, JwtModule.register({
    secret: 'secretKey',
    signOptions: { expiresIn: '1h' },
  })],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]

})
export class AuthModule {}
