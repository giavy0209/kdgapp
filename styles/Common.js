import {StyleSheet} from 'react-native'

const styles = ({
    ...theme
}) => {
    return StyleSheet.create({
        link : {
            textDecorationLine :'underline',
            textDecorationColor : theme.hlcolor,
            color : theme.hlcolor,
            fontSize : theme.font16
        },
        center : {
            justifyContent : 'center',
            alignItems : 'center'
        },
        fullSize : {
            width : '100%',
            height : '100%'
        }
    })
}


export default styles