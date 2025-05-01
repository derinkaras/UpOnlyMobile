import React, {useState} from 'react';
import {View, Text, Modal, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import {icons} from "@/constants/icons";
import {useAuth} from "@/contexts/AuthContext";
import {useRouter} from "expo-router";
import {images} from "@/constants/images";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import {pickImage} from "@/services/helpers";
import CustomTextInput from "@/Components/CustomTextInput";
import BackButton from "@/Components/BackButton";

const ProfileModal = ({ showModal, setShowModal, selectedOption, imageUri, setImageUri}: any) => {
    const {logout, user} = useAuth()

    const router = useRouter()
    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => setShowModal(false)} // (optional) handle Android back button
        >
            <View className="bg-neutral-900 px-8 flex-1">
                <View className="mt-20">
                    <BackButton routing={false} setShowModal={setShowModal} />
                    { selectedOption === "Logout" && (
                        <View className="justify-center items-center">
                            <View className="flex-row gap-2">
                                <Text className="text-textLighter text-xl">Are you sure you want to logout?</Text>
                                <TouchableOpacity
                                    onPress={ async ()=> {
                                        await logout()
                                        setShowModal(false)
                                        router.push("/(auth)")
                                }}
                                >
                                    <Image
                                        source={icons.check}
                                        resizeMode="cover"
                                        className="w-5 h-5"
                                        tintColor="green"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>setShowModal(false)}
                                >
                                    <Image
                                        source={icons.xmark}
                                        resizeMode="cover"
                                        className="w-5 h-5"
                                        tintColor="red"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {selectedOption === "Edit Profile" && (
                        <View>
                            <View
                                className="justify-center items-center mb-5"
                            >
                                <Text className="text-center text-textLighter font-medium text-3xl mt-2">Profile</Text>
                                <TouchableOpacity
                                    onPress={() => pickImage(setImageUri)}
                                >
                                    <Image
                                        source={imageUri ? {uri: imageUri}: images.defaultAvatar}
                                        className = "rounded-full mt-6 h-40 w-40"
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View
                                className="justify-center items-center gap-4"
                            >
                                <CustomTextInput icon={icons.user} placeholder={"name"} stateVar={name} stateVarSetter={setName} />
                                <CustomTextInput icon={icons.email} placeholder={"email"} stateVar={email} stateVarSetter={setEmail} />
                            </View>

                        </View>
                    )}

                </View>
            </View>
        </Modal>
    );
};

export default ProfileModal;
