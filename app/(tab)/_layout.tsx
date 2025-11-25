import React from "react";
import { Tabs, useSegments } from "expo-router";
import { Annoyed, HomeIcon, ShoppingBag, ShoppingCart } from "lucide-react-native";
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
  const segments = useSegments();
  
  const currentPath = segments.join('/');
  
  const isTabActive = (tabName: string) => {

    const baseTabName = tabName.replace('/index', '');
    
    
    return currentPath.startsWith(baseTabName);
  };

  // Define screens that appear in the tab bar
  const tabScreens: TabScreenConfig[] = [
    {
      name: "home/index",
      options: {
        title: "Home",
        tabBarIcon: ({ color, size }: TabBarIconProps) => {
          const active = isTabActive("home");
          return <HomeIcon size={size} color={active ? "#fb923c" : color} />;
        },
      },
    },
    {
      name: "orders/index",
      options: {
        title: "Orders",
        tabBarIcon: ({ color, size }: TabBarIconProps) => {
          const active = isTabActive("orders");
          return <ShoppingBag size={size} color={active ? "#fb923c" : color} />;
        },
      },
    },
    {
      name: "cart/index",
      options: {
        title: "Cart",
        tabBarIcon: ({ color, size }: TabBarIconProps) => {
          const active = isTabActive("cart");
          return <ShoppingCart size={size} color={active ? "#fb923c" : color} />;
        },
      },
    },
    {
      name: "profile/index",
      options: {
        title: "Profile",
        tabBarIcon: ({ color, size }: TabBarIconProps) => {
          const active = isTabActive("profile");
          return <Annoyed size={size} color={active ? "#fb923c" : color} />;
        },
      },
    },
  ];

  // Define hidden screens 
  const hiddenScreens: string[] = [
    "home/restaurant/[id]",
    "orders/tracking/[id]",
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
        {/* Render all tab bar screens with custom active state */}
        {tabScreens.map(screen => {
          const baseTabName = screen.name.replace('/index', '');
          const isActive = isTabActive(baseTabName);
          
          return createTabScreen(screen.name, {
            ...screen.options,
            tabBarLabelStyle: {
              color: isActive ? "#fb923c" : "#9ca3af",
            },
          });
        })}
        
        {/* Render all hidden screens */}
        {hiddenScreens.map(name => createTabScreen(name, {
          href: null, 
          title: name,
          tabBarIcon: function (props: TabBarIconProps): React.ReactNode {
            return null;
          },
        }))}
      </Tabs>
    </GestureHandlerRootView>
  );
}