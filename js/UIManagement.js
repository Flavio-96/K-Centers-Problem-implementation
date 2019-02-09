UIManagement = {
    legendArbCenters: null,
    legendAlgCenters: null,
    legendCities: null,
    modeButton: null,
    runAlgorithmButton: null,
    clearPageButton: null,
    cityMode: true,
    centerMode: false,
    showingAlert: false,
    modeButtonClassEnum:{city:"btn btn-primary", center:"btn btn-success"},
    modeButtonText:{city:"City mode", center:"Center mode"},
    
    getUIreferences: async function (){
        return new Promise((resolve,reject) => {
            UIManagement.legendArbCenters = $("#legendArbCenters")[0].firstChild;
            UIManagement.legendAlgCenters = $("#legendAlgCenters")[0].firstChild;
            UIManagement.legendCities = $("#legendCities")[0].firstChild;
            UIManagement.modeButton = $("#modeButton");
            UIManagement.modeButton[0].onclick = ()=>{
                UIManagement.cityMode = !UIManagement.cityMode; 
                UIManagement.centerMode = !UIManagement.centerMode;

                if(UIManagement.modeButton[0].className == UIManagement.modeButtonClassEnum.city){
                    UIManagement.modeButton[0].className = UIManagement.modeButtonClassEnum.center;
                    UIManagement.modeButton[0].textContent = UIManagement.modeButtonText.center;
                }
                else{
                    UIManagement.modeButton[0].className = UIManagement.modeButtonClassEnum.city;
                    UIManagement.modeButton[0].textContent = UIManagement.modeButtonText.city;
                }
              }
            UIManagement.runAlgorithmButton = $("#runAlgorithmButton");
            UIManagement.runAlgorithmButton[0].onclick = () =>{
                UIManagement.showingAlert = true;

                Swal.fire({
                    title: 'Submit number of centers',
                    input: 'number',
                    inputPlaceholder: '1,2,3 ...',
                    inputAttributes: {
                        min: 1,
                        step: 1
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Run algorithm',
                  }).then((result) => {
                    if (result.value) {
                        ElementsManagement.centersNumber = result.value; 
                        approxWithoutRAlgorithm()
                    }
                    UIManagement.showingAlert = false;
                  })
            }
            
            UIManagement.clearPageButton = $("#clearPageButton");
            UIManagement.clearPageButton[0].onclick = () => {
                UIManagement.showingAlert = true;
                Swal.fire({
                    title: 'Clean sketch',
                    text: "What elements clear?",
                    input: 'select',
                    inputOptions: {
                    'ArbitraryCenters':'Arbitrary centers',
                    'AlgorithmCenters':'Algorithm centers',
                    'AllCenters':'All centers',
                    'All':'All elements'
                    },
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, go on!'
                    }).then((result) => {
                        let resValue = result.value; 
                        if(resValue){
                            switch(resValue){
                                
                                case'ArbitraryCenters': ElementsManagement.clearArbitraryCenters();
                                                        break;
                                case'AlgorithmCenters': ElementsManagement.clearAlgorithmCenters();
                                                        break;
                                case'AllCenters':       ElementsManagement.clearAllCenters();
                                                        break;
                                case'All':              ElementsManagement.clearAllElements();
                                                        break;
                            }
                            Swal.fire(
                                'All done!',
                                'The sketch is now clean.',
                                'success').then(()=>UIManagement.showingAlert = false)
                        }else
                            UIManagement.showingAlert = false;
                  })
            }
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
