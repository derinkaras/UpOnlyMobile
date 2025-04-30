// This file controls the adding and deleting of documents to the firestore database.
// Going to add a hook for its use
// Make sure to update both the local userData and the one on the firestore database

import { firestore } from "@/config/firebase";
import {deleteField, doc, getDoc, setDoc, updateDoc} from "@firebase/firestore";
import {set} from "@firebase/database";

export const addProfilePictureToDB = async (source: string, userId: string)  => {
    const docRef = doc(firestore, "users", userId);
    await setDoc(docRef, {
        profilePicture: source,
    }, {merge: true});
}

export const addWalletToDB = async (walletName: string, walletIcon: string, walletBalance: string, uderId: string, walletItemToUpdate: any)  => {
    const docRef = doc(firestore, "users", uderId);
    const userDoc = await getDoc(docRef);
    const walletData = {
        walletName: walletName,
        walletIcon: walletIcon,
        walletBalance: walletBalance,
    }

    if (userDoc.exists()) {
        const docSnap = userDoc.data()
        const prevWallets = docSnap?.wallets || {}
        if (walletItemToUpdate) {
            await updateDoc(docRef, {
                [`wallets.${walletItemToUpdate.id}`]: walletData
            })

        } else {
            await setDoc(docRef, {
                wallets: {
                    ...prevWallets,
                    [Date.now().toString()]: {
                        ...walletData
                    }
                }
            }, {merge: true});
        }
    }
}

export const deleteWalletFromDB = async (walletItemToDelete: any, userId: string)  => {
    const docRef = doc(firestore, "users", userId);
    const userDoc = await getDoc(docRef)
    const docSnap = userDoc.data()
    const prevWallets = docSnap?.wallets || []
    await updateDoc(docRef, {
        [`wallets.${walletItemToDelete.id}`]: deleteField(),
    });
}




