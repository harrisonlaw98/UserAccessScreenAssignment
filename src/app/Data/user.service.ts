import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User[] = [
    {
      userId: 'dsads',
      firstName: 'Tony',
      lastName: 'Wong',
      loginName: 'tonywong',
      password: '1234567',
      email: 'tonywong@gmail.com',
      newRecord: false,
    },
    {
      userId: 'wewe',
      firstName: 'Ben',
      lastName: 'Pong',
      loginName: 'benpong',
      password: '1234567',
      email: 'benpong@gmail.com',
      newRecord: false,
    },
    {
      userId: 'rere',
      firstName: 'Peter',
      lastName: 'Chan',
      loginName: 'peterchan',
      password: '1234567',
      email: 'peterchan@gmail.com',
      newRecord: false,
    },
    {
      userId: 'qqq',
      firstName: 'Sandy',
      lastName: 'Pui',
      loginName: 'sandypui',
      password: '1234567',
      email: 'sandypui@gmail.com',
      newRecord: false,
    },
    {
      userId: 'zxcc',
      firstName: 'Ken',
      lastName: 'Yi',
      loginName: 'kenyi',
      password: '1234567',
      email: 'kenyi@gmail.com',
      newRecord: false,
    },
  ];

  getUser() {
    return JSON.parse(JSON.stringify(this.user));
  }

  updateUser(users: User[]) {
    this.user = users.map((user) => {
      user.newRecord = false;
      return user;
    });
  }

  deleteUser(deleteUser: User) {
    this.user = this.user.filter((v) => v.userId != deleteUser.userId);
  }

  vaildate(users: User[]) {
    this.user.forEach((user: User) => {});
  }
}
