$(document).ready(function(){
			
     // fade in and fade out //

        $('#forex').mouseenter(function(){
             $(".forexPopup").show(700);
        });

        $('#forex').mouseleave(function(){
            $(".forexPopup").hide(700);
        });


         $('#hotCold').mouseenter(function(){
             $(".hotColdPopup").show(700);
        });

        $('#hotCold').mouseleave(function(){
            $(".hotColdPopup").hide(700);
        });
        


        $('#shoppingList').mouseenter(function(){
             $(".shoppingListPopup").show(700);
        });

        $('#shoppingList').mouseleave(function(){
            $(".shoppingListPopup").hide(700);
        });
        


        $('#innerProgress').mouseenter(function(){
             $(".innerprogressionPopup").show(700);
        });

        $('#innerProgress').mouseleave(function(){
            $(".innerprogressionPopup").hide(700);
        });
        




        //making it so you can scroll //

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