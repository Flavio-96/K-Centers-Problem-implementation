var sketchContainer = null;

async function setup(){
  await UIManagement.getUIreferences();
  ElementsManagement.cities = [];
  sketchContainer = createDiv();
  
  sketchContainer.id('canvasContainer');
  sketchContainer.addClass('sketchContent');
  canvas = createCanvas(sketchContainer.elt.clientWidth, sketchContainer.elt.clientHeight);
  textSize(15);

  canvas.parent(sketchContainer);
}

function windowResized(){
  background(255);
  resizeCanvas(sketchContainer.elt.clientWidth, sketchContainer.elt.clientHeight);
}

function draw(){
  background(255);

  let tmpAlgCenters = findNearestCenters(ElementsManagement.algorithmCenters);
  let tmpArbCenters = findNearestCenters(ElementsManagement.arbitraryCenters);

  for (let city in ElementsManagement.cities){
    ElementsManagement.cities[city].display();

    let x1 = ElementsManagement.cities[city].x;
    let y1 = ElementsManagement.cities[city].y

    if(tmpAlgCenters[city]){
      let x2 = tmpAlgCenters[city].center[0];
      let y2 = tmpAlgCenters[city].center[1];
      let d = int(tmpAlgCenters[city].dist);
      if(d != 0){
        if(tmpAlgCenters[city]['minradius'])
          strokeWeight(6);
        stroke('red');

        line(x1, y1, x2, y2);
        push();
        let m = (y2 - y1) / (x2 - x1);
        let textx = (x2 + x1) / 2;
        let texty = m*textx - m*x1 + y1;

        strokeWeight(0.5);
        stroke('black');
        text(nfc(d, 1), textx, texty);
        pop();  
      } 
    }
    if(tmpArbCenters[city]){
      let x2 = tmpArbCenters[city].center[0];
      let y2 = tmpArbCenters[city].center[1];
      let d = int(tmpArbCenters[city].dist);

      if(d != 0){
        strokeWeight(1);
        stroke('green');
        if(tmpArbCenters[city]['minradius']){
          strokeWeight(6);
        }

        line(x1, y1, x2, y2);
        push();
        let m = (y2 - y1) / (x2 - x1);
        let textx = (x2 + x1) / 2;
        let texty = m*textx - m*x1 + y1;
      
        strokeWeight(0.5);
        stroke('black');
        text(nfc(d, 1), textx, texty);
        pop();
      }        
    }
    strokeWeight(1);
    noStroke();
  }

  for (let centers in ElementsManagement.arbitraryCenters){
    ElementsManagement.arbitraryCenters[centers].display();
  }

  for (let centers in ElementsManagement.algorithmCenters){
    ElementsManagement.algorithmCenters[centers].display();
  }
}

function mousePressed(){
  if(UIManagement.showingAlert)
    return;

  let x = Math.round(mouseX);
  let y = Math.round(mouseY);
  if((width*0.001 < x && x < (width - width*0.001)) && (height*0.001 < y && y < (height - height*0.001))){
    if(UIManagement.cityMode){
      let tmpSet = new Set();
      let indexOfSelected = -1;
      for (let city in ElementsManagement.cities){
        tmpSelected = ElementsManagement.cities[city].cityPressed();
        tmpSet.add(tmpSelected);
        if(tmpSelected)
          indexOfSelected = city;
      }
      if(mouseButton == LEFT){
        if(!tmpSet.has(true)){
          newCity = ElementsManagement.addCity(x,y);
          newCity.display();
        }
      }else if(mouseButton == RIGHT && indexOfSelected != -1){
        ElementsManagement.removeCity(indexOfSelected);
      }
    }else if(UIManagement.arbCenterMode){
      let tmpSet = new Set();
      let indexOfSelected = -1;
      for (let center in ElementsManagement.arbitraryCenters){
        tmpSelected = ElementsManagement.arbitraryCenters[center].centerPressed();
        tmpSet.add(tmpSelected);
        if(tmpSelected)
          indexOfSelected = center;
      }
      if(mouseButton == LEFT){
        if(!tmpSet.has(true)){
          newCenter = ElementsManagement.addArbitraryCenter(x,y);
          newCenter.display();
        }
      }else if(mouseButton == RIGHT && indexOfSelected != -1){
          ElementsManagement.removeArbitraryCenter(indexOfSelected);
      }
    }else if(UIManagement.algCenterMode){
      let tmpSet = new Set();
      let indexOfSelected = -1;
      for (let center in ElementsManagement.algorithmCenters){
        tmpSelected = ElementsManagement.algorithmCenters[center].centerPressed();
        tmpSet.add(tmpSelected);
        if(tmpSelected)
          indexOfSelected = center;
      }
      if(mouseButton == RIGHT && indexOfSelected != -1){
          ElementsManagement.removeAlgorithmCenter(indexOfSelected);
      }
    }
  }
}

