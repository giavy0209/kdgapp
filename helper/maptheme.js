const maptheme = (theme, type) => {
    const dark = {}
    const light = {}
    const rem = theme.REM
    for (const key in theme) {
        if (Object.hasOwnProperty.call(theme, key)) {
            const style = theme[key];
            if(key.includes('dark')) {
                dark[key.replace('_dark', '')] = style
            }else if(key.includes('light')) {
                light[key.replace('_light', '')] = style
            }else if(key.includes('font')){
                dark[key] = style * rem
                light[key] = style * rem
            }else{
                dark[key] = style
                light[key] = style
            }
        }
    }

    if(type === 'dark') return dark
    if(type === 'light') return light
}

export default maptheme