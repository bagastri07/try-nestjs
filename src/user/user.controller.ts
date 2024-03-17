import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('login')
    async login(@Body('email') email: string, @Body('password') password: string) {
        const user = await this.userService.login(email, password);
        if (user) {
            // Authentication successful
            return { user };
        } else {
            // Authentication failed
            return { message: 'Invalid email or password' };
        }
    }

    @Post('register')
    async register(@Body('email') email: string, @Body('password') password: string) {
        const newUser = await this.userService.createUser({ email, password });
        if (newUser) {
            return { message: 'User registered successfully' };
        } else {
            return { message: 'Failed to register user' };
        }
    }

}
