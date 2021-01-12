import { Dimensions } from "react-native";

export const baseURL = 'https://kdg-api.kingdomgame.co'

export const theme = {
    ...Dimensions.get('window'),
    REM : 16,
    font12 : 0.75,
    font14 : 0.875,
    font16 : 1,
    font18: 1.125,
    font20 : 1.25,
    font22 : 1.375,
    font24 : 1.5,
    maincolor_dark : '#C8C8C8',
    subcolor_dark : '#8E8E93',
    titlecolor_dark : '#fff',
    hlcolor_dark : '#fac800',
    bgcolor_dark : '#283349',
    linkcolor_dark : '#4285F4',
}
