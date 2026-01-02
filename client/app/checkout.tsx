import { Entypo } from "@expo/vector-icons";
import Svg, { Line } from "react-native-svg";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, incrementQuantity } from "@/store/product.slice";
import { useRouter } from "expo-router";

const Checkout = () => {
  const Products = useSelector((state: RootState) => state.product.addToCart);
  const total = useSelector((state: RootState) => state.product.total);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const incrementProductQuantity = (id: number) => {
    dispatch(incrementQuantity({ id }));
  };

  const randomNumber = Math.random() * 4 + Math.ceil(Math.random());

  const decrementProductQuantity = (
    id: number,
    minimumOrderQuantity: number
  ) => {
    dispatch(decrementQuantity({ id, minimumOrderQuantity }));
  };

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
  return (
    <View className="bg-background flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 96 }}
        className="mb-80"
      >
        {Products.length === 0 ? (
          <Text className="text-center text-lg mt-10"> No product yet </Text>
        ) : (
          Products.map((product: any, i: number) => (
            <View className="px-3 " key={i}>
              <View className="mt-5 px-3 py-3 flex-row justify-between items-end rounded-lg shadow-md bg-white">
                <Pressable
                  className="flex-row justify-start items-center gap-3 max-w-[60%]"
                  onPress={() =>
                    navigateToProduct(
                      product.id,
                      product.title,
                      product.thumbnail
                    )
                  }
                >
                  <View className="w-32 rounded-lg">
                    <Image
                      source={{
                        uri: product.image,
                      }}
                      className="w-full h-24 rounded-lg"
                      resizeMode="cover"
                    />
                  </View>

                  <View className="gap-2">
                    <Text className="text-lg font-semibold">
                      {product.title}
                    </Text>
                    <Text className="text-md ">{product.category}</Text>
                    <Text className="text-lg font-semibold">
                      ₦{product.price.toLocaleString()}
                    </Text>
                  </View>
                </Pressable>

                <View className="flex-row items-center gap-5 place-self-end">
                  <Pressable
                    className="bg-gray-200  rounded-md"
                    onPress={() =>
                      decrementProductQuantity(
                        product?.id,
                        product?.minimumOrderQuantity
                      )
                    }
                  >
                    <Entypo name="minus" size={20} color="black" />
                  </Pressable>

                  <Text className="font-semibold text-lg">
                    {product.quantity}
                  </Text>

                  <Pressable
                    className=""
                    onPress={() => incrementProductQuantity(product?.id)}
                  >
                    <Entypo name="squared-plus" size={20} color="black" />
                  </Pressable>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 h-96 bg-brand-dark border-t border-gray-200 px-5 py-5 rounded-lg">
        <View className="gap-5 mt-3">
          <View className="gap-1 flex-row justify-between mb-3 items-center ">
            <Text className="text-lg text-gray-200">Subtotals for product</Text>
            <Text className="text-xl text-gray-200 font-semibold">
              ₦{total.totalPrice.toLocaleString() || 0}
            </Text>
          </View>
          <View className="gap-1 flex-row justify-between mb-3 items-center ">
            <Text className="text-lg text-gray-200">Delivery subtotal </Text>
            <Text className="text-xl text-gray-200 font-semibold">
              ₦{total.totalDelivery?.toLocaleString() || 0}
            </Text>
          </View>
          <View className="gap-1 flex-row justify-between mb-3 items-center ">
            <Text className="text-lg text-gray-200">Discount vouchers</Text>
            <Text className="text-xl text-gray-200 font-semibold">
              {Math.ceil(14 * randomNumber)}%
            </Text>
          </View>

          <Svg height="2" width="100%">
            <Line
              x1="0"
              y1="1"
              x2="100%"
              y2="1"
              stroke="#D1D5DB"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </Svg>

          <View className="gap-1 flex-row justify-between mb-3 items-center ">
            <Text className="text-lg text-gray-200">Total</Text>
            <Text className="text-xl text-gray-200 font-semibold">
              ₦{total.overallTotal.toLocaleString() || 0}{" "}
            </Text>
          </View>

          <Pressable className="bg-white px-3 py-3 rounded-xl">
            <Text className="text-brand-dark text-center text-xl font-semibold">
              Checkout
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Checkout;
