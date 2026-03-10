/**
 * Carousel Navigation Script
 * Handles smooth scrolling and keyboard navigation for the image carousel
 */

document.addEventListener('DOMContentLoaded', function() {
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    
    if (!carouselWrapper || !prevBtn || !nextBtn) return;

    const scrollAmount = carouselWrapper.offsetWidth * 0.8;

    /**
     * Scroll carousel to the right
     */
    function scrollNext() {
        carouselWrapper.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }

    /**
     * Scroll carousel to the left
     */
    function scrollPrev() {
        carouselWrapper.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    }

    // Add click event listeners
    nextBtn.addEventListener('click', scrollNext);
    prevBtn.addEventListener('click', scrollPrev);

    // Add keyboard navigation support
    nextBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollNext();
        }
    });

    prevBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollPrev();
        }
    });

    /**
     * Arrow key navigation within the carousel
     */
    carouselWrapper.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            scrollNext();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            scrollPrev();
        }
    });

    /**
     * Update button visibility based on scroll position
     */
    function updateButtonStates() {
        const isAtStart = carouselWrapper.scrollLeft <= 0;
        const isAtEnd = carouselWrapper.scrollLeft + carouselWrapper.offsetWidth >= carouselWrapper.scrollWidth - 1;

        prevBtn.disabled = isAtStart;
        nextBtn.disabled = isAtEnd;
    }

    carouselWrapper.addEventListener('scroll', updateButtonStates);
    updateButtonStates();
});

/**
 * Smooth scroll polyfill for older browsers
 */
if (!('scrollBehavior' in document.documentElement.style)) {
    console.warn('Smooth scroll not supported. Using instant scroll.');
}
