import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'

export default function App ({
    children,
    style = [],
    onPress = null,
    ...prop
}) {
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    return (
        
        <TouchableOpacity disabled={!onPress} onPress={onPress && onPress} {...prop} style={[common.row, ...style]}>
            {children}
        </TouchableOpacity>
    )
}