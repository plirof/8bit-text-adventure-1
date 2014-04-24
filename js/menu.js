window.onload = function(){
    $("#menu").hover(function() {
        $(this).animate({
            marginLeft: "-300px"
        }, 300 );
        $("#header").animate({
            width: ""+(window.innerWidth-300)
        }, 300 );
    }, function() {
        $(this).animate({
            marginLeft: "-50px"
        }, 300 );
        $("#header").animate({
            width: ""+(window.innerWidth)
        }, 300 );
    });
};

