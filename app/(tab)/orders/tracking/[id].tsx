import { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Switch, Animated } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";

interface OrderStatus {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  current?: boolean;
  icon: string;
}

const OrderTracking = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [liveUpdates, setLiveUpdates] = useState(false);
  
  // Animation refs
  const fadeAnims = useRef([...Array(5)].map(() => new Animated.Value(0))).current;
  const slideAnims = useRef([...Array(5)].map(() => new Animated.Value(30))).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const orderStatuses: OrderStatus[] = [
    {
      id: 1,
      title: "Order Placed",
      description: "We have received your order.",
      completed: true,
      icon: "checkmark-circle",
    },
    {
      id: 2,
      title: "Paid",
      description: "Your payment was successful.",
      completed: true,
      icon: "checkmark-circle",
    },
    {
      id: 3,
      title: "Preparing your food",
      description: "The restaurant is preparing your order.",
      completed: true,
      current: true,
      icon: "restaurant",
    },
    {
      id: 4,
      title: "On the way",
      description: "Your rider is on the way to you.",
      completed: false,
      icon: "bicycle",
    },
    {
      id: 5,
      title: "Delivered",
      description: "Enjoy your meal!",
      completed: false,
      icon: "flag",
    },
  ];

  const currentProgress = 60;

  useEffect(() => {
    // Animate status items
    const statusAnimations = orderStatuses.map((_, index) =>
      Animated.parallel([
        Animated.timing(fadeAnims[index], {
          toValue: 1,
          duration: 500,
          delay: index * 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnims[index], {
          toValue: 0,
          duration: 500,
          delay: index * 150,
          useNativeDriver: true,
        }),
      ])
    );

    // Animate progress bar
    Animated.timing(progressAnim, {
      toValue: currentProgress,
      duration: 1500,
      delay: 300,
      useNativeDriver: false,
    }).start();

    // Pulse animation for current status
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.stagger(150, statusAnimations).start();
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-white shadow-sm border-gray-200 pb-4">
        <View className="flex-row items-center justify-between px-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2 -ml-2"
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Order Status</Text>
          <TouchableOpacity className="p-2 -mr-2">
            <Ionicons name="ellipsis-vertical" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-8">
        {/* Estimated Delivery */}
        <View className="items-center mb-6">
          <Text className="text-gray-500 text-sm mb-2">Estimated Delivery</Text>
          <Text className="text-4xl font-bold text-orange-500">10:35 AM</Text>
        </View>

        {/* Progress Bar */}
        <View className="mb-8">
          <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <Animated.View
              className="h-full bg-orange-500 rounded-full"
              style={{ width: progressWidth }}
            />
          </View>
        </View>

        {/* Status Timeline */}
        <View className="space-y-6 mb-8">
          {orderStatuses.map((status, index) => {
            const isLast = index === orderStatuses.length - 1;
            const isCompleted = status.completed;
            const isCurrent = status.current;

            return (
              <Animated.View
                key={status.id}
                className="relative flex-row gap-4"
                style={{
                  opacity: fadeAnims[index],
                  transform: [{ translateY: slideAnims[index] }],
                }}
              >
                {/* Timeline Line */}
                {!isLast && (
                  <View
                    className={`absolute left-6 top-12 w-0.5 h-16 ${
                      isCompleted ? "bg-orange-500" : "bg-gray-200"
                    }`}
                  />
                )}

                {/* Icon */}
                <Animated.View
                  className={`flex-shrink-0 w-12 h-12 rounded-full items-center justify-center ${
                    isCompleted
                      ? "bg-orange-500"
                      : "bg-gray-200"
                  }`}
                  style={isCurrent ? { transform: [{ scale: pulseAnim }] } : {}}
                >
                  {status.icon === "bicycle" ? (
                    <MaterialCommunityIcons 
                      name="bike" 
                      size={24} 
                      color={isCompleted ? "#fff" : "#9CA3AF"} 
                    />
                  ) : (
                    <Ionicons
                      name={status.icon as any}
                      size={24}
                      color={isCompleted ? "#fff" : "#9CA3AF"}
                    />
                  )}
                </Animated.View>

                {/* Content */}
                <View className="flex-1 pb-4">
                  <Text
                    className={`font-semibold mb-1 ${
                      isCurrent ? "text-orange-500" : "text-gray-900"
                    }`}
                  >
                    {status.title}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {status.description}
                  </Text>
                </View>
              </Animated.View>
            );
          })}
        </View>

        {/* Live Updates Toggle */}
        <View className="flex-row items-center justify-between p-4 bg-orange-50 rounded-lg mb-8">
          <View className="flex-row items-center gap-3 flex-1">
            <Ionicons name="notifications" size={20} color="#f97316" />
            <Text className="text-sm font-medium text-gray-900 flex-1">
              Get live updates about your order
            </Text>
          </View>
          <Switch
            value={liveUpdates}
            onValueChange={setLiveUpdates}
            trackColor={{ false: '#d1d5db', true: '#fed7aa' }}
            thumbColor={liveUpdates ? '#f97316' : '#f3f4f6'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderTracking;