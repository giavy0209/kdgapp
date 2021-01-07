function maplanguage (language , type) {
    var lang = {}
    for (const keyPage in language) {
        if (Object.hasOwnProperty.call(language, keyPage)) {
            const obj = language[keyPage]
            lang[keyPage] = {}
            for (const key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                    const element = obj[key];
                    lang[keyPage][key] = element[type]
                }
            }
        }
    }
    return lang
}

export default maplanguage