export interface user{
  id: number,
  username: string,
  email: string,
  phone: string,
  status: userStatus
}

const enum userStatus{
  Active = 'active',
  Inactive = 'inactive',
  Disabled = 'disabled'
}
