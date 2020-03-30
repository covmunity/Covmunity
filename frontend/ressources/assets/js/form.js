
/**
 * Performance tips: Always cache jquery elements!
 * Good way:
 *   var $myElement = $('#healthyornot), $myForm = $('#healthyform');
 *   $myElement.removeClass('visible');
 *   $myElement.addClass('hidden');
 *   $myForm.toggleClass('hidden');
 * 
 * Why?
 *   Because each call of the same jquery element that is not cached
 *   will for the browser rendering engine to get details of that element
 *   and... re-render it!
 * 
 * Todo:
 *   Fix the code and implement jquery element caching.
 */


$('#healthysection').off('click').on('click', function onclick_healthysection(){
    $('#healthyornot').removeClass('visible');
    $('#healthyornot').addClass('hidden');
    $('#healthyform').toggleClass('hidden');
});

$('#sicksection').off('click').on('click', function onclick_sicksection(){
    $('#healthyornot').removeClass('visible');
    $('#healthyornot').addClass('hidden');
    $('#formsymptoms').toggleClass('hidden');

    // Detect selected symptoms and adjust navigation
    let checkedSymptoms = 0;
    console.log('Checked symptoms:', checkedSymptoms);
    $('#formsymptoms .ui.checkbox').on('change', function (event) {
        console.log('Form content changed.', event);

        if (event.target.checked === true) {
            checkedSymptoms++;
        }
        else {
            checkedSymptoms--;
        }

        console.log('Checked symptoms:', checkedSymptoms);
        if (checkedSymptoms === 0) {
            $('#forwardnavsymptomsform').css('display', 'none');
        }
        else {
            $('#forwardnavsymptomsform').css('display', 'inline-block');
        }
    });

    // Manage actions on fever checkbox
    $('#checkFever').on('change', function (event) {
        console.log('Patient has fever:', event.target.checked);

        // Toggle input field visibility state
        $('#feverfield').toggleClass('hidden');
    });
    $('#checkFever+label').on('click', function (event) {
        console.log('Simulated check event:', event);
        
        // Simulate user checkbox click
        if ($('#checkFever').is(':checked') === true) {
            $('#checkFever').removeAttr('checked');
        }
        else {
            $('#checkFever').attr('checked', true);
        }

        // Toggle input field visibility state
        $('#feverfield').toggleClass('hidden');
    });

    // Manage actions on other checkbox
    $('#checkOther').on('change', function (event) {
        console.log('Patient has fever:', event.target.checked);

        // Toggle input field visibility state
        $('#otherfield').toggleClass('hidden');
    });
    $('#checkOther+label').on('click', function (event) {
        console.log('Simulated check event:', event);
        
        // Simulate user checkbox click
        if ($('#checkOther').is(':checked') === true) {
            $('#checkOther').removeAttr('checked');
        }
        else {
            $('#checkOther').attr('checked', true);
        }

        // Toggle input field visibility state
        $('#otherfield').toggleClass('hidden');
    });
});

$('#forwardnavsymptomsform').off('click').on('click', function forwardnavsymptomsform(){
    $('#formsymptoms').toggleClass('hidden');
    $('#userhelpsornot').toggleClass('hidden');
});

$('#backnavsymptomsform').off('click').on('click', function backnavsymptomsform(){
    $('#healthyornot').removeClass('hidden');
    $('#healthyornot').addClass('visible');


    $('#formsymptoms').toggleClass('hidden');
});


$('#denieallhealthy').off('click').on('click', function denieallhealthy(){

      $('#healthyform').toggleClass('hidden');
      $('#userhelpsornot').toggleClass('hidden');
});


$('#confirmallhealthy').off('click').on('click', function confirmalllhealthy(){

    $('#healthyform').toggleClass('hidden');
    $('#allhealthyform').toggleClass('hidden');
});



$('#backnavuserhelpornot').off('click').on('click', function backnavuserthelpornot(){

    $('#userhelpsornot').toggleClass('hidden');
    $('#formsymptoms').toggleClass('hidden');
});


$('#backnavhealthyform').off('click').on('click', function backnavhealthyform(){

    $('#healthyform').toggleClass('hidden');

    $('#healthyornot').removeClass('hidden');
    $('#healthyornot').addClass('visible');
});

$('#backnavallhealthy').off('click').on('click', function backnavhealthyform(){

    $('#userhelpsornot').toggleClass('hidden');    
});

