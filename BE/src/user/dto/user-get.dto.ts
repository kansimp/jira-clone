export class UserGetDto {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  roles: string[];
  lastLogin?: Date;
}
