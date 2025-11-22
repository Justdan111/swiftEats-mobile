import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router"

const Auth = () => {
   const router = useRouter()
  const [isSignUp, setIsSignUp] = useState(true);

  const handleLogin = () => { 
    router.push('/(tab)/home')
  }

  return (
    < SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="px-6 py-8">
        <View className="mx-auto w-full max-w-md space-y-8">
          <View className="text-center items-center mb-8">
            <Text className="mb-2 text-5xl font-black text-gray-900">SwiftEats</Text>
            <Text className="text-base text-gray-600">Your next meal, delivered.</Text>
          </View>

          <View className="w-full mb-6">
            <View className="flex-row w-full bg-gray-100 rounded-2xl p-1">
              <TouchableOpacity
                className={`flex-1 py-3 rounded-xl ${!isSignUp ? 'bg-white' : 'bg-transparent'}`}
                onPress={() => setIsSignUp(false)}
                activeOpacity={0.7}
              >
                <Text className={`text-center font-semibold ${!isSignUp ? 'text-gray-900' : 'text-gray-600'}`}>
                  Log In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 py-3 rounded-xl ${isSignUp ? 'bg-white' : 'bg-transparent'}`}
                onPress={() => setIsSignUp(true)}
                activeOpacity={0.7}
              >
                <Text className={`text-center font-semibold ${isSignUp ? 'text-gray-900' : 'text-gray-600'}`}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            {isSignUp ? (
              <View className="mt-6 space-y-4">
                <View className="relative mb-4">
                  <View className="absolute left-4 top-1/2 z-10" style={{ transform: [{ translateY: -10 }] }}>
                    <Ionicons name="person-outline" size={20} color="#6B7280" />
                  </View>
                  <TextInput
                    placeholder="Full Name"
                    className="h-14 rounded-2xl border-2 border-gray-300 bg-white pl-12 text-base"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                <View className="relative mb-4">
                  <View className="absolute left-4 top-1/2 z-10" style={{ transform: [{ translateY: -10 }] }}>
                    <MaterialIcons name="email" size={20} color="#6B7280" />
                  </View>
                  <TextInput
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="h-14 rounded-2xl border-2 border-gray-300 bg-white pl-12 text-base"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                <View className="relative mb-4">
                  <View className="absolute left-4 top-1/2 z-10" style={{ transform: [{ translateY: -10 }] }}>
                    <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
                  </View>
                  <TextInput
                    placeholder="Password"
                    secureTextEntry
                    className="h-14 rounded-2xl border-2 border-gray-300 bg-white pl-12 text-base"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                <TouchableOpacity className="h-14 w-full rounded-2xl bg-orange-500 items-center justify-center mb-4">
                  <Text className="text-base font-semibold text-white">Create Account</Text>
                </TouchableOpacity>

                <TouchableOpacity className="w-full items-center">
                  <Text className="text-sm text-orange-500">Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="mt-6 space-y-4">
                <View className="relative mb-4">
                  <View className="absolute left-4 top-1/2 z-10" style={{ transform: [{ translateY: -10 }] }}>
                    <MaterialIcons name="email" size={20} color="#6B7280" />
                  </View>
                  <TextInput
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="h-14 rounded-2xl border-2 border-gray-300 bg-white pl-12 text-base"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                <View className="relative mb-4">
                  <View className="absolute left-4 top-1/2 z-10" style={{ transform: [{ translateY: -10 }] }}>
                    <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
                  </View>
                  <TextInput
                    placeholder="Password"
                    secureTextEntry
                    className="h-14 rounded-2xl border-2 border-gray-300 bg-white pl-12 text-base"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                <TouchableOpacity onPress={handleLogin} className="h-14 w-full rounded-2xl bg-orange-500 items-center justify-center mb-4">
                  <Text className="text-base font-semibold text-white">Log In</Text>
                </TouchableOpacity>

                <TouchableOpacity className="w-full items-center">
                  <Text className="text-sm text-orange-500">Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View className="space-y-4 mb-6">
            <View className="relative">
              <View className="absolute inset-0 flex items-center justify-center">
                <View className="w-full border-t border-gray-300" />
              </View>
              <View className="relative flex items-center justify-center">
                <Text className="bg-white px-2 text-xs text-gray-600">OR</Text>
              </View>
            </View>

            <TouchableOpacity className="h-14 w-full rounded-2xl border-2 border-gray-300 bg-white items-center justify-center flex-row mb-4">
              <AntDesign name="google" size={20} color="#000" />
              <Text className="ml-2 text-base font-medium text-gray-900">Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity className="h-14 w-full rounded-2xl border-2 border-gray-300 bg-white items-center justify-center flex-row mb-4">
              <FontAwesome name="facebook-square" size={20} color="#1877F2" />
              <Text className="ml-2 text-base font-medium text-gray-900">Continue with Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity className="h-14 w-full rounded-2xl border-2 border-gray-300 bg-white items-center justify-center flex-row mb-4">
               <FontAwesome name="apple" size={20} color="#000" />
              <Text className="ml-2 text-base font-medium text-gray-900">Continue with Apple</Text>
            </TouchableOpacity>
          </View>

          <View className="items-center mb-8">
            <Text className="text-center text-xs text-gray-600">
              By continuing, you agree to our{" "}
              <Text className="text-orange-500">Terms of Service</Text> &{" "}
              <Text className="text-orange-500">Privacy Policy</Text>.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Auth;