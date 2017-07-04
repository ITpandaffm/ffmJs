$.fn.tab=function (){
	this // jQ 3
	this.each(function (){
		var oParent=$(this);
		var sEvName=oParent.attr('data-type');

		var aBtn=oParent.find('.j-btn');
		var aCont=oParent.find('.j-cont');
		
		aBtn.each(function (index){
			$(this).on(sEvName, function (){
				aBtn.removeClass('active');
				aCont.removeClass('active');

				aBtn.eq(index).addClass('active');
				aCont.eq(index).addClass('active');
			});
		});
	});
};