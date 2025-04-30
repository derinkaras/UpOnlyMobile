import React from 'react';
import {Stack, Tabs} from "expo-router";

const _layout = () => {
    return (
        <Stack
        >
            <Stack.Screen
                name="index"
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="auth"
                options={{headerShown: false}}
            />
        </Stack>

    );
};

export default _layout;
