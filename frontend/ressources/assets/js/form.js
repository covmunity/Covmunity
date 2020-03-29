


$(document).ready(function() {

    $('#healthysection').offclick().onclick(onclick_healthysection());
    $('#sicksection').offclick().onclick(onclick_sicksection());


    
    
});

/**
 * 
 * @param {*} event 
 */
function onclick_healthysection(event){

//    $('#formsymptoms').toggleClass('hidden');
}


/**
 * 
 * @param {*} event 
 */
function onclick_sicksection(event){
    $('#formsymptoms').toggleClass('hidden');
    $('#formsymptoms').addClass('visible');
}

