(function($) {
	//$(document).ready(function(){		  
	jQuery(document).ready(function($){
		$('.nav').before('<div class="menu-icon"><span><i class="fa fa-bars"></i></span></div>');
		$('.menu-icon').on("click touchstart", function(e){
			e.preventDefault();						
			$('ul.dropdown').stop(true,true).slideToggle(600);
			$(this).toggleClass("active");	
		});	
		
		var $menuToggler = $('.sub > a');
		$menuToggler.on("click touchstart", function(e){
			e.stopPropagation();
			e.preventDefault();
			var $this = $(this);
			$this.toggleClass('current').next('ul').stop(true,true).toggleClass('current');
		});
		
		/* LOAN CALC SLIDERS */	
		
		if($(".loan-calc").length){
			$("#slider1").slider({
				min: 100000,
				max: 5000000,
				value: 500000,
				step: 10000,
				range: "min",
				slide: function(event, ui) {
					$("#la_value").html(ui.value.toFixed(0)); 
					calculateEMI();
				}		
			});
			
			$("#slider2").slider({
				min: 12,
				max: 60,
				value: 18,
				step: 6,
				range: "min",
				slide: function(event, ui) {
					$("#nm_value").html(ui.value.toFixed(0)); 
					calculateEMI();
				}	
			});	
			
			$("#slider3").slider({
				min: 10,
				max: 20,
				value: 12,
				step: 1,
				range: "min",
				slide: function(event, ui) {
					$("#roi_value").html(ui.value); 
					calculateEMI();
				}	
			});
			
			$("#la_value").html($('#slider1').slider('value'));
			$("#nm_value").html($('#slider2').slider('value'));
			$("#roi_value").html($('#slider3').slider('value'));
			
			/* LOAN CALC FUNCTIONS */
			
			function calculateEMI(){
				var loanAmount = $("#la_value").html();
				var numberOfMonths = $("#nm_value").html();
				var rateOfInterest = $("#roi_value").html();
				var monthlyInterestRatio = (rateOfInterest/100)/12;
				
				var top = Math.pow((1+monthlyInterestRatio),numberOfMonths);
				var bottom = top -1;
				var sp = top / bottom;
				var emi = ((loanAmount * monthlyInterestRatio) * sp);
				var full = numberOfMonths * emi;
				var interest = full - loanAmount;
				var int_pge =  (interest / full) * 100;
				$("#tbl_int_pge").html(int_pge.toFixed(2)+" %");               
				
				var emi_str = "" + emi.toFixed(2).replace(".", ".").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				var loanAmount_str = loanAmount.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				var full_str = "" + full.toFixed(2).replace(".", ".").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				var int_str = "" + interest.toFixed(2).replace(".", ".").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				
				
				$("#loan_amt").html(loanAmount_str);
				$("#loan_amt_v").html(loanAmount_str);
				$("#loan_pd").html(numberOfMonths);
				
				$("#emi").html(emi_str);
				$("#tbl_emi").html(emi_str);
				$("#tbl_la").html(loanAmount_str);
				$("#tbl_nm").html(numberOfMonths);
				$("#tbl_roi").html(rateOfInterest);
				$("#tbl_full").html(full_str);
				$("#tbl_int").html(int_str);                 
			}
			
			calculateEMI();
		}
		
		//review slider 
		  var owl = $('#testimonial-carousel');
		  owl.owlCarousel({
			items:1,
			margin:0,
			nav:false,
			loop:true,
			rewind: true,
			autoplay:true,
			autoplayTimeout:5000,
			autoplayHoverPause:true,
			animateOut: 'zoomOut',
			animateIn: 'flipInX'	
		  });
		  
		//faq accordion 
		if($("#faq-accordion").length){
			$(".faq-panel-heading a").on("click touchstart", function(){
				var $this = $(this);
				if (!$this.closest('.faq-panel-heading').hasClass('active')) {
					$('.faq-panel-heading').removeClass("active").next().stop(true,true).slideUp("fast");		
				}
				if($this.closest('.faq-panel-heading').hasClass("active")){
					$this.closest('.faq-panel-heading').removeClass("active").next().stop(true,true).slideUp("fast");	
				}else{
					$this.closest('.faq-panel-heading').addClass("active").next().stop(true,true).slideDown("fast");	
				}
				return false; 
			});
		}
		
	});
})(jQuery);