import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSelfData, login } from "../lib/api";
import { User } from "../types/models";

type AuthContext = {
  user?: User;
  token?: string;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const Auth = createContext<AuthContext>({
  user: undefined,
  token: undefined,
  logout: async () => {},
  login: async (username: string, password: string) => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const location = useLocation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    setUser(undefined);
    setToken(undefined);
    localStorage.removeItem("token");
  };

  const loginHandler = async (
    username: string,
    password: string
  ): Promise<void> => {
    const { data } = await login(username, password);
    if (data) {
      const { token, user } = data;
      console.log({ data });
      setUser(user);
      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  // Manage Token and users
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      // if (!user) {
      //   getSelfData(token).then((user) => {
      //     setUser(user);
      //   });
      // }
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      const newToken = localStorage.getItem("token");
      if (newToken) {
        setToken(newToken);
      }
    }

    if (!user) {
      // getSelfData(token).then((user) => {
      //   setUser(user);
      // });
      const newUser = localStorage.getItem("user");
      if (newUser) {
        setUser(JSON.parse(newUser));
      }
    }
  }, []);

  // Session guard
  // useEffect(() => {
  //   if (user) {
  //     if (user.isAdmin) {
  //       if (location.pathname.startsWith("/user")) {
  //         navigate("/admin");
  //       }
  //     } else {
  //       if (location.pathname.startsWith("/admin")) {
  //         navigate("/user");
  //       }
  //     }
  //   } else {
  //     if (
  //       location.pathname.startsWith("/user") ||
  //       location.pathname.startsWith("/admin")
  //     ) {
  //       navigate("/login");
  //     }
  //   }
  // }, [location.pathname]);

  return (
    <Auth.Provider
      value={{ user, token, logout: logoutHandler, login: loginHandler }}
    >
      {children}
    </Auth.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(Auth);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
