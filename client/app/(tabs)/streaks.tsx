// import { Text, View } from "react-native";import { useAuth } from "@/lib/auth-context";
import { useAuth } from "@/lib/auth-context";
import { movies, user } from "@/lib/data";
import { Link } from "expo-router";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native"

import {  
  SafeAreaView,
} from "react-native-safe-area-context";

export default function Index() {
  const data_images: { [key: string]: any } = {
    tom_and_jerry: require("@/assets/20240322_150812.jpg"),
    boonducks: require("@/assets/7fe18a886eb82e98c5ed552481770896.jpg"),
    despicable_me: require("@/assets/a343f399ba53d96958ab268ffd92cd78.jpg"),
    emperor_groove: require("@/assets/a1420a2026dfce0b8ed00efccacb6eb2.jpg"),
  };

  const { signOut } = useAuth();
  return (
    <SafeAreaView style={style.view_header} className="px-2 py-5 my-5 bg-black text-white overflow-auto">
      <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex-row gap-5">
        <View className="w-20 h-20 border-4 border-blue-800 bg-white rounded-full" />
        <View className="space-y-5 telflex-col gap-2">
          <Text className="text-3xl">Welcome</Text>
          <Text className="text-4xl font-bold italic tracking-wider">
            {user.name}
          </Text>
        </View>
      </View>

      <View className="pt-9 px-3 flex-col">
        <Text className="text-slate-400 text-3xl font-semibold tracking-tighter">
          Latest Movies{" "}
        </Text>
        <Text className="text-orange-500 text-2xl">_____ ___</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pt-6"
      >
        <View className="flex-row gap-5 justify-between">
          {movies.latest_movies.map((movie, index) => {
            const imageSource = data_images[movie.image_name];

            return (
              <View
                key={index}
                className="rounded-xl shadow-lg bg-white flex-col gap-2"
              >
                <Image
                  source={data_images[movie.image_name]}
                  className="h-80 w-96 rounded-xl object-cover object-center"
                  resizeMode="cover"
                />
                <View className="px-4 py-3">
                  <Text className="font-semibold text-2xl text-black">
                    Name: {movie.name}
                  </Text>
                  <Text>Release date: {movie.dateOfRelease}</Text>
                  <Text>Year: {movie.year}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View className="pt-9 px-3 flex-col">
        <Text className="text-slate-400 text-3xl font-semibold tracking-tighter">
          Top Movies{" "}
        </Text>
        <Text className="text-orange-500 text-2xl">_____ ___</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pt-6"
      >
        <View className="flex-row gap-5 justify-between">
          {movies.top_movies.map((movie, index) => {
            const imageSource = data_images[movie.image_name];

            return (
              <View
                key={index}
                className="rounded-xl shadow-lg bg-white flex-col gap-2"
              >
                <Image
                  source={data_images[movie.image_name]}
                  className="h-80 w-96 rounded-xl object-cover object-center"
                  resizeMode="cover"
                />
                <View className="px-4 py-3">
                  <Text className="font-semibold text-2xl text-black">
                    Name: {movie.name}
                  </Text>
                  <Text>Release date: {movie.dateOfRelease}</Text>
                  <Text>Year: {movie.year}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View className="pt-9 px-3 flex-col">
        <Text className="text-slate-400 text-3xl font-semibold tracking-tighter">
          Top Movies{" "}
        </Text>
        <Text className="text-orange-500 text-2xl">_____ ___</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pt-6"
      >
        <View className="flex-row gap-5 justify-between">
          {movies.top_movies.map((movie, index) => {
            const imageSource = data_images[movie.image_name];

            return (
              <View
                key={index}
                className="rounded-xl shadow-lg bg-white flex-col gap-2"
              >
                <Image
                  source={data_images[movie.image_name]}
                  className="h-80 w-96 rounded-xl object-cover object-center"
                  resizeMode="cover"
                />
                <View className="px-4 py-3">
                  <Text className="font-semibold text-2xl text-black">
                    Name: {movie.name}
                  </Text>
                  <Text>Release date: {movie.dateOfRelease}</Text>
                  <Text>Year: {movie.year}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* <Text className="text-xl font-bold text-blue-500">Fola Tedsting</Text> */}
      {/* <Button mode="text" onPress={signOut} icon="logout">
        Sign Out
      </Button> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  view_header: {
    // marginTop: 96
  },
  link: {
    marginBlock: 24,
  },

  view_profile_text: {
    marginBlock: 16,
    marginInline: 16,
    display: "flex",
    gap: 6,
  },

  profile_picture: {
    backgroundColor: "white",
    borderColor: "blue",
    borderWidth: 2,
    borderRadius: 100,
    width: 70,
    height: 70,
  },
  text_profile: {
    // color: "black",
    fontWeight: "bold",
  },
});


// export default function StreaksLayout() {
//   return (
//     <View>
//       <Text>Streaks Screen Yo</Text>
//     </View>
//   );
// }
