// Main JavaScript for Service Provider Platform

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initializeSearchForm();
    initializeAnimations();
    initializeTestimonialCarousel();
    
    // If on provider pages
    if (document.querySelector('.provider-tabs')) {
        initializeProviderTabs();
    }
    
    // If on booking page
    if (document.querySelector('.booking-calendar')) {
        initializeBookingCalendar();
    }
});

/**
 * Initialize the search form functionality
 */
function initializeSearchForm() {
    const searchForm = document.querySelector('.search-container form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const serviceType = document.getElementById('serviceType').value;
            const location = document.getElementById('location').value;
            
            // Validate inputs
            if (serviceType === 'Select Service Type') {
                alert('Please select a service type');
                return;
            }
            
            if (!location) {
                alert('Please enter your location');
                return;
            }
            
            // Redirect to search results page with query parameters
            window.location.href = `providers.html?service=${encodeURIComponent(serviceType)}&location=${encodeURIComponent(location)}`;
        });
    }
}

/**
 * Initialize scroll animations
 */
function initializeAnimations() {
    // Add fade-in class to elements as they come into view
    const animatedElements = document.querySelectorAll('.service-card, .step, .testimonial-card');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animatedElements.forEach(element => {
            element.classList.add('fade-in');
        });
    }
}

/**
 * Initialize testimonial carousel
 */
function initializeTestimonialCarousel() {
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    
    if (testimonialCarousel) {
        // Using Bootstrap's carousel, no additional initialization needed
        // But we could add custom behavior here if needed
    }
}

/**
 * Initialize provider profile tabs
 */
function initializeProviderTabs() {
    const tabLinks = document.querySelectorAll('.provider-tabs .nav-link');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabLinks.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding tab content
            const tabId = this.getAttribute('href');
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('show', 'active');
            });
            document.querySelector(tabId).classList.add('show', 'active');
        });
    });
}

/**
 * Initialize booking calendar
 */
function initializeBookingCalendar() {
    const calendarDays = document.querySelectorAll('.calendar-day');
    const timeSlots = document.querySelectorAll('.time-slot');
    
    // Calendar day selection
    calendarDays.forEach(day => {
        if (!day.classList.contains('disabled')) {
            day.addEventListener('click', function() {
                calendarDays.forEach(d => d.classList.remove('active'));
                this.classList.add('active');
                
                // You could load available time slots for the selected day here
                // For demo purposes, we'll just enable all time slots
                timeSlots.forEach(slot => {
                    if (!slot.classList.contains('booked')) {
                        slot.classList.remove('disabled');
                    }
                });
            });
        }
    });
    
    // Time slot selection
    timeSlots.forEach(slot => {
        if (!slot.classList.contains('booked')) {
            slot.addEventListener('click', function() {
                if (!this.classList.contains('disabled')) {
                    timeSlots.forEach(s => s.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Enable the booking button
                    document.querySelector('.booking-submit').removeAttribute('disabled');
                }
            });
        }
    });
    
    // Booking form submission
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const selectedDay = document.querySelector('.calendar-day.active');
            const selectedTime = document.querySelector('.time-slot.active');
            
            if (!selectedDay || !selectedTime) {
                alert('Please select a day and time for your appointment');
                return;
            }
            
            // Here you would typically send the booking data to a server
            // For demo purposes, we'll just show a success message
            const bookingDetails = {
                provider: document.querySelector('.provider-info h2').textContent,
                service: document.querySelector('#serviceType').value,
                date: selectedDay.getAttribute('data-date'),
                time: selectedTime.textContent,
                notes: document.querySelector('#bookingNotes').value
            };
            
            console.log('Booking details:', bookingDetails);
            
            // Show success message
            const bookingContainer = document.querySelector('.booking-container');
            bookingContainer.innerHTML = `
                <div class="alert alert-success" role="alert">
                    <h4 class="alert-heading">Booking Successful!</h4>
                    <p>Your appointment with ${bookingDetails.provider} has been scheduled for ${bookingDetails.date} at ${bookingDetails.time}.</p>
                    <hr>
                    <p class="mb-0">You will receive a confirmation email shortly.</p>
                </div>
                <button class="btn btn-primary mt-3" onclick="window.location.href='index.html'">Return to Home</button>
            `;
        });
    }
}

/**
 * Handle provider registration form
 */
function handleProviderRegistration() {
    const providerForm = document.getElementById('providerRegistrationForm');
    
    if (providerForm) {
        providerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const name = document.getElementById('providerName').value;
            const email = document.getElementById('providerEmail').value;
            const phone = document.getElementById('providerPhone').value;
            const service = document.getElementById('providerService').value;
            const description = document.getElementById('providerDescription').value;
            
            if (!name || !email || !phone || !service || !description) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Here you would typically send the registration data to a server
            // For demo purposes, we'll just show a success message
            const registrationData = {
                name,
                email,
                phone,
                service,
                description
            };
            
            console.log('Provider registration data:', registrationData);
            
            // Show success message
            const formContainer = document.querySelector('.auth-container');
            formContainer.innerHTML = `
                <div class="text-center">
                    <i class="fas fa-check-circle text-success fa-5x mb-3"></i>
                    <h2>Registration Successful!</h2>
                    <p class="lead">Thank you for registering as a service provider. Our team will review your application and contact you shortly.</p>
                    <a href="index.html" class="btn btn-primary mt-3">Return to Home</a>
                </div>
            `;
        });
    }
}

/**
 * Handle user registration form
 */
function handleUserRegistration() {
    const userForm = document.getElementById('userRegistrationForm');
    
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const name = document.getElementById('userName').value;
            const email = document.getElementById('userEmail').value;
            const password = document.getElementById('userPassword').value;
            const confirmPassword = document.getElementById('userConfirmPassword').value;
            
            if (!name || !email || !password || !confirmPassword) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // Here you would typically send the registration data to a server
            // For demo purposes, we'll just show a success message
            const registrationData = {
                name,
                email,
                password
            };
            
            console.log('User registration data:', registrationData);
            
            // Show success message
            const formContainer = document.querySelector('.auth-container');
            formContainer.innerHTML = `
                <div class="text-center">
                    <i class="fas fa-check-circle text-success fa-5x mb-3"></i>
                    <h2>Registration Successful!</h2>
                    <p class="lead">Thank you for creating an account. You can now search for service providers and book appointments.</p>
                    <a href="index.html" class="btn btn-primary mt-3">Return to Home</a>
                </div>
            `;
        });
    }
}

/**
 * Handle login form
 */
function handleLogin() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (!email || !password) {
                alert('Please enter your email and password');
                return;
            }
            
            // Here you would typically send the login data to a server for authentication
            // For demo purposes, we'll just redirect to the dashboard
            console.log('Login attempt:', { email });
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        });
    }
}

// Initialize additional forms if present on the page
document.addEventListener('DOMContentLoaded', function() {
    handleProviderRegistration();
    handleUserRegistration();
    handleLogin();
});