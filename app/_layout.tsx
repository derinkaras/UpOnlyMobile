// In app/_layout.js
import './globals.css'
import { Stack} from "expo-router";
import Toast, { BaseToast, ErrorToast, BaseToastProps } from 'react-native-toast-message';
import { StatusBar} from "react-native";
import {useEffect} from "react";
import {AuthProvider} from "@/contexts/AuthContext";

const toastConfig = {
    success: (props: BaseToastProps) => (
        <BaseToast
            {...props}
            style={{
                backgroundColor: '#1E1E1E', // Solid dark background
                borderLeftColor: '#22C55E', // Green left border
                borderRadius: 12,
                elevation: 5,
                shadowColor: '#000',
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 6,
            }}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#fff',
            }}
            text2Style={{
                fontSize: 14,
                color: '#ccc',
            }}
        />
    ),
    error: (props: BaseToastProps) => (
        <ErrorToast
            {...props}
            style={{
                backgroundColor: '#1E1E1E',
                borderLeftColor: '#EF4444',
                borderRadius: 12,
                elevation: 5,
                shadowColor: '#000',
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 6,
            }}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#fff',
            }}
            text2Style={{
                fontSize: 14,
                color: '#ccc',
            }}
        />
    ),
};



export default function RootLayout() {
    return(
        <>
            <StatusBar hidden={true}/>
            <AuthProvider>
                <Stack
                    screenOptions={{
                        animation: "slide_from_left",
                        animationDuration: 300,
                    }}
                >
                    <Stack.Screen
                        name = "(auth)"
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name = "(tabs)"
                        options={{
                            headerShown: false}}
                    />
                </Stack>
            </AuthProvider>
            <Toast
                position="top"
                visibilityTime={3000}
                topOffset={60}
                config={toastConfig}
            />
        </>
  )
}
