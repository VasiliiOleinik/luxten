$(function() {
	var localStorageChecked = localStorage.getItem('theme');
	if(localStorageChecked === 'light') {
		lightTheme();
		$('.toggleTheme input').attr('checked', true);
	} else if(localStorageChecked === 'dark') {
		darkTheme();
		$('.toggleTheme input').attr('checked', false);
	}
	$(window).resize(function() {
		if(screen.width < 767) {
			$('.header__navig').appendTo('#pageWrapper');
		} else {
			$('.header__navig').appendTo('.header__body');
		}
	});
	if(screen.width < 767) {
		$('.header__navig').appendTo('#pageWrapper');
	}

	// Left menu
	$('.left-menu-dropdown').on('click', function(){
		$(this).toggleClass('isOpen');
		$(this).siblings('.dropdown-list').slideToggle();4
		if($(this).hasClass('isOpen')) {
			$(this).children('.left-menu-arrow').css({'transform':'translateY(-50%) rotate(90deg)', 'transition': '.3s'});
		} else {
			$(this).children('.left-menu-arrow').css({'transform':'translateY(-50%) rotate(0deg)', 'transition': '.3s'});
		}
	});
	// Only digits
	$(".onlyDigits").on("change keyup input keydown click", function() {
		if (this.value.match(/[^\d\.]/g)) {
			this.value = this.value.replace(/[^\d\.]/g, "");
		}
	});

	// Пополнение кошелька
	$('#fillUpPurse input').on('input change', function() {
		if( $(this).val() < 50) {
			$(this).siblings('button').attr('disabled', true);
			$(this).siblings('button').css({'cursor': 'not-allowed'});
			$('.walletPursheError').text('Сумма не может быть меньше 50$');
		} else if ($(this).val() > 1000000) {
			$(this).siblings('button').attr('disabled', true);
			$(this).siblings('button').css({'cursor': 'not-allowed'});
			$('.walletPursheError').text('Сумма не может быть больше 1000000$');
		} else {
			$(this).siblings('button').attr('disabled', false);
			$(this).siblings('button').css({'cursor': 'pointer'});
			$('.walletPursheError').text('');
		}
	});
	$('#withdrawFunds input').on('input change', function() {
		if( $(this).val() < 100) {
			$(this).siblings('button').attr('disabled', true);
			$(this).siblings('button').css({'cursor': 'not-allowed'});
			$('.walletPursheError').text('Сумма не может быть меньше 100$');
		} else {
			$(this).siblings('button').attr('disabled', false);
			$(this).siblings('button').css({'cursor': 'default'});
			$('.walletPursheError').text('');
		}
	});

	// Рассчет страницы Инвестировать сейчас
	var investSumm = $('#investSumm'),
		activePlan = 'bronze',
		yourProcent = 0.07,
		investFrom = 50,
		investTo = 10000,
		daySum = 0.0023;
	$('.investNow-plan-elem').on('click', function(){
		$('.investNow-plan-elem').removeClass('active');
		$(this).addClass('active');
		activePlan = $(this).attr('for');
		if(activePlan == 'bronze') {
			yourProcent = 0.07;
			investFrom = 50;
			investTo = 10000;
			daySum = 0.0023;
		} else if (activePlan == 'silver') {
			yourProcent = 0.08;
			investFrom = 10001;
			investTo = 50000;
			daySum = 0.0026;
		} else {
			yourProcent = 0.09;
			investFrom = 50001;
			investTo = 'бесконечности';
			daySum = 0.00296;
		}
		investNow(investSumm.val(), investFrom, investTo, yourProcent, daySum);
		$('#yourProcent').text(Math.round(yourProcent * 100));
		$('.input-summ__block-info').find('.inputFrom').text(investFrom);
		$('.input-summ__block-info').find('.inputTo').text(investTo);
	});
	investSumm.on('input', function() {
		investNow($(this).val(), investFrom, investTo, yourProcent, daySum);
	});


	// Toogle  theme
	$('.toggleTheme input').on('change', function() {
		if($(this).is(":checked")) {
			localStorage.setItem('theme', 'light');
			lightTheme();
		} else {
			localStorage.setItem('theme', 'dark');
			darkTheme();
		}
	});

	$('.copy-link').on('click', function(){
		copytext($('#referalLink'));
		$('.copyTextInfo').slideDown();
		setTimeout(function() {
			$('.copyTextInfo').slideUp();
		}, 2000);
	});

	// Hamburger
	$(".app-main").mouseup(function (e) {
		var div = $('.left-menu');
		if (!div.is(e.target) && div.has(e.target).length === 0) {
			hideMenu();
		}
	});

	$('.hamburger').on('click', function() {
		$('.left-menu').toggleClass('visible');
		if($('.left-menu').hasClass('visible')) {
			$('.left-menu').css({'right':'0', 'transition':'.3s'});
		} else {
			$('.left-menu').css({'right':'-220px', 'transition':'.3s'});
		}
	});

	// Кастомный скролл
	$('.scrollbar-rail').scrollbar();

	// Tolltips
	$('.product-tooltip').each(function(index, item) {
		$(item).hover(function(){
			$(this).siblings('.product-tooltip__box').addClass('active');
		}, function() {
			$(this).siblings('.product-tooltip__box').removeClass('active');
		});
	});

	// Main btns hover
	$('.main-content__main-buttons .main-button').each(function(index, item) {
		$(item).hover(function() {
			$('.main-content__main-buttons .main-button').removeClass('active');
		}, function() {
			$('.main-content__main-buttons .main-button').eq( 0 ).addClass('active');
		});
	});
	if(screen.width > 1200) {
		$('.investNow .investNow-box.calc .content-block').css({'height': $('.investNow .investNow-box .content-block ').eq(0).outerHeight()});
		$('.profile-box .content-block').css({'height': $('.profile-box .content-block ').eq(0).outerHeight()});
	}
	$( window ).resize(function() {
		if(screen.width > 1200) {
			$('.investNow .investNow-box.calc .content-block').css({'height': $('.investNow .investNow-box .content-block ').eq(0).outerHeight()});
			$('.profile-box .content-block').css({'height': $('.profile-box .content-block ').eq(0).outerHeight()});
		} else {
			$('.investNow .investNow-box.calc .content-block').css({'height': 'auto'});
			$('.profile-box .content-block').css({'height': 'auto'});
		}
	});
});
// Copy text
function copytext(el) {
	el.select();
	document.execCommand("copy");
}

