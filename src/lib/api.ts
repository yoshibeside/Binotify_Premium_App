import {
  ManySongBodyRes,
  SingleSongBodyRes,
  Res,
  RegisBodyRes,
  LoginBodyRes,
  SongBodyRequest,
  SingleSubscriptionBodyRes,
  ManySubscriptionBodyRes,
} from "../types/api";
import { Song, User } from "../types/models";

import axios from "axios";
import { useAuth } from "../context/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL,
});

export const register = async (
  username: string,
  name: string,
  email: string,
  password: string
): Promise<Res<RegisBodyRes>> => {
  const res: Res<RegisBodyRes> = await api
    .post("/register", { username, name, email, password })
    .then((response) => response.data);
  return res;
};

export const login = async (
  username: string,
  password: string
): Promise<Res<LoginBodyRes>> => {
  const res: Res<LoginBodyRes> = await api
    .post("/login", { username, password })
    .then((response) => response.data);
  return res;
};

export const getSelfData = async (token: string | undefined): Promise<User> => {
  const res: User = await api
    .get("/self", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return res;
};

export const getSongs = async (
  token: string | undefined
): Promise<Res<ManySongBodyRes>> => {
  const res: Res<ManySongBodyRes> = await api
    .get("/premium/read", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data);
  return res;
};

export const createSong = async (
  judul: string,
  audio: File | undefined,
  duration: number,
  token: string | undefined
): Promise<Res<Song>> => {
  const formData = new FormData();
  formData.append("judul", judul);
  if (audio) {
    formData.append("audio", audio);
    formData.append("duration", duration.toString());
  }
  const res: Res<Song> = await api
    .post("/premium/create", {
      headers: { Authorization: `Bearer ${token}` },
      data: formData,
    })
    .then((response) => response.data);
  return res;
};

export const updateSong = async (
  idSong: number,
  judul: string | null,
  audiopath: string | null,
  duration: number | null,
  token: string | undefined
): Promise<Res<SingleSongBodyRes>> => {
  const formData = new FormData();
  if (judul) {
    formData.append("judul", judul);
  }
  if (audiopath && duration) {
    formData.append("audiopath", audiopath);
    formData.append("duration", duration.toString());
  }
  const res: Res<SingleSongBodyRes> = await api
    .patch(`/premium/update/${idSong}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { judul, audiopath },
    })
    .then((response) => response.data);
  return res;
};

export const deleteSong = async (
  idSong: number,
  token: string | undefined
): Promise<Res<SingleSongBodyRes>> => {
  const res: Res<SingleSongBodyRes> = await api
    .delete(`/premium/delete/${idSong}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data);
  return res;
};

export const getSubscriptions = async (
  token: string | undefined
): Promise<Res<ManySubscriptionBodyRes>> => {
  const res: Res<ManySubscriptionBodyRes> = await api
    .get("/subscription", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return res;
};

export const acceptSubscription = async (
  creator_id: number,
  subscriber_id: number,
  token: string | undefined
): Promise<Res<SingleSubscriptionBodyRes>> => {
  const res: Res<SingleSubscriptionBodyRes> = await api
    .patch(`/premium/${creator_id}/${subscriber_id}/accept`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return res;
};
