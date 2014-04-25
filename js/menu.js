function desktopCss(){
    $("#menu").hover(function() {
        $(this).animate({
            marginLeft: "-300px"
        }, 300 );
        $("#header").animate({
            width: ""+(window.innerWidth-300)
        }, 300 );
        $("#footer").animate({
            width: ""+(window.innerWidth-300)
        }, 300 );
        $("#game").animate({
            width: ""+(window.innerWidth-300)
        }, 300 );
        $(".menu-content").animate({
            textIndent: "-50px"
        }, 300 );
        $("#game-input").animate({
            width: ""+(window.innerWidth-340)
        }, 300 );
        $("#logo").animate({
            right: "50px"
        }, 300 );
        $("#game-output-display").animate({
            width: ""+(window.innerWidth-300)
        }, 300 );
    }, function() {
        $(this).animate({
            marginLeft: "-50px"
        }, 300 );
        $("#header").animate({
            width: ""+(window.innerWidth-50)
        }, 300 );
        $("#game").animate({
            width: ""+(window.innerWidth-50)
        }, 300 );
        $("#footer").animate({
            width: ""+(window.innerWidth-50)
        }, 300 );
        $(".menu-content").animate({
            textIndent: "0px"
        }, 300 );
        $("#game-input").animate({
            width: ""+(window.innerWidth-90)
        }, 300 );
        $("#logo").animate({
            right: "-250px"
        }, 300 );
        $("#game-output-display").animate({
            width: ""+(window.innerWidth-50)
        }, 300 );
    });
    document.getElementById("header").style.width = (window.innerWidth-50)+"px";
    document.getElementById("footer").style.width = (window.innerWidth-50)+"px";
    document.getElementById("game").style.width = (window.innerWidth-50)+"px";
    document.getElementById("game-output-display").style.width = (window.innerWidth-50)+"px";
    document.getElementById("game").style.height = (window.innerHeight-70)+"px";
    document.getElementById("game-output").style.height = (window.innerHeight-360)+"px";
    document.getElementById("game-input").style.width = (window.innerWidth-90)+"px";
    window.onresize = function(){
        document.getElementById("game-output-display").style.width = (window.innerWidth-50)+"px";
        document.getElementById("header").style.width = (window.innerWidth-50)+"px";
        document.getElementById("footer").style.width = (window.innerWidth-50)+"px";
        document.getElementById("game").style.width = (window.innerWidth-50)+"px";
        document.getElementById("game").style.height = (window.innerHeight-70)+"px";
        document.getElementById("game-output").style.height = (window.innerHeight-360)+"px";
        document.getElementById("game-input").style.width = (window.innerWidth-90)+"px";
    };
};
enquire.register("only screen", function(){
    window.onload = desktopCss;
});