/**
 * Language Template Test Script
 * This script tests the language templates for the AI Story Generator
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create a test button in the UI
    const testButton = document.createElement('button');
    testButton.id = 'test-language-btn';
    testButton.className = 'btn btn-sm btn-outline-secondary mt-2';
    testButton.textContent = 'Test Language';
    testButton.style.display = 'none'; // Hidden in production, enable for testing
    
    // Add the test button after the language selector
    const languageSelect = document.getElementById('language');
    if (languageSelect && languageSelect.parentNode) {
        languageSelect.parentNode.appendChild(testButton);
    }
    
    // Add event listener to test button
    testButton.addEventListener('click', () => {
        testLanguageTemplates();
    });
    
    // Test function for language templates
    function testLanguageTemplates() {
        const language = document.getElementById('language').value;
        console.log(`Testing language templates for: ${language}`);
        
        // Create a new StoryGenerator instance
        const testGenerator = new StoryGenerator();
        
        // Set the language
        testGenerator.setLanguage(language);
        
        // Test if templates are properly initialized
        if (testGenerator.currentLangTemplates) {
            console.log('Language templates initialized successfully');
            console.log('Sample templates:');
            console.log('- Title format:', testGenerator.currentLangTemplates.titleFormats?.[0] || 'Not available');
            console.log('- Beginning intro:', testGenerator.currentLangTemplates.beginningIntro?.substring(0, 50) + '...' || 'Not available');
            
            // Create a test notification
            const notification = document.createElement('div');
            notification.className = 'alert alert-info';
            notification.textContent = `Language templates for ${language} loaded successfully`;
            notification.style.position = 'fixed';
            notification.style.top = '10px';
            notification.style.right = '10px';
            notification.style.zIndex = '9999';
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 3000);
        } else {
            console.error('Failed to initialize language templates');
            alert(`Failed to initialize language templates for ${language}`);
        }
    }
    
    // Enable test button with keyboard shortcut (Ctrl+Shift+L)
    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.shiftKey && event.key === 'L') {
            testButton.style.display = testButton.style.display === 'none' ? 'block' : 'none';
        }
    });
});