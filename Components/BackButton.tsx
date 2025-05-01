import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {icons} from "@/constants/icons";
import {router, useRouter} from "expo-router";

interface props {
    routing: boolean,
    setShowModal?: boolean | ((boolean: boolean) => void)
}

const BackButton = ({routing, setShowModal}: props) => {
    const router = useRouter();

    const handlePress = () => {
        if (routing) {
            router.back()
        } else if (typeof setShowModal === "function" ) {
            setShowModal(false)
        }
    }

    return (
        <TouchableOpacity
            className="bg-neutral-600 w-10 h-10 rounded-xl justify-center items-center  p-1"
            onPress={handlePress}
        >
            <Image
                source={icons.back}
                resizeMode="contain"
                style = {{
                    width: 30,
                    height: 30
                }}
                tintColor="white"
            />
        </TouchableOpacity>

  );
};

export default BackButton;
