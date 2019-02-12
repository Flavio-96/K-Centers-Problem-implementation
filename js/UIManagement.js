UIManagement = {
    legendArbCenters: null,
    legendAlgCenters: null,
    legendCities: null,
    modeButton: null,
    runAlgorithmButton: null,
    clearPageButton: null,
    cityMode: true,
    arbCenterMode: false,
    algCenterMode: false,
    showingAlert: false,
    modeButtonClassEnum:{city:"btn btn-primary", arbCenter:"btn btn-success", algCenter:"btn btn-danger"},
    modeButtonText:{city:"City mode", arbCenter:"Arb.Center mode", algCenter:"Alg.Center mode"},
    
    getUIreferences: async function (){
        return new Promise((resolve,reject) => {
            UIManagement.legendArbCenters = $("#legendArbCenters")[0].firstChild;
            UIManagement.legendAlgCenters = $("#legendAlgCenters")[0].firstChild;
            UIManagement.legendCities = $("#legendCities")[0].firstChild;

            UIManagement.modeButton = $("#modeButton");
            UIManagement.modeButton[0].onclick = UIManagement.modeManagementClick;
            
            UIManagement.runAlgorithmButton = $("#runAlgorithmButton");
            UIManagement.runAlgorithmButton[0].onclick = UIManagement.runAlgorithmOnClick;
            
            UIManagement.clearPageButton = $("#clearPageButton");
            UIManagement.clearPageButton[0].onclick = UIManagement.clearPageOnClick;
            
            resolve();
        })
    },

    modeManagementClick: () => {
        if(UIManagement.modeButton[0].className == UIManagement.modeButtonClassEnum.city){
            UIManagement.modeButton[0].className = UIManagement.modeButtonClassEnum.arbCenter;
            UIManagement.modeButton[0].textContent = UIManagement.modeButtonText.arbCenter;

            UIManagement.cityMode = !UIManagement.cityMode; 
            UIManagement.arbCenterMode = !UIManagement.arbCenterMode;
        }else if(UIManagement.modeButton[0].className == UIManagement.modeButtonClassEnum.arbCenter){
            UIManagement.modeButton[0].className = UIManagement.modeButtonClassEnum.algCenter;
            UIManagement.modeButton[0].textContent = UIManagement.modeButtonText.algCenter;

            UIManagement.arbCenterMode = !UIManagement.arbCenterMode;
            UIManagement.algCenterMode = !UIManagement.algCenterMode;

        }else{
            UIManagement.modeButton[0].className = UIManagement.modeButtonClassEnum.city;
            UIManagement.modeButton[0].textContent = UIManagement.modeButtonText.city;

            UIManagement.algCenterMode = !UIManagement.algCenterMode;
            UIManagement.cityMode = !UIManagement.cityMode;
        }
    },

    runAlgorithmOnClick: () =>{
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
    },

    clearPageOnClick: () => {
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
                        'success').then( () => UIManagement.showingAlert = false)
                }else
                    UIManagement.showingAlert = false;
          })
    }
}
