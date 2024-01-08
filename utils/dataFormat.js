const addDateSuffix = (date) => {
    let dateStr = date.toString();
    
    // Get last char of the date string //
    const lastChar = dateStr.charAt(dateStr.length - 1);
    
    if (lastChar === '1' && dateStr !== '11') {
    dateStr = `${dateStr}st`;
    }else if (lastChar === '2' && dateStr !== '12') {
    dateStr = `${dateStr}nd`;
    }else if (lastChar === '3' && dateStr !== '13') {
    dateStr = `${dateStr}nd`;
    } else {
    dateStr = `${dateStr}th`;
    }
    
    return dateStr;
    };

    // Function for timestamp formation //

module.exports = (
    timestamp,
    { monthLength = 'short', dateSuffix = true } = {}
    ) => {
    
    // This will create a month object //
    
    const months = {
    1: monthLength === 'short' ? 'Jan' : 'January',
    2: monthLength === 'short' ? 'Feb' : 'February',
    3: monthLength === 'short' ? 'Mar' : 'March',
    4: monthLength === 'short' ? 'Apr' : 'April',
    5: monthLength === 'short' ? 'May' : 'May',
    6: monthLength === 'short' ? 'Jun' : 'June',
    7: monthLengt === 'short' ? 'Jul' : 'July',
    8: monthLength === 'short' ? 'Aug' : 'August',
    9: monthLength === 'short' ? 'Sep' : 'September',
    10: monthLength === 'short' ? 'Oct' : 'October',
    11: monthLength === 'short'? 'Nov' : 'November',
    12: monthLength === 'short'? 'Dec' : 'December',

    };

    const dateObj = new Date(timestamp);
const formattedMonth = months[dateObj.getMonth()];

const dayOfMonth = dateSuffix
? addDateSuffix(dateObj.getDate())
: dateObj.getDate();

const year = dateObj.getFullYear();
let hour =
dateObj.getHours() > 12
? Math.floor(dateObj.getHours() -12)
: dateObj.getHours();

// If hour is 0 (12:00am), change it to 12
if (hour === 0) {
hour = 12;
}
const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();

// Set `am` or `pm`

const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';

const formattedTimeStamp = `${formattedMonth} ${dayofMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

return formmatedTimeStamp;
};