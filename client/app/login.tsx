import { Button, Text, TextInput, View } from "react-native";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { storage } from "@/lib/asyncstorage";
import API from "@/lib/api";
import { useRouter } from "expo-router";


type ResponseType =
  | {
      success: boolean;
      message: string;
      token?: string;
    }
  | undefined;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, SetResponse] = useState<ResponseType | null>(null);

  const router = useRouter();

  const handle_login = async (): Promise<void> => {
    try {
      const { data } = await API.post("/login", {
        email,
        password,
      });
      await storage.set("token", data?.token || undefined);
      // const tt = await storage.get("token");

      SetResponse(data);
      setTimeout(() => {
        router.replace("/");
      }, 2000);
    } catch (err: any) {
      const error = err as AxiosError<{ success: boolean; message: string }>;
      SetResponse(error?.response?.data);
    } finally {
      setTimeout(() => {
        SetResponse(null);
      }, 2500);
    }
  };

  return (
    <View className="justify-center flex-1 gap-3 px-3">
      <View>
        <Text className="text-4xl text-blue-800 text-center mb-5 font-semibold">
          Crutin Store
        </Text>
      </View>
      <TextInput
        className="rounded-lg bg-gray-200 p-3 text-black text-lg"
        placeholder="Enter Your Email"
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        className="rounded-lg bg-gray-200 p-3 text-lg"
        placeholder="Enter Your Password"
        onChangeText={setPassword}
        secureTextEntry
        keyboardType="visible-password"
      />
      <Text
        className={`${response?.success ? "text-green-600" : "text-red-600"} text-center text-lg`}
      >
        {" "}
        {response?.message}{" "}
      </Text>
      <Button title="Submit" onPress={handle_login}></Button>
    </View>
  );
};

export default Login;
