// import { Pin } from "../models/Pin";
// import { users } from "./users";
// import { tags } from "./tags";
// export const pins: Pin[] = [
//   {
//     id: 1,
//     title: 'LOTM',
//     contentUrl: "https://i.pinimg.com/564x/db/e3/0b/dbe30b327fea09b2115e22b687b214d3.jpg",
//     timeUploaded: new Date("2023-03-18"),
//     user: users[0],
//     tags: tags.slice(0,3),
//     destinationLink: "https://pin.it/7r8oNDt"
//   },
//   {
//     id: 2,
//     title: 'Felipe Kaito',
//     contentUrl: "https://i.pinimg.com/564x/24/fb/f3/24fbf3709290a0887e506997cb82f9e4.jpg",
//     timeUploaded: new Date("2023-05-23"),
//     user: users[1],
//     tags: tags.slice(0,3),
//     destinationLink: "https://pin.it/50I3sGk"
//   },
//   {
//     id: 3,
//     title: '【everywhere】🖤ManThau🖤',
//     contentUrl: "https://i.pinimg.com/564x/bb/23/a4/bb23a4709162135a82d7092d7246a271.jpg",
//     timeUploaded: new Date("2020-04-25"),
//     user:users[10],
//     tags: tags.slice(2,5),
//     destinationLink: "https://pin.it/6T4kKwC"
//   },
//   {
//     id: 4,
//     title: 'the glowing ball',
//     contentUrl: "https://i.pinimg.com/564x/11/61/df/1161df30bab4d21f06859bd4efee13d0.jpg",
//     timeUploaded: new Date("2025-04-25"),
//     user:users[7],
//     tags: tags.slice(5,5),
//     destinationLink: "https://pin.it/7CJIHr1"
//   },
//   {
//     id: 5,
//     title: 'KU on Twitter',
//     contentUrl: "https://i.pinimg.com/564x/f1/b7/8f/f1b78fd69424b0d4c411b1db3e278366.jpg",
//     timeUploaded: new Date("2200-04-25"),
//     user:users[4],
//     tags: tags.slice(7,7),
//     destinationLink: "https://pin.it/6W2cNn7"
//   },
//   {
//     id: 6,
//     title: "What's Behind The Door?",
//     contentUrl: "https://i.pinimg.com/564x/94/e7/b4/94e7b42eccf6fd4a1213e051dc55bba1.jpg",
//     timeUploaded: new Date("2021-11-10"),
//     user:users[6],
//     tags: tags.slice(1,7),
//     destinationLink: "https://pin.it/52CioPk"
//   },



//   {
//     id: 7,
//     title: 'KU on Twitter',
//     contentUrl: "https://i.pinimg.com/564x/f1/b7/8f/f1b78fd69424b0d4c411b1db3e278366.jpg",
//     timeUploaded: new Date("2200-04-25"),
//     user:users[4],
//     tags: tags.slice(7,7),
//     destinationLink: "https://pin.it/6W2cNn7"
//   },
//   {
//     id: 8,
//     title: "What's Behind The Door?",
//     contentUrl: "https://i.pinimg.com/564x/94/e7/b4/94e7b42eccf6fd4a1213e051dc55bba1.jpg",
//     timeUploaded: new Date("2021-11-10"),
//     user:users[6],
//     tags: tags.slice(1,7),
//     destinationLink: "https://pin.it/52CioPk"
//   },
//   {
//     id: 9,
//     title: 'Felipe Kaito',
//     contentUrl: "https://i.pinimg.com/564x/24/fb/f3/24fbf3709290a0887e506997cb82f9e4.jpg",
//     timeUploaded: new Date("2023-05-23"),
//     user: users[1],
//     tags: tags.slice(0,3),
//     destinationLink: "https://pin.it/50I3sGk"
//   },
//   {
//     id: 10,
//     title: '【everywhere】🖤ManThau🖤',
//     contentUrl: "https://i.pinimg.com/564x/bb/23/a4/bb23a4709162135a82d7092d7246a271.jpg",
//     timeUploaded: new Date("2020-04-25"),
//     user:users[10],
//     tags: tags.slice(2,5),
//     destinationLink: "https://pin.it/6T4kKwC"
//   },
//   {
//     id: 11,
//     title: 'the glowing ball',
//     contentUrl: "https://i.pinimg.com/564x/11/61/df/1161df30bab4d21f06859bd4efee13d0.jpg",
//     timeUploaded: new Date("2025-04-25"),
//     user:users[7],
//     tags: tags.slice(5,5),
//     destinationLink: "https://pin.it/7CJIHr1"
//   },
//   {
//     id: 12,
//     title: 'KU on Twitter',
//     contentUrl: "https://i.pinimg.com/564x/f1/b7/8f/f1b78fd69424b0d4c411b1db3e278366.jpg",
//     timeUploaded: new Date("2200-04-25"),
//     user:users[4],
//     tags: tags.slice(7,7),
//     destinationLink: "https://pin.it/6W2cNn7"
//   },
//   {
//     id: 13,
//     title: "What's Behind The Door?",
//     contentUrl: "https://i.pinimg.com/564x/94/e7/b4/94e7b42eccf6fd4a1213e051dc55bba1.jpg",
//     timeUploaded: new Date("2021-11-10"),
//     user:users[6],
//     tags: tags.slice(1,7),
//     destinationLink: "https://pin.it/52CioPk"
//   },

