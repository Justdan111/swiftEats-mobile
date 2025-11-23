import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'

export default function CartScreen() {
  return (
    <SafeAreaView className='flex-1 bg-gray-100 '>
        
      <View className=" border-b border-gray-200 px-4 py-4 pt-12 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ArrowLeft size={20} color="#f97316" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold flex-1 text-center">My Cart</Text>
        <View className="w-9" />
      </View>
      
    </SafeAreaView>
  )
}