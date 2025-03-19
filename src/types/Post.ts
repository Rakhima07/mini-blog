export interface Comment {
  id: string;
  name: string;
  text: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
}
