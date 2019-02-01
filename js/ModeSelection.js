ModeSelection = {
    randomInstance: null,
    arbitraryInstance: null,
    sketchContainer: null, 

    randomChoices: function(centersNumber, citiesNumber){
        ApproxCenters.citiesNumber = citiesNumber;
        ApproxCenters.centersNumber = centersNumber;

        randomInstance = new p5(ApproxCenters.randomPoints);        
    },

    userChoices: function(centersNumber){
        ApproxCenters.centersNumber = centersNumber;

        arbitraryInstance = new p5(ApproxCenters.arbitraryPoints);
    }
}