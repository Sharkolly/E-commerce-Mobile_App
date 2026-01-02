import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type User = {
  uuid?: string;
  name: string;
  age: number;
  date_joined: string;
  favorite_movies: {
    id: number;
    name: string;
    year: number;
    release_date: string;
    rating: number;
    awards_won: number;
    genre: string;
    duration: string;
    rated: number;
  }[];
  profile: string;
};

export const user: User = {
  name: "Adesanya Mofeoluwa",
  age: 25,
  date_joined: "02-05-2021",
  favorite_movies: [
    {
      id: 1,
      name: "The Amateur",
      year: 2025,
      release_date: "July 2025",
      rating: 7.3,
      awards_won: 4,
      genre: "Action",
      duration: "2:06:31",
      rated: 16,
    },
    {
      id: 2,
      name: "Section 8",
      year: 2025,
      release_date: "February 2025",
      rating: 8.1,
      awards_won: 3,
      genre: "Action, Crime",
      duration: "1:56:23",
      rated: 13,
    },
    {
      id: 3,
      name: "Dune Part 2",
      year: 2024,
      release_date: "May 2024",
      rating: 7.7,
      awards_won: 6,
      genre: "Action, Adventure, Sci-fi",
      duration: "2:18:47",
      rated: 16,
    },
  ],
  profile: "",
};

export const movies = {
  latest_movies: [
    {
      name: "Tom and Jerry",
      color: "",
      year: "2025",
      dateOfRelease: "Feb 2025",
      image_name: "tom_and_jerry",
      ratings: 8.2,
    },
    {
      name: "The Boonducks",
      color: "",
      year: "2024",
      dateOfRelease: "Nov 2024",
      image_name: "boonducks",
      ratings: 7.1,
    },
    {
      name: "Despicable Me 3",
      color: "",
      year: "2025",
      dateOfRelease: "Sept 2025",
      image_name: "despicable_me",
      ratings: 6.4,
    },
    {
      name: "The Emperor's Groove",
      color: "",
      year: "2023",
      dateOfRelease: "July 2023",
      image_name: "emperor_groove",
      ratings: 5.9,
    },
  ],
  top_movies: [
    {
      name: "The Emperor's Groove",
      color: "",
      year: "2023",
      dateOfRelease: "July 2023",
      image_name: "emperor_groove",
      ratings: 5.9,
    },
    {
      name: "The Boonducks",
      color: "",
      year: "2024",
      dateOfRelease: "Nov 2024",
      image_name: "boonducks",
      ratings: 7.1,
    },
    {
      name: "Tom and Jerry",
      color: "",
      year: "2025",
      dateOfRelease: "Feb 2025",
      image_name: "tom_and_jerry",
      ratings: 8.2,
    },
    {
      name: "Despicable Me 3",
      color: "",
      year: "2025",
      dateOfRelease: "Sept 2025",
      image_name: "despicable_me",
      ratings: 6.4,
    },
  ],
};

export const categories = [
  {
    id: "cat_001",
    name: "Electronics",
    icon: <MaterialCommunityIcons name="devices" size={22} color="black" />,
  },
  {
    id: "cat_002",
    name: "Wearables",
    icon: <MaterialCommunityIcons name="watch-variant" size={22} color="black" />,
  },
  {
    id: "cat_003",
    name: "Accessories",
    icon: <MaterialCommunityIcons name="headphones" size={22} color="black" />,
  },
  {
    id: "cat_004",
    name: "Footwear",
    icon: <MaterialCommunityIcons name="shoe-sneaker" size={22} color="black" />,
  },
  {
    id: "cat_005",
    name: "Fashion",
    icon: <MaterialCommunityIcons name="tshirt-crew" size={22} color="black" />,
  },
  {
    id: "cat_006",
    name: "Furniture",
    icon: <MaterialCommunityIcons name="chair-rolling" size={22} color="black" />,
  },
  {
    id: "cat_007",
    name: "Decoration",
    icon: <MaterialCommunityIcons name="lamp" size={22} color="black" />,
  },
  {
    id: "cat_008",
    name: "Automotive",
    icon: <MaterialCommunityIcons name="car-outline" size={22} color="black" />,
  },
  {
    id: "cat_009",
    name: "Food",
    icon: <MaterialCommunityIcons name="food" size={22} color="black" />,
  },
  {
    id: "cat_010",
    name: "Groceries",
    icon: <MaterialCommunityIcons name="cart-outline" size={22} color="black" />,
  },
  {
    id: "cat_011",
    name: "Beauty",
    icon: <MaterialCommunityIcons name="lipstick" size={22} color="black" />,
  },
  {
    id: "cat_012",
    name: "Health",
    icon: <MaterialCommunityIcons name="heart-pulse" size={22} color="black" />,
  },
  {
    id: "cat_013",
    name: "Sports",
    icon: <MaterialCommunityIcons name="basketball" size={22} color="black" />,
  },
  {
    id: "cat_014",
    name: "Gaming",
    icon: <MaterialCommunityIcons name="gamepad-variant" size={22} color="black" />,
  },
  {
    id: "cat_015",
    name: "Books",
    icon: <MaterialCommunityIcons name="book-open-page-variant" size={22} color="black" />,
  },
];
