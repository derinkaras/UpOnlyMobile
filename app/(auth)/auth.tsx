import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image, TextInput} from 'react-native';
import {icons} from "@/constants/icons";
import {useRouter} from "expo-router";
import avatar from "@/assets/images/defaultAvatar.png";
import user from "@/assets/icons/user.png";
import {useAuth} from "@/contexts/AuthContext";
import BackButton from "@/Components/BackButton";
import CustomTextInput from "@/Components/CustomTextInput";


const auth = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(true);

    const {user, login, signup} = useAuth()

    const handleSubmit = async () => {
        try {
            if (isSignUp) {
                // @ts-ignore
                await signup(email, password, name);
            } else {
                // @ts-ignore
                await login(email, password, name);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (user) {
            router.replace("/(tabs)")
        }
    },[user])

    return (
        <>
            <SafeAreaView className="flex-1 bg-neutral-900">
                <View className="px-7">
                    <BackButton routing={true} setShowModal={false}/>
                    <View className="mt-14">
                        <Text className="text-textLighter text-3xl font-bold">Let's</Text>
                        <Text className="text-textLighter text-3xl font-bold mt-1">Get Started</Text>
                        <Text className="text-neutral-400 text-[18px] mt-5"> Create an account to track your expenses</Text>
                    </View>
                    <View
                        className="mt-5 gap-6"
                    >
                        <CustomTextInput icon={icons.user} placeholder={"name"} stateVar={name} stateVarSetter={setName}/>
                        <CustomTextInput icon={icons.email} placeholder={"email"} stateVar={email} stateVarSetter={setEmail}/>
                        <CustomTextInput icon={icons.key} placeholder={"password"} stateVar={password} stateVarSetter={setPassword}/>

                    </View>
                    <TouchableOpacity
                        className="bg-primary justify-center items-center mt-5 rounded-xl h-16 w-full"
                        onPress={handleSubmit}
                    >
                        <Text className="text-black font-medium text-2xl">{isSignUp ? "Sign Up" : "Sign In"}</Text>
                    </TouchableOpacity>
                    <View className="flex-row gap-2 justify-center items-center mt-5">
                        <Text className="text-[18px] text-textLighter">
                            {isSignUp ? "Already have an account?": "Don't have an account?" }
                        </Text>
                        <TouchableOpacity
                            className="justify-center items-center"
                            onPress={()=> setIsSignUp(!isSignUp)}
                        >
                            <Text className="text-[18px] text-primary">
                                {isSignUp ? "Sign In" : "Sign Up"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </>
  );
};

export default auth;
