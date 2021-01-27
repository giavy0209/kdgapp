import React, { useCallback,useState } from 'react'
import {Text, TouchableOpacity,  ActivityIndicator} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { waitFor } from '../../helper';
export default function App({
    text = '',
    custom = null,
    style = {
        Touchable : null,
        Linear: null,
        Text : null,
    },
    onPress = () => null,
    delay = 0,
    disabled = false,
    transparent = false,
    disableLoading = false
}) {
    const styles = useSelector(state => state.Styles && state.Styles.Button ? state.Styles.Button : {})
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const [IsLoading, setIsLoading] = useState(false)

    const handlePress = useCallback(async ()=> {
        const startTime = new Date()
        !disableLoading && setIsLoading(true)
        await onPress()
        const duration = new Date() - startTime
        duration < delay && await waitFor(delay - duration)
        !disableLoading && setIsLoading(false)
    },[onPress , delay])
    return (
        <>
            <TouchableOpacity disabled={IsLoading || disabled} onPress={handlePress} style={[styles.Touchable ,style.Touchable, ((IsLoading || disabled) && {opacity : .5})]}>
                <LinearGradient 
                colors={transparent ? ['transparent' ,'transparent'] : ['#F9B80E', '#F98E10' , '#F97312']}
                style={[styles.Linear , common.center , style.Linear]}>
                    {IsLoading && <ActivityIndicator style={[styles.Loading]} color='#fff' size="small"/>}
                    {!custom ? <Text style={[style.Text , styles.Text]}>{text}</Text> : custom}
                </LinearGradient>
            </TouchableOpacity>
        </>
    )
}