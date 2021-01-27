import {StyleSheet} from 'react-native'

const styles = ({
    ...theme
}) => {
    return StyleSheet.create({
        top : {
            height : 250,
            width : '100%',
            borderBottomLeftRadius : 15,
            borderBottomRightRadius : 15
        },
        header : {
            marginTop : 54,
            justifyContent : 'space-between'
        },
        headerTitle : {
            fontSize : theme.font24,
            color : theme.titlecolor,
            fontWeight : 'bold'
        },
        totalBlock : {
            padding : 13,
            backgroundColor : 'rgba(255,255,255 , .1)',
            borderRadius : 15
        },
        joinButton : {
            padding : 5,
            backgroundColor : '#26A65B',
            borderRadius : 5
        },
        package: {
            padding : 10,
            justifyContent : 'space-between'
        },
        packageActive : {
            padding : 10,
            justifyContent : 'space-between',
            backgroundColor : theme.hlcolor
        },
        inputContaienr : {
            backgroundColor : '#fff',
            width : '100%',
            marginTop : 11,
            borderRadius : 5,
            padding : 10,
            justifyContent : 'space-between'
        },
        tern : {
            backgroundColor : 'rgba(254,203,37,.3)',
            padding : 5,
            borderRadius : 5,
        }
    })
}


export default styles