import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user';
import { UserRequest } from './user.request';

@Injectable()
export class UsersService {
  private users: User[] = [];
  public getUsers(): User[] {
    return this.users;
  }
  public getUserById(id: number): User {
    if (id > 0 && id <= this.users.length) {
      return this.users.find(user => user.id === id);
    } else {
      console.log(`User with id ${id} not found`);
    }
  }
  public createUser(userRequest: UserRequest): User {
    let user = new User(this.users.length + 1, userRequest.name, userRequest.lastname, userRequest.email, userRequest.password, userRequest.age);
    this.users.push(user);
    return user;
  }
  public updateUser(id: number, userRequest: UserRequest): void {
    if (id > 0 && id <= this.users.length) {
      this.users[id - 1] = new User(id, userRequest.name, userRequest.lastname, userRequest.email, userRequest.password, userRequest.age);
    } else {
      console.log(`User with id ${id} not found`);
    }
  }
  public deleteUserById(id: number) {
    if (id > 0 && id <= this.users.length) {
      this.users = this.users.filter(task => task.id !== id);
    } else {
      console.log(`User with id ${id} not found`)
    }
  }
}