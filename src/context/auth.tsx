import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { User } from "../types/models";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { login, register } from '../lib/api';
import { Res, LoginBodyRes, RegisBodyRes } from "../types/api";
import { localStorageManager } from "@chakra-ui/react";

type AuthContext = {
    user?: User;
    token?: string;
    logout: () => void;
}

export const Auth = createContext<AuthContext>({
    user: undefined,
    token: undefined,
    logout: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>();
    const [token, setToken] = useState<string>();

    const registHandler = async (
        username: string,
        name: string,
        email: string,
        password: string,
    ): Promise<RegisBodyRes | null> => {
        const res = await register(username, name, email, password);
        if (res !== undefined) {
            return res;
        }
        else {
            return null;
        }
    }

    const logoutHandler = () => {
        setUser(undefined);
        setToken(undefined);
        localStorage.removeItem("token");
        //navigate("/login");
    }


    const loginHandler = async (
        username: string,
        password: string
    ): Promise<Res<LoginBodyRes> | null> => {
        const res = await login(username, password);
        if (res.isError || res.data === null ) {
            return null;
        }
        else {
            return res;
        }
    }

    useEffect(() => {
        if (user) {
            // if user is Admin, navigate to admin page
            // else navigate to user page
            if (user.isAdmin) {
                //navigate("/admin");
            }
            else {
                //navigate("/user");
            }
        }
    })
    
    return <Auth.Provider value={{ user, token, logout: logoutHandler }}>{children}</Auth.Provider>
};

export const useAuth = () => {
    const context = useContext(Auth);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};