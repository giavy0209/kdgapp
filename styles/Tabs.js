import {StyleSheet} from 'react-native'

const styles = ({
    ...theme
}) => {
    return StyleSheet.create({
        container : {
            backgroundColor : theme.bgcolor,
            position : 'absolute',
            bottom : 0,
            left : 0,
            width : '100%',
            padding  : 15,
            display : 'flex',
            flexDirection : 'row',
            justifyContent : 'space-between'
        },
        item : {
            alignItems : 'center',
            flex : 1,
        },
        text : {
            fontSize : theme.font12,
            marginTop : 8,
            color : theme.subcolor
        },
        active : {
            color : theme.titlecolor
        }
    })
}


export default styles