export default function convertDate ({date , format, diff}) {
    if(!format) format = 'dd/mm/yyy - h:m:s'
    if(!diff) diff = 0
    const create_date = new Date(new Date(date) + diff)
    format.replace('/' , '-')
    console.log(format);
    format.replace('dd' , create_date.getDate())
    .replace('mm' , create_date.getMonth() + 1)
    .replace('yy' , create_date.getFullYear())
    .replace('h' , create_date.getHours())
    .replace('m' , create_date.getMinutes())
    .replace('s' , create_date.getSeconds())
    return format
}