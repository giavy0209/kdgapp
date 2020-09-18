import Start from './components/Start'
import Reg from './components/Reg'
import Login from './components/Login'
import ForgotPassword from './components/ForgotPassword'
import Tabs from './components/Tabs'

import Wallet from './components/Wallet'
    import Notify from './components/Wallet/Notify'
    import News from './components/Wallet/News'
    // import News from './Webview/News'
    import SetCoins from './components/Wallet/SetCoins'
    import History from './components/Wallet/History/History'
    import HistoryDetail from './components/Wallet/History/HistoryDetail'
    import Withdraw from './components/Wallet/Withdraw/Withdraw'
    import WithdrawPage2 from './components/Wallet/Withdraw/WithdrawPage2'
    import Deposit from './components/Wallet/Deposit/Deposit'
    import DepositPage2 from './components/Wallet/Deposit/DepositPage2'

import Staking from './components/Stake'
    import StakingHistory from './components/Stake/StakingHistory/'
    import StakingTime from './components/Stake/StakingTime/'
    import StakingJoining from './components/Stake/StakingJoining/'

import Swap from './components/Swap'

import Account from './components/Account'
    import Profile from './components/Account/Profile'
    import Currency from './components/Account/Currency'
    import Language from './components/Account/Language'
    import Display from './components/Account/Display'
    import Secure from './components/Account/Secure'
        import Setting2FA from './components/Account/Secure/Setting2FA/Setting2FA'
        import Generate2FACode from './components/Account/Secure/Setting2FA/Generate2FACode'
        import ChangePass from './components/Account/Secure/ChangePass'
        import Pin from './components/Account/Secure/Pin'
            import SetPin from './components/Account/Secure/Pin/SetPin'
            import ChangePin from './components/Account/Secure/Pin/ChangePin'
            import RemovePin from './components/Account/Secure/Pin/RemovePin'
        import KYC from './components/Account/Secure/KYC'
            import StartKYC from './components/Account/Secure/KYC/StartKYC'
                import Upload1 from './components/Account/Secure/KYC/StartKYC/Upload1'
                import Upload2 from './components/Account/Secure/KYC/StartKYC/Upload2'
    import Invitation from './components/Account/Invitation'
    import WalletManage from './components/Account/WalletManage/WalletManage'
        import SelectCoin from './components/Account/WalletManage/SelectCoin'
        import PrivateKey from './components/Account/WalletManage/PrivateKey'
    import Reward from './components/Account/Reward/Reward'
    import MyReward  from './components/Account/Reward/MyReward'
    import Rule from './components/Account/Reward/Rule'
        
import Terms from './components/Terms'

import tabWallet from './assets/images/tab-wallet.png'
import tabWalletActive from './assets/images/tab-wallet-active.png'
import tabStake from './assets/images/tab-stake.png'
import tabStakeActive from './assets/images/tab-stake-active.png'
import tabSwap from './assets/images/tab-swap.png'
import tabSwapActive from './assets/images/tab-swap-active.png'
import tabAccount from './assets/images/tab-account.png'
import tabAccountActive from './assets/images/tab-account-active.png'



