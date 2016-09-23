/**
 * Created by pampi on 23.09.16.
 */

$(function() {
    $('#logo')
        .mouseover(function() {
            var src = "/img/logo-inverse.png";
            $(this).attr("src", src);
        })
        .mouseout(function() {
            var src = "/img/logo-gray.png";
            $(this).attr("src", src);
        })
        .click(function() {
            var src = "/img/logo-yellow.png";
            $(this).attr("src", src);
        });
});