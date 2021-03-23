import {StyleSheet} from 'react-native'

const styles = ({
    ...theme
}) => {
    return StyleSheet.create({
        swap_des : {
            backgroundColor : 'rgba(46,57,79,.4)',
            flex : 1,
            textAlign : 'center',
            paddingVertical : 25,
        },
        swapContainer : {
            borderRadius: 15,
            backgroundColor : theme.bgcolor,
            padding : 25,
            marginTop : 35
        },
        containerInput : {
            backgroundColor : theme.titlecolor,
            borderRadius : 5,
            marginTop : 11,
        },
        dropdown : {
            position : 'absolute',
            zIndex : 2,
            justifyContent : 'center',
            alignItems : 'center'
        },
        dropdownMask : {
            backgroundColor : 'rgba(0, 0, 0 , .4)'
        },
        dropdownList : {
            width : '50%',
            backgroundColor : '#fff',
            position : 'absolute',
            borderRadius : 5,
        },
        dropdownItem : {
            padding : 10,
            alignItems : 'center'
        }
    })
}


export default styles