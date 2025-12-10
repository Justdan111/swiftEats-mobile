import { View, Text, Animated, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/build/Ionicons';

// Mock data - organized by category
type Restaurant = {
  id: number;
  name: string;
  rating: number;
  time: string;
  cuisine: string;
  image: any;
  offer?: string;
};

type RestaurantsMap = {
  Pizza: Restaurant[];
  Sushi: Restaurant[];
  Burgers: Restaurant[];
  Healthy: Restaurant[];
  Offers: Restaurant[];
};

const allRestaurants: RestaurantsMap = {
  Pizza: [
    {
      id: 1,
      name: "The Great Italian Pasta",
      rating: 4.5,
      time: "15-25 min",
      cuisine: "Italian, Pasta",
      image: require("@/assets/images/pasta.jpeg"),
      offer: "20% OFF",
    },
    {
      id: 5,
      name: "Pizza Paradise",
      rating: 4.7,
      time: "20-30 min",
      cuisine: "Italian, Pizza",
      image: require("@/assets/images/pizza.jpeg"),
      offer: "15% OFF",
    },
  ],
  Sushi: [
    {
      id: 2,
      name: "Sushi World",
      rating: 4.8,
      time: "20-30 min",
      cuisine: "Japanese, Sushi",
      image: require("@/assets/images/sushi.jpeg"),
      offer: "10% OFF",
    },
  ],
  Burgers: [
    {
      id: 3,
      name: "Burger Palace",
      rating: 4.3,
      time: "10-20 min",
      cuisine: "American, Burgers",
      image: require("@/assets/images/burger.jpeg"),
      offer: "15% OFF",
    },
  ],
  Healthy: [
    {
      id: 4,
      name: "Green Leaf Salads",
      rating: 4.9,
      time: "15-20 min",
      cuisine: "Healthy, Salads",
      image: require("@/assets/images/salad.jpeg"),
      offer: "Buy 1 Get 1",
    },
  ],
  Offers: [
    {
      id: 1,
      name: "The Great Italian Pasta",
      rating: 4.5,
      time: "15-25 min",
      cuisine: "Italian, Pasta",
      image: require("@/assets/images/pasta.jpeg"),
      offer: "20% OFF",
    },
    {
      id: 4,
      name: "Green Leaf Salads",
      rating: 4.9,
      time: "15-20 min",
      cuisine: "Healthy, Salads",
      image: require("@/assets/images/salad.jpeg"),
      offer: "Buy 1 Get 1",
    },
  ],
};

type Category = keyof RestaurantsMap; 
type SelectedCategory = Category | "All Filters";

const categories: SelectedCategory[] = ["All Filters", "Pizza", "Sushi", "Offers", "Burgers", "Healthy"];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>("Pizza");
  const [displayedRestaurants, setDisplayedRestaurants] = useState<Restaurant[]>(allRestaurants.Pizza);
  const fadeAnims = useRef([...Array(10)].map(() => new Animated.Value(0))).current;
  const slideAnims = useRef([...Array(10)].map(() => new Animated.Value(50))).current;

  useEffect(() => {
    // Reset animations
    fadeAnims.forEach(anim => anim.setValue(0));
    slideAnims.forEach(anim => anim.setValue(50));

    // Update displayed restaurants based on selected category
    if (selectedCategory === "All Filters") {
      const all = (Object.values(allRestaurants) as Restaurant[][]).flat();
      setDisplayedRestaurants(all);
    } else {
      setDisplayedRestaurants(allRestaurants[selectedCategory as Category] || []);
    }
  }, [selectedCategory, fadeAnims, slideAnims]);

  useEffect(() => {
    const animations = displayedRestaurants.map((_, index) =>
      Animated.parallel([
        Animated.timing(fadeAnims[index], {
          toValue: 1,
          duration: 600,
          delay: index * 100,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnims[index], {
          toValue: 0,
          duration: 600,
          delay: index * 100,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.stagger(100, animations).start();
  }, [displayedRestaurants, fadeAnims, slideAnims]);

  return (
    <SafeAreaView className="flex-1 bg-white ">
      {/* Header */}
      <View className="bg-white border-gray-200 px-6 pb-2">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center gap-2">
            <Ionicons name="location" size={20} color="#f97316" />
            <View>
              <Text className="text-2xl font-bold ">Delivering to: Home</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push('/profile')} className="w-10 h-10 rounded-full items-center justify-center">
            <Image
              source={require('@/assets/images/avatar.jpg')}
              className="w-12 h-10 rounded-full"
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="relative mb-4">
          <View className="absolute left-4 top-1/2 z-10" style={{ transform: [{ translateY: -10 }] }}>
            <Ionicons name="search" size={20} color="#6B7280" />
          </View>
          <TextInput
            placeholder="Search for restaurants or cuisines..."
            className="h-12 rounded-2xl border-2 border-gray-300 bg-white pl-12 text-base"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Category Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
          <View className="flex-row gap-2">
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                className={`h-10 px-4 rounded-2xl border-2 flex-row items-center justify-center ${
                  selectedCategory === category
                    ? "bg-orange-500 border-orange-500"
                    : "bg-white border-gray-300"
                }`}
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.7}
              >
                {category === "All Filters" && (
                  <Ionicons 
                    name="options-outline" 
                    size={16} 
                    color={selectedCategory === category ? "#fff" : "#000"} 
                    style={{ marginRight: 8 }}
                  />
                )}
                <Text
                  className={`font-medium ${
                    selectedCategory === category ? "text-white" : "text-gray-900"
                  }`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Restaurant List */}
      <ScrollView className="flex-1 px-6 py-6">
        <Text className="mb-4 text-2xl font-bold text-gray-900">
          {selectedCategory === "All Filters" ? "All Restaurants" : `${selectedCategory} Restaurants`}
        </Text>
        {displayedRestaurants.length > 0 ? (
          <View className="space-y-6">
            {displayedRestaurants.map((restaurant, index) => (
              <Animated.View
                key={restaurant.id}
                style={{
                  opacity: fadeAnims[index],
                  transform: [{ translateY: slideAnims[index] }],
                }}
              >
                <TouchableOpacity
                  onPress={() => router.push(`/home/restaurant/${restaurant.id}`)}
                  activeOpacity={0.9}
                  className="mb-6"
                >
                  <View className="overflow-hidden rounded-3xl bg-white shadow-sm">
                    <View className="aspect-video overflow-hidden relative">
                      <Animated.Image
                        source={restaurant.image}
                        className="w-full h-48"
                        style={{
                          opacity: fadeAnims[index],
                          transform: [{ translateY: slideAnims[index] }],
                        }}
                      />
                      {restaurant.offer && (
                        <View className="absolute top-3 right-3 bg-orange-500 px-3 py-1 rounded-full">
                          <Text className="text-white font-bold text-xs">{restaurant.offer}</Text>
                        </View>
                      )}
                    </View>
                    <View className="p-4">
                      <Text className="text-lg font-bold text-gray-900">{restaurant.name}</Text>
                      <View className="mt-2 flex-row items-center gap-4">
                        <View className="flex-row items-center gap-1">
                          <Ionicons name="star" size={16} color="#f97316" />
                          <Text className="text-sm font-medium text-gray-700">{restaurant.rating}</Text>
                        </View>
                        <Text className="text-sm text-gray-500">•</Text>
                        <Text className="text-sm text-gray-500">{restaurant.time}</Text>
                      </View>
                      <Text className="mt-1 text-sm text-gray-500">{restaurant.cuisine}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        ) : (
          <View className="flex-1 items-center justify-center py-12">
            <Ionicons name="restaurant-outline" size={64} color="#D1D5DB" />
            <Text className="mt-4 text-gray-500 text-center">No restaurants available in this category</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}