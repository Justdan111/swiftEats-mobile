import { useEffect, useRef } from "react"
import { View, Image, Text, Animated, Easing } from "react-native"
import { useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"

export default function SplashScreen() {
  const router = useRouter()
  
  // Animation values
  const logoOpacity = useRef(new Animated.Value(0)).current
  const logoScale = useRef(new Animated.Value(0.3)).current
  const loadingWidth = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Logo animation - fade in and scale up
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease)
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true
      })
    ]).start()

    // Loading bar animation (5 seconds)
    Animated.timing(loadingWidth, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
      easing: Easing.linear
    }).start()

    // Navigate to login after 5 seconds
    const timer = setTimeout(() => {
      router.replace("/auth")
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <View className="flex-1 items-center justify-center">
      <StatusBar style="dark" />

      <Animated.View 
        className="mb-4 relative items-center justify-center"
        style={{
          opacity: logoOpacity,
          transform: [{ scale: logoScale }]
        }}
      >
       <Image
            source={require('../assets/images/swifteat.png')}
            className="w-40 h-20 object-contain"
          />
      </Animated.View>
      
      <View className="items-center justify-center">
        {/* <Text className="text-4xl font-extrabold">SwiftEats</Text> */}
        <Text className="text-lg">Your next meal, moments away</Text>
      </View>

      <View className="absolute bottom-10 w-3/4">
        <View className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
          <Animated.View
            className="h-full bg-orange-500 rounded-full"
            style={{
              width: loadingWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              })
            }}
          />
        </View>
      </View>
    </View>
  )
}