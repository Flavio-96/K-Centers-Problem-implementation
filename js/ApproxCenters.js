ApproxCenters = {
  canvas: null,

  cities : [],
  centers: [],
  centersNumber: 0,
  citiesNumber: 0,
  
  sketchContainer: null,

  repeatCustumCallbackDelay: function (callback, delay, repetitions) {
    let x = 0;
    let intervalID = window.setInterval(function () {

       callback();
       if (++x == repetitions) {
           window.clearInterval(intervalID);
       }
    }, delay);
  },
  repeatCustumCallbackDelayWithParam: function (callback, delay, repetitions) {
    let x = 0;
    let intervalID = window.setInterval(function () {

       callback(x);
       if (++x == repetitions) {
           window.clearInterval(intervalID);
       }
    }, delay);
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

      UIManagement.calculateCentersButton[0].onclick = randomApprox.approxWithoutRAlgorithm;
    };
      
    randomApprox.windowResized = function(){

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
        randomApprox.text(center+1, tmpX-5, tmpY+25);
      }
    };

    randomApprox.setXRandomCities = function(){
      ApproxCenters.repeatCustumCallbackDelay(randomApprox.setRandomCity, 700, ApproxCenters.citiesNumber);
    };

    randomApprox.setRandomCity = function(){
      let x;
      let y;

      do{
        x = Math.round(randomApprox.random(randomApprox.width));
        y = Math.round(randomApprox.random(randomApprox.height));
      } while(!(randomApprox.width*0.05 < x && x < (randomApprox.width - randomApprox.width*0.05)) || !(randomApprox.height*0.05 < y && y < (randomApprox.height - randomApprox.height*0.05)))
      CityManagement.addCity(x,y);
      UIManagement.legendCities.textContent = "Città: "+ApproxCenters.cities.length; 
      randomApprox.fill(0,0,255);
      randomApprox.ellipse(x, y, 20, 20);
      text = '('+x+','+y+')';
      randomApprox.fill(0)
      randomApprox.text(text, x-20, y-15);
    };

    randomApprox.approxWithoutRAlgorithm = function () {
      for (let city in ApproxCenters.cities){
        let tmpX = ApproxCenters.cities[city].x;;
        let tmpY = ApproxCenters.cities[city].y;

        randomApprox.fill(0,0,255);
        randomApprox.ellipse(tmpX, tmpY, 20, 20);
      }
      UIManagement.legendCenters.textContent = "Centri: 0"; 

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
      ApproxCenters.repeatCustumCallbackDelayWithParam(randomApprox.drawCenter, 1000, ApproxCenters.centers.length);
    };

    randomApprox.drawCenter = function(index){
      randomApprox.fill(255,0,0);
      UIManagement.legendCenters.textContent = "Centri: "+(index+1); 
      
      let x = ApproxCenters.centers[index].x;
      let y = ApproxCenters.centers[index].y;
      randomApprox.ellipse(x, y, 20, 20);
      randomApprox.text(index+1, x-5, y+25);
    }

  },
  arbitraryPoints : function(arbitraryApprox){
    
    arbitraryApprox.setup = function() {
      cities = [];
      ApproxCenters.canvas = arbitraryApprox.createCanvas(arbitraryApprox.windowWidth, arbitraryApprox.windowHeight);
    };
      
    arbitraryApprox.windowResized = function(){
      arbitraryApprox.resizeCanvas(arbitraryApprox.windowWidth, arbitraryApprox.windowHeight);
    };

    arbitraryApprox.mouseClicked = function(){
      if(arbitraryApprox.mouseButton == arbitraryApprox.LEFT){
        CityManagement.addCity(arbitraryApprox.mouseX, arbitraryApprox.mouseY);
        let x = Math.round(arbitraryApprox.mouseX);
        let y = Math.round(arbitraryApprox.mouseY);

        arbitraryApprox.ellipse(x, y, 15, 15);
        text = '('+x+','+y+')';
        arbitraryApprox.text(text, x-20, y-15);  
      }
    }
  }
}