function mouseDragged() {
  if(UIManagement.cityMode){
    for (let city in ElementsManagement.cities){
      ElementsManagement.cities[city].mouseDragged();
    }
  }else if(UIManagement.arbCenterMode){
    for (let center in ElementsManagement.arbitraryCenters){
      ElementsManagement.arbitraryCenters[center].mouseDragged();
    }
  }else if(UIManagement.algCenterMode){
    for (let center in ElementsManagement.algorithmCenters){
      ElementsManagement.algorithmCenters[center].mouseDragged();
    }
  }
}

function approxWithoutRAlgorithm() {
  ElementsManagement.algorithmCenters.length = 0;
  let centersNumber = ElementsManagement.centersNumber;
  let tmpCities = ElementsManagement.cities.slice(0);

  let firstCityIndex = Math.floor(Math.random()*tmpCities.length);
  let firstCity = tmpCities[firstCityIndex];
  let newCenter = ElementsManagement.addAlgorithmCenter(firstCity.x,firstCity.y);
  newCenter.display();

  tmpCities.splice(firstCityIndex,1);

  while((ElementsManagement.algorithmCenters.length != centersNumber) && (ElementsManagement.algorithmCenters.length != ElementsManagement.cities.length)){
    let distFromCenters = []
    tmpCities.forEach((city, cityIndex) =>{
      distFromCenters[cityIndex] = Number.MAX_SAFE_INTEGER;
      ElementsManagement.algorithmCenters.forEach((center, centerIndex) =>{
        tmpDist = dist(city.x, city.y , center.x, center.y)
        if(tmpDist < distFromCenters[cityIndex]){
          distFromCenters[cityIndex] = tmpDist;
        }
      })
    })
    let maxCity = distFromCenters.indexOf(Math.max(...distFromCenters));
    let tmpNewCenter = tmpCities[maxCity];
    newCenter = ElementsManagement.addAlgorithmCenter(tmpNewCenter.x,tmpNewCenter.y);
    newCenter.display();

    tmpCities.splice(maxCity,1);
  }
}
 
function findNearestCenters(arrayCenters){
  let nearestCenter = [];
  let distFromCenters = [];
  let check = false;
  ElementsManagement.cities.forEach((city, cityIndex) =>{
    nearestCenter[cityIndex] = null;
    distFromCenters[cityIndex] = Number.MAX_SAFE_INTEGER;
    arrayCenters.forEach((center, centerIndex) =>{
      check = true;
      tmpDist = dist(city.x, city.y , center.x, center.y)
      if(tmpDist < distFromCenters[cityIndex]){
        distFromCenters[cityIndex] = tmpDist; 
        nearestCenter[cityIndex] = {center:[center.x ,center.y],dist:tmpDist};
      }
    })
  })
  let maxCity = distFromCenters.indexOf(Math.max(...distFromCenters));
  if(maxCity != -1 && check)
    nearestCenter[maxCity]['minradius'] = true;

  return nearestCenter;
}