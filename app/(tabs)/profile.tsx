import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity, FlatList, ImageBackground} from 'react-native';
import {images} from "@/Constants/images";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import {useAuth} from "@/contexts/AuthContext";
import {addProfilePictureToDB} from "@/services/firebase";
import {icons} from "@/Constants/icons";
import * as Haptics from "expo-haptics"
import ProfileModal from "@/Components/ProfileModal";
import {pickImage} from "@/services/helpers";

const profile = () => {
    const [imageUri, setImageUri] = useState(null);
    const [selectedOption, setSelectedOption] = useState<String | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    const {user} = useAuth()

    const profileOptions = [
        { key: 'Edit Profile', icon: icons.user, color: "bg-blue-500"},
        { key: 'Settings', icon: icons.gear , color: "bg-green"},
        { key: 'Privacy Policy', icon: icons.privacy, color: "bg-neutral-600" },
        { key: 'Logout', icon: icons.power, color: "bg-red-500" },
    ];

    useEffect( () => {
        // @ts-ignore
        if (imageUri && imageUri !== user.profilePicture){
            // @ts-ignore
            addProfilePictureToDB(imageUri, user.uid)
        }
    }, [imageUri]);

    useEffect(() => {
        // @ts-ignore
        if (user && user.profilePicture){
            // @ts-ignore
            setImageUri(user.profilePicture);
        }

    }, [user]);


    return (
        <SafeAreaView
        className = "flex-1 bg-neutral-900"
        >
            <View
                className="justify-center items-center"
            >

                <Text className="text-center text-textLighter font-medium text-3xl mt-2">Profile</Text>
                <TouchableOpacity
                    onPress={()=> pickImage(setImageUri)}
                >
                    <Image
                        source={imageUri ? {uri: imageUri}: images.defaultAvatar}
                        className = "rounded-full mt-6 h-40 w-40"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <Text className = "text-2xl text-textLighter mt-4">{user?.name ? user.name: "User"}</Text>
                <Text className = "text-base text-neutral-500 mt-1">{user?.email}</Text>
            </View>
            <FlatList
                data = {profileOptions}
                renderItem={ ({item})=> (
                    <TouchableOpacity
                        onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                            setSelectedOption(item.key);
                            setShowModal(true);
                        }}
                    >
                        <View
                            className="flex-row h-16 w-full mt-4 items-center gap-4"
                        >
                            <View
                                className= {`w-14 h-14 ${item.color} rounded-xl justify-center items-center`}
                            >
                                <Image
                                    source = {item.icon}
                                    resizeMode="contain"
                                    className = "w-8 h-8"
                                    tintColor="white"
                                />
                            </View>
                            <Text className = "text-textLighter text-[16px] flex-1">{item.key}</Text>
                            <Image
                                source = {icons.right}
                                resizeMode="cover"
                                className = "w-4 h-4"
                                tintColor="white"
                            />
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor = { (item) => item.key}
                scrollEnabled={false}
                className= "px-8 mt-7"
            />
            {showModal && (
                <ProfileModal
                    setShowModal={setShowModal}
                    showModal={showModal}
                    selectedOption={selectedOption}
                    imageUri={imageUri}
                    setImageUri={setImageUri}
                />
            )}

        </SafeAreaView>
    );
};

export default profile;
