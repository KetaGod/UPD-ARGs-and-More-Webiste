document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar Active Link Highlighting
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formResponse = document.getElementById('form-response');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        formResponse.classList.remove('hidden');
        formResponse.textContent = 'Thank you for reaching out! I will get back to you as soon as possible :3';

        // Simulated Form Submission to a Server
        const formData = new FormData(contactForm);
        fetch('https://example.com/contact', {
            method: 'POST',
            body: formData,
        }).then(response => {
            if (response.ok) {
                console.log('Form submitted successfully');
            } else {
                console.error('Form submission failed');
            }
        }).catch(error => console.error('Error:', error));

        // Reset Form and Hide Response
        contactForm.reset();
        setTimeout(() => {
            formResponse.classList.add('hidden');
        }, 5000);
    });

    // Social Media Tooltips
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = `Go check out my ${icon.textContent.trim()} page`;
            icon.appendChild(tooltip);
        });

        icon.addEventListener('mouseleave', () => {
            const tooltip = icon.querySelector('.tooltip');
            if (tooltip) icon.removeChild(tooltip);
        });
    });

    // Load Episodes from JSON File
    const episodesContainer = document.getElementById('episodes-container');
    if (episodesContainer) {
        fetch('episodes.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(episode => {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML = `
                        <img src="${episode.thumbnail}" alt="${episode.title} Thumbnail" class="card-image">
                        <div class="card-content">
                            <h3>${episode.title}</h3>
                            <p>${episode.description}</p>
                            <p><strong>Date:</strong> ${episode.date}</p>
                            <a href="${episode.link}" class="btn btn-secondary" target="_blank">Listen Now</a>
                        </div>
                    `;
                    episodesContainer.appendChild(card);
                });
            })
            .catch(error => console.error('Error loading episodes:', error));
    }
});
