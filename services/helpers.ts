import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import {doc, getDoc} from "@firebase/firestore";
import {firestore} from "@/config/firebase";

export const pickImage = async (setImageUri: any) => {
    // Request permissions
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        Toast.show({
            type: 'error',
            text1: 'Permission Required',
            text2: 'Cannot replace profile photo without permission',
        });
        return;
    }

    // Launch image picker with configuration options
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,      // Enables the image editor before selection
        aspect: [1, 1],           // Maintain a square aspect ratio in editor
        quality: 1,               // Maximum quality (1 = highest, 0 = lowest)
        allowsMultipleSelection: false,
        exif: false,              // Don't include EXIF data (reduces size)
    });

    if (!result.canceled) {
        // @ts-ignore
        setImageUri(result.assets[0].uri);
    }
};


export const getTotalBalanceFromLocalDB = async (user: any) => {
    // The user is assumed to have been updated with new wallet stuff using the authcontexts update
    const wallets = user?.wallets || []
    let totalBalance = 0;
    for (const wallet of wallets) {
        totalBalance += Number(wallet.walletBalance)
    }
    return totalBalance.toFixed(2);
}