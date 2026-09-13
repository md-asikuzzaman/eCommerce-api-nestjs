export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}
