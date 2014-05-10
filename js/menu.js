function desktopCss(){
    function onhover(){
         $(this).animate({marginLeft: "-300px"}, 300 );
        $("#header").animate({width: ""+(window.innerWidth-300)}, 300 );
        $("#footer").animate({width: ""+(window.innerWidth-300)}, 300 );$("#game").animate({width: ""+(window.innerWidth-300)}, 300 );
        $(".segment").animate({width: "300px",marginLeft: "-50px"}, 300 );
        $(".menu-title").animate({width: "300px",}, 300 );
        $("#game-input").animate({width: ""+(window.innerWidth-340)}, 300 );
        $("#logo").animate({right: "50px"}, 300 );
        $("#game-output-display").animate({width: ""+(window.innerWidth-300)}, 300 );
    }
    function offhover(time) {
        return function(){
            $(this).animate({marginLeft: "-50px"}, time );
            $("#header").animate({width: ""+(window.innerWidth-50)}, time );
            $("#game").animate({width: ""+(window.innerWidth-50)}, time );
            $("#footer").animate({width: ""+(window.innerWidth-50)}, time );
            $(".segment").animate({width: "250px",marginLeft: "0px"}, time );
            $(".menu-title").animate({width: "250px",}, time );
            $("#game-input").animate({width: ""+(window.innerWidth-90)}, time );
            $("#logo").animate({right: "-250px"}, time );
            $("#game-output-display").animate({width: ""+(window.innerWidth-50)}, time );
        };
    }
    $("#menu").hover(onhover, offhover(300));
    window.onresize = offhover(0);
};
window.onload = desktopCss;