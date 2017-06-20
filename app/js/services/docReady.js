'use strict';

angular.module('rajneethiApp')
.service('docReady', ['$http', function ($http) {

	var updateTextFiels = function (refreshtime) {
		console.log('refreshtime');
		console.log(refreshtime);
		var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
		if (refreshtime == undefined || refreshtime == null) {
			console.log('acive class added');
			$(input_selector).each(function(index, element) {
				if ($(element).val().length > 0 || $(this).attr('placeholder') !== undefined) {
					$(this).siblings('label, i').addClass('active');
				}
			});
		} else {
			// Set timeout to set some 100ms delay for data fetch;
			setTimeout(function(){
				console.log('acive class added');
				$(input_selector).each(function(index, element) {
					if ($(element).val().length > 0 || $(this).attr('placeholder') !== undefined) {
						$(this).siblings('label, i').addClass('active');
					}
				});
			}, refreshtime);
		}
	}

	this.run = function (refreshtime) {
		$(document).ready(function(){
			// console.log('yoooo. Done');
			// $(".button-collapse").sideNav(); 	//Mobile hamburger
			// $('.scrollspy').scrollSpy();		//Scrollspy
			// $('select').material_select();		//To make <SELECT> element working
			// $('ul.tabs').tabs();				//Tabs
			// $('input').characterCounter();		//Character Counter
			// $(".dropdown-button").dropdown();
			// $('.collapsible').collapsible({
			// 	accordion : true
			// });
			// $('.tooltipped').tooltip({delay: 50});
			updateTextFiels(refreshtime);
			$('.tooltipped').tooltip({delay: 50});
			$('.collapsible').collapsible();
			$('.modal').modal();
			$(".dropdown-button").dropdown({ hover: true });
			$('select').material_select();
		});
	}    
}])