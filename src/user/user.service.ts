import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {
  private users: CreateUserDto[] = [];

  async create(createUserDto: CreateUserDto) {
    const userExists = this.users.find((user) => user.id === createUserDto.id);

    if (userExists) {
      throw new ConflictException('User ya existe');
    }

    this.users.push(createUserDto);
    return '';
  }

  async createMultiple(users: CreateUserDto[]) {
    for (const user of users) {
      const userExists = this.users.find((u) => u.id === user.id);

      if (userExists) {
        throw new ConflictException(`User con ID ${user.id} ya existe`);
      }

      this.users.push(user);
    }

    return 'Users creado corectamente';
  }

  async findAll() {
    return this.users;
  }

  async findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User con ID ${id} no encontrado`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`User con ID ${id} no encontrado`);
    }

    this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
    return `User con ID ${id} actualizado corectamente`;
  }

  async remove(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`User con ID ${id} no encontrado`);
    }

    this.users.splice(userIndex, 1);
    return `User con ID ${id} eliminado corectamente`;
  }
}
