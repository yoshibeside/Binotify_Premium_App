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
    creatorId: number;
    creatorName: string;
    subscriberId: number;
    status: string;
}