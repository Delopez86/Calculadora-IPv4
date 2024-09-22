const bits = 32;
const byte1 = document.getElementById('byte_1');
const byte2 = document.getElementById('byte_2');
const byte3 = document.getElementById('byte_3');
const byte4 = document.getElementById('byte_4');
const mask = document.getElementById('mask');
const postIpClass = document.getElementById('ip_class');
const postIpType = document.getElementById('ip_type');
const postIpBinary =  document.getElementById('ip_binary');
const postMaskBinary = document.getElementById('mask_binary');
const postMaskDec = document.getElementById('mask_dec');
const postHost = document.getElementById('host');
const postIpRange = document.getElementById('ip_range');
const postNetworkIpBinary = document.getElementById('net_binary');
const postNetworkIpDec = document.getElementById('net_dec');
const postIpBroadcastBinary = document.getElementById('broad_binary');
const postIpBroadcastDec = document.getElementById('broad_dec');


//-----------------------Mascara de red.......................

// Calcular la cantidad de hosts útiles.
function calculateHost(){
    let utilHost = Math.pow(2, (bits - parseInt(mask.value))) - 2;
    return `${utilHost}`;
}

// Crear la máscara en formato binario.
function createBinaryMask(){
    let maskBinary = new Array(bits).fill(0);

    for (let j = 0; j < maskBinary.length; j++) {
        maskBinary[j] = j < parseInt(mask.value) ? 1 : 0;
    }

    return maskBinary;
}

// Convertir la mascará en formato decimal.
function calculateDecimalMask(maskBinary){
    let decMask = maskBinary.join('');
    let byte1 = parseInt(decMask.substring(0, 8), 2);
    let byte2 = parseInt(decMask.substring(8, 16), 2);
    let byte3 = parseInt(decMask.substring(16, 24), 2);
    let byte4 = parseInt(decMask.substring(24, 32), 2);

    return `${byte1}.${byte2}.${byte3}.${byte4}`;
}
//------------------------------------------------------------------

//-----------------------IP Binaria--------------------------------

// Convertir la dirección IP a binario y almaenarla en ipBinary.
function transformIpToBinary(){

    let ipBinary = new Array(bits).fill(0);

    let binary = 
        parseInt(byte1.value).toString(2).padStart(8, '0') + 
        parseInt(byte2.value).toString(2).padStart(8, '0') + 
        parseInt(byte3.value).toString(2).padStart(8, '0') + 
        parseInt(byte4.value).toString(2).padStart(8, '0');

    for (let i = 0; i < ipBinary.length; i++) {
        ipBinary[i] = parseInt(binary.charAt(i));
    }
    
    return ipBinary;

}
//------------------------------------------------------------------

//-----------------------IP de Red----------------------------------

// Calcular la IP de red en formato binario.
function calculateNetworkIpBinary(ipBinary, maskBinary){
    let networkIpBinary = new Array(bits).fill(0);
    for (let k = 0; k < networkIpBinary.length; k++) {
        networkIpBinary[k] = maskBinary[k] === 1 ? maskBinary[k] * ipBinary[k] : 0;
    }

    return networkIpBinary;
}

// Convertir la IP de red binaria a formato decimal.
function calculateNetworkIpDec(networkIpBinary){
    let networkIp = networkIpBinary.join('');
    let byte1 = parseInt(networkIp.substring(0, 8), 2);
    let byte2 = parseInt(networkIp.substring(8, 16), 2);
    let byte3 = parseInt(networkIp.substring(16, 24), 2);
    let byte4 = parseInt(networkIp.substring(24, 32), 2);

    return `${byte1}.${byte2}.${byte3}.${byte4}`
}
//-------------------------------------------------------------------

//-----------------------IP de Broadcast-----------------------------

// Calcular la IP de broadcast en formato binario.
function calculateIpBroadcastBinary(networkIpBinary){
    let ipBroadcastBinary = new Array(bits).fill(0);

     for (let f = 0; f < networkIpBinary.length; f++) {
        ipBroadcastBinary[f] = f < parseInt(mask.value) ? networkIpBinary[f] : 1;
     }

    return ipBroadcastBinary;
}

