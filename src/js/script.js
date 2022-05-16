// Fix for lighthouse the Pagespeed warning
// Read more here: https://stackoverflow.com/questions/60357083/does-not-use-passive-listeners-to-improve-scrolling-performance-lighthouse-repo

jQuery.event.special.touchstart = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
    }
};
jQuery.event.special.touchmove = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
    }
};
jQuery.event.special.wheel = {
    setup: function( _, ns, handle ){
        this.addEventListener("wheel", handle, { passive: true });
    }
};
jQuery.event.special.mousewheel = {
    setup: function( _, ns, handle ){
        this.addEventListener("mousewheel", handle, { passive: true });
    }
};



// Custom js
$(function() {

    // Show the corresponding screen when screen navigation buttons are clicked(Tryout/Freatures)
    $(".change-slide-btn").on("click", function (){
        let clickedBtn = $(this);

        if(!clickedBtn.hasClass("active")){

            // Make the only clicked button active
            clickedBtn.parent().find(".active").removeClass("active");
            clickedBtn.addClass("active");

            // Show the corresponding frame
            let frameToShow = clickedBtn.attr("data-active-frame");
            let activeFrameId = $("#" + frameToShow);
            activeFrameId.parent().find(".active").removeClass("active");
            activeFrameId.addClass("active");

        }

    });

    // Initializing slick slider
    let solutionSlider = $(".solutions-slider");
    solutionSlider.slick({

        centerMode: true,
        centerPadding: '0',
        mobileFirst: true,
        nextArrow: $("#solutions .next-slide-btn"),
        prevArrow: $("#solutions .prev-slide-btn"),
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    arrows: false,
                    centerMode: false,
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 576,
                settings: {
                    arrows: false,
                    centerMode: true,
                    slidesToShow: 1
                }
            }
        ]
    });


});
