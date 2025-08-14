// OLIP Therapy - Iframe Navigation Handler
// Include this script on the parent website to handle navigation from the embedded therapy pathfinder app

(function() {
    'use strict';
    
    // Listen for messages from the iframe
    window.addEventListener('message', function(event) {
        // Verify the message is from our therapy pathfinder app
        // You can add additional origin verification here if needed
        if (event.data && event.data.type === 'NAVIGATE') {
            const url = event.data.url;
            
            // Navigate to the specified URL
            if (url && typeof url === 'string') {
                // Use window.location.href for full page navigation
                window.location.href = url;
            }
        }
    });
    
    console.log('OLIP Therapy iframe navigation handler loaded');
})(); 