// Convertir la IP de broadcast binaria a formato decimal
function calculateIpBroadcastDec(ipBroadcastBinary){

    let ipBroad = ipBroadcastBinary.join('');
    let byte1 = parseInt(ipBroad.substring(0, 8), 2);
    let byte2 = parseInt(ipBroad.substring(8, 16), 2);
    let byte3 = parseInt(ipBroad.substring(16, 24), 2);
    let byte4 = parseInt(ipBroad.substring(24, 32), 2);

    return `${byte1}.${byte2}.${byte3}.${byte4}`;
}
//-------------------------------------------------------------------

//-------------------------------Clase de IP-------------------------

//Verificar si el byte se encuentra entre un rango.
function verifyRange(dec, min, max){
    return dec >= min && dec <= max;
}

//Verificar la clase de IP.
function verifyClassIp(){
    let ipByte1 = parseInt(byte1.value);
    let ipByte2 = parseInt(byte2.value); 
    let ipByte3 = parseInt(byte3.value);
    let ipByte4 = parseInt(byte4.value);

    if(verifyRange(ipByte1, 0, 128) && verifyRange(ipByte2, 0, 255) && verifyRange(ipByte3, 0, 255) && verifyRange(ipByte4, 0, 255)){
        return "Clase A";
    }else if(verifyRange(ipByte1, 128, 191) && verifyRange(ipByte2, 0, 255) && verifyRange(ipByte3, 0, 255) && verifyRange(ipByte4, 0, 255)){
        return "Clase B";
    }else if(verifyRange(ipByte1, 192, 223) && verifyRange(ipByte2, 0, 255) && verifyRange(ipByte3, 0, 255) && verifyRange(ipByte4, 0, 255)){
        return "Clase C";
    }else if(verifyRange(ipByte1, 224, 255) && verifyRange(ipByte2, 0, 255) && verifyRange(ipByte3, 0, 255) && verifyRange(ipByte4, 0, 255)){
        return "Clase D";
    }
}
//---------------------------------------------------------------------

//--------------------------Tipo de IP---------------------------------

//Se asegura el tipo de IP que se ingresó.
function verifyTypeIp(){
    let ipByte1 = parseInt(byte1.value);
    let ipByte2 = parseInt(byte2.value); 
    let ipByte3 = parseInt(byte3.value);
    let ipByte4 = parseInt(byte4.value);

    if((ipByte1 === 10 && verifyRange(ipByte2, 0, 255) && verifyRange(ipByte3, 0, 255) && verifyRange(ipByte4, 0, 255)) ||
       (ipByte1 === 172 && verifyRange(ipByte2, 16, 31) && verifyRange(ipByte3, 0, 255) && verifyRange(ipByte4, 0, 255)) ||
       (ipByte1 === 192 && ipByte2 === 168 && verifyRange(ipByte3, 0, 255) && verifyRange(ipByte4, 0, 255))){
        return "No Homologada (privada o reservada)";
    }else{
        return "Homologada (real o pública)";
    }
}

//-------------------------Rangos de IP´s utiles-----------------------

//Calcula primera IP útil.
function calculateFirstIp(networkIpBinary){

    let networkIp = networkIpBinary.join('');
    let byte1 = parseInt(networkIp.substring(0, 8), 2);
    let byte2 = parseInt(networkIp.substring(8, 16), 2);
    let byte3 = parseInt(networkIp.substring(16, 24), 2);
    let byte4 = parseInt(networkIp.substring(24, 32), 2) + 1;

    return `${byte1}.${byte2}.${byte3}.${byte4}`
}
//Calcula ultima IP útil.
function calculateLastIp(ipBroadcastBinary){

    let ipBroad = ipBroadcastBinary.join('');
    let byte1 = parseInt(ipBroad.substring(0, 8), 2);
    let byte2 = parseInt(ipBroad.substring(8, 16), 2);
    let byte3 = parseInt(ipBroad.substring(16, 24), 2);
    let byte4 = parseInt(ipBroad.substring(24, 32), 2) - 1;

    return `${byte1}.${byte2}.${byte3}.${byte4}`;
}

//Retorna el rango de las IP utiles encontrdas.
function returnIpRange(networkIpBinary, ipBroadcastBinary){
    let firstIp = calculateFirstIp(networkIpBinary);
    let lastIp = calculateLastIp(ipBroadcastBinary);

    return `${firstIp} - ${lastIp}`;
}

