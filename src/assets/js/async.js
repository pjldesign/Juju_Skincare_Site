$(function() {
    //Get colourBrightness
    $('.quote-block').colourBrightness();
    //Update topBar class based on colorBrightness
    function getLight(block) {
        var prefix = "bgc--";
        return $(".quote-block").hasClass("dark") ? (prefix + "dark") :
            $(".quote-block").hasClass("light") ? (prefix + "light") : "";
    };
    $.scrollify({
        section: "section",
        setHeights: false
    });
});
