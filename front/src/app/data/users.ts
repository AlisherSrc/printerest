import { User, userStatus } from "../models/User";

export const users : User[] = [
  {
    id: 1,
    username: "eunji",
    email: "eu@gmail.com",
    status: userStatus.Active
  },
  {
    id: 2,
    username: "Felipe Kaito",
    email: "felipe@gmail.com",
    status: userStatus.Active
  },
]