//   {
//     id: 14,
//     title: 'LOTM',
//     contentUrl: "https://i.pinimg.com/564x/db/e3/0b/dbe30b327fea09b2115e22b687b214d3.jpg",
//     timeUploaded: new Date("2023-03-18"),
//     user: users[0],
//     tags: tags.slice(0,3),
//     destinationLink: "https://pin.it/7r8oNDt"
//   },
//   {
//     id: 15,
//     title: 'Felipe Kaito',
//     contentUrl: "https://i.pinimg.com/564x/24/fb/f3/24fbf3709290a0887e506997cb82f9e4.jpg",
//     timeUploaded: new Date("2023-05-23"),
//     user: users[1],
//     tags: tags.slice(0,3),
//     destinationLink: "https://pin.it/50I3sGk"
//   },
//   {
//     id: 16,
//     title: '【everywhere】🖤ManThau🖤',
//     contentUrl: "https://i.pinimg.com/564x/bb/23/a4/bb23a4709162135a82d7092d7246a271.jpg",
//     timeUploaded: new Date("2020-04-25"),
//     user:users[10],
//     tags: tags.slice(2,5),
//     destinationLink: "https://pin.it/6T4kKwC"
//   },
//   {
//     id: 17,
//     title: 'the glowing ball',
//     contentUrl: "https://i.pinimg.com/564x/11/61/df/1161df30bab4d21f06859bd4efee13d0.jpg",
//     timeUploaded: new Date("2025-04-25"),
//     user:users[7],
//     tags: tags.slice(5,5),
//     destinationLink: "https://pin.it/7CJIHr1"
//   },
//   {
//     id: 18,
//     title: 'KU on Twitter',
//     contentUrl: "https://i.pinimg.com/564x/f1/b7/8f/f1b78fd69424b0d4c411b1db3e278366.jpg",
//     timeUploaded: new Date("2200-04-25"),
//     user:users[4],
//     tags: tags.slice(7,7),
//     destinationLink: "https://pin.it/6W2cNn7"
//   },
//   {
//     id: 19,
//     title: "What's Behind The Door?",
//     contentUrl: "https://i.pinimg.com/564x/94/e7/b4/94e7b42eccf6fd4a1213e051dc55bba1.jpg",
//     timeUploaded: new Date("2021-11-10"),
//     user:users[6],
//     tags: tags.slice(1,7),
//     destinationLink: "https://pin.it/52CioPk"
//   },



//   {
//     id: 20,
//     title: 'KU on Twitter',
//     contentUrl: "https://i.pinimg.com/564x/f1/b7/8f/f1b78fd69424b0d4c411b1db3e278366.jpg",
//     timeUploaded: new Date("2200-04-25"),
//     user:users[4],
//     tags: tags.slice(7,7),
//     destinationLink: "https://pin.it/6W2cNn7"
//   },

//   {
//     id: 21,
//     title: "What's Behind The Door?",
//     contentUrl: "https://i.pinimg.com/564x/94/e7/b4/94e7b42eccf6fd4a1213e051dc55bba1.jpg",
//     timeUploaded: new Date("2021-11-10"),
//     user:users[6],
//     tags: tags.slice(1,7),
//     destinationLink: "https://pin.it/52CioPk"
//   },



