import React, {useEffect, useState} from 'react';
import {View, Text, Modal, TextInput, TouchableOpacity, Image} from 'react-native';
import BackButton from "@/Components/BackButton";
import {icons} from "@/constants/icons";
import {pickImage} from "@/services/helpers";
import {addWalletToDB, deleteWalletFromDB} from "@/services/firebase";
import {useAuth} from "@/contexts/AuthContext";

const WalletModal = ({showModal, setShowModal, isUpdate, walletItemToUpdate}: any) => {
    const {user, updateUserData} = useAuth()
    const [walletName, setWalletName] = useState( isUpdate ? walletItemToUpdate.walletName : "");
    const [walletIconUri, setWalletIconUri] = useState(isUpdate ? walletItemToUpdate.walletIcon : "")
    const [balance, setBalance] = useState(isUpdate ? walletItemToUpdate.walletBalance : "")
    const [balanceError, setBalanceError] = useState(false)


    useEffect(() => {
            // This is a guard for the initial component mount
            if (balance) {
                const num = Number(balance)
                if (isNaN(num)){
                    setBalanceError(true)
                    setBalance("")

                } else{
                    setBalanceError(false)
                }
            }
    }, [balance]);




    // @ts-ignore
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {setShowModal(false)}} // For android back button
        >
            <View
                className="flex-1 "
            >
                <View className="flex-1 mt-24 bg-neutral-900 rounded-3xl px-6">
                    <View className="flex-row mt-5 items-center relative">
                        <View className="absolute left-0">
                            <BackButton routing={false} setShowModal={setShowModal}/>
                        </View>

                        <Text className="text-textLighter text-3xl left-1/2 -translate-x-1/2">{isUpdate ? "Update Wallet" : "New Wallet"}</Text>
                    </View>
                    <View
                        className="flex-1"
                    >
                        <Text className="text-xl mt-8 mb-2 text-textLighter">Wallet Name</Text>
                        <TextInput
                            placeholder="Name"
                            value={walletName}
                            onChangeText={setWalletName}
                            className="w-full h-16 border-2 border-neutral-400 text-neutral-400 rounded-2xl p-2"
                            placeholderTextColor="#737373"
                        />
                        <Text className="text-xl mt-6 mb-2 text-textLighter">Wallet Icon</Text>
                        { (!walletIconUri && !isUpdate) ? (

                            <TouchableOpacity
                                className="w-full h-16 border-2 border-neutral-400 border-dotted p-4 rounded-2xl justify-center items-center bg-neutral-800 flex-row gap-2"
                                onPress={()=> pickImage(setWalletIconUri)}
                            >
                                <Image
                                    source={icons.upload}
                                    resizeMode="cover"
                                    className="w-7 h-7"
                                    tintColor="#a3a3a3"
                                />
                                <Text className = "text-xl text-neutral-400">Upload Image</Text>

                            </TouchableOpacity>
                        ): (
                            <TouchableOpacity
                                onPress={()=> pickImage(setWalletIconUri)}
                            >
                                <Image
                                    source={{uri: walletIconUri}}
                                    resizeMode="contain"
                                    className="w-52 h-52 justify-center items-center rounded-3xl"
                                />
                            </TouchableOpacity>
                        )}
                        <View className="flex-row gap-2">
                            <Text className="text-xl mt-6 mb-2 text-textLighter">Balance</Text>
                            {balanceError && (
                                <Text className="text-xl mt-6 mb-2 text-red-500">Error, make sure balance is a number</Text>
                            )}
                        </View>
                        <TextInput
                            placeholder="2341"
                            value={balance}
                            onChangeText={setBalance}
                            className="w-full h-16 border-2 border-neutral-400 text-neutral-400 rounded-2xl p-2"
                            placeholderTextColor="#737373"
                        />
                    </View>
                    {!isUpdate && (
                        <TouchableOpacity
                            className="bg-primary w-full h-16 rounded-3xl mb-10 justify-center items-center"
                            onPress={async ()=> {
                                await addWalletToDB(walletName, walletIconUri, balance, user.uid, walletItemToUpdate) // This handles both the case of adding a new doc and editing an existing one
                                await updateUserData(user.uid)
                                setShowModal(false)
                            }}

                        >
                            <Text className="text-[20px] font-medium">{isUpdate ? "Update Wallet" : "Add Wallet"}</Text>
                        </TouchableOpacity>
                    )}

                    {isUpdate && (
                        <View className="flex-row w-full gap-2">
                            <TouchableOpacity
                                className="bg-red-500 w-16 h-16 rounded-3xl justify-center items-center"
                                onPress={async ()=> {
                                    await deleteWalletFromDB(walletItemToUpdate, user.uid)
                                    await updateUserData(user.uid)
                                    setShowModal(false)
                                }}


                            >
                                <Image
                                    source={icons.trash}
                                    tintColor="white"
                                    className="w-7 h-7"
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="bg-primary flex-1 h-16 rounded-3xl mb-10 justify-center items-center"
                                onPress={async ()=> {
                                    await addWalletToDB(walletName, walletIconUri, balance, user.uid, walletItemToUpdate) // This handles both the case of adding a new doc and editing an existing one
                                    await updateUserData(user.uid)
                                    setShowModal(false)
                                }}
                            >
                                <Text className="text-[20px] font-medium">{isUpdate ? "Update Wallet" : "Add Wallet"}</Text>
                            </TouchableOpacity>
                        </View>

                    )}





                </View>

            </View>




        </Modal>
    );
};

export default WalletModal;
