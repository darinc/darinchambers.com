export interface PostedLink {
  platform: string;
  url: string;
}

export interface Post {
  id: string;
  title: string;
  date: string;
  content: string;
  tags: string[];
  posted?: PostedLink[];
}
