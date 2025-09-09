// Popup script for "Ready to design the life that you need"

document.addEventListener('DOMContentLoaded', function() {
    // Create popup elements
    const popupOverlay = document.createElement('div');
    popupOverlay.className = 'popup-overlay';
    
    const popupDiv = document.createElement('div');
    popupDiv.className = 'popup-div';
    
    // Create popup content
    popupDiv.innerHTML = `
        <div class="popup-header">
            <h3>Ready to design the life that you need?</h3>
            <button class="popup-close"><i class="fas fa-times"></i></button>
        </div>
        <div class="popup-body">
            <p>Take the first step towards to your House. Our expert providers are ready to help you transform your life.</p>
            
            <div class="provider-avatars">
                <img src="./images/testimonials/avatar1.svg" alt="Provider" class="provider-avatar-small">
                <img src="./images/testimonials/avatar2.svg" alt="Provider" class="provider-avatar-small">
                <img src="./images/testimonials/avatar3.svg" alt="Provider" class="provider-avatar-small">
                <img src="./images/testimonials/avatar4.svg" alt="Provider" class="provider-avatar-small">
                <img src="./images/testimonials/avatar5.svg" alt="Provider" class="provider-avatar-small">
            </div>
            
            <div class="popup-buttons">
                <a href="login.html" class="btn btn-primary">Get Started</a>
                <a href="providers.html" class="btn btn-outline-primary">Browse Providers</a>
            </div>
        </div>
    `;
    
    // Append popup to body
    popupOverlay.appendChild(popupDiv);
    document.body.appendChild(popupOverlay);
    
    // Show popup after 3 seconds
    setTimeout(function() {
        popupOverlay.classList.add('active');
    }, 3000);
    
    // Close popup when clicking the close button
    const closeButton = popupDiv.querySelector('.popup-close');
    closeButton.addEventListener('click', function() {
        popupOverlay.classList.remove('active');
        // Remove popup after animation completes
        setTimeout(function() {
            document.body.removeChild(popupOverlay);
        }, 500);
    });
    
    // Close popup when clicking outside
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            popupOverlay.classList.remove('active');
            // Remove popup after animation completes
            setTimeout(function() {
                document.body.removeChild(popupOverlay);
            }, 500);
        }
    });
});