//   {
//     id: 22,
//     title: 'KU on Twitter',
//     contentUrl: "https://i.pinimg.com/564x/f1/b7/8f/f1b78fd69424b0d4c411b1db3e278366.jpg",
//     timeUploaded: new Date("2200-04-25"),
//     user:users[4],
//     tags: tags.slice(7,7),
//     destinationLink: "https://pin.it/6W2cNn7"
//   },
//   {
//     id: 23,
//     title: "What's Behind The Door?",
//     contentUrl: "https://i.pinimg.com/564x/94/e7/b4/94e7b42eccf6fd4a1213e051dc55bba1.jpg",
//     timeUploaded: new Date("2021-11-10"),
//     user:users[6],
//     tags: tags.slice(1,7),
//     destinationLink: "https://pin.it/52CioPk"
//   },
//   {
//     id: 24,
//     title: 'Felipe Kaito',
//     contentUrl: "https://i.pinimg.com/564x/24/fb/f3/24fbf3709290a0887e506997cb82f9e4.jpg",
//     timeUploaded: new Date("2023-05-23"),
//     user: users[1],
//     tags: tags.slice(0,3),
//     destinationLink: "https://pin.it/50I3sGk"
//   },
//   {
//     id: 25,
//     title: '【everywhere】🖤ManThau🖤',
//     contentUrl: "https://i.pinimg.com/564x/bb/23/a4/bb23a4709162135a82d7092d7246a271.jpg",
//     timeUploaded: new Date("2020-04-25"),
//     user:users[10],
//     tags: tags.slice(2,5),
//     destinationLink: "https://pin.it/6T4kKwC"
//   },
//   {
//     id: 26,
//     title: 'the glowing ball',
//     contentUrl: "https://i.pinimg.com/564x/11/61/df/1161df30bab4d21f06859bd4efee13d0.jpg",
//     timeUploaded: new Date("2025-04-25"),
//     user:users[7],
//     tags: tags.slice(5,5),
//     destinationLink: "https://pin.it/7CJIHr1"
//   },
//   {
//     id: 27,
//     title: 'KU on Twitter',
//     contentUrl: "https://i.pinimg.com/564x/f1/b7/8f/f1b78fd69424b0d4c411b1db3e278366.jpg",
//     timeUploaded: new Date("2200-04-25"),
//     user:users[4],
//     tags: tags.slice(7,7),
//     destinationLink: "https://pin.it/6W2cNn7"
//   },
//   {
//     id: 28,
//     title: "What's Behind The Door?",
//     contentUrl: "https://i.pinimg.com/564x/94/e7/b4/94e7b42eccf6fd4a1213e051dc55bba1.jpg",
//     timeUploaded: new Date("2021-11-10"),
//     user:users[6],
//     tags: tags.slice(1,7),
//     destinationLink: "https://pin.it/52CioPk"
//   },

