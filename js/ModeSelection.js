ModeSelection = {
    randomInstance: null,
    arbitraryInstance: null,
    sketchContainer: null, 

    randomChoices: function(centersNumber, citiesNumber){
        ApproxCenters.citiesNumber = citiesNumber;
        ApproxCenters.centersNumber = centersNumber;
        ModeSelection.sketchContainer = $("#canvasContainer");

        randomInstance = new p5(ApproxCenters.randomPoints);        
    },

    userChoices: function(centersNumber){
        ApproxCenters.centersNumber = centersNumber;
        ModeSelection.sketchContainer = $("#canvasContainer");

        arbitraryInstance = new p5(ApproxCenters.arbitraryPoints    );
    }
}