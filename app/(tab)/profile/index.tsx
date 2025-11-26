import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { ChevronRight, UserRound } from 'lucide-react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function ProfileScreen() {


  // Dummy user data
  const user = {
    name: "Anita Franklin",
    email: "anita.franklin@example.com",
    avatar: require("@/assets/images/avatar.jpg")
  }

  // Past orders data 
  const pastOrders = [
    {
      id: 1,
      restaurant: "Sushi World",
      date: "2024-06-10",
      total: 45.00,
      items : [
        { name: "California Roll", quantity: 2 },
        { name: "Miso Soup", quantity: 1 },
        { name: "Green Tea Ice Cream", quantity: 1 },
      ]
     
    },
    {
      id: 2,
      restaurant: "Pizza Paradise",
      date: "2024-06-08",
      total: 30.50,
      items : [
        { name: "Pepperoni Pizza", quantity: 1 },
        { name: "Garlic Bread", quantity: 1 },
      ]
    }


  ]

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>

      {/* Header */}
      <View className=" px-4  pb-4  border-gray-200 flex items-center">
        <Text className="text-2xl font-bold text-gray-900">My Account</Text>
        
      </View>
      {/* Profile Info */}
      <ScrollView className="flex-1 px-6 py-8">
        <View className=" p-6 items-center mb-8">
          <Image
            source={user.avatar}
            className="w-24 h-24 rounded-full mb-4"
          />
          <Text className="text-xl font-semibold text-gray-900">{user.name}</Text>
          <Text className="text-gray-600">{user.email}</Text>
        </View>

        {/* Account Settings */}
        <View>
           <Text className="text-lg font-bold text-gray-900 mb-3">Account </Text>
          <View className="bg-white rounded-2xl overflow-hidden shadow-sm border-b border-gray-100">
            {/* Edit Profile */}
            <TouchableOpacity
              onPress={() => router.push("/profile")}
              className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100"
            >
              <View className="flex-row items-center gap-4">
                <Ionicons name="person-outline" size={24} color="#f97316" />
                <Text className=" font-medium text-gray-900">Edit Profile</Text>
              </View>
              <ChevronRight size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
          {/* Order History */}
          <View className="bg-white rounded-2xl overflow-hidden shadow-sm border-b border-gray-100">
            <TouchableOpacity
              onPress={() => router.push("/orders")}
              className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100"
            >
              <View className="flex-row items-center gap-4">
                <Ionicons name="receipt-outline" size={24} color="#f97316" />
                <Text className=" font-medium text-gray-900">View Order History</Text>
              </View>
              <ChevronRight size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
          {/* Payment Methods */}
          <View className="bg-white rounded-2xl overflow-hidden shadow-sm border-b border-gray-100">
            <TouchableOpacity
              onPress={() => router.push("/profile/payment-methods")}
              className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100"
            >
              <View className="flex-row items-center gap-4">
                <Ionicons name="card-outline" size={24} color="#f97316" />
                <Text className=" font-medium text-gray-900">Payment Methods</Text>
              </View>
              <ChevronRight size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Past Orders */}


      </ScrollView>
    </SafeAreaView>
  )
}