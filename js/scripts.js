/*!
    Title: Dev Portfolio Template - Modernized
    Version: 3.0.0
    Last Change: 02/03/2026
    Author: Anshul Patel

    Description: Modern portfolio with GSAP animations,
    particle background, and smooth interactions.
*/

(function($) {

    // Remove no-js class
    $('html').removeClass('no-js');

    // ==========================================
    // Particle Background System
    // ==========================================
    class ParticleSystem {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.particles = [];
            this.mouseX = 0;
            this.mouseY = 0;
            this.particleCount = 80;
            this.connectionDistance = 150;
            this.mouseRadius = 200;

            this.init();
            this.bindEvents();
            this.animate();
        }

        init() {
            this.resize();
            for (let i = 0; i < this.particleCount; i++) {
                this.particles.push(this.createParticle());
            }
        }

        createParticle() {
            return {
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            };
        }

        resize() {
            this.canvas.width = this.canvas.offsetWidth;
            this.canvas.height = this.canvas.offsetHeight;
        }

        bindEvents() {
            window.addEventListener('resize', () => this.resize());

            this.canvas.addEventListener('mousemove', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                this.mouseX = e.clientX - rect.left;
                this.mouseY = e.clientY - rect.top;
            });

            this.canvas.addEventListener('mouseleave', () => {
                this.mouseX = -1000;
                this.mouseY = -1000;
            });
        }

        drawParticle(particle) {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(16, 185, 129, ${particle.opacity})`;
            this.ctx.fill();
        }

        drawConnections() {
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const dx = this.particles[i].x - this.particles[j].x;
                    const dy = this.particles[i].y - this.particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.connectionDistance) {
                        const opacity = (1 - distance / this.connectionDistance) * 0.3;
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                        this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                        this.ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.stroke();
                    }
                }
            }
        }

        updateParticle(particle) {
            // Mouse interaction
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.mouseRadius) {
                const force = (this.mouseRadius - distance) / this.mouseRadius;
                particle.vx -= (dx / distance) * force * 0.02;
                particle.vy -= (dy / distance) * force * 0.02;
            }

            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Boundary check with bounce
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            }

            // Damping
            particle.vx *= 0.99;
            particle.vy *= 0.99;

            // Minimum velocity
            if (Math.abs(particle.vx) < 0.1) particle.vx = (Math.random() - 0.5) * 0.5;
            if (Math.abs(particle.vy) < 0.1) particle.vy = (Math.random() - 0.5) * 0.5;
        }

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Update and draw particles
            this.particles.forEach(particle => {
                this.updateParticle(particle);
                this.drawParticle(particle);
            });

            // Draw connections
            this.drawConnections();

            requestAnimationFrame(() => this.animate());
        }
    }

    // Initialize particle system
    const particleCanvas = document.getElementById('particle-canvas');
    if (particleCanvas) {
        new ParticleSystem(particleCanvas);
    }

    // ==========================================
    // GSAP Animations
    // ==========================================
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Animate sections on scroll
        gsap.utils.toArray('section, #about, #experience, #education, #publication, #projects, #skills, #hobbies, #contact').forEach(section => {
            gsap.from(section.querySelectorAll('.heading, h2'), {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        });

        // Animate timeline items
        gsap.utils.toArray('.vtimeline-point').forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                x: -50,
                opacity: 0,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'power2.out'
            });
        });

        // Animate education blocks
        gsap.utils.toArray('.education-block').forEach((block, index) => {
            gsap.from(block, {
                scrollTrigger: {
                    trigger: block,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 40,
                opacity: 0,
                duration: 0.6,
                delay: index * 0.15,
                ease: 'power2.out'
            });
        });

        // Animate project cards
        gsap.utils.toArray('.project').forEach((project, index) => {
            gsap.from(project, {
                scrollTrigger: {
                    trigger: project,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.7,
                delay: index * 0.1,
                ease: 'power2.out'
            });
        });

        // Animate skill tags
        gsap.from('#skills li', {
            scrollTrigger: {
                trigger: '#skills',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.4,
            stagger: 0.03,
            ease: 'back.out(1.7)'
        });

        // Animate hobby tags
        gsap.from('#hobbies li', {
            scrollTrigger: {
                trigger: '#hobbies',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.4,
            stagger: 0.03,
            ease: 'back.out(1.7)'
        });

        // Animate contact form
        gsap.from('#contact-form', {
            scrollTrigger: {
                trigger: '#contact',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });

        // Animate optional sections
        gsap.utils.toArray('.optional-section-block').forEach((block, index) => {
            gsap.from(block, {
                scrollTrigger: {
                    trigger: block,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 40,
                opacity: 0,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'power2.out'
            });
        });
    }

    // ==========================================
    // Navigation Smooth Scroll
    // ==========================================
    $('header a').click(function(e) {
        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');
        var scrollDistance = $(heading).offset().top;

        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, Math.abs(window.pageYOffset - $(heading).offset().top) / 2);

        // Hide the menu once clicked if mobile
        if ($('header').hasClass('active')) {
            $('header, body').removeClass('active');
        }
    });

    // ==========================================
    // Scroll to Top
    // ==========================================
    $('#to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    // ==========================================
    // Lead Down Arrow
    // ==========================================
    $('#lead-down span').click(function() {
        var scrollDistance = $('#lead').next().offset().top;
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 500);
    });

    // ==========================================
    // Experience Timeline
    // ==========================================
    $('#experience-timeline').each(function() {
        $this = $(this);
        $userContent = $this.children('div');

        // Create each timeline block
        $userContent.each(function() {
            $(this).addClass('vtimeline-content').wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
        });

        // Add icons to each block
        $this.find('.vtimeline-point').each(function() {
            $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');
        });

        // Add dates to the timeline if exists
        $this.find('.vtimeline-content').each(function() {
            var date = $(this).data('date');
            if (date) {
                $(this).parent().prepend('<span class="vtimeline-date">'+date+'</span>');
            }
        });
    });

    // ==========================================
    // Mobile Menu
    // ==========================================
    $('#mobile-menu-open').click(function() {
        $('header, body').addClass('active');
    });

    $('#mobile-menu-close').click(function() {
        $('header, body').removeClass('active');
    });

    // ==========================================
    // View More Projects
    // ==========================================
    $('#view-more-projects').click(function(e){
        e.preventDefault();
        $(this).fadeOut(300, function() {
            $('#more-projects').fadeIn(300);
        });
    });

})(jQuery);