//--------------------------Resaltar porciones-------------------------------

//Se encarga de dividir las porciones de red y host y resaltarlas.
function identifyPortion(ipBinary){
    let portionNet = "";
    let portionHost = "";

    const maskValue = parseInt(mask.value);

    for(let i = 0; i < ipBinary.length; i++){
        if(i < maskValue){
            portionNet = portionNet.concat(ipBinary[i].toString());
        } else {
            portionHost = portionHost.concat(ipBinary[i].toString());
        }
    } 
    return `<span class="highlight_net">${portionNet}</span><span class="highlight_host">${portionHost}</span>`;
}
//----------------------------Validaciones-----------------------------------

//valida si el valor ingresado en los bytes es valido para realizar las operaciones.
function validateByteInput(){
    let numberRegex = /^\d{1,3}$/;
    
    if (numberRegex.test(byte1.value) && 
        numberRegex.test(byte2.value) && 
        numberRegex.test(byte3.value) && 
        numberRegex.test(byte4.value) && 
        numberRegex.test(mask.value)) {
        
        let ipByte1 = parseInt(byte1.value);
        let ipByte2 = parseInt(byte2.value); 
        let ipByte3 = parseInt(byte3.value);
        let ipByte4 = parseInt(byte4.value);

        return verifyRange(ipByte1, 0, 255) && 
               verifyRange(ipByte2, 0, 255) && 
               verifyRange(ipByte3, 0, 255) && 
               verifyRange(ipByte4, 0, 255);
    }

    return false;
}

//valida si el valor ingresado en la mascara es valido para realizar las operaciones.
function validateMask(){
    let numberRegex = /^\d{1,2}$/;
    
    if (numberRegex.test(mask.value)) {
        let maskDec = parseInt(mask.value);
        return verifyRange(maskDec, 0, 31); 
    }

    return false;
}
//-----------------------------------------------------------------------

//-----------------------------------------------------------------------

//Realiza todas las operaciones.
function calculateResult(){
    if(!validateByteInput()){
        alert("La dirección IP es inválida. Asegurese de ingresar números entre 0 y 255.")
    }else if(!validateMask()){
        alert("La máscara es inválida. Asegurese de ingresar un número entre 0 y 31.");
    }else{
        let maskBinary = createBinaryMask();
        let ipBinary = transformIpToBinary();
        let decMask = calculateDecimalMask(maskBinary);
        let utilHost = calculateHost();
        let networkIpBinary = calculateNetworkIpBinary(ipBinary,maskBinary);
        let networkIpDec = calculateNetworkIpDec(networkIpBinary);
        let ipBroadcastBinary = calculateIpBroadcastBinary(networkIpBinary);
        let ipBroadcastDec = calculateIpBroadcastDec(ipBroadcastBinary);
        let resultClassIp = verifyClassIp();
        let resultIpType = verifyTypeIp();
        let resultPortion = identifyPortion(ipBinary);
        let resultIpRange = returnIpRange(networkIpBinary, ipBroadcastBinary);

        postIpClass.textContent = resultClassIp;

        postIpType.textContent = resultIpType;

        postIpBinary.innerHTML = resultPortion;

        let resultMask = maskBinary.join('');
        postMaskBinary.textContent = `${resultMask.substring(0, 8)}.${resultMask.substring(8, 16)}.${resultMask.substring(16, 24)}.${resultMask.substring(24, 32)}`;

        postMaskDec.textContent = decMask;

        postHost.textContent = utilHost;

        let networkIp = networkIpBinary.join('');
        postNetworkIpBinary.textContent = `${networkIp.substring(0, 8)}.${networkIp.substring(8, 16)}.${networkIp.substring(16, 24)}.${networkIp.substring(24, 32)}`;

        postNetworkIpDec.textContent = networkIpDec;

        let broadcastIp = ipBroadcastBinary.join('');
        postIpBroadcastBinary.textContent = `${broadcastIp.substring(0, 8)}.${broadcastIp.substring(8, 16)}.${broadcastIp.substring(16, 24)}.${broadcastIp.substring(24, 32)}`;

        postIpBroadcastDec.textContent = ipBroadcastDec;


        postIpRange.textContent = resultIpRange;
    }
    
}

