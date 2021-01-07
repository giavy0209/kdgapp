import {StyleSheet} from 'react-native'

const styles = ({
    ...theme
}) => {
    return StyleSheet.create({
        container : {
            paddingTop : 60,
            paddingHorizontal  : 35,
            display : 'flex',
        },
        rowButton : {
            display : 'flex',
            flexDirection : 'row',
            justifyContent : 'space-around',
        },  
        underline : {
            position : 'absolute',
            bottom : 0,
            borderTopLeftRadius : 5,
            borderTopRightRadius : 5,
            backgroundColor : theme.hlcolor,
            width  : '100%',
            height : 3,
        },
        buttonContainer : {
            display : 'flex',
            flexDirection : 'row',
            justifyContent : 'center',
            paddingVertical : 10,
        },
        button : {
            paddingBottom : 10,
            alignItems : 'center',
            position : 'relative',
        },
        buttonText : {
            color : theme.subcolor,
        },
        buttonTextActive : {
            color : theme.titlecolor,
        },
        loginDes : {
            fontSize : theme.font22 ,
            color: theme.subcolor,
            marginTop : 32,
        },
        inputContainer : {
            marginTop : 45,
            backgroundColor : theme.titlecolor,
            borderRadius : 15,
        },
        blockInput : {
            paddingHorizontal : 24,
            justifyContent : 'flex-end',
            height : 74,
            borderBottomColor : theme.subcolor,
            borderBottomWidth : 1,
            paddingBottom : 15,
            position : 'relative'
        },
        placeholder : {
            color : theme.subcolor
        },
        eye : {
            position : 'absolute',
            zIndex : 9,
            right : 0,
            width : 44,
            height : '100%',
            justifyContent : 'center',
            alignItems : 'center',
        }
    })
}


export default styles