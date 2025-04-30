import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {useAuth} from "@/contexts/AuthContext";
import {signOut} from "@firebase/auth";
import {useRouter} from "expo-router";

const index = () => {
    const {logout} = useAuth()
    const router = useRouter();

    const handleLogout = async () => {
        // @ts-ignore
        await logout();
        router.replace("/(auth)")
    }

    return (
            <SafeAreaView className="bg-neutral-900 flex-1">
                <TouchableOpacity
                    onPress={handleLogout}
                >
                    <Text> Sign out </Text>
                </TouchableOpacity>
            </SafeAreaView>
  );
};

export default index;
