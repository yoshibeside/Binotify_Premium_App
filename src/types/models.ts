export type User = {
  id: number;
  username: string;
  name: string;
  isAdmin: boolean;
};

export type Song = {
  songId: number;
  judul: string;
  penyanyiId: number;
  audioPath: string;
};

export type Subscription = {
  creator_id: number;
  name: string;
  subscriber_id: number;
  status: string;
};