const ROUTERS = [
    {
        name: 'Start',
        reqLogin: false,
        title: null,
        render : Start,
        needFirstTime: true,
        needInMain: true
    },
    {
        name: 'Login',
        reqLogin: false,
        title: 'Đăng nhập',
        render : Login,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'ForgotPassword',
        reqLogin: false,
        title: 'Quên mật khẩu',
        render : ForgotPassword,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'Reg',
        reqLogin: false,
        title: 'Đăng ký',
        render : Reg,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'Main',
        reqLogin: true,
        title: null,
        render : Tabs,
        needFirstTime: false,
        needInMain: false
    },
    {
        name: 'Notify',
        reqLogin: true,
        title: 'Thông báo',
        render : Notify,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'News',
        reqLogin: true,
        title: 'Thông báo',
        render : News,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'SetCoins',
        reqLogin: true,
        title: 'Add Coins',
        render : SetCoins,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'History',
        reqLogin: true,
        title: '',
        render : History,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'HistoryDetail',
        reqLogin: true,
        title: '',
        render : HistoryDetail,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'Withdraw',
        reqLogin: true,
        title: 'Chọn Coins',
        render : Withdraw,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'WithdrawPage2',
        reqLogin: true,
        title: 'Gửi Coins',
        render : WithdrawPage2,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'Deposit',
        reqLogin: true,
        title: 'Chọn Coins',
        render : Deposit,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'DepositPage2',
        reqLogin: true,
        title: 'Chọn Coins',
        render : DepositPage2,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'Profile',
        reqLogin: true,
        title: '',
        render : Profile,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'Currency',
        reqLogin: true,
        title: '',
        render : Currency,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'Language',
        reqLogin: true,
        title: '',
        render : Language,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'Display',
        reqLogin: true,
        title: '',
        render : Display,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'Secure',
        reqLogin: true,
        title: '',
        render : Secure,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'ChangePass',
        reqLogin: true,
        title: '',
        render : ChangePass,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'Setting2FA',
        reqLogin: true,
        title: '',
        render : Setting2FA,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'Generate2FACode',
        reqLogin: true,
        title: '',
        render : Generate2FACode,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'Pin',
        reqLogin: true,
        title: '',
        render : Pin,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'SetPin',
        reqLogin: true,
        title: '',
        render : SetPin,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'ChangePin',
        reqLogin: true,
        title: '',
        render : ChangePin,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'RemovePin',
        reqLogin: true,
        title: '',
        render : RemovePin,
        needFirstTime: false,
        needInMain: true
    },
    
    {
        name: 'KYC',
        reqLogin: true,
        title: '',
        render : KYC,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'StartKYC',
        reqLogin: true,
        title: '',
        render : StartKYC,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'Upload1',
        reqLogin: true,
        title: '',
        render : Upload1,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'Upload2',
        reqLogin: true,
        title: '',
        render : Upload2,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'Invitation',
        reqLogin: true,
        title: '',
        render : Invitation,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'WalletManage',
        reqLogin: true,
        title: '',
        render : WalletManage,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'SelectCoin',
        reqLogin: true,
        title: '',
        render : SelectCoin,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'PrivateKey',
        reqLogin: true,
        title: '',
        render : PrivateKey,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'Reward',
        reqLogin: true,
        title: '',
        render : Reward,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'MyReward',
        reqLogin: true,
        title: '',
        render : MyReward,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'Rule',
        reqLogin: true,
        title: '',
        render : Rule,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'StakingHistory',
        reqLogin: true,
        title: '',
        render : StakingHistory,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'StakingTime',
        reqLogin: true,
        title: '',
        render : StakingTime,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'StakingJoining',
        reqLogin: true,
        title: '',
        render : StakingJoining,
        needFirstTime: false,
        needInMain: true
    },
    {
        name: 'Terms',
        reqLogin: true,
        title: '',
        render : Terms,
        needFirstTime: false,
        needInMain: true
    },
];

const TABS = [
    {
        name: 'Wallet',
        title: 'Ví',
        render : Wallet,
        logo: tabWallet,
        logoActive: tabWalletActive,
        reqLogin: true,
    },
    {
        name: 'Staking',
        title: 'Staking',
        render : Staking,
        logo: tabStake,
        logoActive: tabStakeActive,
        reqLogin: true,
    },
    {
        name: 'Swap',
        title: 'Swap',
        render : Swap,
        logo: tabSwap,
        logoActive: tabSwapActive,
        reqLogin: true,
    },
    {
        name: 'Me',
        title: 'Me',
        render : Account,
        logo: tabAccount,
        logoActive: tabAccountActive,
        reqLogin: true,
    },
]



export {
    ROUTERS,TABS
}
