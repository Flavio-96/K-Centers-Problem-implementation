function repeatCustumCallbackDelay (callbackObject, delay, repetitions) {
    let x = 0;
    let callbackFunction = callbackObject['callbackFunction'];

    return new Promise((resolve,reject) => {
        let intervalID = window.setInterval(function () {
        if(callbackObject['params'])
            callbackFunction(x);
        else
            callbackFunction();
        
            if (++x == repetitions) {
            window.clearInterval(intervalID);
            resolve();
        }
        }, delay);
    })
}