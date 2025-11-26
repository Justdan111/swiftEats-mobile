import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileScreen() {


  // Dummy user data
  const user = {
    name: "Anita Franklin",
    email: "anita.franklin@example.com",
    avatar: require("@/assets/images/avatar.jpg")
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <Text>ProfileScreen</Text>
    </SafeAreaView>
  )
}