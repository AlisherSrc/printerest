import { category } from "./Category";
import { Tag } from "./Tag";
import { user } from "./User";

export interface Pin{
  id: number,
  title: string,
  description: string,
  contentUrl : string,
  category: category,
  timeUploaded: Date,
  user: user,
  tags: Tag[],
  destinationLink: string
}
