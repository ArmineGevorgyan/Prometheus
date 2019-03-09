const connection = require("./connect.js");
const writeToArduino = connection.writeToArduino;
const readFromArduino = connection.readFromArduino;

connection.btSerial.inquire();
setTimeout(() => {
    if(connection.hasConncected()){
        writeToArduino("Earth to Mars. Do you copy?\n");
        
        readFromArduino()
        .then((result)=>{
            console.log(result);
        })
        .catch((err)=>{});
    }
}, 15000);