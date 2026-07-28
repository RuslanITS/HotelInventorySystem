export interface Message {
  id: string;
  author: string;
  message: string;
  image: string | null;
}

export interface MessageWithoutId {
  author: string;
  message: string;
  image: string | null;
}