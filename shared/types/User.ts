import { Role } from './Role';

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  roleId: number;
  token: string;
  recoveryToken: string;
  verificationToken: string;
  verified: boolean;
  sentVerificationEmail: boolean;
}

export interface User {
  role: Role;
}
