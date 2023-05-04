import { SafeUrl } from "@angular/platform-browser";
import { Category } from "./Category";
import { Tag } from "./Tag";
import { User } from "./User";

export interface Pin{
  id?: number,
  title: string,
  description?: string,
  contentUrl ?: SafeUrl,
  content : File,
  timeUploaded: Date,
  user: User,
  tags: Tag[],
  destinationLink: string
}
