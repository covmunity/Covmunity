
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

var $healthySection = $('#healthysection');
var $healthyOrNot = $('#healthyornot');
var $healthyForm = $('#healthyform');


$healthySection.off('click').on('click', function onclick_healthysection(){
    $healthyOrNot.removeClass('visible');
    $healthyOrNot.addClass('hidden');
    $healthyForm.toggleClass('hidden');
});

var $sickSection = $('#sicksection'); 
var $formSymptoms = $('#formsymptoms');

$sickSection.off('click').on('click', function onclick_sicksection(){
    $healthyOrNot.removeClass('visible');
    $healthyOrNot.addClass('hidden');
    $formSymptoms.toggleClass('hidden');

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

var $forwardNavSymptomsForm = $('#forwardnavsymptomsform');
var $usersHelpOrNot = $('#userhelpsornot');

$forwardNavSymptomsForm.off('click').on('click', function forwardnavsymptomsform(){
    $formSymptoms.toggleClass('hidden');
    $usersHelpOrNot.toggleClass('hidden');
});

var $backNavSymptomsForm = $('#backnavsymptomsform');

$backNavSymptomsForm.off('click').on('click', function backnavsymptomsform(){
    $healthyOrNot.removeClass('hidden');
    $healthyOrNot.addClass('visible');


    $formSymptoms.toggleClass('hidden');
});

var $denialHealthy = $('#denieallhealthy'); 

$denialHealthy.off('click').on('click', function denieallhealthy(){

      $healthyForm.toggleClass('hidden');
      $usersHelpOrNot.toggleClass('hidden');
});

var $confirmAllHealthy = $('#confirmallhealthy');
var $allHealthyForm = $('#allhealthyform');

$confirmAllHealthy.off('click').on('click', function confirmalllhealthy(){

    $healthyForm.toggleClass('hidden');
    $allHealthyForm.toggleClass('hidden');
});



$('#backnavuserhelpornot').off('click').on('click', function backnavuserthelpornot(){
    $usersHelpOrNot.toggleClass('hidden');
    $healthyForm.toggleClass('hidden');
});


$('#backnavhealthyform').off('click').on('click', function backnavhealthyform(){

    $healthyForm.toggleClass('hidden');

    $healthyOrNot.removeClass('hidden');
    $healthyOrNot.addClass('visible');
});

$('#backnavallhealthy').off('click').on('click', function backnavhealthyform(){

    $allHealthyForm.toggleClass('hidden');
    $healthyForm.toggleClass('hidden');
});

