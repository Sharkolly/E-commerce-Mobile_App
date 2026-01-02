/* eslint-disable import/no-unresolved */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useRouter } from "expo-router";

const Products = () => {
  const router = useRouter();
  const [limit, setLimit] = useState(5);
  const changeLimit = () => {
    setLimit((prev) => prev + 6);
    if (limit > 30) setLimit(30);
  };

  const Products = useSelector((state: RootState) => state.product.products);
  const Sliding_products = useSelector(
    (state: RootState) => state.product.sliding_products
  );

  const navigateToProduct = (id: number, title: string, image: string) => {
    router.push({
      pathname: "/product-details",
      params: {
        id,
        title,
        image,
      },
    });
  };

  const dispatch = useDispatch<AppDispatch>();

  return (
    <View className="mt-5">
      <Text className="text-xl font-semibold mb-3">Shorts</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex flex-row flex-wrap flex-grow flex-1  gap-x-4 gap-y-6">
          {!Products || Products.length === 0 ? (
            <Text> No product yet </Text>
          ) : (
            Products.map((product: any, i: number) => (
              <Pressable
                key={i}
                onPress={() =>
                  navigateToProduct(
                    product.id,
                    product.title,
                    product.thumbnail
                  )
                }
                className={`max-w-52 gap-1 ${i < 9 ? "hidden" : ""} `}
              >
                <Image
                  source={{ uri: product?.thumbnail }}
                  className="w-full h-52 object-contain rounded-lg border-2 border-gray-400/10"
                  resizeMode="cover"
                />
                <View className="flex-row justify-between w-full">
                  <Text className="font-semibold text-lg">
                    ₦{(Math.ceil(product.price) * 1500).toLocaleString()}
                  </Text>
                  <View className="flex-row gap-1 items-center">
                    <FontAwesome name="star" size={8} color="#FFC107" />
                    <Text className="text-[.7rem] font-semibold text-gray-500 ">
                      {product.rating}
                    </Text>
                  </View>
                </View>
                <Text className="text-[.8rem] text-gray-600  font-semibold min-w-full">
                  {product.title}
                </Text>
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>

      <Text className="text-xl font-semibold mb-3">Features</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex flex-row flex-wrap flex-grow flex-1  gap-x-4 gap-y-6">
          {!Sliding_products || Sliding_products.length === 0 ? (
            <Text> No product yet </Text>
          ) : (
            Sliding_products.map((product: any, i: number) => (
              <Pressable
                className={`max-w-52 gap-2`}
                key={i}
                onPress={() =>
                  navigateToProduct(
                    product.id,
                    product.title,
                    product.thumbnail
                  )
                }
              >
                <Image
                  source={{ uri: product?.thumbnail }}
                  className="w-full h-52 object-contain rounded-lg border-2 border-gray-400/10"
                  resizeMode="cover"
                />
                <View className="flex-row justify-between w-full">
                  <Text className="font-semibold text-lg">
                    ₦{(Math.ceil(product.price) * 1500).toLocaleString()}
                  </Text>
                  <View className="flex-row gap-1 items-center">
                    <FontAwesome name="star" size={8} color="#FFC107" />
                    <Text className="text-[.7rem] font-semibold text-gray-500 ">
                      {product.rating}
                    </Text>
                  </View>
                </View>
                <Text className="text-[.8rem] text-gray-600  font-semibold min-w-full">
                  {product.title}
                </Text>
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>

      <Text className="text-xl font-semibold my-5">Recomendation</Text>
      <View className="flex flex-row flex-wrap flex-grow flex-1  gap-x-4 gap-y-6">
        {!Products || Products.length === 0 ? (
          <Text> No product yet </Text>
        ) : (
          Products.map((product: any, i: number) => (
            <Pressable
              key={i}
              onPress={() =>
                navigateToProduct(product.id, product.title, product.thumbnail)
              }
              className={`max-w-44 gap-1 ${i > limit ? "hidden" : ""} `}
            >
              <Image
                source={{ uri: product?.thumbnail }}
                className="w-full h-52 object-contain rounded-lg border-2 border-gray-400/10"
                resizeMode="cover"
              />
              <View className="flex-row justify-between w-full">
                <Text className="font-semibold text-lg">
                  ₦{(Math.ceil(product.price) * 1500).toLocaleString()}
                </Text>
                <View className="flex-row gap-1 items-center">
                  <FontAwesome name="star" size={8} color="#FFC107" />
                  <Text className="text-[.7rem] font-semibold text-gray-500 ">
                    {product.rating}
                  </Text>
                </View>
              </View>
              <Text className="text-[.8rem] text-gray-600  font-semibold min-w-full">
                {product.title}
              </Text>
            </Pressable>
          ))
        )}
      </View>
      <TouchableOpacity
        className={` ${limit === 30 ? "hidden" : ""}  flex justify-center my-8`}
        onPress={changeLimit}
      >
        <Text className="text-center">See more ...</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Products;
