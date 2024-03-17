import { Body, Controller, Post } from '@nestjs/common';
import { ValidationService } from 'src/validation/validation.service';
import { z } from 'zod';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly validationService: ValidationService
    ) { }

    @Post('login')
    async login(@Body('email') email: string, @Body('password') password: string) {
        const emailSchema = z.string().min(6).max(40).email()
        const passwordSchema = z.string().min(6).max(40)

        const emailResult = this.validationService.validate(emailSchema, email)
        const passwordResult = this.validationService.validate(passwordSchema, password)

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
