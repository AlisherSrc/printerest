export interface User{
  id: number,
  username: string,
  firstname ?: string,
  secondname ?: string,
  phone ?: string,
  email: string,
  status: userStatus
}

export const enum userStatus{
  Active = 'active',
  Inactive = 'inactive',
  Disabled = 'disabled'
}

