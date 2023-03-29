import { Pin } from "../models/Pin";
import { users } from "./users";
import { tags } from "./tags";
export const pins: Pin[] = [
  {
    id: 1,
    title: 'LOTM',
    contentUrl: "https://i.pinimg.com/564x/db/e3/0b/dbe30b327fea09b2115e22b687b214d3.jpg",
    timeUploaded: new Date("2023-03-18"),
    user: users[0],
    tags: tags.slice(0,3),
    destinationLink: "https://pin.it/7r8oNDt"
  },
  {
    id: 2,
    title: 'Felipe Kaito',
    contentUrl: "https://i.pinimg.com/564x/24/fb/f3/24fbf3709290a0887e506997cb82f9e4.jpg",
    timeUploaded: new Date("2023-05-23"),
    user: users[1],
    tags: tags.slice(0,3),
    destinationLink: "https://pin.it/50I3sGk"
  },
]
