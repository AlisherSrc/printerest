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
  {
    id: 3,
    title: '【everywhere】🖤ManThau🖤',
    contentUrl: "https://i.pinimg.com/564x/bb/23/a4/bb23a4709162135a82d7092d7246a271.jpg",
    timeUploaded: new Date("2020-04-25"),
    user:users[10],
    tags: tags.slice(2,5),
    destinationLink: "https://pin.it/6T4kKwC"
  },
  {
    id: 4,
    title: 'the glowing ball',
    contentUrl: "https://i.pinimg.com/564x/11/61/df/1161df30bab4d21f06859bd4efee13d0.jpg",
    timeUploaded: new Date("2025-04-25"),
    user:users[7],
    tags: tags.slice(5,5),
    destinationLink: "https://pin.it/7CJIHr1"
  },
  {
    id: 5,
    title: 'KU on Twitter',
    contentUrl: "https://i.pinimg.com/564x/f1/b7/8f/f1b78fd69424b0d4c411b1db3e278366.jpg",
    timeUploaded: new Date("2200-04-25"),
    user:users[4],
    tags: tags.slice(7,7),
    destinationLink: "https://pin.it/6W2cNn7"
  },
  {
    id: 6,
    title: "What's Behind The Door?",
    contentUrl: "https://i.pinimg.com/564x/94/e7/b4/94e7b42eccf6fd4a1213e051dc55bba1.jpg",
    timeUploaded: new Date("2021-11-10"),
    user:users[6],
    tags: tags.slice(1,7),
    destinationLink: "https://pin.it/52CioPk"
  },



  {
    id: 7,
    title: 'KU on Twitter',
    contentUrl: "https://i.pinimg.com/564x/f1/b7/8f/f1b78fd69424b0d4c411b1db3e278366.jpg",
    timeUploaded: new Date("2200-04-25"),
    user:users[4],
    tags: tags.slice(7,7),
    destinationLink: "https://pin.it/6W2cNn7"
  },
  {
    id: 8,
    title: "What's Behind The Door?",
    contentUrl: "https://i.pinimg.com/564x/94/e7/b4/94e7b42eccf6fd4a1213e051dc55bba1.jpg",
    timeUploaded: new Date("2021-11-10"),
    user:users[6],
    tags: tags.slice(1,7),
    destinationLink: "https://pin.it/52CioPk"
  }

]
