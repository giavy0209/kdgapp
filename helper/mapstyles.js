import { theme } from '../const';
import initStyles  from '../styles'

function mapstyle (themeStyle) {
    var styles = {}
    for (const key in initStyles) {
        if (Object.hasOwnProperty.call(initStyles, key)) {
            const style = initStyles[key](themeStyle);
            styles[key] = {
                ...style ,
            }
        }
    }

    return styles
}

export default mapstyle