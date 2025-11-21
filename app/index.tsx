import { useEffect } from "react"
import { View, Image } from "react-native"
import { useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"

export default function SplashScreen() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
     router.replace("/login")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <View className="flex-1 bg-green-400 items-center justify-center">
      <StatusBar style="dark" />

      <View className=" mb-4 relative items-center justify-center">
       <Image
            source={require('../assets/images/tradewise-logo.png')}
            className="w-30 h-18"
          />
      </View>
      <
    </View>
  )
}
