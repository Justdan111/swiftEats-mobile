import React from "react";
import { Tabs } from "expo-router";
import { Annoyed, HomeIcon, Sparkle } from "lucide-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";


// Define types for our tab screen configuration
type TabBarIconProps = {
  focused: boolean;
  color?: string;
  size?: number;
};

type TabScreenConfig = {
  name: string;
  options: {
    title: string;
    tabBarIcon: (props: TabBarIconProps) => React.ReactNode;
    href?: null;
    [key: string]: any; 
  };
};

const createTabScreen = (name: string, options: TabScreenConfig["options"]) => (
  <Tabs.Screen
    key={name}
    name={name}
    options={options}
  />
);

export default function OrderTakerLayout() {
  // Define screens that appear in the tab bar
  const tabScreens: TabScreenConfig[] = [
    {
      name: "home/index",
      options: {
        title: "Home",
        tabBarIcon: ({ color, size }: TabBarIconProps) => <HomeIcon size={size} color={color} />
      },
    },
    {
      name: "order/index",
      options: {
        title: "Orders",
        tabBarIcon: ({ color, size }: TabBarIconProps) => <Sparkle  size={size} color={color} />,
      },
    },
    {
      name: "profile/index",
      options: {
        title: "Profile",
        tabBarIcon: ({ color, size }: TabBarIconProps) => <Annoyed size={size} color={color} />,
      },
    },
  ];

  // Define hidden screens (not in tab bar)
  const hiddenScreens: string[] = [
   "home/add-item/index",
   "home/product/[id]",
   "order/create-order/index",
   "order/order-detail/[id]",
   "order/client-info/index",
   "order/add-products/index",
   "order/invoice/[id]"
  ];

  return (
     <GestureHandlerRootView style={{ flex: 1 }}>
      
   
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#fb923c",
          tabBarInactiveTintColor: "#9ca3af",
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            borderTopColor: "#f3f4f6",
            paddingBottom: 8,
            paddingTop: 8,
            height: 80,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
          },
        }}
      >
        {/* Render all tab bar screens */}
        {tabScreens.map(screen => createTabScreen(screen.name, screen.options))}
        
        {/* Render all hidden screens */}
        {hiddenScreens.map(name => createTabScreen(name, {
          href: null, 
          title: name,
          tabBarIcon: function (props: TabBarIconProps): React.ReactNode {
            throw new Error("Function not implemented.");
          }
        }))}
      </Tabs>
 
    
    </GestureHandlerRootView>
  );
}