import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

const Field = ({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType }) => {


    return (
        <View>

            <Text>{label}</Text>

            <TextInput
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                autoCorrect={false}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}/>
        </View>
    )
}

export { Field };
