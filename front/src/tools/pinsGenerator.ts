import { users } from "src/app/data/users";
import { tags } from "src/app/data/tags";

const pins = [];

for (let i = 1; i <= 12; i++) {
  const pin = {
    id: i,
    title: `Pin ${i}`,
    description: `Description for Pin ${i}`,
    contentUrl: `https://i.pinimg.com/564x/${Math.random().toString(36).substring(7)}.jpg`,
    timeUploaded: new Date(),
    user: users[Math.floor(Math.random() * users.length)],
    tags: [tags[Math.floor(Math.random() * tags.length)]],
    destinationLink: `https://pin.it/${Math.random().toString(36).substring(7)}`,
  };

  pins.push(pin);
}

console.log(pins)
