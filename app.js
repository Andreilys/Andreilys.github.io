$(document).ready(function(){
			$(".scroll0").hover(function(){
				cursor: pointer; 

			});

            $(".scroll0").click(function (){
                //$(this).animate(function(){
                    $('html, body').animate({
                        scrollTop: $(".intro").offset().top
                    }, 500);
                //});
            });

            $(".scroll1").click(function (){
                //$(this).animate(function(){
                    $('html, body').animate({
                        scrollTop: $(".aboutMe").offset().top
                    }, 500);
                //});
            });


            $(".scroll2").click(function (){
                //$(this).animate(function(){
                    $('html, body').animate({
                        scrollTop: $(".portfolio").offset().top
                    }, 500);
                //});
            });


            $(".scroll3").click(function (){
                //$(this).animate(function(){
                    $('html, body').animate({
                        scrollTop: $(".contact").offset().top
                    }, 500);
                //});
            });
	


	

})