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
    })
}


export default styles