document.addEventListener('DOMContentLoaded', () => {
    // Reveal sections on scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Subtle parallax or hover effect for interest (Optional logic can be added here)


    // Custom console message for developers/profs
    console.log("%cHello! Thanks for visiting my academic profile.", "color: #1a1a1a; font-family: sans-serif; font-size: 14px; font-weight: bold;");
});
