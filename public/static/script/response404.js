var width = $(window).width();
var height = $(window).height();

$(function () {
    $('#errVideo').width(width);
    $('#errVideo').height(height);
    $('#errText').css('font-size', height/5);
    $('#errText').css('top', height/3.5);
    $('#errText').css('left', width/3.5);
    $('#errText').css('display', 'block');
});

$(window).scroll(0);

// $('#errVideo').(function () {
//     $(this).width(width);
//     $(this).height(height);
//     $(this).style.marginLeft = parseInt(width-yt404width)/2;
//     console.log(parseInt(width-yt404width)/2);
// });
