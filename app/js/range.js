$(function() {
	var yourProcent,
		daySum;

	$( "#invest-summ-range" ).parent().siblings('.range-value-info').find(".range-amount").on('input', function(){
		if($(this).val() > 1000000) {
			$(this).val(1000000);
		}
		$(this).parent().parent().siblings(".range").find('.range-bar').width((100 * $(this).val()) / 1000000 + "%");
		$(this).parent().parent().siblings(".range").find('.ui-slider-range').width((100 * $(this).val()) / 1000000 + "%");
		$(this).parent().parent().siblings(".range").find('.ui-slider-handle').css({'left': (100 * $(this).val()) / 1000000 + "%"});
		if($(this).val() < 10001) {
			yourProcent = 0.07;
			daySum = 0.0023;
		} else if($(this).val() < 50001 && $(this).val() > 10000) {
			yourProcent = 0.08;
			daySum = 0.0026;
		} else {
			yourProcent = 0.09;
			daySum = 0.00296;
		}
		var daysVal = $('.investCalc-box.period').find('.range-value-info').find(".range-amount").val();
		investNowCalc($(this).val(), yourProcent, daySum, daysVal);
	});
	$( "#invest-period-range").parent().siblings('.range-value-info').find(".range-amount").on('input', function(){
		if($(this).val() > 12) {
			$(this).val(12);
		}
		$(this).parent().parent().siblings(".range").find('.range-bar').width((100 * $(this).val()) / 12 + "%");
		$(this).parent().parent().siblings(".range").find('.ui-slider-range').width((100 * $(this).val()) / 12 + "%");
		$(this).parent().parent().siblings(".range").find('.ui-slider-handle').css({'left': (100 * $(this).val()) / 12 + "%"});
		if($(this).val() < 10001) {
			yourProcent = 0.07;
			daySum = 0.0023;
		} else if($(this).val() < 50001 && $(this).val() > 10000) {
			yourProcent = 0.08;
			daySum = 0.0026;
		} else {
			yourProcent = 0.09;
			daySum = 0.00296;
		}
		var amountVal = $('.investCalc-box.amount').find('.range-value-info').find(".range-amount").val();
		investNowCalc(amountVal, yourProcent, daySum, $(this).val());
	});
    $( "#invest-summ-range" ).slider({
		range: "min",
		value: 0,
		min: 0,
		max: 1000000,
		slide: function( event, ui ) {
			$(this).parent().siblings('.range-value-info').find(".range-amount").val(ui.value);
			$(this).siblings(".range-bar").width((100 * ui.value) / 1000000 + "%");
			if(ui.value < 10001) {
				yourProcent = 0.07;
				daySum = 0.0023;
			} else if(ui.value < 50001 && ui.value > 10000) {
				yourProcent = 0.08;
				daySum = 0.0026;
			} else {
				yourProcent = 0.09;
				daySum = 0.00296;
			}
			var daysVal =  $('.investCalc-box.period').find('.range-value-info').find(".range-amount").val();
			investNowCalc(ui.value, yourProcent, daySum, daysVal);
		}
	});
    $( "#invest-period-range" ).slider({
		range: "min",
		value: 0,
		min: 0,
		max: 12,
		step: 1,
		slide: function( event, ui ) {
			$(this).parent().siblings('.range-value-info').find(".range-amount").val(ui.value);
			$(this).siblings(".range-bar").width((100 * ui.value) / 12 + "%");
			var summValue =  $(this).parent().parent().parent().siblings('.investCalc-box').find(".range-amount").val();
			if(summValue < 10001) {
				yourProcent = 0.07;
				daySum = 0.0023;
			} else if(summValue < 50001 && ui.value > 10000) {
				yourProcent = 0.08;
				daySum = 0.0026;
			} else {
				yourProcent = 0.09;
				daySum = 0.00296;
			}
			daysVal = ui.value;
			investNowCalc(summValue, yourProcent, daySum, daysVal);
		}
	});
    $(".ui-slider-handle").text();
    $( ".range-amount" ).val(0);
});

function investNowCalc(investSummVal, yourProcent, daySum, daysVal) {
	var yourProfitMonth = investSummVal * yourProcent;
	var yourProfitDays =  parseFloat((yourProfitMonth * daysVal)) + parseFloat(investSummVal);
	var finalSumm = parseFloat(yourProfitDays);
	var summ = parseFloat(investSummVal);
	if(isNaN(finalSumm)) {
		finalSumm = 0;
	}
	if(isNaN(yourProfitMonth)) {
		yourProfitMonth = 0;
	}
	if(isNaN(investSummVal)) {
		investSummVal = 0;
	}
	$('#investCalcProcent').text(Math.round(yourProcent * 100));
	$('#investCalcSumm').text(summ.toFixed(4));
	$('#investCalcMonth').text(yourProfitMonth.toFixed(4));
	$('#investCalcFinal').text(finalSumm.toFixed(4));
	$('#finalInvestSumm').val(finalSumm.toFixed(4));
}

