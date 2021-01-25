import wallet_0 from './assets/images/tabs/wallet_0.png'
import staking_0 from './assets/images/tabs/staking_0.png'
import swap_0 from './assets/images/tabs/swap_0.png'
import user_0 from './assets/images/tabs/user_0.png'

import wallet_1 from './assets/images/tabs/wallet_1.png'
import staking_1 from './assets/images/tabs/staking_1.png'
import swap_1 from './assets/images/tabs/swap_1.png'
import user_1 from './assets/images/tabs/user_1.png'
import checkLang from './helper/checkLanguage';

import {
    Staking,
    Swap,
    User, 
    Wallet,
    Login,
    CoinInfo,
    Deposit,
    Withdraw,
    Profile_Picker,
    Setting_Picker,
    Secure_Picker,
    Reward,
    KYC,
} from './screen'

const tabs = [
    {
        name : (language) => checkLang({vi : 'Ví' , en : 'Wallet'} , language),
        icon_0 : wallet_0,
        icon_1 : wallet_1,
        page : 'Wallet',
        screen : Wallet,
    },
    {
        name : (language) => checkLang({vi : 'Staking' , en : 'Staking'} , language),
        icon_0 : staking_0,
        icon_1 : staking_1,
        page : 'Staking',
        screen : Staking,
    },
    {
        name : (language) => checkLang({vi : 'Swap' , en : 'Swap'} , language),
        icon_0 : swap_0,
        icon_1 : swap_1,
        page : 'Swap',
        screen : Swap,
    },
    {
        name : (language) => checkLang({vi : 'Cá nhân' , en : 'Me'} , language),
        icon_0 : user_0,
        icon_1 : user_1,
        page : 'User',
        screen : User,
    },
]

const routes = [
    {
        page : 'Login',
        screen : Login,
        haveTabs : false,
        animation : false,
    },
    {
        page : 'CoinInfo',
        screen : CoinInfo,
        haveTabs : false,
        animation : true,
        header : true,
    },
    {
        page : 'Deposit',
        screen : Deposit,
        haveTabs : false,
        animation : true,
        header : true,
    },
    {
        page : 'Withdraw',
        screen : Withdraw,
        haveTabs : false,
        animation : true,
        header : true,
    },
    {
        page : 'Profile_Picker',
        screen : Profile_Picker,
        haveTabs : false,
        animation : true,
        header : true,
    },
    {
        page : 'KYC',
        screen : KYC,
        haveTabs : false,
        animation : true,
        header : true,
    },
    {
        page : 'Reward',
        screen : Reward,
        haveTabs : false,
        animation : true,
        header : true,
    },
    {
        page : 'Setting_Picker',
        screen : Setting_Picker,
        haveTabs : false,
        animation : true,
        header : true,
    },
]

export {
    tabs,
    routes
}