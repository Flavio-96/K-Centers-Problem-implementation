const contentsDiv = $("#contentsDiv");

(function ($) {
    contentsDiv.load("initialChoice.html", () =>{
        "use strict";

        /*==================================================================
        [ Focus Contact2 ]*/
        $('.input3').each(function(){
            $(this).on('blur', function(){
                if($(this).val().trim() != "") {
                    $(this).addClass('has-val');
                }
                else {
                    $(this).removeClass('has-val');
                }
            })    
        })
                
    
        /*==================================================================
        [ Chose Radio ]*/
        $("#radio1").on('change', function(){
            if ($(this).is(":checked")) {
                $('.input3-select').slideUp(300);
            }
        });
    
        $("#radio2").on('change', function(){
            if ($(this).is(":checked")) {
                $('.input3-select').slideDown(300);
            }
        });
            
        /*==================================================================
        [ Validate ]*/
        let centers = $('.validate-input input[name="centers"]');
        let cities = $('.input3-select input[name="cities"]');
    
        $('.validate-form').on('submit',async function(event){
            event.preventDefault();
            let check = true;
            let centersValue = $(centers).val();
            let citiesValue = $(cities).val();
    
            if(centersValue.trim().match(/^\d+$/) == null){
                showValidate(centers);
                check=false;
            }
    
            if(citiesValue.trim().match(/^\d+$/) == null && $("#radio2").is(":checked")){
                showValidate(cities);
                check=false;
            }    
    
            if(check){
                let radioCheck = $("#radio2").is(":checked");
                contentsDiv.empty();
                await UIManagement.loadSketch();
                if(radioCheck)
                    UIManagement.getUIreferences().then(ModeSelection.randomChoices(parseInt(centersValue),parseInt(citiesValue)));
                else
                    UIManagement.getUIreferences().then(ModeSelection.userChoices(parseInt(centersValue)));
            }
            else
                return check;
        });
    
    
        $('.validate-form .input3').each(function(){
            $(this).focus(function(){
               hideValidate(this);
           });
        });
    
        function showValidate(input) {
            let thisAlert = $(input).parent();
    
            $(thisAlert).addClass('alert-validate');
        }
    
        function hideValidate(input) {
            let thisAlert = $(input).parent();
    
            $(thisAlert).removeClass('alert-validate');
        }
    
    });
    
})(jQuery);