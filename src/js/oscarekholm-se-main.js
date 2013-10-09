$(function(){
	function checkWindowSize()
	{
		if (!(screen && screen.width && screen.height))
			return;

		var $hero = $('#presentational-hero');

		if (screen.width >= 768 && screen.width < 1680)
		{
			$hero.height(screen.height * 0.85);	
		}
		else if (screen.width <= 768)
		{
			$hero.css({
				'height' : screen.height,
				'min-height' : 0
			});
		}
	}


	function initWindowLoad()
	{
		function onWindowLoad()
		{
			$('body').fadeIn(250);
			$jsWindowLoad.removeClass('window-not-loaded');
		}

		// Bind stuff for the window load
		var $jsWindowLoad = $('.js-window-load')
			.removeClass('js-window-load')
			.addClass('window-not-loaded');

		$('body').hide();

		// Run the on window load function when everything has loaded or a half second has passed
		$(window).on('load', onWindowLoad);
		setTimeout(onWindowLoad, 500);
	}

	// Executions
	initWindowLoad();
	checkWindowSize();

	// Bindings
	$(window).on('resize', checkWindowSize);
});

(function (d, c) {
    var activeClass = c || "active";
    function clearActive() {
        var actives = d.querySelectorAll("." + activeClass);
        for (var i = 0; i < actives.length; i++) {
            actives[i].classList.remove(activeClass);
        }
    }
    function setActive(e) {
        clearActive();
        if (e.target.tagName == "A") {
            e.target.classList.add(activeClass);
        }
    }
    d.body.addEventListener("mousedown" , setActive, false);
    d.body.addEventListener("touchstart", setActive, false);
})(document, "active");
