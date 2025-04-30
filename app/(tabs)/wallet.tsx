import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {exampleUserData} from "@/services/exampleUserData";
import {icons} from "@/Constants/icons";
import WalletModal from "@/Components/WalletModal";
import {useAuth} from "@/contexts/AuthContext";
import {getTotalBalanceFromLocalDB} from "@/services/helpers";

const wallet = () => {
    const [showModal, setShowModal] = useState(false);
    const [totalBalance, setTotalBalance] = useState(0);
    const [ isUpdate, setIsUpdate ] = useState(false);
    const [ walletItemToUpdate, setWalletItemToUpdate] = useState(null);
    const {user} = useAuth()

    useEffect(() => {
        const updateTotalBalance = async ()=> {
            const totalBalance = await getTotalBalanceFromLocalDB(user)
            setTotalBalance(totalBalance);
        }
        if (user){
            updateTotalBalance();
        }
    }, [user]);


    const turnWalletToArray = (user: any) => {
        const walletArray = Object.entries(user?.wallets).map(([key,value]: [string, any])=>{
                return {"id": key, ...value}
        })
        return walletArray;
    }



    return (
        <SafeAreaView
            className="bg-black flex-1"
        >
            <View className="justify-center items-center mt-16">
                <Text
                    className="text-textLighter text-6xl font-medium"
                >
                    ${totalBalance.toString()}
                </Text>
                <Text className = "text-neutral-500 text-xl"> Total Balance </Text>
            </View>
            <ScrollView
                className="bg-neutral-900 flex-1 mt-14 rounded-t-3xl px-6"
            >
                <View
                    className="flex-row justify-between mt-7"
                >
                    <Text
                        className="text-textLighter text-2xl font-medium"
                    >
                        My Wallets
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            setIsUpdate(false)
                            setShowModal(true)
                        }}
                    >
                        <Image
                            source = {icons.addIcon}
                            resizeMode="cover"
                            tintColor="#a3e635"
                            className="w-10 h-10"
                        />
                    </TouchableOpacity>

                </View>
                { user?.wallets && (
                    <FlatList
                        data={turnWalletToArray(user)}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setWalletItemToUpdate(item);
                                    setIsUpdate(true);
                                    setShowModal(true)
                                }}
                            >
                                <View className="flex-row w-full h-14 items-center gap-4 mt-4">
                                    <Image
                                        source={{uri: item.walletIcon}}
                                        resizeMode="contain"
                                        className="w-14 h-14 rounded-2xl"
                                    />
                                    <View className="flex-1">
                                        <Text className="text-xl text-textLighter">{item.walletName}</Text>
                                        <Text className="text-base text-neutral-500">${item.walletBalance}</Text>
                                    </View>
                                    <Image
                                        source = {icons.right}
                                        resizeMode="cover"
                                        className = "w-4 h-4"
                                        tintColor="white"
                                    />
                                </View>
                            </TouchableOpacity>

                        )}
                    />
                )}
            </ScrollView>
            {showModal && (
                <WalletModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    isUpdate = {isUpdate}
                    walletItemToUpdate={walletItemToUpdate}
                />
            )}

        </SafeAreaView>
    );
};

export default wallet;
