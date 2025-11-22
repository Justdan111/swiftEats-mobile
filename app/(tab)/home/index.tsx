import { View, Text } from 'react-native'
import React from 'react'

// Mock data
const restaurants = [
  {
    id: 1,
    name: "The Great Italian Pasta",
    rating: 4.5,
    time: "15-25 min",
    cuisine: "Italian, Pasta",
    image: require("@/assets/images/pasta.jpeg"),
  },
  {
    id: 2,
    name: "Sushi World",
    rating: 4.8,
    time: "20-30 min",
    cuisine: "Japanese, Sushi",
    image: require("@/assets/images/sushi.jpeg"),
  },
  {
    id: 3,
    name: "Burger Palace",
    rating: 4.3,
    time: "10-20 min",
    cuisine: "American, Burgers",
    image: require("@/assets/images/burger.jpeg"),
  },
  {
    id: 4,
    name: "Green Leaf Salads",
    rating: 4.9,
    time: "15-20 min",
    cuisine: "Healthy, Salads",
    image: require("@/assets/images/salad.jpeg"),
  },
];

export default function HomeScreen() {

  return (
    <View>
      <Text className='bg-orange-400'>HomeScreen</Text>
    </View>
  )
}