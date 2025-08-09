export class GetUserDto {
  id: string;
  email: string;
  name: string | null;
  displayName: string | null;
  password: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;
  lastLoginIp: string | null;
}
