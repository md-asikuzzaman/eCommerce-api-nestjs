import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getMe() {
    return { msg: 'This action updates the current user password' };
  }

  updateMe() {
    return { msg: 'This action updates the current user password' };
  }

  updatePassword() {
    return { msg: 'This action updates the current user password' };
  }

  getAllUsers() {
    return { msg: 'This action updates the current user password' };
  }

  getUserById() {
    return { msg: 'This action updates the current user password' };
  }

  updateUserById() {
    return { msg: 'This action updates the current user password' };
  }

  updateUserStatusById() {
    return { msg: 'This action updates the current user password' };
  }
}
