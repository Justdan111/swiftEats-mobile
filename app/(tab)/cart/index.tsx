import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'
import { Ionicons } from '@expo/vector-icons'
import OrderConfirmationModal from '@/components/orderConfirmationModal'

interface CartItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
    image: any;
    customization?: string;
}

export default function CartScreen() {
    const [promoCode, setPromoCode] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([
       {
      id: 1,
      name: "Classic Cheeseburger",
      price: 12.99,
      quantity: 1,
      image: require('@/assets/images/burger.jpeg'),
      customization: "No onions, extra pickles",
    },
    {
      id: 2,
      name: "Side of Fries",
      price: 4.5,
      quantity: 1,
      image: require('@/assets/images/pizza.jpeg'),
    },
    {
      id: 3,
      name: "Vanilla Milkshake",
      price: 6.0,
      quantity: 1,
      image: require('@/assets/images/pasta.jpeg'),
    },
  ]);

 const updateQuantity = (id: number, delta: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 5.0;
  const taxesAndFees = 2.1;
  const total = subtotal + deliveryFee + taxesAndFees;

  const handleCheckout = () => {
    setShowConfirmation(true);
  };

  const handleDone = () => {
    setShowConfirmation(false);
    router.push("/");
  };




  return (
    <SafeAreaView className='flex-1 bg-gray-100 '>
        
      <View className="  border-gray-200 px-4 py-4  flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ArrowLeft size={20} color="#000" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold flex-1 text-center">My Cart</Text>
        <View className="w-9" />
      </View>

      <ScrollView className="flex-1 px-4 py-4" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Cart Items */}
        {cartItems.map((item) => (
          <View
            key={item.id}
            className="bg-white rounded-2xl p-4 flex-row gap-4 shadow-sm border border-gray-200 mb-4"
          >
            <Image
              source={item.image}
              className="w-20 h-20 rounded-xl"
              resizeMode="cover"
            />
            <View className="flex-1">
              <Text className="font-semibold text-base text-gray-900">{item.name}</Text>
              {item.customization && (
                <Text className="text-sm text-gray-500 mt-1">
                  {item.customization}
                </Text>
              )}
              <Text className="font-semibold mt-2 text-gray-900">${item.price.toFixed(2)}</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <TouchableOpacity
                onPress={() => updateQuantity(item.id, -1)}
                className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
              >
                <Ionicons name="remove" size={16} color="#000" />
              </TouchableOpacity>
              <Text className="font-semibold min-w-[20px] text-center">
                {item.quantity}
              </Text>
              <TouchableOpacity
                onPress={() => updateQuantity(item.id, 1)}
                className="w-8 h-8 rounded-full bg-orange-100 items-center justify-center"
              >
                <Ionicons name="add" size={16} color="#f97316" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Promo Code */}
        <View className="flex-row gap-2 mt-6">
          <TextInput
            placeholder="Add promo code"
            value={promoCode}
            onChangeText={setPromoCode}
            className="flex-1 bg-white border border-gray-300 rounded-xl px-4 h-12"
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity className="px-4 justify-center">
            <Text className="text-orange-500 font-semibold">Apply</Text>
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View className="space-y-3 pt-4 mt-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Subtotal</Text>
            <Text className="font-semibold text-gray-900">
              ${subtotal.toFixed(2)}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Delivery Fee</Text>
            <Text className="font-semibold text-gray-900">
              ${deliveryFee.toFixed(2)}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Taxes & Fees</Text>
            <Text className="font-semibold text-gray-900">
              ${taxesAndFees.toFixed(2)}
            </Text>
          </View>
          <View className="flex-row justify-between pt-2 border-t border-gray-200">
            <Text className="text-xl font-bold text-gray-900">Total</Text>
            <Text className="text-xl font-bold text-gray-900">${total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <TouchableOpacity
          onPress={handleCheckout}
          className="w-full h-14 bg-orange-500 items-center justify-center rounded-2xl"
        >
          <Text className="text-base font-semibold text-white">Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal
        visible={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onDone={handleDone}
        orderNumber="SW12345"
        estimatedTime="25-35 minutes"
      />
      
    </SafeAreaView>
  )
}