//   {
//     id: 29,
//     title: 'LOTM',
//     contentUrl: "https://i.pinimg.com/564x/db/e3/0b/dbe30b327fea09b2115e22b687b214d3.jpg",
//     timeUploaded: new Date("2023-03-18"),
//     user: users[0],
//     tags: tags.slice(0,3),
//     destinationLink: "https://pin.it/7r8oNDt"
//   },
//   {
//     id: 30,
//     title: 'Felipe Kaito',
//     contentUrl: "https://i.pinimg.com/564x/24/fb/f3/24fbf3709290a0887e506997cb82f9e4.jpg",
//     timeUploaded: new Date("2023-05-23"),
//     user: users[1],
//     tags: tags.slice(0,3),
//     destinationLink: "https://pin.it/50I3sGk"
//   },
//   {
//     id: 31,
//     title: '【everywhere】🖤ManThau🖤',
//     contentUrl: "https://i.pinimg.com/564x/bb/23/a4/bb23a4709162135a82d7092d7246a271.jpg",
//     timeUploaded: new Date("2020-04-25"),
//     user:users[10],
//     tags: tags.slice(2,5),
//     destinationLink: "https://pin.it/6T4kKwC"
//   },
//   {
//     id: 32,
//     title: '【everywhere】🖤ManThau🖤',
//     contentUrl: "https://i.pinimg.com/564x/bb/23/a4/bb23a4709162135a82d7092d7246a271.jpg",
//     timeUploaded: new Date("2020-04-25"),
//     user:users[10],
//     tags: tags.slice(2,5),
//     destinationLink: "https://pin.it/6T4kKwC"
//   },
//   {
//     id: 33,
//     title: 'the glowing ball',
//     contentUrl: "https://i.pinimg.com/564x/11/61/df/1161df30bab4d21f06859bd4efee13d0.jpg",
//     timeUploaded: new Date("2025-04-25"),
//     user:users[7],
//     tags: tags.slice(5,5),
//     destinationLink: "https://pin.it/7CJIHr1"
//   },
//   {
//     id: 34,
//     title: 'KU on Twitter',
//     contentUrl: "https://i.pinimg.com/564x/f1/b7/8f/f1b78fd69424b0d4c411b1db3e278366.jpg",
//     timeUploaded: new Date("2200-04-25"),
//     user:users[4],
//     tags: tags.slice(7,7),
//     destinationLink: "https://pin.it/6W2cNn7"
//   },
//   {
//     id: 35,
//     title: "What's Behind The Door?",
//     contentUrl: "https://i.pinimg.com/564x/94/e7/b4/94e7b42eccf6fd4a1213e051dc55bba1.jpg",
//     timeUploaded: new Date("2021-11-10"),
//     user:users[6],
//     tags: tags.slice(1,7),
//     destinationLink: "https://pin.it/52CioPk"
//   },

//   {
//     id: 36,
//     title: 'LOTM',
//     contentUrl: "https://i.pinimg.com/564x/db/e3/0b/dbe30b327fea09b2115e22b687b214d3.jpg",
//     timeUploaded: new Date("2023-03-18"),
//     user: users[0],
//     tags: tags.slice(0,3),
//     destinationLink: "https://pin.it/7r8oNDt"
//   },
//   {
//     id: 37,
//     title: 'Felipe Kaito',
//     contentUrl: "https://i.pinimg.com/564x/24/fb/f3/24fbf3709290a0887e506997cb82f9e4.jpg",
//     timeUploaded: new Date("2023-05-23"),
//     user: users[1],
//     tags: tags.slice(0,3),
//     destinationLink: "https://pin.it/50I3sGk"
//   },
//   {
//     id: 38,
//     title: '【everywhere】🖤ManThau🖤',
//     contentUrl: "https://i.pinimg.com/564x/bb/23/a4/bb23a4709162135a82d7092d7246a271.jpg",
//     timeUploaded: new Date("2020-04-25"),
//     user:users[10],
//     tags: tags.slice(2,5),
//     destinationLink: "https://pin.it/6T4kKwC"
//   },
//   {
//     id: 39,
//     title: 'the glowing ball',
//     contentUrl: "https://i.pinimg.com/564x/11/61/df/1161df30bab4d21f06859bd4efee13d0.jpg",
//     timeUploaded: new Date("2025-04-25"),
//     user:users[7],
//     tags: tags.slice(5,5),
//     destinationLink: "https://pin.it/7CJIHr1"
//   },
//   {
//     id: 40,
//     title: 'KU on Twitter',
//     contentUrl: "https://i.pinimg.com/564x/f1/b7/8f/f1b78fd69424b0d4c411b1db3e278366.jpg",
//     timeUploaded: new Date("2200-04-25"),
//     user:users[4],
//     tags: tags.slice(7,7),
//     destinationLink: "https://pin.it/6W2cNn7"
//   },
//   {
//     id: 41,
//     title: "What's Behind The Door?",
//     contentUrl: "https://i.pinimg.com/564x/94/e7/b4/94e7b42eccf6fd4a1213e051dc55bba1.jpg",
//     timeUploaded: new Date("2021-11-10"),
//     user:users[6],
//     tags: tags.slice(1,7),
//     destinationLink: "https://pin.it/52CioPk"
//   },



//   {
//     id: 42,
//     title: 'KU on Twitter',
//     contentUrl: "https://i.pinimg.com/564x/f1/b7/8f/f1b78fd69424b0d4c411b1db3e278366.jpg",
//     timeUploaded: new Date("2200-04-25"),
//     user:users[4],
//     tags: tags.slice(7,7),
//     destinationLink: "https://pin.it/6W2cNn7"
//   },

//   {
//     id: 43,
//     title: "What's Behind The Door?",
//     contentUrl: "https://i.pinimg.com/564x/94/e7/b4/94e7b42eccf6fd4a1213e051dc55bba1.jpg",
//     timeUploaded: new Date("2021-11-10"),
//     user:users[6],
//     tags: tags.slice(1,7),
//     destinationLink: "https://pin.it/52CioPk"
//   },



//   {
//     id: 44,
//     title: 'KU on Twitter',
//     contentUrl: "https://i.pinimg.com/564x/f1/b7/8f/f1b78fd69424b0d4c411b1db3e278366.jpg",
//     timeUploaded: new Date("2200-04-25"),
//     user:users[4],
//     tags: tags.slice(7,7),
//     destinationLink: "https://pin.it/6W2cNn7"
//   },
//   {
//     id: 45,
//     title: "What's Behind The Door?",
//     contentUrl: "https://i.pinimg.com/564x/94/e7/b4/94e7b42eccf6fd4a1213e051dc55bba1.jpg",
//     timeUploaded: new Date("2021-11-10"),
//     user:users[6],
//     tags: tags.slice(1,7),
//     destinationLink: "https://pin.it/52CioPk"
//   },
//   {
//     id: 46,
//     title: 'Felipe Kaito',
//     contentUrl: "https://i.pinimg.com/564x/24/fb/f3/24fbf3709290a0887e506997cb82f9e4.jpg",
//     timeUploaded: new Date("2023-05-23"),
//     user: users[1],
//     tags: tags.slice(0,3),
//     destinationLink: "https://pin.it/50I3sGk"
//   },
//   {
//     id: 47,
//     title: '【everywhere】🖤ManThau🖤',
//     contentUrl: "https://i.pinimg.com/564x/bb/23/a4/bb23a4709162135a82d7092d7246a271.jpg",
//     timeUploaded: new Date("2020-04-25"),
//     user:users[10],
//     tags: tags.slice(2,5),
//     destinationLink: "https://pin.it/6T4kKwC"
//   },
//   {
//     id: 48,
//     title: 'LOTM',
//     contentUrl: "https://i.pinimg.com/564x/db/e3/0b/dbe30b327fea09b2115e22b687b214d3.jpg",
//     timeUploaded: new Date("2023-03-18"),
//     user: users[0],
//     tags: tags.slice(0,3),
//     destinationLink: "https://pin.it/7r8oNDt"
//   },
//   {
//     id: 49,
//     title: 'Felipe Kaito',
//     contentUrl: "https://i.pinimg.com/564x/24/fb/f3/24fbf3709290a0887e506997cb82f9e4.jpg",
//     timeUploaded: new Date("2023-05-23"),
//     user: users[1],
//     tags: tags.slice(0,3),
//     destinationLink: "https://pin.it/50I3sGk"
//   },
//   {
//     id: 50,
//     title: '【everywhere】🖤ManThau🖤',
//     contentUrl: "https://i.pinimg.com/564x/bb/23/a4/bb23a4709162135a82d7092d7246a271.jpg",
//     timeUploaded: new Date("2020-04-25"),
//     user:users[10],
//     tags: tags.slice(2,5),
//     destinationLink: "https://pin.it/6T4kKwC"
//   },
//   {
//     id: 51,
//     title: 'the glowing ball',
//     contentUrl: "https://i.pinimg.com/564x/11/61/df/1161df30bab4d21f06859bd4efee13d0.jpg",
//     timeUploaded: new Date("2025-04-25"),
//     user:users[7],
//     tags: tags.slice(5,5),
//     destinationLink: "https://pin.it/7CJIHr1"
//   },
//   {
//     id: 52,
//     title: 'KU on Twitter',
//     contentUrl: "https://i.pinimg.com/564x/f1/b7/8f/f1b78fd69424b0d4c411b1db3e278366.jpg",
//     timeUploaded: new Date("2200-04-25"),
//     user:users[4],
//     tags: tags.slice(7,7),
//     destinationLink: "https://pin.it/6W2cNn7"
//   },
//   {
//     id: 53,
//     title: "What's Behind The Door?",
//     contentUrl: "https://i.pinimg.com/564x/94/e7/b4/94e7b42eccf6fd4a1213e051dc55bba1.jpg",
//     timeUploaded: new Date("2021-11-10"),
//     user:users[6],
//     tags: tags.slice(1,7),
//     destinationLink: "https://pin.it/52CioPk"
//   },



