import { View, Text, TouchableOpacity, Animated, StatusBar, ScrollView, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/build/Ionicons';

const menuItems = [
  {
    id: 1,
    name: "Classic Spaghetti Carbonara",
    description: "Creamy sauce with pancetta and parmesan.",
    price: 18.99,
    image: require('@/assets/images/spag.jpeg'),
  },
  {
    id: 2,
    name: "Margherita Pizza",
    description: "Fresh mozzarella, basil, and tomato sauce.",
    price: 15.5,
    image: require('@/assets/images/pizza.jpeg'),
  },
  {
    id: 3,
    name: "Fettuccine Alfredo",
    description: "Rich butter and Parmesan cheese sauce.",
    price: 17.0,
    image: require('@/assets/images/spag2.jpeg'),
  },
  {
    id: 4,
    name: "Classic Lasagna",
    description: "Layered with meat sauce and mozzarella.",
    price: 21.5,
    image: require('@/assets/images/lasagna.jpeg'),
    soldOut: true,
  },
];

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
  const {id} = useLocalSearchParams();
  const [cartCount, setCartCount] = useState(0);
  const [activeTab, setActiveTab] = useState("main");

  const fadeAnims = useRef(menuItems.map(() => new Animated.Value(0))).current;
  const slideAnims = useRef(menuItems.map(() => new Animated.Value(50))).current;

  useEffect(() => {
    fadeAnims.forEach(anim => anim.setValue(0));
    slideAnims.forEach(anim => anim.setValue(50));

    const animations = menuItems.map((_, index) =>
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
  }, [activeTab]);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };


  return (
    <SafeAreaView className="flex-1 bg-white"> 
    {/* <StatusBar style="light" /> */}

    {/* Hero Section */}
    <View className='relative h-64'>
      <Animated.Image
        source={require('@/assets/images/pasta-2.jpeg')}
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
          <Text className="mb-2 text-3xl font-bold text-white">The Golden Olive</Text>
          <View className="flex-row items-center gap-4">
            <Text className="text-sm text-white">Italian Kitchen</Text>
            <Text className="text-sm text-white">•</Text>
            <View className="flex-row items-center gap-1">
              <Ionicons name="star" size={16} color="#fff" />
              <Text className="text-sm text-white">4.7</Text>
            </View>
            <Text className="text-sm text-white">•</Text>
            <Text className="text-sm text-white">20-30 min</Text>
          </View>
        </View>
      </View>

      {/* menu Tabs */}
      <View className='bg-white border-b border-gray-200'> 
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className='flex-row'>
            <TabButton 
              title="Appetizers" 
              isActive={activeTab === "appetizers"} 
              onPress={() => setActiveTab("appetizers")} 
            />
            <TabButton
               title='Salad'
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
        {activeTab === "main" ? (
          <>
            <Text className="mb-6 text-2xl font-bold text-gray-900">Main Courses</Text>
            <View>
              {menuItems.map((item, index) => (
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
            <Text className="text-gray-500">No items available in this category</Text>
          </View>
        )}
      </ScrollView>

      {/*  Cart Button */}
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