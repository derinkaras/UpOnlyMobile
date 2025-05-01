import React from 'react';
import {Tabs} from "expo-router";
import {Image, Pressable} from "react-native";
import {icons} from "@/constants/icons";
import * as Haptics from 'expo-haptics';


const TabIcon = ({focused, icon}: {focused:any, icon:any} ) => {
    // @ts-ignore
    return (
        <Image
            source={icon}
            tintColor={ focused ? "#a3e635": "#737373"}
            resizeMode="contain"
            className="w-8 h-8 overflow-hidden mt-6"
        />
    )
}




const _layout = () => {
  return (
      <Tabs
          screenOptions={{
              tabBarShowLabel: false,
              tabBarItemStyle: {
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
              },
              tabBarStyle: {
                  backgroundColor: "#262626",
                  borderTopWidth: 0
              },
              tabBarButton: (props) => {
                  return (
                    <Pressable
                      {...props}
                      onPress={()=>{
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                          // @ts-ignore
                          props.onPress();

                      }}
                  />)

              }

          }}
      >
          <Tabs.Screen
            name="index"
            options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon
                        focused={focused}
                        icon={icons.home}
                    />
                )

            }}
          />
          <Tabs.Screen
              name="analytics"
              options={{
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                      <TabIcon
                          focused={focused}
                          icon={icons.chart}
                      />

                  )
              }}
          />
          <Tabs.Screen
              name="wallet"
              options={{
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                      <TabIcon
                          focused={focused}
                          icon={icons.wallet}
                      />

                  )
              }}
          />
          <Tabs.Screen
              name="profile"
              options={{
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                      <TabIcon
                          focused={focused}
                          icon={icons.user}
                      />

                  )
              }}
          />

      </Tabs>

  );
};

export default _layout;
