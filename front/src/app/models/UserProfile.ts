import { User } from "./User";

export interface UserProfile {
  user: User;
  phone?: string;
  email: string;
  status?: userStatus;
  avatar?: string;
}

export const enum userStatus{
  Active = 'active',
  Inactive = 'inactive',
  Disabled = 'disabled'
}
