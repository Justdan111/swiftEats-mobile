import { useEffect } from "react"
import { View, Image, Text } from "react-native"
import { useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"

export default function SplashScreen() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
     router.replace("/login")
    }, 300000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <View className="flex-1 bg-orange-400 items-center justify-center">
      <StatusBar style="dark" />

      <View className=" mb-4 relative items-center justify-center">
       {/* <Image
            source={require('../assets/images/tradewise-logo.png')}
            className="w-30 h-18"
          /> */}
      </View>
      <View className="items-center justify-center">
        <Text className="text-white text-2xl font-bold"> SwiftEats</Text>
        <Text className="text-white text-lg"> Your next meal, moments away</Text>
      </View>

      <View className="absolute bottom-10">
        <Text className="text-white text-sm">Loading</Text>
      </View>
    </View>
  )
}
