import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Db } from 'mongodb';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @Inject('MONGO_CONNECTION') private db: Db,
        private jwtService: JwtService,
    ) { }

    private collection() {
        return this.db.collection('users');
    }

    async register(user: any) {
        if (!user.email || !user.password) {
            return { message: 'Email and password are required', status: 400 };
        }

        const existingUser = await this.collection().findOne({ email: user.email });
        if (existingUser) {
            return { message: 'User already exists', status: 409 };
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);

        const result = await this.collection().insertOne({
            ...user,
            password: hashedPassword,
        });

        if (!result.acknowledged) {
            return { message: 'Registration failed', status: 500 };
        }

        return { message: 'User registered successfully', status: 201, userId: result.insertedId };
    }

    async login(credentials: any) {
        const user = await this.collection().findOne({ email: credentials.email });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        //  Generate JWT
        const payload = { sub: user._id.toString(), email: user.email };
        const token = this.jwtService.sign(payload);

        return {
            status: 'success',
            message: 'Login successful',
            token,
            user: { id: user._id, email: user.email },
        };
    }
}
