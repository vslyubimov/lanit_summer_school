let currentDate = new Date();
module.exports.date = currentDate;

const moment = require("moment")

module.exports.getMessage = function(){
    let hour = currentDate.getHours();
    
    return "Добрый вечер, сейчас дата: " + currentDate;
}

//console.log(currentDate.getUTCDate() + "." + (currentDate.getUTCMonth()+1) + "." + currentDate.getFullYear(), currentDate.getHours() + ":" + currentDate.getMinutes())
console.log(moment(currentDate).format("YYYY-MM-DD"))