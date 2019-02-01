ApproxCenters = {
  canvas: null,

  cities : [],
  centers: [],
  centersNumber: 0,
  citiesNumber: 0,
  
  sketchContainer: null,

  repeatCustumCallbackDelay: function (callbackObject, delay, repetitions) {
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
  },

  randomPoints : function(randomApprox){
    
    randomApprox.setup = function() {
      ApproxCenters.cities = [];
      ApproxCenters.sketchContainer = randomApprox.createDiv();
      
      ApproxCenters.sketchContainer.id('canvasContainer');
      ApproxCenters.sketchContainer.addClass('sketchContent');
      ApproxCenters.canvas = randomApprox.createCanvas(ApproxCenters.sketchContainer.elt.clientWidth, ApproxCenters.sketchContainer.elt.clientHeight);

      ApproxCenters.canvas.parent(ApproxCenters.sketchContainer);
      randomApprox.noStroke();
      randomApprox.setXRandomCities();

      UIManagement.calculateCentersButton[0].onclick = ()=>{
        if(!UIManagement.calculateCentersButton.hasClass("disabled"))
            randomApprox.approxWithoutRAlgorithm();
      }
    };
      
    randomApprox.windowResized = function(){
      randomApprox.background(255);
      randomApprox.resizeCanvas(ApproxCenters.sketchContainer.elt.clientWidth, ApproxCenters.sketchContainer.elt.clientHeight);

      for (let city in ApproxCenters.cities){
        let tmpX = ApproxCenters.cities[city].x;;
        let tmpY = ApproxCenters.cities[city].y;

        randomApprox.fill(0,0,255);
        randomApprox.ellipse(tmpX, tmpY, 20, 20);
        randomApprox.fill(0)
        text = '('+tmpX+','+tmpY+')';
        randomApprox.text(text, tmpX-20, tmpY-15);
      }
      for (let center in ApproxCenters.centers){
        let tmpX = ApproxCenters.centers[center].x;;
        let tmpY = ApproxCenters.centers[center].y;
        randomApprox.fill(255,0,0);
        randomApprox.ellipse(tmpX, tmpY, 20, 20);
        randomApprox.text(parseInt(center)+1, tmpX-5, tmpY+25);
      }
    };

    randomApprox.setXRandomCities = async function(){
      let callbackObject = {callbackFunction:randomApprox.setRandomCity}
      await ApproxCenters.repeatCustumCallbackDelay(callbackObject, 700, ApproxCenters.citiesNumber);
      UIManagement.calculateCentersButton.removeClass("disabled");
    };

    randomApprox.setRandomCity = function(){
      let x;
      let y;

      do{
        x = Math.round(randomApprox.random(randomApprox.width));
        y = Math.round(randomApprox.random(randomApprox.height));
      } while(!(randomApprox.width*0.05 < x && x < (randomApprox.width - randomApprox.width*0.05)) || !(randomApprox.height*0.05 < y && y < (randomApprox.height - randomApprox.height*0.05)))
      CityManagement.addCity(x,y);
      UIManagement.legendCities.textContent = "Cities: "+ApproxCenters.cities.length; 
      randomApprox.fill(0,0,255);
      randomApprox.ellipse(x, y, 20, 20);
      text = '('+x+','+y+')';
      randomApprox.fill(0)
      randomApprox.text(text, x-20, y-15);
    };

    randomApprox.approxWithoutRAlgorithm = function () {
      randomApprox.background(255);

      for (let city in ApproxCenters.cities){
        let tmpX = ApproxCenters.cities[city].x;;
        let tmpY = ApproxCenters.cities[city].y;

        randomApprox.fill(0,0,255);
        randomApprox.ellipse(tmpX, tmpY, 20, 20);
        randomApprox.fill(0)
        text = '('+tmpX+','+tmpY+')';
        randomApprox.text(text, tmpX-20, tmpY-15);
      }

      UIManagement.legendCenters.textContent = "Centers: 0"; 

      ApproxCenters.centers = [];
      let tmpCities = ApproxCenters.cities.slice(0);

      let firstCity = tmpCities[0];
      ApproxCenters.centers.push(firstCity);
      tmpCities.shift();

      while((ApproxCenters.centers.length != ApproxCenters.centersNumber) && (ApproxCenters.centers.length != ApproxCenters.cities.length)){
        let distFromCenters = []
        tmpCities.forEach((city, cityIndex) =>{
          distFromCenters[cityIndex] = Number.MAX_SAFE_INTEGER;

          ApproxCenters.centers.forEach((center, centerIndex) =>{
            tmpDist = randomApprox.dist(city.x, city.y , center.x, center.y)
            if(tmpDist < distFromCenters[cityIndex]){
              distFromCenters[cityIndex] = tmpDist;
            }
          })
        })
        let maxCity = distFromCenters.indexOf(Math.max(...distFromCenters));
        let newCenter = tmpCities[maxCity];
        ApproxCenters.centers.push(newCenter);

        tmpCities.splice(maxCity,1);
      }
      let callbackObject = {callbackFunction:randomApprox.drawCenter,params:true}
      ApproxCenters.repeatCustumCallbackDelay(callbackObject,1000, ApproxCenters.centers.length);
    };

    randomApprox.drawCenter = function(index){
      randomApprox.fill(255,0,0);
      UIManagement.legendCenters.textContent = "Centers: "+(index+1); 
      
      let x = ApproxCenters.centers[index].x;
      let y = ApproxCenters.centers[index].y;
      randomApprox.ellipse(x, y, 20, 20);
      randomApprox.text(index+1, x-5, y+25);
    }

  },
  arbitraryPoints : function(arbitraryApprox){
    
    arbitraryApprox.setup = function() {
      ApproxCenters.cities = [];
      ApproxCenters.sketchContainer = arbitraryApprox.createDiv();
      
      ApproxCenters.sketchContainer.id('canvasContainer');
      ApproxCenters.sketchContainer.addClass('sketchContent');
      ApproxCenters.canvas = arbitraryApprox.createCanvas(ApproxCenters.sketchContainer.elt.clientWidth, ApproxCenters.sketchContainer.elt.clientHeight);

      ApproxCenters.canvas.parent(ApproxCenters.sketchContainer);
      arbitraryApprox.noStroke();

      UIManagement.calculateCentersButton[0].onclick = ()=>{
        if(!UIManagement.calculateCentersButton.hasClass("disabled"))
          arbitraryApprox.approxWithoutRAlgorithm();
      }
    };
      
    arbitraryApprox.windowResized = function(){
      arbitraryApprox.background(255);
      arbitraryApprox.resizeCanvas(ApproxCenters.sketchContainer.elt.clientWidth, ApproxCenters.sketchContainer.elt.clientHeight);

      for (let city in ApproxCenters.cities){
        let tmpX = ApproxCenters.cities[city].x;;
        let tmpY = ApproxCenters.cities[city].y;

        arbitraryApprox.fill(0,0,255);
        arbitraryApprox.ellipse(tmpX, tmpY, 20, 20);
        arbitraryApprox.fill(0)
        text = '('+tmpX+','+tmpY+')';
        arbitraryApprox.text(text, tmpX-20, tmpY-15);
      }
      for (let center in ApproxCenters.centers){
        let tmpX = ApproxCenters.centers[center].x;;
        let tmpY = ApproxCenters.centers[center].y;
        arbitraryApprox.fill(255,0,0);
        arbitraryApprox.ellipse(tmpX, tmpY, 20, 20);
        arbitraryApprox.text(parseInt(center)+1, tmpX-5, tmpY+25);
      }
    };

    arbitraryApprox.mouseClicked = function(){
      let x = Math.round(arbitraryApprox.mouseX);
      let y = Math.round(arbitraryApprox.mouseY);
      console.log(arbitraryApprox.width)
      if((arbitraryApprox.width*0.001 < x && x < (arbitraryApprox.width - arbitraryApprox.width*0.001)) && (arbitraryApprox.height*0.001 < y && y < (arbitraryApprox.height - arbitraryApprox.height*0.001)))
        if(arbitraryApprox.mouseButton == arbitraryApprox.LEFT){
          let x = Math.round(arbitraryApprox.mouseX);
          let y = Math.round(arbitraryApprox.mouseY);

          CityManagement.addCity(x,y);
          UIManagement.legendCities.textContent = "Cities: "+ApproxCenters.cities.length; 
          arbitraryApprox.fill(0,0,255);
          arbitraryApprox.ellipse(x, y, 20, 20);
          text = '('+x+','+y+')';
          arbitraryApprox.fill(0)
          arbitraryApprox.text(text, x-20, y-15);
          if(UIManagement.calculateCentersButton.hasClass("disabled"))
            UIManagement.calculateCentersButton.removeClass("disabled");
        }
    };

    arbitraryApprox.approxWithoutRAlgorithm = function () {
      arbitraryApprox.background(255);

      for (let city in ApproxCenters.cities){
        let tmpX = ApproxCenters.cities[city].x;;
        let tmpY = ApproxCenters.cities[city].y;

        arbitraryApprox.fill(0,0,255);
        arbitraryApprox.ellipse(tmpX, tmpY, 20, 20);
        arbitraryApprox.fill(0)
        text = '('+tmpX+','+tmpY+')';
        arbitraryApprox.text(text, tmpX-20, tmpY-15);
      }

      UIManagement.legendCenters.textContent = "Centers: 0"; 

      ApproxCenters.centers = [];
      let tmpCities = ApproxCenters.cities.slice(0);

      let firstCity = tmpCities[0];
      ApproxCenters.centers.push(firstCity);
      tmpCities.shift();

      while((ApproxCenters.centers.length != ApproxCenters.centersNumber) && (ApproxCenters.centers.length != ApproxCenters.cities.length)){
        let distFromCenters = []
        tmpCities.forEach((city, cityIndex) =>{
          distFromCenters[cityIndex] = Number.MAX_SAFE_INTEGER;

          ApproxCenters.centers.forEach((center, centerIndex) =>{
            tmpDist = arbitraryApprox.dist(city.x, city.y , center.x, center.y)
            if(tmpDist < distFromCenters[cityIndex]){
              distFromCenters[cityIndex] = tmpDist;
            }
          })
        })
        let maxCity = distFromCenters.indexOf(Math.max(...distFromCenters));
        let newCenter = tmpCities[maxCity];
        ApproxCenters.centers.push(newCenter);

        tmpCities.splice(maxCity,1);
      }
      let callbackObject = {callbackFunction:arbitraryApprox.drawCenter,params:true}
      ApproxCenters.repeatCustumCallbackDelay(callbackObject,1000, ApproxCenters.centers.length);
    };

    arbitraryApprox.drawCenter = function(index){
      arbitraryApprox.fill(255,0,0);
      UIManagement.legendCenters.textContent = "Centers: "+(index+1); 
      
      let x = ApproxCenters.centers[index].x;
      let y = ApproxCenters.centers[index].y;
      arbitraryApprox.ellipse(x, y, 20, 20);
      arbitraryApprox.text(index+1, x-5, y+25);
    };

  }
}