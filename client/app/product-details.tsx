import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";

import { useEffect, useLayoutEffect, useState } from "react";
import { Image, Text, ScrollView, View, Pressable, Alert } from "react-native";
import API from "@/lib/api";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  CartedProductType,
  decrementQuantity,
  incrementQuantity,
  updateProductQuantity,
} from "@/store/product.slice";
import { AppDispatch } from "@/store";

const ProductDetails = () => {
  const { id, image } = useLocalSearchParams<{
    id: string;
    title: string;
    image: string;
  }>();

  const navigation = useNavigation();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [toggleCartBtn, setToggleCartBtn] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const quantityValue = useSelector((state: any) => state.product.addToCart);

  const findProduct = quantityValue.find(
    (product: any) => String(product.id) === String(id)
  );

  const addToCartBtn = async (
    id: number | string,
    image: string,
    title: string,
    minimumOrderQuantity: number,
    price: number,
    brand: string,
    category: string
  ) => {
    setToggleCartBtn(true);
    if (quantity <= 0) setQuantity(minimumOrderQuantity);

    const updatedPrice = Math.ceil(price) * 1500;

    dispatch(
      addToCart({
        id,
        quantity: minimumOrderQuantity,
        image: image,
        title,
        price: updatedPrice,
        brand,
        category,
        minimumOrderQuantity,
      })
    );
  };

  const decrementProductQuantity = (
    id: number,
    minimumOrderQuantity: number
  ) => {
    if (findProduct?.product < minimumOrderQuantity) {
      Alert.alert("Title", `Minimum order quantity is ${minimumOrderQuantity}`);
      return;
    }
    dispatch(decrementQuantity({ id, minimumOrderQuantity }));
    setQuantity((prev: number) => {
      if (prev - 1 < minimumOrderQuantity) return minimumOrderQuantity;
      return prev - 1;
    });
  };
  const incrementProductQuantity = (id: number) => {
    dispatch(incrementQuantity({ id }));
    setQuantity((prev) => prev + 1);
  };

  const navigateToCheckout = () => router.push("/checkout");

  const [productDetails, setProductDetails] = useState<any | null>(null);

  const get_product_details = async () => {
    const { data } = await API.get(`/products/${id}`);
    setProductDetails(data.product);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Details",
    });

    get_product_details();
  }, [navigation, id, image]);

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 96 }}
      >
        <View className=" mt-5 px-3 overflow-auto ">
          <Image
            source={{ uri: image }}
            className="w-full h-80 rounded-lg"
            resizeMode="cover"
          />

          <View className="pt-2">
            <View className="flex-row justify-between items-center  mt-5">
              <View>
                <Text className="text-xl font-semibold">
                  {productDetails?.title}
                </Text>
                <Text className="text-gray-800/70 text-sm">
                  {productDetails?.brand} • {productDetails?.category}
                </Text>
              </View>
              <View>
                <Text className="text-sm font-semibold">
                  ₦{(Math.ceil(productDetails?.price) * 1500).toLocaleString()}
                </Text>
                <Text
                  className={`font-medium text-sm text-right ${
                    productDetails?.stock > 0
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {productDetails?.availabilityStatus}
                </Text>
              </View>
            </View>

            <View className="mt-7 gap-2">
              <View className="flex-row items-center gap-2 justify-between">
                <Text className="text-xl font-semibold">
                  Product Description
                </Text>
                <View className="flex-row items-center gap-1">
                  <FontAwesome name="star" size={12} color="#FFC107" />
                  <Text className="text-sm">
                    {productDetails?.rating}{" "}
                    <Text>({productDetails?.reviews.length} reviews)</Text>
                  </Text>
                </View>
              </View>
              <Text className="text-sm text-gray-600">
                {productDetails?.description}. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Similique itaque veniam voluptates
                molestiae, eligendi in obcaecati quo, quidem eius dolor possimus
                eos assumenda eum modi minima, vel distinctio ipsam dolorum
                nobis! Asperiores commodi assumenda sint quibusdam, deserunt
                fugiat sapiente corrupti.
              </Text>
            </View>

            <View className="px-4 mt-4 flex-row flex-wrap gap-2">
              {productDetails?.tags.map((tag: any, index: number) => (
                <View
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full"
                >
                  <Text className="text-sm text-gray-700">{tag}</Text>
                </View>
              ))}
            </View>

            <View className=" mt-6 gap-2">
              <Text className="text-lg font-semibold mb-4">
                Shipping Information
              </Text>
              <InfoRow
                label="Warranty"
                value={productDetails?.warrantyInformation}
              />
              <InfoRow
                label="Shipping"
                value={productDetails?.shippingInformation}
              />
              <InfoRow label="Returns" value={productDetails?.returnPolicy} />
              <InfoRow
                label="Minimum Order"
                value={productDetails?.minimumOrderQuantity.toString()}
              />
            </View>
          </View>

          <View className="px-1 mt-10">
            <Text className="text-lg font-semibold mb-4">Reviews</Text>

            {productDetails?.reviews.map((review: any, index: any) => (
              <View key={index} className="border-b border-gray-200 pb-4 mb-4">
                <View className="flex-row justify-between">
                  <Text className="font-medium">{review.reviewerName}</Text>
                  <Text className="text-yellow-500">⭐ {review.rating}</Text>
                </View>

                <Text className="text-gray-800/80  mt-1">{review.comment}</Text>

                <Text className="text-xs text-gray-400 mt-2">
                  {review.date}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-200 px-4 flex-row items-center justify-between">
        <View className="gap-1">
          <Text className="text-xs text-gray-500">Total Price</Text>
          <Text className="text-sm font-bold">
            ₦{(Math.ceil(productDetails?.price) * 1500).toLocaleString()}
          </Text>
        </View>
        {findProduct?.quantity && (
          <View className="flex-row items-end gap-5">
            <Pressable
              className="bg-gray-100 rounded-md"
              onPress={() =>
                decrementProductQuantity(
                  productDetails?.id,
                  productDetails?.minimumOrderQuantity
                )
              }
            >
              <Entypo name="minus" size={20} color="black" />
            </Pressable>
            <Text className="font-semibold text-lg">
              {findProduct?.quantity}
            </Text>

            <Pressable
              className="bg-gray-100 rounded-md"
              onPress={() => incrementProductQuantity(productDetails?.id)}
            >
              <Entypo name="plus" size={20} color="black" />
            </Pressable>
          </View>
        )}

        {findProduct?.quantity || toggleCartBtn ? (
          <Pressable
            className="bg-black px-4 py-3 rounded-xl"
            onPress={navigateToCheckout}
          >
            <Text className="text-white font-semibold">
              Proceed To Checkout
            </Text>
          </Pressable>
        ) : (
          <Pressable
            className="bg-black px-6 py-3 rounded-xl"
            onPress={() =>
              addToCartBtn(
                productDetails?.id,
                image,
                productDetails?.title,
                productDetails?.minimumOrderQuantity,
                productDetails?.price,
                productDetails?.brand,
                productDetails?.category
              )
            }
          >
            <Text className="text-white font-semibold">Add to Cart</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between">
      <Text className="text-gray-500">{label}</Text>
      <Text className="font-medium text-sm">{value}</Text>
    </View>
  );
}
export default ProductDetails;
