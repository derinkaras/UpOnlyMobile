import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

interface DropdownItem {
    value: string;
    label: string;
}

interface CustomDropdownProps {
    value: string | null;
    onChange: (value: string) => void;
    items: DropdownItem[];
    placeholder?: string;
}

const CustomDropdown = ({
                            value,
                            onChange,
                            items,
                            placeholder = 'Select an option',
                        }: CustomDropdownProps) => {
    return (
        <View style={styles.container}>
            <Dropdown
                data={items}
                value={value}
                activeColor="#262626"
                onChange={(item) => onChange(item.value)} // this automatically closes dropdown
                labelField="label"
                valueField="value"
                placeholder={placeholder}
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                maxHeight={200}
                itemTextStyle={styles.itemTextStyle}
                containerStyle={styles.dropdownList}
                renderItem={(item, selected) => (
                    <View
                        style={[
                            styles.item,
                            selected && { backgroundColor: '#333', borderRadius: 8, padding: 10 },
                        ]}
                    >
                        <Text
                            style={[
                                styles.itemTextStyle,
                                selected && { color: 'white' },
                            ]}
                        >
                            {item.label}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    dropdown: {
        height: 50,
        borderColor: '#a3a3a3',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        backgroundColor: '#262626',
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#888',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#a3a3a3',
    },
    itemTextStyle: {
        fontSize: 16,
        color: 'white',
    },
    dropdownList: {
        borderRadius: 15,
        backgroundColor: '#171717',
        borderColor: '#a3a3a3',
        borderWidth: 0,
    },
    item: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});

export default CustomDropdown;
