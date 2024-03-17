import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class UserService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async login(email: string, password: string): Promise<User | null> {
        // Find the user with the provided email
        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) {
            // User with the provided email does not exist
            return null;
        }

        // Compare the provided password with the stored password
        if (user.password !== password) {
            // Passwords do not match
            return null;
        }

        // Passwords match, return the user object
        return user;
    }

    async createUser(data: { email: string, password: string }) {
        try {
            const newUser = await this.prisma.user.create({
                data: {
                    email: data.email,
                    password: data.password,
                },
            });
            return newUser;
        } catch (error) {
            console.error('Error creating user:', error);
            return null;
        }
    }

    async disconnect() {
        await this.prisma.$disconnect();
    }
}
