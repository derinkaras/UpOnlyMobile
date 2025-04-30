

import React from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import {icons} from "@/Constants/icons";

interface Props {icon:any, placeholder:string, stateVar:any, stateVarSetter: any}


const CustomTextInput = ({icon, placeholder, stateVar, stateVarSetter}: Props) => {

    return (
        <View className="flex-row border-2 border-neutral-400 p-5 rounded-2xl w-full h-16 justify-start items-center gap-4">
            <Image
                source={icon}
                style={{
                    width:30,
                    height:30
                }}
                tintColor="#737373"
                resizeMode="contain"
            />
            <TextInput
                className="text-neutral-400 flex-1"
                placeholder= {`Enter your ${placeholder}`}
                value = {stateVar}
                secureTextEntry={placeholder === "password"}
                onChangeText={stateVarSetter}
                placeholderTextColor="#737373"
            />
        </View>
    );
};

export default CustomTextInput;
