import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(email: string, password: string, name: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            name,
        })

        return this.userRepository.save(user);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOneBy({ email });
    }

    async findOneById(id: string): Promise<User | null> {
        return this.userRepository.findOneBy({ id });
    }
}
