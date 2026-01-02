import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";
import { storage } from "./asyncstorage";
import { useRouter } from "expo-router";
import API from "./api";
import * as LocalAuthentication from "expo-local-authentication";
import { AppState } from "react-native";

// import Post from '@/lib/todos.json'

type AuthContextType = {
  //   email: string;
  //   password?: string;
  isLoadingUser: boolean;
  user: Models.User<Models.Preferences> | null;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  // get_token: () => Promise<void>;
  token: string | undefined;
  // setToken: React.Dispatch<React.SetStateAction<string>>
  client_details: ClientType | null;
  products: any[];
  sliding_products: any[];
};

type ClientType = {
  _id: string;
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  age: number;
  month: string;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [token, setToken] = useState<string | undefined>("");
  const router = useRouter();
  const [client_details, setClient_details] = useState<ClientType | null>(null);
  const [products, setProducts] = useState([]);
  const [sliding_products, setSliding_products] = useState([]);

  const [locked, setLocked] = useState(true);
  useEffect(() => {
    getUser();

    // get_user();

    get_user();
    const get_product = async (): Promise<void> => {
      const { data } = await API.get("/products");
      const products_data = data.data.products;
      const sliding_products_data = data.sliding_products.products;
      setProducts(products_data);
      setSliding_products(sliding_products_data);
    };

    get_product();
  }, []);

  useEffect(() => {
    checkStoredToken();
    AppState.addEventListener("change", handleAppState);
  }, []);

  const checkStoredToken = async () => {
    const token = await storage.get("token");
    if (token) {
      router.replace("/login");
      await unlockWithBiometrics();
    }
  };

  const unlockWithBiometrics = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Unlock App",
    });

    if (result.success) {
      router.replace("/");
      setLocked(false);
    }
  };

  const handleAppState = (state: string) => {
    if (state === "background") {
      setLocked(true);
    }
    if (state === "active" && locked) {
      unlockWithBiometrics();
    }
  };
  const get_user = async (): Promise<void> => {
    const user_token = (await storage.get("token")) || undefined;
    if (!user_token) router.replace("/login");
    if (user_token) {
      const { data } = await API.get("/user");
      if (data?.success) setClient_details(data?.user);
    }
  };

  const getUser = async () => {
    try {
      const sessionUser = await account.get();
      setUser(sessionUser);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoadingUser(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await account.create(ID.unique(), email, password);
      await signIn(email, password);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }

      return "An unknown error occurred during sign up.";
    }
  };
  const signIn = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const session = await account.get();
      setUser(session);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }

      return "An unknown error occurred during sign in.";
    }
  };

  const signOut = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        isLoadingUser,
        token,
        client_details,
        products,
        sliding_products,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
