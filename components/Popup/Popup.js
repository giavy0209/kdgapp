import React, { useState, useCallback,useEffect } from 'react';
import Modal from 'react-native-modal'
import {View,Text } from 'react-native'

export default function App({title, isModalVisible, type}){
  
    return(
        <>
        <Modal animationIn='bounceInRight' isVisible={isModalVisible}>
            <View style={{backgroundColor: type === 'success' ? '#26a65b' : '#f54336', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, right: 10, paddingVertical: 5, borderRadius: 10}}>
                <Text style={{color: '#fff', paddingHorizontal: 10}}>{title}</Text>
            </View>
        </Modal>
        </>
    )
}