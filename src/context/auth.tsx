import { useToast } from "@chakra-ui/react";
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
  const toast = useToast();

  const logoutHandler = async () => {
    setUser(undefined);
    setToken(undefined);
    localStorage.removeItem("token");
  };

  const loginHandler = async (
    username: string,
    password: string
  ): Promise<void> => {
    const res = await login(username, password);
    if (!res.isError && res.data) {
      const { data } = res;
      const { token, user } = data;
      setUser(user);
      setToken(token);
      localStorage.setItem("token", token);
    } else {
      toast({
        id: "login-error",
        title: "Login gagal",
        description: res.message,
        status: "error",
      });
    }
  };

  // Manage Token and users
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
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
      getSelfData(token).then((res) => {
        if (!res.isError && res.data) {
          setUser(res.data);
        } else {
          localStorage.removeItem("token");
          setToken(undefined);
        }
      });
    }
  }, []);

  // Session guard
  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        if (!location.pathname.startsWith("/admin")) {
          navigate("/admin");
        }
      } else {
        if (!location.pathname.startsWith("/user")) {
          navigate("/user");
        }
      }
    } else {
      if (
        location.pathname.startsWith("/user") ||
        location.pathname.startsWith("/admin")
      ) {
        navigate("/login");
      }
    }
  }, [location.pathname, user]);

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
