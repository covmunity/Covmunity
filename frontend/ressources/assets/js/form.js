

$('#healthysection').off('click').on('click', function onclick_healthysection(){
    $('#healthyornot').removeClass('visible');
    $('#healthyornot').addClass('hidden');
    $('#healthyform').toggleClass('hidden');
});


$('#sicksection').off('click').on('click', function onclick_sicksection(){
    $('#healthyornot').removeClass('visible');
    $('#healthyornot').addClass('hidden');


    $('#formsymptoms').toggleClass('hidden');

    
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