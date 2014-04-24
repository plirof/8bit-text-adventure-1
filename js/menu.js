window.onload = function(){
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
    }, function() {
        $(this).animate({
            marginLeft: "-50px"
        }, 300 );
        $("#header").animate({
            width: ""+(window.innerWidth-50)
        }, 300 );
        $("#footer").animate({
            width: ""+(window.innerWidth-50)
        }, 300 );
    });
    document.getElementById("header").style.width = (window.innerWidth-50)+"px";
    document.getElementById("footer").style.width = (window.innerWidth-50)+"px";
    document.getElementById("game").style.width = (window.innerWidth-50)+"px";
    document.getElementById("game").style.height = (window.innerHeight-100)+"px";
};
window.onresize = function(){
    document.getElementById("header").style.width = (window.innerWidth-50)+"px";
    document.getElementById("footer").style.width = (window.innerWidth-50)+"px";
    document.getElementById("game").style.width = (window.innerWidth-50)+"px";
    document.getElementById("game").style.height = (window.innerHeight-100)+"px";
};
