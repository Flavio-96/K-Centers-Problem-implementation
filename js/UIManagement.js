UIManagement = {
    legendCenters: null,
    legendCities: null,
    calculateCentersButton: null,
    backToChoicesButton: null,
    
    getUIreferences: function (){
        return new Promise((resolve,reject) => {
            UIManagement.legendCenters = $("#legendCenters")[0].firstChild;
            UIManagement.legendCities = $("#legendCities")[0].firstChild;
            UIManagement.calculateCentersButton = $("#calculateCenters");
            UIManagement.backToChoicesButton = $("#backToChoices");
            UIManagement.backToChoicesButton[0].onclick = UIManagement.backButtonPressed;
            resolve();
        })
    },

    loadSketch: function (){
        return new Promise((resolve,reject) => {
            contentsDiv.load("sketch.html",resolve);
        })
    },

    backButtonPressed: function(){
        window.location.href = "mainPage.html"
    }
}
