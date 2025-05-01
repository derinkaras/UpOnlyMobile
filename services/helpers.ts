import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import {doc, getDoc} from "@firebase/firestore";
import {firestore} from "@/config/firebase";
import {expenseCategories, incomeCategories} from "@/constants/transactionTypes";

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
    const wallets = user?.wallets || {}
    let totalBalance = 0;
    for (const [key, value] of Object.entries(wallets)) {
        // @ts-ignore
        totalBalance += Number(value.walletBalance)
    }
    return totalBalance.toFixed(2);
}


export const getWalletsArray = (user: any) => {
    const wallets = user?.wallets || {}
    const walletsArray = Object.entries(wallets).map(([key, value]: any) => {
            return {id: key, ...value};
    })
    return walletsArray;
}


export const getWalletsOptions = (user: any) => {
    const wallets = user?.wallets;
    const walletsArray = Object.entries(wallets).map(([key, value]: any) => {
        return {"label": value.walletName, "value": value.walletName};
    })
    return walletsArray;
}


export const getCategoriesOptions = (type: string) => {
    let categories;
    if (type === "Expense") {
        categories = Object.entries(expenseCategories).map(([key, value]: any) => {
            return {"label": value.label, "value": value.label};
        })
    } else {
        categories = Object.entries(incomeCategories).map(([key, value]: any) => {
            return {"label": value.label, "value": value.label};
        })
    }
    return categories;
}

export const getTransactionsArray = (user: any) => {
    const transactions = user?.transactions || {}
    const transactionsArray = Object.entries(transactions).map(([key, value]: any) => {
        return {id: key, ...value};
    })
    return transactionsArray;
}
