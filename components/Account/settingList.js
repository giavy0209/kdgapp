import currency from '../../assets/images/currency.png'
import language from '../../assets/images/language.png'
import display from '../../assets/images/display.png'
import lock from '../../assets/images/lock.png'
import info from '../../assets/images/info.png'
import follow from '../../assets/images/follow.png'
import FollowList from './FollowList'
import {View, TouchableOpacity} from 'react-native'
import  {checkCurrency,checkDisplay,checkLang} from '../../helper'
import store from '../../store'
const List = [
    {
        name: 'CHUNG',
        child:[
            {
                icon : currency,
                textLeft: 'Loại tiền tệ',
                textRight: 'currency_type',
                textRight: (state) => {
                    var type = state.currency
                    return () => {
                        return checkCurrency(type)
                    }
                },
                arrow : true,
                BlockComponent: TouchableOpacity,
                navigate: 'Currency'
            },
            {
                icon : language,
                textLeft: 'Ngôn ngữ',
                textRight: (state) => {
                    var type = state.language
                    return () => {
                        return checkLang(type)
                    }
                },
                arrow : true,
                BlockComponent: TouchableOpacity,
                navigate: 'Language'
            },
            {
                icon : display,
                textLeft: 'Hiển thị',
                textRight: (state) => {
                    var type = state.display
                    return () => {
                        return checkDisplay(type)
                    }
                },
                arrow : true,
                BlockComponent: TouchableOpacity,
                navigate: 'Display'
            },
        ]
    },
    {
        name: 'Bảo mật',
        child:[
            {
                icon : lock,
                textLeft: 'Cài đặt bảo mật',
                textRight: '',
                arrow : true,
                BlockComponent: TouchableOpacity,
                navigate: 'Secure'
            },
        ]
    },
    {
        name: 'Khác',
        child:[
            {
                icon : info,
                textLeft: 'Về chúng tôi',
                textRight: '',
                arrow : true,
                BlockComponent: TouchableOpacity,
                navigate: 'Invitation'
            },
            {
                icon : follow,
                textLeft: 'Theo dõi',
                textRight: '',
                arrow : false,
                BlockComponent: View,
                extra: FollowList,
            },
        ]
    },
]

export default List