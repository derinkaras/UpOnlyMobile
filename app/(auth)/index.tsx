import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import {images} from "@/Constants/images";
import {router, useRouter} from "expo-router";
import {useAuth} from "@/contexts/AuthContext";

const index = () => {
    const router = useRouter();
    const {user} = useAuth()
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (user) {
            router.replace("/(tabs)")
        }
    },[user])

    setTimeout(() => setLoading(false), 2000)

    return (
      <>
          {loading ? (
              <SafeAreaView className="bg-neutral-900 flex-1">
                  <View className="flex-1 justify-center items-center">
                      <Image
                          source={images.splash}
                          resizeMode="contain"
                      />
                  </View>

              </SafeAreaView>

          ): (
              <>
                 <SafeAreaView className="bg-neutral-900 flex-1">
                      <View className="px-10 flex-1">
                          <TouchableOpacity  className="flex-row justify-end"
                                             onPress={() => {router.push("/auth")}}
                          >
                              <Text className="text-textLighter text-[18px]"> Sign in</Text>
                          </TouchableOpacity>

                          <View className="justify-start items-center mt-40">
                              <Image
                                  source={images.welcome}
                                  resizeMode="contain"
                              />
                          </View>
                      </View>
                    </SafeAreaView>
                    <View className="shadow-xl shadow-white bg-neutral-900 h-[350px] px-[50px] py-5">
                        <Text className="text-white font-bold text-4xl text-center mt-5">Always take control of your finances</Text>
                        <Text className="text-textLighter text-base text-center mt-5"> Finances must be arranged to set a better life style in the future</Text>
                        <TouchableOpacity className="bg-primary justify-center items-center mt-5 rounded-xl h-16 w-96"
                                          onPress={() => {router.push("/auth")}}
                        >
                            <Text className="text-black font-medium text-2xl">Get Started</Text>
                        </TouchableOpacity>
                    </View>


              </>

          )}

      </>
    );
};

export default index;