//   {
//     id: 54,
//     title: 'KU on Twitter',
//     contentUrl: "https://i.pinimg.com/564x/f1/b7/8f/f1b78fd69424b0d4c411b1db3e278366.jpg",
//     timeUploaded: new Date("2200-04-25"),
//     user:users[4],
//     tags: tags.slice(7,7),
//     destinationLink: "https://pin.it/6W2cNn7"
//   },

//   {
//     id: 55,
//     title: "What's Behind The Door?",
//     contentUrl: "https://i.pinimg.com/564x/94/e7/b4/94e7b42eccf6fd4a1213e051dc55bba1.jpg",
//     timeUploaded: new Date("2021-11-10"),
//     user:users[6],
//     tags: tags.slice(1,7),
//     destinationLink: "https://pin.it/52CioPk"
//   },



//   {
//     id: 56,
//     title: 'KU on Twitter',
//     contentUrl: "https://i.pinimg.com/564x/f1/b7/8f/f1b78fd69424b0d4c411b1db3e278366.jpg",
//     timeUploaded: new Date("2200-04-25"),
//     user:users[4],
//     tags: tags.slice(7,7),
//     destinationLink: "https://pin.it/6W2cNn7"
//   },
//   {
//     id: 57,
//     title: "What's Behind The Door?",
//     contentUrl: "https://i.pinimg.com/564x/94/e7/b4/94e7b42eccf6fd4a1213e051dc55bba1.jpg",
//     timeUploaded: new Date("2021-11-10"),
//     user:users[6],
//     tags: tags.slice(1,7),
//     destinationLink: "https://pin.it/52CioPk"
//   },
//   {
//     id: 58,
//     title: 'Felipe Kaito',
//     contentUrl: "https://i.pinimg.com/564x/24/fb/f3/24fbf3709290a0887e506997cb82f9e4.jpg",
//     timeUploaded: new Date("2023-05-23"),
//     user: users[1],
//     tags: tags.slice(0,3),
//     destinationLink: "https://pin.it/50I3sGk"
//   },
//   {
//     id: 59,
//     title: '【everywhere】🖤ManThau🖤',
//     contentUrl: "https://i.pinimg.com/564x/bb/23/a4/bb23a4709162135a82d7092d7246a271.jpg",
//     timeUploaded: new Date("2020-04-25"),
//     user:users[10],
//     tags: tags.slice(2,5),
//     destinationLink: "https://pin.it/6T4kKwC"
//   },
//   {
//     id: 60,
//     title: 'the glowing ball',
//     contentUrl: "https://i.pinimg.com/564x/11/61/df/1161df30bab4d21f06859bd4efee13d0.jpg",
//     timeUploaded: new Date("2025-04-25"),
//     user:users[7],
//     tags: tags.slice(5,5),
//     destinationLink: "https://pin.it/7CJIHr1"
//   },
//   {
//     id: 61,
//     title: 'KU on Twitter',
//     contentUrl: "https://i.pinimg.com/564x/f1/b7/8f/f1b78fd69424b0d4c411b1db3e278366.jpg",
//     timeUploaded: new Date("2200-04-25"),
//     user:users[4],
//     tags: tags.slice(7,7),
//     destinationLink: "https://pin.it/6W2cNn7"
//   },
//   {
//     id: 62,
//     title: "What's Behind The Door?",
//     contentUrl: "https://i.pinimg.com/564x/94/e7/b4/94e7b42eccf6fd4a1213e051dc55bba1.jpg",
//     timeUploaded: new Date("2021-11-10"),
//     user:users[6],
//     tags: tags.slice(1,7),
//     destinationLink: "https://pin.it/52CioPk"
//   },

//   {
//     id: 63,
//     title: 'LOTM',
//     contentUrl: "https://i.pinimg.com/564x/db/e3/0b/dbe30b327fea09b2115e22b687b214d3.jpg",
//     timeUploaded: new Date("2023-03-18"),
//     user: users[0],
//     tags: tags.slice(0,3),
//     destinationLink: "https://pin.it/7r8oNDt"
//   },
// ]
