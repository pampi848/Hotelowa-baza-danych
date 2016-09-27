/**
 * Created by pampi on 23.09.16.
 */

$(function() {
    $('#logo')
        .mouseover(function() {
            var src = "/img/logo-hover.png";
            $(this).attr("src", src);
        })
        .mouseout(function() {
            var src = "/img/logo.png";
            $(this).attr("src", src);
        })
        .click(function() {
            var src = "/img/logo-clicked.png";
            $(this).attr("src", src);
        });
});