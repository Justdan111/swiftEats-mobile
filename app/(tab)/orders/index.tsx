import { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Animated } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";

interface ActiveOrder {
  id: number;
  restaurant: string;
  image: any;
  items: number;
  total: number;
  status: string;
  statusLabel: string;
  progress: number;
  icon: string;
}

interface PastOrder {
  id: number;
  restaurant: string;
  image: any;
  items: number;
  total: number;
  deliveredDate: string;
}

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
    className={`flex-1 py-3 items-center justify-center rounded-xl ${
      isActive ? "bg-orange-500" : "bg-gray-100"
    }`}
  >
    <Text className={`font-semibold ${isActive ? "text-white" : "text-gray-600"}`}>
      {title}
    </Text>
  </TouchableOpacity>
);

const Orders = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");
  
  // Animation refs
  const fadeAnims = useRef([...Array(4)].map(() => new Animated.Value(0))).current;
  const slideAnims = useRef([...Array(4)].map(() => new Animated.Value(30))).current;

  const activeOrders: ActiveOrder[] = [
    {
      id: 1,
      restaurant: "Pizza Palace",
      image: require('@/assets/images/pizza.jpeg'),
      items: 3,
      total: 45.50,
      status: "Arriving in 15 mins",
      statusLabel: "Preparing",
      progress: 60,
      icon: "truck",
    },
    {
      id: 2,
      restaurant: "Sushi House",
      image: require('@/assets/images/sushi.jpeg'),
      items: 5,
      total: 72.00,
      status: "Order Placed",
      statusLabel: "Waiting for restaurant to accept",
      progress: 20,
      icon: "document-text",
    },
  ];

  const pastOrders: PastOrder[] = [
    {
      id: 3,
      restaurant: "Taco Town",
      image: require('@/assets/images/pasta.jpeg'),
      items: 2,
      total: 24.80,
      deliveredDate: "Oct 26",
    },
    {
      id: 4,
      restaurant: "Burger Bliss",
      image: require('@/assets/images/burger.jpeg'),
      items: 4,
      total: 55.10,
      deliveredDate: "Oct 22",
    },
  ];

  useEffect(() => {
    // Reset animations
    fadeAnims.forEach(anim => anim.setValue(0));
    slideAnims.forEach(anim => anim.setValue(30));

    const orders = activeTab === "active" ? activeOrders : pastOrders;
    const animations = orders.map((_, index) =>
      Animated.parallel([
        Animated.timing(fadeAnims[index], {
          toValue: 1,
          duration: 500,
          delay: index * 100,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnims[index], {
          toValue: 0,
          duration: 500,
          delay: index * 100,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.stagger(100, animations).start();
  }, [activeTab]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-white border-b border-gray-200 pb-4">
        <View className="flex-row items-center gap-4 px-4 ">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2 -ml-2"
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl font-bold flex-1 text-center ">My Orders</Text>
        </View>
      </View>

      {/* Tabs */}
      <View className="px-4 pt-4">
        <View className="flex-row gap-2 bg-gray-100 p-1 rounded-xl">
          <TabButton 
            title="Active" 
            isActive={activeTab === "active"} 
            onPress={() => setActiveTab("active")} 
          />
          <TabButton 
            title="Past" 
            isActive={activeTab === "past"} 
            onPress={() => setActiveTab("past")} 
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
        {activeTab === "active" ? (
          <>
            <Text className="text-lg font-semibold mb-4">Active Orders</Text>
            <View className="space-y-4">
              {activeOrders.map((order, index) => (
                <Animated.View
                  key={order.id}
                  className="bg-white border border-gray-200 rounded-2xl p-4 mb-4"
                  style={{
                    opacity: fadeAnims[index],
                    transform: [{ translateY: slideAnims[index] }],
                  }}
                >
                  {/* Restaurant Info */}
                  <View className="flex-row items-center gap-3 mb-4">
                    <Image
                      source={order.image}
                      className="w-12 h-12 rounded-lg"
                      resizeMode="cover"
                    />
                    <View>
                      <Text className="font-semibold text-gray-900">
                        {order.restaurant}
                      </Text>
                      <Text className="text-sm text-gray-500">
                        {order.items} items • ${order.total.toFixed(2)}
                      </Text>
                    </View>
                  </View>

                  {/* Status */}
                  <View className="mb-4">
                    <View className="flex-row items-center gap-2 mb-2">
                      <Ionicons 
                        name={order.icon as any} 
                        size={16} 
                        color="#f97316" 
                      />
                      <Text className="text-sm font-medium text-orange-500">
                        {order.status}
                      </Text>
                    </View>
                    
                    {/* Progress Bar */}
                    <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                      <View 
                        className="h-full bg-orange-500 rounded-full" 
                        style={{ width: `${order.progress}%` }}
                      />
                    </View>
                    
                    <Text className="text-xs text-gray-500">
                      {order.statusLabel}
                    </Text>
                  </View>

                  {/* Actions */}
                  <View className="flex-row gap-3">
                    <TouchableOpacity
                      onPress={() => router.push(`/orders/tracking/${order.id}`)}
                      className="flex-1 bg-orange-500 py-3 rounded-xl items-center justify-center"
                    >
                      <Text className="font-semibold text-white">Track Order</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="px-6 py-3 rounded-xl border-2 border-orange-500 items-center justify-center"
                    >
                      <Text className="font-semibold text-orange-500">Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              ))}
            </View>
          </>
        ) : (
          <>
            <Text className="text-lg font-semibold mb-4">Past Orders</Text>
            <View className="space-y-4">
              {pastOrders.map((order, index) => (
                <Animated.View
                  key={order.id}
                  className="bg-white border border-gray-200 rounded-2xl p-4 mb-4"
                  style={{
                    opacity: fadeAnims[index],
                    transform: [{ translateY: slideAnims[index] }],
                  }}
                >
                  {/* Restaurant Info */}
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center gap-3">
                      <Image
                        source={order.image}
                        className="w-12 h-12 rounded-lg"
                        resizeMode="cover"
                      />
                      <View>
                        <Text className="font-semibold text-gray-900">
                          {order.restaurant}
                        </Text>
                        <Text className="text-sm text-gray-500">
                          {order.items} items • ${order.total.toFixed(2)}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity className="bg-orange-500 px-6 py-2 rounded-xl">
                      <Text className="font-semibold text-white">Reorder</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Delivery Status */}
                  <View className="flex-row items-center gap-2">
                    <Ionicons name="checkmark-circle" size={16} color="#16a34a" />
                    <Text className="text-sm text-green-600">
                      Delivered on {order.deliveredDate}
                    </Text>
                  </View>
                </Animated.View>
              ))}

              {/* Empty State */}
              <Animated.View
                className="mt-8 border-2 border-dashed border-gray-300 rounded-2xl p-8 items-center"
                style={{
                  opacity: fadeAnims[2],
                  transform: [{ translateY: slideAnims[2] }],
                }}
              >
                <Ionicons name="document-text-outline" size={64} color="#d1d5db" />
                <View className="mt-4 items-center">
                  <Text className="font-semibold text-lg mb-2 text-gray-900">
                    No More Past Orders
                  </Text>
                  <Text className="text-sm text-gray-500 text-center">
                    Your order history will appear here.
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => router.push("/home")}
                  className="mt-4 bg-orange-500 px-6 py-3 rounded-xl"
                >
                  <Text className="font-semibold text-white">Start Your First Order</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Orders;