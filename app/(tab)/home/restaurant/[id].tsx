import { View, Text, TouchableOpacity, Animated, StatusBar, ScrollView, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/build/Ionicons';

type Restaurant = {
  name: string;
  cuisine: string;
  rating: number;
  time: string;
  image: any;
};

// Restaurant data by ID
const restaurantData: Record<number, Restaurant> = {
  1: {
    name: "The Great Italian Pasta",
    cuisine: "Italian Kitchen",
    rating: 4.5,
    time: "15-25 min",
    image: require('@/assets/images/pasta-2.jpeg'),
  },
  2: {
    name: "Sushi World",
    cuisine: "Japanese Cuisine",
    rating: 4.8,
    time: "20-30 min",
    image: require('@/assets/images/sushi.jpeg'),
  },
  3: {
    name: "Burger Palace",
    cuisine: "American Grill",
    rating: 4.3,
    time: "10-20 min",
    image: require('@/assets/images/burger.jpeg'),
  },
  4: {
    name: "Green Leaf Salads",
    cuisine: "Healthy Options",
    rating: 4.9,
    time: "15-20 min",
    image: require('@/assets/images/salad.jpeg'),
  },
};

type MenuItem = {
  id: number;
  name: string;
  description?: string;
  price: number;
  image: any;
  soldOut?: boolean;
};

type MenuSections = {
  appetizers: MenuItem[];
  salad: MenuItem[];
  main: MenuItem[];
  desserts: MenuItem[];
};

// Menu items organized by restaurant ID and category
const menuData: Record<number, MenuSections> = {
  1: { // Italian Restaurant
    appetizers: [
      {
        id: 101,
        name: "Bruschetta",
        description: "Toasted bread with tomatoes and basil.",
        price: 8.99,
        image: require('@/assets/images/spag.jpeg'),
      },
      {
        id: 102,
        name: "Garlic Bread",
        description: "Crispy bread with garlic butter.",
        price: 6.5,
        image: require('@/assets/images/pizza.jpeg'),
      },
    ],
    salad: [
      {
        id: 103,
        name: "Caesar Salad",
        description: "Romaine lettuce with Caesar dressing.",
        price: 10.99,
        image: require('@/assets/images/salad.jpeg'),
      },
    ],
    main: [
      {
        id: 104,
        name: "Classic Spaghetti Carbonara",
        description: "Creamy sauce with pancetta and parmesan.",
        price: 18.99,
        image: require('@/assets/images/spag.jpeg'),
      },
      {
        id: 105,
        name: "Margherita Pizza",
        description: "Fresh mozzarella, basil, and tomato sauce.",
        price: 15.5,
        image: require('@/assets/images/pizza.jpeg'),
      },
      {
        id: 106,
        name: "Fettuccine Alfredo",
        description: "Rich butter and Parmesan cheese sauce.",
        price: 17.0,
        image: require('@/assets/images/spag2.jpeg'),
      },
      {
        id: 107,
        name: "Classic Lasagna",
        description: "Layered with meat sauce and mozzarella.",
        price: 21.5,
        image: require('@/assets/images/lasagna.jpeg'),
        soldOut: true,
      },
    ],
    desserts: [
      {
        id: 108,
        name: "Tiramisu",
        description: "Classic Italian coffee-flavored dessert.",
        price: 9.99,
        image: require('@/assets/images/spag.jpeg'),
      },
    ],
  },
  2: { // Sushi Restaurant
    appetizers: [
      {
        id: 201,
        name: "Edamame",
        description: "Steamed soybeans with sea salt.",
        price: 5.99,
        image: require('@/assets/images/sushi.jpeg'),
      },
    ],
    salad: [
      {
        id: 202,
        name: "Seaweed Salad",
        description: "Fresh seaweed with sesame dressing.",
        price: 7.99,
        image: require('@/assets/images/salad.jpeg'),
      },
    ],
    main: [
      {
        id: 203,
        name: "California Roll",
        description: "Crab, avocado, and cucumber.",
        price: 12.99,
        image: require('@/assets/images/sushi.jpeg'),
      },
      {
        id: 204,
        name: "Spicy Tuna Roll",
        description: "Fresh tuna with spicy mayo.",
        price: 14.99,
        image: require('@/assets/images/sushi.jpeg'),
      },
      {
        id: 205,
        name: "Salmon Sashimi",
        description: "Fresh sliced salmon.",
        price: 18.99,
        image: require('@/assets/images/sushi.jpeg'),
      },
    ],
    desserts: [
      {
        id: 206,
        name: "Mochi Ice Cream",
        description: "Japanese rice cake with ice cream.",
        price: 6.99,
        image: require('@/assets/images/sushi.jpeg'),
      },
    ],
  },
  3: { // Burger Restaurant
    appetizers: [
      {
        id: 301,
        name: "Onion Rings",
        description: "Crispy golden onion rings.",
        price: 6.99,
        image: require('@/assets/images/burger.jpeg'),
      },
    ],
    salad: [
      {
        id: 302,
        name: "Garden Salad",
        description: "Fresh mixed greens with vinaigrette.",
        price: 8.99,
        image: require('@/assets/images/salad.jpeg'),
      },
    ],
    main: [
      {
        id: 303,
        name: "Classic Cheeseburger",
        description: "Beef patty with cheese and all fixings.",
        price: 13.99,
        image: require('@/assets/images/burger.jpeg'),
      },
      {
        id: 304,
        name: "Bacon Burger",
        description: "With crispy bacon and BBQ sauce.",
        price: 15.99,
        image: require('@/assets/images/burger.jpeg'),
      },
    ],
    desserts: [
      {
        id: 305,
        name: "Milkshake",
        description: "Creamy vanilla milkshake.",
        price: 5.99,
        image: require('@/assets/images/burger.jpeg'),
      },
    ],
  },
  4: { // Healthy Restaurant
    appetizers: [
      {
        id: 401,
        name: "Hummus & Veggies",
        description: "Fresh vegetables with hummus.",
        price: 7.99,
        image: require('@/assets/images/salad.jpeg'),
      },
    ],
    salad: [
      {
        id: 402,
        name: "Greek Salad",
        description: "Feta cheese, olives, and vegetables.",
        price: 11.99,
        image: require('@/assets/images/salad.jpeg'),
      },
      {
        id: 403,
        name: "Quinoa Bowl",
        description: "Quinoa with roasted vegetables.",
        price: 13.99,
        image: require('@/assets/images/salad.jpeg'),
      },
    ],
    main: [
      {
        id: 404,
        name: "Grilled Chicken Salad",
        description: "Grilled chicken with mixed greens.",
        price: 14.99,
        image: require('@/assets/images/salad.jpeg'),
      },
    ],
    desserts: [
      {
        id: 405,
        name: "Fruit Bowl",
        description: "Fresh seasonal fruits.",
        price: 6.99,
        image: require('@/assets/images/salad.jpeg'),
      },
    ],
  },
};

const TabButton = ({ 
  title, 
  isActive, 
  onPress 
}: { 
  title: string; 
  isActive: boolean; 
  onPress: () => void 
}) => (
  <TouchableOpacity 
    onPress={onPress} 
    className={`px-6 py-4 ${isActive ? "border-b-2 border-orange-500" : ""}`}
  >
    <Text className={`font-medium ${isActive ? "text-gray-900" : "text-gray-400"}`}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default function RestaurantDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const restaurantId = typeof id === 'string' ? parseInt(id) : 1;
  
  const [cartCount, setCartCount] = useState(0);
  type TabKey = keyof MenuSections;
  const [activeTab, setActiveTab] = useState<TabKey>("main");
  const [currentMenuItems, setCurrentMenuItems] = useState<MenuItem[]>([]);

  const restaurant = restaurantData[restaurantId] || restaurantData[1];
  const restaurantMenu = menuData[restaurantId] || menuData[1];

  const fadeAnims = useRef([...Array(10)].map(() => new Animated.Value(0))).current;
  const slideAnims = useRef([...Array(10)].map(() => new Animated.Value(50))).current;

  useEffect(() => {
    // Reset animations
    fadeAnims.forEach(anim => anim.setValue(0));
    slideAnims.forEach(anim => anim.setValue(50));

    // Update menu items based on active tab
    setCurrentMenuItems(restaurantMenu[activeTab] || []);
  }, [activeTab, restaurantId, restaurantMenu, fadeAnims, slideAnims]);

  useEffect(() => {
    const animations = currentMenuItems.map((_, index) =>
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
  }, [currentMenuItems, fadeAnims, slideAnims]);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const getCategoryTitle = () => {
    switch(activeTab) {
      case 'appetizers': return 'Appetizers';
      case 'salad': return 'Salads';
      case 'main': return 'Main Courses';
      case 'desserts': return 'Desserts';
      default: return 'Menu';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white"> 
      {/* Hero Section */}
      <View className='relative h-64'>
        <Animated.Image
          source={restaurant.image}
          className="w-full h-full object-cover"
          style={{
            opacity: fadeAnims[0],
            transform: [{ translateY: slideAnims[0] }],
          }}
        />
        <View className="absolute inset-0 bg-black/40" />
        
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="absolute left-4 top-12 w-10 h-10 rounded-full bg-white/80 items-center justify-center"
        >
          <Text className="text-xl">←</Text>
        </TouchableOpacity>

        {/* Restaurant Info */}
        <View className="absolute bottom-4 left-6 right-6">
          <Text className="mb-2 text-3xl font-bold text-white">{restaurant.name}</Text>
          <View className="flex-row items-center gap-4">
            <Text className="text-sm text-white">{restaurant.cuisine}</Text>
            <Text className="text-sm text-white">•</Text>
            <View className="flex-row items-center gap-1">
              <Ionicons name="star" size={16} color="#fff" />
              <Text className="text-sm text-white">{restaurant.rating}</Text>
            </View>
            <Text className="text-sm text-white">•</Text>
            <Text className="text-sm text-white">{restaurant.time}</Text>
          </View>
        </View>
      </View>

      {/* Menu Tabs */}
      <View className='bg-white border-b border-gray-200'> 
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className='flex-row'>
            <TabButton 
              title="Appetizers" 
              isActive={activeTab === "appetizers"} 
              onPress={() => setActiveTab("appetizers")} 
            />
            <TabButton
              title='Salads'
              isActive={activeTab === "salad"}
              onPress={() => setActiveTab("salad")}
            />
            <TabButton
              title='Main Courses'
              isActive={activeTab === "main"}
              onPress={() => setActiveTab("main")}
            />
            <TabButton
              title='Desserts'
              isActive={activeTab === "desserts"}
              onPress={() => setActiveTab("desserts")}
            />
          </View>
        </ScrollView>
      </View>

      {/* Menu Content */}
      <ScrollView className="flex-1 px-6 py-6" contentContainerStyle={{ paddingBottom: cartCount > 0 ? 100 : 20 }}>
        {currentMenuItems.length > 0 ? (
          <>
            <Text className="mb-6 text-2xl font-bold text-gray-900">{getCategoryTitle()}</Text>
            <View>
              {currentMenuItems.map((item, index) => (
                <Animated.View
                  key={item.id}
                  style={{
                    opacity: fadeAnims[index],
                    transform: [{ translateY: slideAnims[index] }],
                  }}
                >
                  <View className="flex-row gap-4 rounded-3xl bg-white p-4 shadow-sm mb-4">
                    <Image
                      source={item.image}
                      className="h-24 w-24 rounded-2xl"
                      resizeMode="cover"
                    />
                    <View className="flex-1">
                      <Text className="font-semibold text-gray-900">{item.name}</Text>
                      <Text className="mt-1 text-sm text-gray-500" numberOfLines={2}>
                        {item.description}
                      </Text>
                      <View className="mt-auto flex-row items-center justify-between pt-2">
                        <Text className="text-lg font-bold text-gray-900">${item.price}</Text>
                        {item.soldOut ? (
                          <View className="rounded-full bg-gray-200 px-3 py-1">
                            <Text className="text-xs font-medium text-gray-600">Sold Out</Text>
                          </View>
                        ) : (
                          <TouchableOpacity
                            className="h-10 w-10 rounded-full bg-orange-500 items-center justify-center"
                            onPress={handleAddToCart}
                          >
                            <Ionicons name="add" size={20} color="#fff" />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>
                </Animated.View>
              ))}
            </View>
          </>
        ) : (
          <View className="flex-1 items-center justify-center py-12">
            <Ionicons name="restaurant-outline" size={64} color="#D1D5DB" />
            <Text className="mt-4 text-gray-500">No items available in this category</Text>
          </View>
        )}
      </ScrollView>

      {/* Cart Button */}
      {cartCount > 0 && (
        <View className="absolute bottom-6 left-6 right-6 justify-right items-end">
          <TouchableOpacity onPress={() => router.push("/cart")} className="h-14 w-1/3 rounded-3xl bg-orange-500 flex-row items-center justify-center shadow-lg">
            <View className="relative">
              <Ionicons name="cart-outline" size={20} color="#fff" />
              <View className="absolute -top-2 -right-2 rounded-full bg-white px-1.5 py-0.5 min-w-[18px] items-center justify-center">
                <Text className="text-xs font-semibold text-orange-500">{cartCount}</Text>
              </View>
            </View>
            <Text className="ml-3 text-base font-semibold text-white">View Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  )
}