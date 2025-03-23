export interface Post {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
  likes: number;
  comments?: Comment[];
}