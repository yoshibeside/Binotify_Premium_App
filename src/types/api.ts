import { Song, Subscription, User } from "./models";

export type RegisBodyRequest = {
  username: string;
  name: string;
  email: string;
  password: string;
};

export type LoginBodyRequest = {
  username: string;
  password: string;
};

export type SongBodyRequest = {
  judul: string;
  audiopath: string;
};

export type RegisBodyRes = {
  isError: boolean;
  message: string;
  data: string; // username of the user
};

export type LoginBodyRes = {
  user: User;
  token: string;
};

export type ManySongBodyRes = {
  songs: Song[];
};

export type SingleSongBodyRes = {
  song: Song;
};

export type ManySubscriptionBodyRes = Subscription[];

export type SingleSubscriptionBodyRes = {
  subscription: Subscription;
};

export type Res<T> = {
  isError: boolean;
  message: string;
  data: T | null;
};
