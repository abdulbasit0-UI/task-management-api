import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBody, ApiResponse } from "@nestjs/swagger";


class RegisterDto {
    email: string;
    password: string;
    name: string;
}

class LoginDto {
    email: string;
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiBody({ type: RegisterDto })
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    async register(@Body() registerDto: RegisterDto) {
        await this.authService.register(registerDto.email, registerDto.password, registerDto.name);

        return {
            message: 'User registered successfully',
        }
    }

    @Post('login')
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 200, description: 'User logged in successfully' })
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return this.authService.login(user);
    }

}