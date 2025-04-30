// This file controls the adding and deleting of documents to the firestore database.
// Going to add a hook for its use
// Make sure to update both the local userData and the one on the firestore database

import { firestore } from "@/config/firebase";
import {doc, getDoc, setDoc, updateDoc} from "@firebase/firestore";
import {set} from "@firebase/database";

export const addProfilePictureToDB = async (source: string, userId: string)  => {
    const docRef = doc(firestore, "users", userId);
    await setDoc(docRef, {
        profilePicture: source,
    }, {merge: true});
}

export const addWalletToDB = async (walletName: string, walletIcon: string, walletBalance: string, uderId: string, walletItemToUpdate)  => {
    const docRef = doc(firestore, "users", uderId);
    const userDoc = await getDoc(docRef);
    const walletData = {
        walletName: walletName,
        walletIcon: walletIcon,
        walletBalance: walletBalance,
    }

    if (userDoc.exists()) {
        const docSnap = userDoc.data()
        const prevWallets = docSnap?.wallets || []
        if (walletItemToUpdate) {
            const updatedWallet = prevWallets.map((wallet: any)=>{
                if (walletItemToUpdate.id === wallet.id) {
                    return {...wallet, ...walletData}
                } else{
                    return wallet
                }
            })
            await setDoc(docRef, {
                wallets: updatedWallet,
            }
                , {merge: true});

        } else {

            await setDoc(docRef, {
                wallets: [
                    ...prevWallets,
                    {
                        id: Date.now().toString(),
                        ...walletData
                    }
                ]
            }, {merge: true});

        }
    }
}


export const deleteWalletFromDB = async (walletItemToDelete: any, userId: string)  => {
    const docRef = doc(firestore, "users", userId);
    const userDoc = await getDoc(docRef)
    const docSnap = userDoc.data()
    const prevWallets = docSnap?.wallets || []

    const filteredWallets = prevWallets.filter((wallet: any)=>{
        if (wallet.id === walletItemToDelete.id) {
            return false
        }
        return true
    })

    await setDoc(docRef, {
        wallets: filteredWallets,
    }, {merge: true});
}

