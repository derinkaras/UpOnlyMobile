import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image, ImageBackground, FlatList, ScrollView} from 'react-native';
import {useAuth} from "@/contexts/AuthContext";
import {useRouter} from "expo-router";
import {icons} from "@/constants/icons";
import {images} from "@/constants/images";
import {getTotalBalanceFromLocalDB, getTransactionsArray} from "@/services/helpers";
import TransactionsModal from "@/Components/TransactionsModal";
import addIcon from "@/assets/icons/circle-plus.png";
import {expenseCategories, incomeCategories, tailwindColorMap} from "@/constants/transactionTypes";

const index = () => {
    const {logout} = useAuth()
    const [totalBalance, setTotalBalance] = useState(0);
    const router = useRouter();
    const {user} = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [transactionToUpdate, setTransactionToUpdate] = useState({});

    useEffect(() => {
        const updateTotalBalance = async ()=> {
            const totalBalance = await getTotalBalanceFromLocalDB(user)
            // @ts-ignore
            setTotalBalance(totalBalance);
        }
        if (user){
            updateTotalBalance();
        }
    }, [user]);

    interface TransactionItem {
        id: string
        category: string;
        date: string;
        amount: string;
        description: string;
        type: "Income" | "Expense";
        wallet: string
    }
    const getCorrespondingInfo =  (type:string) => {
        if (type == "Income") {
            return incomeCategories;
        } else {
            return expenseCategories;
        }

    }
    const capatalizeFirstLetter = (str: string) => {
        return str[0].toUpperCase() + str.slice(1);
    }


    return (
            <SafeAreaView className="bg-neutral-900 flex-1 relative">
                <ScrollView
                    className="px-6"
                    showsVerticalScrollIndicator={false}
                >
                    <View
                        className="flex-row justify-between items-center"
                    >
                        <View>
                            <Text className = "text-neutral-500 text-xl">Hello,</Text>
                            <Text className = "text-textLighter text-3xl mt-1">{user.name}</Text>
                        </View>
                        <View
                            className="bg-neutral-700 rounded-full h-12 w-12 justify-center items-center"
                        >
                            <TouchableOpacity>
                                <Image
                                    source={icons.search}
                                    tintColor="#CCCCCC"
                                    resizeMode="contain"
                                    className="w-6 h-6 overflow-hidden"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ImageBackground
                        source={images.card}
                        resizeMode="contain"
                        className="w-full h-72"
                    >
                        <Text className="text-black mt-10 ml-8 text-xl">Total Balance</Text>
                        <Text className="text-black mt-2 ml-8 text-3xl font-bold">${totalBalance}</Text>

                        <View
                            className="flex-row justify-between mx-8 mt-7"
                        >
                            <View>
                                <View className="flex-row gap-2">
                                    <View
                                        className="bg-neutral-400 rounded-full w-8 h-8 justify-center items-center"
                                    >
                                        <Image
                                            source={icons.downArrow}
                                            resizeMode="contain"
                                            className="w-4 h-4"
                                        />
                                    </View>
                                    <Text className="text-black text-xl">
                                        Income
                                    </Text>
                                </View>
                                <Text className="text-xl text-green text-center mt-2">$ 2342</Text>
                            </View>

                            <View>
                                <View className="flex-row gap-2">
                                    <View
                                        className="bg-neutral-400 rounded-full w-8 h-8 justify-center items-center"
                                    >
                                        <Image
                                            source={icons.upArrow}
                                            resizeMode="contain"
                                            className="w-4 h-4"
                                        />
                                    </View>
                                    <Text className="text-black text-xl">
                                        Expense
                                    </Text>
                                </View>
                                <Text className="text-xl text-red-500 text-center mt-2">$ 234</Text>
                            </View>

                        </View>
                    </ImageBackground>
                    <Text className="text-2xl text-textLighter font-medium mt-2">Recent Transactions</Text>
                    <FlatList
                        data={getTransactionsArray(user)}
                        scrollEnabled={false}
                        renderItem={({ item }: { item: TransactionItem }) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    setTransactionToUpdate(item)
                                    setIsUpdate(true);
                                    setShowModal(true);
                                }}>
                                    <View className="flex-row w-full h-[65px] items-center gap-4 mt-4 bg-neutral-800 rounded-2xl px-2">
                                        <View className="flex-row items-center">
                                            <View
                                                style={{ backgroundColor: getCorrespondingInfo(item.type)[item.category].bgColor }}
                                                className= "h-12 w-12 rounded-2xl justify-center items-center" >
                                                <Image
                                                    source={ getCorrespondingInfo(item.type)[item.category].icon}
                                                    className="w-7 h-7"
                                                    tintColor="white"
                                                />
                                            </View>
                                            <View className="flex-1 ml-2">
                                                <Text className="text-xl text-textLighter">{capatalizeFirstLetter(item.category)}</Text>
                                                <Text className="text-neutral-500">{item.description}</Text>
                                            </View>
                                            <View className="justify-center items-center">
                                                <Text
                                                    className={item.type === "Expense" ? "text-red-500": "text-green"}
                                                >
                                                    {item.type === "Expense" ? `- $${item.amount}` : `+ $${item.amount}`}
                                                </Text>
                                                <Text className="text-neutral-500 ml-4">12 jan</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />


                </ScrollView>




                <TouchableOpacity
                    className="absolute h-14 w-14 bg-primary rounded-full top-50 bottom-10 left-50 right-10 justify-center items-center"
                    onPress={() => {
                        setIsUpdate(false);
                        setShowModal(true)

                    }}
                >
                        <Image
                            source={icons.plus}
                            resizeMode="contain"
                            className="w-7 h-7"
                            tintColor="black"
                        />

                </TouchableOpacity>


                {showModal && (
                    <TransactionsModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        isUpdate={isUpdate}
                        transactionToUpdate = {transactionToUpdate}
                    />
                )}

            </SafeAreaView>
  );
};

export default index;
