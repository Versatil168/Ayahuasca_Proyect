(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Date and time picker
    $('#date').datetimepicker({
        format: 'L'
    });
    $('#time').datetimepicker({
        format: 'LT'
    });


    // Service carousel
    $(".service-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Team carousel
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        center: true,
        autoplay: true,
        smartSpeed: 1000,
        margin: 30,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

function initLanguageSystem() {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    const languageSelect = document.getElementById('language-select');
    
    if (!languageSelect) return;
    
    if (savedLanguage) {
        languageSelect.value = savedLanguage;
        setTimeout(() => {
            applyTranslation(savedLanguage);
        }, 1000);
    }
    
    $(languageSelect).on('change', function() {
        const selectedLanguage = this.value;
        showLoadingIndicator();
        localStorage.setItem('selectedLanguage', selectedLanguage);
        setTimeout(() => {
            applyTranslation(selectedLanguage);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }, 500);
    });
}

function applyTranslation(lang) {
    const translateCombo = document.querySelector('.goog-te-combo');
    
    if (translateCombo) {
        translateCombo.value = lang;
        translateCombo.dispatchEvent(new Event('change'));
    } else {
        const waitForTranslate = setInterval(function() {
            const select = document.querySelector('.goog-te-combo');
            if (select) {
                clearInterval(waitForTranslate);
                select.value = lang;
                select.dispatchEvent(new Event('change'));
            }
        }, 100);
        
        setTimeout(function() {
            clearInterval(waitForTranslate);
            hideLoadingIndicator();
        }, 5000);
    }
}

function showLoadingIndicator() {
    if (document.getElementById('language-loading-indicator')) return;
    
    const loadingElement = document.createElement('div');
    loadingElement.id = 'language-loading-indicator';
    loadingElement.innerHTML = `
        <div class="language-loading-spinner"></div>
        <p>Cambiando idioma...</p>
    `;
    document.body.appendChild(loadingElement);
    
    const style = document.createElement('style');
    style.textContent = `
        #language-loading-indicator {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            color: white;
            font-family: 'Montserrat', sans-serif;
        }
        
        .language-loading-spinner {
            border: 5px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top: 5px solid #fff;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
            margin-bottom: 15px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

function hideLoadingIndicator() {
    const indicator = document.getElementById('language-loading-indicator');
    if (indicator) {
        indicator.remove();
    }
}

$(document).ready(function() {
    initLanguageSystem();
});
