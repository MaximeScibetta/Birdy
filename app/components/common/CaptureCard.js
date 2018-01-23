import React, { Component } from 'react';
import { View, Text } from 'react-native';

const CaptureCard = (props) => {
    return (
        <View>
            <Text>{props.capture.name}</Text>
            <Text>{props.capture.capture_data}</Text>
            <Text>{props.capture.fat_level}</Text>
            <Text>{props.capture.years_old}</Text>
            <Text>{props.capture.sexe}</Text>
        </View>
    )
}

export { CaptureCard };
