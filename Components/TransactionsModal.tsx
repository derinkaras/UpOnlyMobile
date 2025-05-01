import React, {useState} from 'react';
import {View, Text, Modal, TextInput, TouchableOpacity, Image} from 'react-native';
import BackButton from "@/Components/BackButton";
import CustomDropdown from "@/Components/CustomDropdown";
import {getCategoriesOptions, getWalletsArray, getWalletsOptions} from "@/services/helpers";
import {useAuth} from "@/contexts/AuthContext";
import {addTransactionToDB, addWalletToDB, deleteTransactionFromDB, deleteWalletFromDB} from "@/services/firebase";
import {icons} from "@/constants/icons";

const TransactionsModal = ({showModal, setShowModal, isUpdate, transactionToUpdate}: any) => {
    const [type, setType] = useState(isUpdate ? transactionToUpdate.type : "")
    const [wallet, setWallet] = useState(isUpdate ? transactionToUpdate.wallet : "")
    const [category, setCategory] = useState(isUpdate ? transactionToUpdate.category : "")
    const [date, setDate] = useState(isUpdate ? transactionToUpdate.date : "")
    const [amount, setAmount] = useState(isUpdate ? transactionToUpdate.amount : "")
    const [description, setDescription] = useState(isUpdate ? transactionToUpdate.description : "")
    const {user, updateUserData} = useAuth()


    const handleAddTransaction = async (itemToUpdate: any) =>  {
        await addTransactionToDB({type, wallet, category, date, amount, description, user}, itemToUpdate)
        await updateUserData(user.uid)
    }


    return (
        <Modal
            transparent={true}
            visible={showModal}
            onRequestClose={() => {setShowModal(false);}} // This is for the android back button
            animationType="slide"
        >
            <View className="bg-neutral-800 flex-1 px-6">
                <View className="mt-20 flex-1">
                    <View className = "relative flex-row items-center">
                        <View className="absolute left-0">
                            <BackButton routing={false} setShowModal={setShowModal} />
                        </View>
                        <Text className="text-textLighter text-3xl left-1/2 -translate-x-1/2">{isUpdate ? "Update Transaction" : "New Transaction"}</Text>
                    </View>
                    <View className="mt-8 gap-4" >
                        <View>
                            <Text className="text-xl text-textLighter">Type</Text>
                            <CustomDropdown
                                value={type}
                                onChange={setType}
                                items={[
                                    { label: 'Expense', value: 'Expense' },
                                    { label: 'Income', value: 'Income' },
                                ]}
                                placeholder="Select a type"
                            />
                        </View>
                        <View>
                            <Text className="text-xl text-textLighter">Wallet</Text>
                            <CustomDropdown
                                value={wallet}
                                onChange={setWallet}
                                items={getWalletsOptions(user)}
                                placeholder="Select one of your wallets"
                            />
                        </View>
                        <View>
                            <Text className="text-xl text-textLighter">{type === "Expense" ? "Expense" : "Income"} Category</Text>
                            <CustomDropdown
                                value={category}
                                onChange={setCategory}
                                items={getCategoriesOptions(type === "Expense" ? "Expense" : "Income")}
                                placeholder="Select a category"
                            />
                        </View>
                        <View>
                            <Text className="text-xl text-textLighter">Amount</Text>
                            <TextInput
                                value={amount}
                                onChangeText={setAmount}
                                placeholder="E.g 900"
                                className="w-full h-14 p-2 border-2 border-neutral-500 rounded-2xl mt-2 text-neutral-500"
                                placeholderTextColor="#737373"
                            />
                        </View>
                        <View>
                            <Text className="text-xl text-textLighter mt-2">Date</Text>
                            <TextInput
                                value={date}
                                onChangeText={setDate}
                                placeholder="E.g 12/21/2003"
                                className="w-full h-14 p-2 border-2 border-neutral-500 rounded-2xl mt-2 text-neutral-500"
                                placeholderTextColor="#737373"
                            />
                        </View>
                        <View>
                            <Text className="text-xl text-textLighter mt-2">Description</Text>
                            <TextInput
                                value={description}
                                onChangeText={setDescription}
                                placeholder="E.g Kinjo fine dinning"
                                className="w-full h-14 p-2 border-2 border-neutral-500 rounded-2xl mt-2 text-neutral-500"
                                placeholderTextColor="#737373"
                            />
                        </View>
                    </View>
                </View>
                <View>
                    {!isUpdate && (
                        <TouchableOpacity
                            className="bg-primary w-full h-16 rounded-3xl mb-10 justify-center items-center"
                            onPress={async ()=> {
                                await handleAddTransaction(false)
                                await updateUserData(user.uid)
                                setShowModal(false)
                            }}

                        >
                            <Text className="text-[20px] font-medium">{isUpdate ? "Update Transaction" : "Add Transaction"}</Text>
                        </TouchableOpacity>
                    )}

                    {isUpdate && (
                        <View className="flex-row w-full gap-2">
                            <TouchableOpacity
                                className="bg-red-500 w-16 h-16 rounded-3xl justify-center items-center"
                                onPress={async ()=> {
                                    await deleteTransactionFromDB(transactionToUpdate.id, user)
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
                                    await handleAddTransaction(transactionToUpdate)
                                    await updateUserData(user.uid)

                                    setShowModal(false)
                                }}
                            >
                                <Text className="text-[20px] font-medium">{isUpdate ? "Update Transaction" : "Add Transaction"}</Text>
                            </TouchableOpacity>
                        </View>

                    )}
                </View>
            </View>

        </Modal>
  );
};

export default TransactionsModal;
