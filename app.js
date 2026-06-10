// App interactivity and logic

document.addEventListener('DOMContentLoaded', () => {
    // Add logic for active nav highlighting based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-white', 'font-bold');
            link.classList.add('text-gray-300'); // Reset
            
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.remove('text-gray-300');
                link.classList.add('text-white', 'font-bold');
            }
        });
    });

    // Handle accordion mutually exclusive open state (optional enhancement)
    const detailsElements = document.querySelectorAll('details');
    detailsElements.forEach(targetDetail => {
        targetDetail.addEventListener('click', () => {
            detailsElements.forEach(detail => {
                if (detail !== targetDetail) {
                    detail.removeAttribute('open');
                }
            });
        });
    });
    
    console.log('Campus App MVP initialized successfully.');
});
