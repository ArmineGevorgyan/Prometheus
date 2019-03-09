//establishes connection with bluetooth-serial-port

const btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
const device = {};
var com;
var isConnected = false;

btSerial.on('found', function(address, name) {
    btSerial.findSerialPortChannel(address, function(channel) {
        console.log("Found address: ", address);
        console.log("Found name: ", name);
        console.log("Found channel: ", channel);
        device.name = name;
        device.address = address;
        device.channel = channel;
        btSerial.connect(address, channel, function() {
            console.log('Yay Connection!'); 

            isConnected = true;
            com = btSerial;
            
            // btSerial.write(new Buffer("Hello From The Other Side\n", "utf-8"), function(err, count) {
            //     if (err) return console.error("Well that didn't work: ", err);
            // });
            // var input = '';
            // btSerial.on('data', (buffer) => {
            //     input += buffer.toString('utf-8');
            //     if(buffer.toString('utf-8').endsWith("~")){
            //         var result = input.slice(0,-2).trim(); 
            //         input = "";
            //         console.log(result);
            //     }        
            // });
        }, function () {
            console.log("I don't think it's mutual, dude");
        });
 
    }, function() {
        console.log('Dialing...');
    });
});



function hasConncected(){
    return isConnected;
}

function writeToArduino(input){
    if(isConnected){
        com.write(new Buffer(input, 'utf-8'), () => {
            console.log("Yay Remote Connection!");
        });
    }
}

function readFromArduino(){
    return new Promise((resolve, reject) => {
        if(!isConnected) reject("Not Connected");

        var input = '';
        com.on('data', (buffer) => {
            input += buffer.toString('utf-8');
            if(buffer.toString('utf-8').endsWith("~")){
                var result = input.slice(0,-2).trim(); 
                input = "";
                return resolve(result);
            }
        });

    });
}
module.exports = {
  btSerial,
  com,
  readFromArduino,
  writeToArduino,
  hasConncected
};
