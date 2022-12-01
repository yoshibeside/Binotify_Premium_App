import {
  LoginBodyRes,
  ManySongBodyRes,
  ManySubscriptionBodyRes,
  RegisBodyRes,
  Res,
  SingleSongBodyRes,
  SingleSubscriptionBodyRes,
} from "../types/api";
import { Song, User } from "../types/models";

import axios from "axios";

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
    .then((response) => response.data)
    .catch((err) => err.response.data);
  return res;
};

export const login = async (
  username: string,
  password: string
): Promise<Res<LoginBodyRes>> => {
  const res: Res<LoginBodyRes> = await api
    .post("/login", { username, password })
    .then((response) => response.data)
    .catch((err) => err.response.data);
  return res;
};

export const getSelfData = async (token: string | undefined): Promise<User> => {
  const res: User = await api
    .get("/self", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
  return res;
};

export const getSongs = async (
  token: string | undefined
): Promise<Res<ManySongBodyRes>> => {
  const res: Res<ManySongBodyRes> = await api
    .get("/premium/song/read", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
  return res;
};

export const createSong = async (
  judul: string,
  audio: File,
  token: string | undefined
): Promise<Res<Song>> => {
  const formData = new FormData();
  formData.append("judul", judul);
  formData.append("audio", audio);

  const res: Res<Song> = await api
    .post("/premium/song/create", formData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
  return res;
};

type UpdateSongDiff = {
  judul?: string;
  audio?: File;
};

export const updateSong = async (
  idSong: number,
  diff: UpdateSongDiff,
  token: string | undefined
): Promise<Res<SingleSongBodyRes>> => {
  const formData = new FormData();
  if (diff.judul) {
    formData.append("judul", diff.judul);
  }
  if (diff.audio) {
    formData.append("audio", diff.audio);
  }
  const res: Res<SingleSongBodyRes> = await api
    .patch(`/premium/song/update/${idSong}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
  return res;
};

export const deleteSong = async (
  idSong: number,
  token: string | undefined
): Promise<Res<SingleSongBodyRes>> => {
  const res: Res<SingleSongBodyRes> = await api
    .delete(`/premium/song/delete/${idSong}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
  return res;
};

export const getSubscriptions = async (
  token: string | undefined
): Promise<Res<ManySubscriptionBodyRes>> => {
  const res: Res<ManySubscriptionBodyRes> = await api
    .get("/admin/subscription", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
  return res;
};

export const acceptSubscription = async (
  creator_id: number,
  subscriber_id: number,
  token: string | undefined
): Promise<Res<SingleSubscriptionBodyRes>> => {
  const res: Res<SingleSubscriptionBodyRes> = await api
    .put(
      `/admin/subscription/${creator_id}/${subscriber_id}/accept`,
      undefined,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data)
    .catch((err) => err.response.data);
  return res;
};

export const rejectSubscription = async (
  creator_id: number,
  subscriber_id: number,
  token: string | undefined
): Promise<Res<SingleSubscriptionBodyRes>> => {
  const res: Res<SingleSubscriptionBodyRes> = await api
    .put(
      `/admin/subscription/${creator_id}/${subscriber_id}/reject`,
      undefined,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data)
    .catch((err) => err.response.data);
  return res;
};
