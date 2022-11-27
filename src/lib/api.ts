import {
  ManySongBodyRes,
  SingleSongBodyRes,
  Res,
  RegisBodyRes,
  LoginBodyRes,
  SongBodyRequest,
} from "../types/api";

import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const register = async (
  username: string,
  name: string,
  email: string,
  password: string
): Promise<RegisBodyRes> => {
  const res: RegisBodyRes = await api
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

export const getSongs = async (
  token: string | null
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
  audiopath: string,
  token: string
): Promise<Res<SongBodyRequest>> => {
  const res: Res<SongBodyRequest> = await api
    .post("/premium/create", {
      headers: { Authorization: `Bearer ${token}` },
      data: { judul, audiopath },
    })
    .then((response) => response.data);
  return res;
};

export const updateSong = async (
  idSong: number,
  judul: string | null,
  audiopath: string | null,
  token: string
): Promise<Res<SingleSongBodyRes>> => {
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
  token: string
): Promise<Res<SingleSongBodyRes>> => {
  const res: Res<SingleSongBodyRes> = await api
    .delete(`/premium/delete/${idSong}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data);
  return res;
};
