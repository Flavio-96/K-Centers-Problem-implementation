ElementsManagement = {
    cities : [],
    arbitraryCenters : [],
    algorithmCenters: [],
    centersNumber: 0,

    addCity: function(xPoint, yPoint){
        let tmpCity = new City(xPoint, yPoint);
        ElementsManagement.cities.push(tmpCity);

        UIManagement.legendCities.textContent = "Cities: "+ElementsManagement.cities.length; 

        return tmpCity;
    },

    removeCity: function(index){
        ElementsManagement.cities.splice(index,1);
        UIManagement.legendCities.textContent = "Cities: "+ElementsManagement.cities.length; 
    },

    addArbitraryCenter: function(xPoint, yPoint){
        let tmpCenter = new Center(xPoint, yPoint,color(0,255,0),ElementsManagement.arbitraryCenters.length+1);
        this.arbitraryCenters.push(tmpCenter);

        UIManagement.legendArbCenters.textContent = "Arb.Centers: "+ElementsManagement.arbitraryCenters.length; 

        return tmpCenter;
    },
    
    removeArbitraryCenter: function(index){
        ElementsManagement.arbitraryCenters.splice(index,1);
        UIManagement.legendArbCenters.textContent = "Arb.Centers: "+ElementsManagement.arbitraryCenters.length; 
    },

    addAlgorithmCenter: function(xPoint, yPoint){
        let tmpCenter = new Center(xPoint, yPoint,color(255,0,0),ElementsManagement.algorithmCenters.length+1);
        this.algorithmCenters.push(tmpCenter);

        UIManagement.legendAlgCenters.textContent = "Alg.Centers: "+ElementsManagement.algorithmCenters.length; 

        return tmpCenter;
    },

    removeAlgorithmCenter: function(index){
        ElementsManagement.algorithmCenters.splice(index,1);
        UIManagement.legendAlgCenters.textContent = "Arb.Centers: "+ElementsManagement.legendAlgCenters.length; 
    },

    clearAllElements: function(){
        ElementsManagement.cities.splice(0,ElementsManagement.cities.length);
        UIManagement.legendCities.textContent = "Cities: "+ElementsManagement.cities.length; 

        ElementsManagement.arbitraryCenters.splice(0,ElementsManagement.arbitraryCenters.length);
        UIManagement.legendArbCenters.textContent = "Arb.Centers: "+ElementsManagement.arbitraryCenters.length; 

        ElementsManagement.algorithmCenters.splice(0,ElementsManagement.algorithmCenters.length);
        UIManagement.legendAlgCenters.textContent = "Alg.Centers: "+ElementsManagement.algorithmCenters.length; 
    },

    clearAllCenters: function(){
        ElementsManagement.arbitraryCenters.splice(0,ElementsManagement.arbitraryCenters.length);
        UIManagement.legendArbCenters.textContent = "Arb.Centers: "+ElementsManagement.arbitraryCenters.length; 

        ElementsManagement.algorithmCenters.splice(0,ElementsManagement.algorithmCenters.length);
        UIManagement.legendAlgCenters.textContent = "Alg.Centers: "+ElementsManagement.algorithmCenters.length; 
    },

    clearArbitraryCenters: function(){
        ElementsManagement.arbitraryCenters.splice(0,ElementsManagement.arbitraryCenters.length);
        UIManagement.legendArbCenters.textContent = "Arb.Centers: "+ElementsManagement.arbitraryCenters.length; 
    },

    clearAlgorithmCenters: function(){
        ElementsManagement.algorithmCenters.splice(0,ElementsManagement.algorithmCenters.length);
        UIManagement.legendAlgCenters.textContent = "Alg.Centers: "+ElementsManagement.algorithmCenters.length; 
    }

}