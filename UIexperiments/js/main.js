$(document).mousemove(function(e){
	$("#punchout1").css({
		'left':e.clientX,
		'top':e.clientY,
	})
})


$(document).click(function(){
	$("#punchout1").toggleClass("active")
})