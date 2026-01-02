import { View, Text, ScrollView } from "react-native";
import { categories } from "@/lib/data";

const Categories = () => {
  return (
    <View className="mt-5">
      <Text className="text-xl font-semibold">Category</Text>

      {/* <ScrollView className="flex-row justify-between mt-3" horizontal> */}
      <ScrollView className=" mt-3" horizontal showsHorizontalScrollIndicator={false}  >
        <View  className="flex-row gap-3 ">
        {categories.map((category, i) => (
          <View key={i} className="gap-1">
            <View className={`  bg-gray-400/10  w-14 h-14  flex justify-center items-center  px-2 py-2 rounded-full ` }>
            {category.icon}
            </View>
            <Text className="text-center text-sm "> {category.name} </Text>
          </View>
        ))}
          </View>
      </ScrollView>
    </View>
  );
};

export default Categories;
