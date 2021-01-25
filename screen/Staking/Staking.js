import React from 'react'
import { Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {useRoute} from '@react-navigation/native'

import Top from './Top'
import { useState } from 'react/cjs/react.development'
export default function App () {
    const {params} = useRoute()
    const dispatch = useDispatch()
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const styles = useSelector(state => state.Styles && state.Styles.Staking ? state.Styles.Staking : {})
    const text = useSelector(state => state.Languages && state.Languages.Staking ? state.Languages.Staking : {})

    const [Tab, setTab] = useState(1)
    return (
    <>
    <Top Tab={Tab} setTab={setTab}/>
    </>)
}