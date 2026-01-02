import { storage } from "@/lib/asyncstorage";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import {
  Button,
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
   ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import Carousel from "react-native-reanimated-carousel";
import { carouselData } from "@/lib/carousel";
import Categories from "@/components/categories";
import Products from "@/components/product";

const width = Dimensions.get("window").width;

// import FontAwesome from '@expo/vector-icons/FontAwesome';
// <FontAwesome name="heart-o" size={24} color="black" />
// import Feather from '@expo/vector-icons/Feather';
{
  /* <Feather name="shopping-cart" size={24} color="black" /> */
}
// import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
// <SimpleLineIcons name="options-vertical" size={24} color="black" />
// import Entypo from '@expo/vector-icons/Entypo';
// <Entypo name="squared-plus" size={24} color="black" />
// import Entypo from '@expo/vector-icons/Entypo';
// <Entypo name="plus" size={24} color="black" />
// <Entypo name="minus" size={24} color="black" />
// <Entypo name="squared-minus" size={24} color="black" />
{
  /* <FontAwesome name="user-circle-o" size={24} color="black" /> */
}
const Index = () => {
  const { client_details } = useAuth();
  const router = useRouter();
  const logout = async (): Promise<void> => {
    await storage.remove("token");
    router.replace("/login");
  };
  return (
    <SafeAreaView className="flex gap-3 px-5 mt-30 pt-2 text-4xl h-scree bg-background overflow-auto">
      {/* <Text className="text-text-secondary text-5xl font-bold">{client_details?.name}</Text> */}
      <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex-row justify-between mb-3 ">
        <View className="w-auto">
          <Text className="text-text-secondary text-xl">Welcome back</Text>
          <Text className="text-brand-dark font-semibold text-2xl tracking-wider">
            {client_details?.firstname}
          </Text>
        </View>

        <View className="flex-row gap-5">
          <View className="bg-text-secondary/10 w-12 h-12  flex items-center justify-center rounded-full p-2">
            <Feather name="search" size={18} color="#8E8E93" />
          </View>
          <View className="bg-text-secondary/10 w-12 h-12  flex items-center justify-center rounded-full p-2">
            <Ionicons name="notifications-outline" size={18} color="#8E8E93" />
          </View>
        </View>
      </View>

      <Carousel
        width={width - 40}
        height={250}
        data={carouselData}
        autoPlay
        pagingEnabled
        
        autoPlayInterval={3500}
        scrollAnimationDuration={4000}
        renderItem={({ item }) => (
          <ImageBackground
            source={item.image}
            resizeMode="cover"
            className="flex-1 justify-end gap-3 rounded-xl overflow-hidden"
          >
            <View className="absolute inset-0 bg-black/40 " />
            <View className="px-5 pb-5">
              <View className="max-w-[250px]">
                <Text className="text-white text-2xl font-bold">
                  {item.title}
                </Text>
                <Text className="text-white text-sm mt-1">{item.subtitle}</Text>
                {/* <Text className="text-white text-sm mt-3">{item.about}</Text> */}

                <TouchableOpacity className="mt-3 bg-white px-4 py-2 rounded-md self-start">
                  <Text className={`  font-bold`}>Shop Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        )}
      />
      {/* <Button title="Log Out" onPress={() => logout()}></Button> */}

      <Categories/>
      <Products/>      
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
