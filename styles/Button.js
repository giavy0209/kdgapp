import {StyleSheet} from 'react-native'

const styles = ({
    ...theme
}) => {
    return StyleSheet.create({
        Touchable : {
            borderRadius : 25,
            overflow : 'hidden'
        },
        Linear : {
            flex : 1,
            flexDirection : 'row'
        },
        Text : {
            color : theme.titlecolor,
            fontSize : theme.font16
        },
        Loading : {
            marginRight : 10,
            width : 10,
            resizeMode : 'contain',
            height : 10,
        }
    })
}


export default styles