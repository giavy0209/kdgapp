import React from 'react';
import {StyleSheet,Dimensions } from 'react-native';
const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        fontSize: 40,
        color: '#ff0000',
        zIndex: 9,
        width: 40,
        height: 40
    }
})

export default styles