// Hide menu
function hideMenu() {
	$('.left-menu').css({'right':'-220px', 'transition':'.3s'});
	$('.left-menu').removeClass("visible");
	$('.hamburger').removeClass("is-active");
}

// Light theme
function lightTheme() {
	$('.dark').each(function(index, item){
		$(item).removeClass('dark');
		$(item).addClass('light');
		$('#theme .theme-name').text('Светлая версия');
		$('#theme img').attr('src', 'img/light-theme.svg');
		$('#theme img').attr('alt', 'Light theme');
	});
}
// Dark theme
function darkTheme() {
	$('.light').each(function(index, item){
		$(item).removeClass('light');
		$(item).addClass('dark');
		$('#theme .theme-name').text('Темная версия');
		$('#theme img').attr('src', 'img/dark-theme.svg');
		$('#theme img').attr('alt', 'Dark theme');
	});
}

// Inivest now
function investNow(investSummVal, investFrom, investTo, yourProcent, daySum) {
	var investSummObj = $('#investSumm');
	if(investSummVal < investFrom)  {
		investSummObj.siblings('.input-summ__block-btn').attr('disabled', true);
		investSummObj.siblings('.input-summ__block-btn').css({'cursor': 'not-allowed'});
		$('.input-summ__block-info').text(`Сумма должна быть не менее ${investFrom}$`);
		$('.input-summ__block-info').css({'color':'#EB5757'});
	} else if(investSummVal > investTo) {
		investSummObj.siblings('.input-summ__block-btn').attr('disabled', true);
		investSummObj.siblings('.input-summ__block-btn').css({'cursor': 'not-allowed'});
		$('.input-summ__block-info').text(`Сумма должна быть не более ${investTo}$`);
		$('.input-summ__block-info').css({'color':'#EB5757'});
	} else {
		$('.input-summ__block-info').text('');
		$('.input-summ__block-info').css({'color':'#D6B87A'});
		$('.input-summ__block-info').html(`Вы можете инвестировать от <span class='inputFrom'> ${investFrom}$ </span> до <span class='inputTo'> ${investTo}$</span>`);
		investSummObj.siblings('.input-summ__block-btn').attr('disabled', false);
		investSummObj.siblings('.input-summ__block-btn').css({'cursor': 'pointer'});
	}
	console.log(yourProcent);

	var yourProfitMonth = investSummVal * yourProcent;
	var yourProfitDays =  parseFloat((yourProfitMonth * 12)) + parseFloat(investSummVal);
	var finalSumm = parseFloat(yourProfitDays);
	var summ = parseFloat(investSummVal);
	if(investSummVal == '') {
		yourProfitDays = 0;
		investSummVal = 0;
	}
	if(isNaN(finalSumm)) {
		finalSumm = 0;
	}
	$('#yourInvestSumm').text(summ.toFixed(4));
	$('#yourProfit').text(yourProfitMonth.toFixed(4));
	$('#yourTotalSumm').text(finalSumm.toFixed(4));
}

// Международные телефоны
function takePlaceholder (input){
    var mask = input.attr('placeholder');
    if(mask){
        mask = mask.replace(/[0-9]/g, '9');
        $(this).inputmask('remove');
        input.inputmask(mask);
    }else{
        setTimeout(function(){
            takePlaceholder(input);
        },200);
    }
}
function maskInit(input, code) {
    input.each(function(){
        $(this).intlTelInput({
            separateDialCode: true,
            formatOnDisplay: true,
            initialCountry: 'ru',
            preferredCountries: ['ru', 'by', 'ua'],
        });
		takePlaceholder ($(this));
		$(this).on('focus', function(){
			var countryDialCode = $(this).siblings('.flag-container').find('.selected-dial-code').text();
            $(this).attr('data-dial-code', countryDialCode);
        });
    });
    input.on("countrychange", function() {
        $(this).intlTelInput({
            utilsScript: "../js/utils.js"
        });
        takePlaceholder($(this));
    });
}