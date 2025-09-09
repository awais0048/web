import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }
    // for login
    @Post('/login')
    login(@Body() credentials: any) {

        return this.authService.login(credentials);
    }
    // signup
    @Post('/signup')
    register(@Body() credentials: any) {

        return this.authService.register(credentials);
    }
}
