export function checkCurrency(shortType){
    if(shortType === 0) return 'USD (Mặc định)'
    else if(shortType === 1) return 'VND'
    else if(shortType === 2) return 'CNY'
}

export function checkLang(shortType){
    if(shortType === 0) return 'Tiếng Việt'
    else if(shortType === 1) return 'Tiếng Anh'
}

export function checkDisplay(shortType){
    if(shortType === 0) return 'Ban đêm'
    else if(shortType === 1) return 'Ban ngày'
}