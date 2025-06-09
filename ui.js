/**
 * AI Story Generator UI
 * This script handles the user interface interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check authentication status first, before any other initialization
    if (!checkAuthStatus()) {
        return; // Stop execution if not authenticated
    }
    
    // DOM Elements
    const promptInput = document.getElementById('prompt');
    const genreSelect = document.getElementById('genre');
    const languageSelect = document.getElementById('language');
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('length-value');
    const charactersSlider = document.getElementById('characters');
    const charactersValue = document.getElementById('characters-value');
    const generateBtn = document.getElementById('generate-btn');
    const voiceBtn = document.getElementById('voice-btn');
    const voiceStatus = document.getElementById('voice-status');
    const saveBtn = document.getElementById('save-btn');
    const readBtn = document.getElementById('read-btn');
    const videoBtn = document.getElementById('video-btn');
    const shareBtn = document.getElementById('share-btn');
    const savedStoriesBtn = document.getElementById('saved-stories-btn');
    const themeOptions = document.querySelectorAll('.theme-option');
    const loadingOverlay = document.getElementById('loading-overlay');
    const loadingText = document.getElementById('loading-text');
    const emptyState = document.getElementById('empty-state');
    const storyContent = document.getElementById('story-content');
    const charactersPanel = document.getElementById('characters-panel');
    const charactersContainer = document.getElementById('characters-container');
    const videoContainer = document.getElementById('video-container');
    const logoutButton = document.getElementById('logout-button');
    const userDisplayName = document.getElementById('user-display-name');
    const userEmail = document.getElementById('user-email');
    const storyVideo = document.getElementById('story-video');
    const ratingContainer = document.getElementById('rating-container');
    const stars = document.querySelectorAll('.star');
    const ratingText = document.getElementById('rating-text');
    
    // Bootstrap Modals
    const savedStoriesModal = new bootstrap.Modal(document.getElementById('saved-stories-modal'));
    const characterModal = new bootstrap.Modal(document.getElementById('character-modal'));
    const shareModal = new bootstrap.Modal(document.getElementById('share-modal'));
    
    // Character Form Elements
    const characterForm = document.getElementById('character-form');
    const characterIdInput = document.getElementById('character-id');
    const characterNameInput = document.getElementById('character-name');
    const characterRoleSelect = document.getElementById('character-role');
    const characterTraitSelect = document.getElementById('character-trait');
    const characterBackstoryInput = document.getElementById('character-backstory');
    const saveCharacterBtn = document.getElementById('save-character-btn');
    
    // Share Elements
    const shareLinkInput = document.getElementById('share-link');
    const copyLinkBtn = document.getElementById('copy-link-btn');
    const shareTwitterBtn = document.getElementById('share-twitter-btn');
    const shareFacebookBtn = document.getElementById('share-facebook-btn');
    const shareEmailBtn = document.getElementById('share-email-btn');
    
    // State
    let currentStory = null;
    let isListening = false;
    let isSpeaking = false;
    let currentTheme = 'purple';
    let currentLanguage = 'english';
    let savedStories = loadSavedStories();
    let currentRating = 0;
    
    // Speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            promptInput.value = transcript;
            stopListening();
            showNotification('Voice input captured!', 'success');
        };
        
        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            stopListening();
            showNotification('Error capturing voice input', 'error');
        };
    }
    
    // Event Listeners
    
    // Update length value display
    lengthSlider.addEventListener('input', () => {
        lengthValue.textContent = lengthSlider.value;
    });
    
    // Update characters value display
    charactersSlider.addEventListener('input', () => {
        charactersValue.textContent = charactersSlider.value;
    });
    
    // Theme selection
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active class from all options
            themeOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            option.classList.add('active');
            
            // Apply theme to body
            currentTheme = option.getAttribute('data-theme');
            document.body.className = `theme-${currentTheme}`;
            
            // Save theme preference
            localStorage.setItem('storyGeneratorTheme', currentTheme);
        });
    });
    
    // Language selection
    languageSelect.addEventListener('change', () => {
        // Update current language
        currentLanguage = languageSelect.value;
        console.log(`Language changed to: ${currentLanguage}`);
        
        // Save language preference
        localStorage.setItem('storyGeneratorLanguage', currentLanguage);
        
        // Update speech recognition language
        updateSpeechRecognitionLanguage(currentLanguage);
        
        // Show notification about language change
        showNotification(`Story language set to ${languageSelect.options[languageSelect.selectedIndex].text}`, 'info');
    });
    
    // Translation functionality has been removed
    
    /**
     * Generate a character animation video for the current story
     */
    function generateStoryVideo() {
        if (!currentStory) {
            console.log('No story available for video generation');
            return;
        }
        
        console.log('Generating character animation video for story:', currentStory.title);
        
        // Show loading overlay with animation message
        loadingText.textContent = 'Creating your story video with animated characters...';
        loadingOverlay.style.display = 'flex';
        
        try {
            // Reset video container
            const videoPlayer = document.getElementById('video-player');
            const animationFallback = document.getElementById('animation-fallback');
            
            if (videoPlayer) videoPlayer.style.display = 'block';
            if (animationFallback) animationFallback.style.display = 'none';
            
            // Try to use the character video generator first
            if (window.characterVideoGenerator) {
                // Generate character animation video
                characterVideoGenerator.generateVideo(currentStory, currentTheme)
                    .then(() => {
                        // Show video container
                        videoContainer.style.display = 'block';
                        
                        // Scroll to video container
                        videoContainer.scrollIntoView({ behavior: 'smooth' });
                        
                        showNotification('Character animation video created successfully!', 'success');
                    })
                    .catch(error => {
                        console.error('Error generating character animation video:', error);
                        // Fall back to YouTube-style player
                        tryYouTubeStylePlayer();
                    });
            } else {
                // Fall back to YouTube-style player
                tryYouTubeStylePlayer();
            }
            
            // Function to try the YouTube-style player as fallback
            function tryYouTubeStylePlayer() {
                if (window.youtubeStylePlayer) {
                    // Generate YouTube-style video
                    youtubeStylePlayer.generateVideo(currentStory, currentTheme)
                        .then(() => {
                            // Show video container
                            videoContainer.style.display = 'block';
                            
                            // Scroll to video container
                            videoContainer.scrollIntoView({ behavior: 'smooth' });
                            
                            showNotification('YouTube-style video created as fallback!', 'info');
                        })
                        .catch(error => {
                            console.error('Error generating YouTube-style video:', error);
                            handleVideoGenerationError(error);
                        });
                } else {
                    // Final fallback to a simple embedded video
                    if (videoPlayer) {
                        // Default video URL based on genre
                        const defaultVideos = {
                            fantasy: "https://www.youtube.com/embed/6oPBFnsqJC8",
                            scifi: "https://www.youtube.com/embed/gXbXZQDkVxE",
                            mystery: "https://www.youtube.com/embed/AZGcmvrTX9M",
                            romance: "https://www.youtube.com/embed/nSDviEdvPJ0",
                            horror: "https://www.youtube.com/embed/xbZNkMn3PvQ",
                            adventure: "https://www.youtube.com/embed/L9MQLhV2Gnk",
                            historical: "https://www.youtube.com/embed/UmQjx_JVe8Y"
                        };
                        
                        const videoUrl = defaultVideos[currentStory.genre] || defaultVideos.fantasy;
                        
                        // Create iframe
                        const iframe = document.createElement('iframe');
                        iframe.width = "100%";
                        iframe.height = "100%";
                        iframe.src = videoUrl;
                        iframe.title = currentStory.title;
                        iframe.frameBorder = "0";
                        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
                        iframe.allowFullscreen = true;
                        
                        // Add iframe to player
                        videoPlayer.innerHTML = '';
                        videoPlayer.appendChild(iframe);
                        
                        // Add video description
                        const videoDescription = document.getElementById('video-description');
                        if (videoDescription) {
                            videoDescription.innerHTML = `
                                <h4>${currentStory.title}</h4>
                                <p class="genre-tag">${currentStory.genre}</p>
                                <p>${currentStory.summary}</p>
                                <div class="video-stats">
                                    <span><i class="bi bi-eye"></i> 1.2K views</span>
                                    <span><i class="bi bi-hand-thumbs-up"></i> 98%</span>
                                    <span><i class="bi bi-calendar"></i> ${new Date().toLocaleDateString()}</span>
                                </div>
                            `;
                        }
                        
                        // Hide loading overlay
                        loadingOverlay.style.display = 'none';
                        
                        // Show video container
                        videoContainer.style.display = 'block';
                        
                        // Scroll to video container
                        videoContainer.scrollIntoView({ behavior: 'smooth' });
                        
                        showNotification('Video created with embedded content!', 'info');
                    } else {
                        handleVideoGenerationError(new Error('Video player element not found'));
                    }
                }
            }
        } catch (error) {
            console.error('Error initiating video generation:', error);
            loadingOverlay.style.display = 'none';
            showNotification('Error creating video: ' + error.message, 'error');
        }
    }
    
    /**
     * Handle video generation errors with YouTube-style fallback
     */
    function handleVideoGenerationError(error) {
        console.error('Error generating video:', error);
        
        // Create a fallback display
        const fallbackContainer = document.getElementById('animation-fallback');
        const videoPlayer = document.getElementById('video-player');
        
        if (videoPlayer) videoPlayer.style.display = 'none';
        
        if (fallbackContainer) {
            fallbackContainer.style.display = 'flex';
            
            // Set fallback content
            fallbackContainer.innerHTML = `
                <div class="fallback-message">
                    <h4>YouTube-Style Video Preview</h4>
                    <p>Your story "${currentStory.title}" has been prepared for video presentation.</p>
                    <p>This is a ${currentStory.genre} story with ${currentStory.characters.length} characters.</p>
                    <p><em>${currentStory.summary}</em></p>
                    
                    <div class="mt-4">
                        <h5>Featured Characters:</h5>
                        <div class="row">
                            ${currentStory.characters.map(char => `
                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <div class="card-body">
                                            <h6 class="card-title">${char.name}</h6>
                                            <p class="card-text small">${char.role}</p>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="mt-4">
                        <button class="btn btn-primary" onclick="generateStoryVideo()">Try Again</button>
                    </div>
                </div>
            `;
        }
        
        // Show video container
        const videoContainer = document.getElementById('video-container');
        if (videoContainer) {
            videoContainer.style.display = 'block';
        }
        
        // Scroll to video container
        if (videoContainer) {
            videoContainer.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Hide loading overlay and show notification
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
        
        showNotification('Using video preview mode', 'info');
    }
    
    /**
     * Check if user is authenticated
     * @returns {boolean} True if authenticated, false otherwise
     */
    function checkAuthStatus() {
        const isLoggedIn = localStorage.getItem('user_logged_in') === 'true' || 
                          sessionStorage.getItem('user_logged_in') === 'true';
        
        if (!isLoggedIn) {
            // Redirect to login page if not logged in
            console.log('User not authenticated, redirecting to login page');
            window.location.href = 'login.html';
            return false;
        }
        
        // Update user info in the UI
        updateUserInfo();
        
        // Setup logout button
        setupLogout();
        
        return true;
    }
    
    /**
     * Update user info in the UI
     */
    function updateUserInfo() {
        const userName = localStorage.getItem('user_name') || sessionStorage.getItem('user_name') || 'User';
        const userEmailValue = localStorage.getItem('user_email') || sessionStorage.getItem('user_email') || '';
        
        // Get user display elements
        const userDisplayName = document.getElementById('user-display-name');
        const userEmail = document.getElementById('user-email');
        
        // Update user display name
        if (userDisplayName) {
            userDisplayName.textContent = `Welcome, ${userName.split(' ')[0]}!`;
            console.log('Updated user display name:', userName);
        } else {
            console.log('User display name element not found');
        }
        
        // Update user email
        if (userEmail) {
            userEmail.textContent = userEmailValue;
            console.log('Updated user email:', userEmailValue);
        } else {
            console.log('User email element not found');
        }
    }
    
    /**
     * Setup logout button
     */
    function setupLogout() {
        // Get logout button
        const logoutButton = document.getElementById('logout-button');
        
        if (logoutButton) {
            console.log('Setting up logout button');
            logoutButton.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Logout button clicked');
                
                // Clear user data
                localStorage.removeItem('user_logged_in');
                localStorage.removeItem('user_name');
                localStorage.removeItem('user_email');
                sessionStorage.removeItem('user_logged_in');
                sessionStorage.removeItem('user_name');
                sessionStorage.removeItem('user_email');
                
                // Redirect to login page
                window.location.href = 'login.html';
            });
        } else {
            console.log('Logout button not found');
        }
    }
    
    /**
     * Handle video generation errors with fallback display
     */
    function handleVideoGenerationError(error) {
        console.error('Error generating animation:', error);
        
        // Show fallback animation
        const videoPlayer = document.getElementById('video-player');
        const animationFallback = document.getElementById('animation-fallback');
        
        if (videoPlayer) videoPlayer.style.display = 'none';
        if (animationFallback) {
            animationFallback.style.display = 'flex';
            animationFallback.innerHTML = `
                <div class="fallback-message">
                    <h4>Animation Preview</h4>
                    <p>Your story "${currentStory.title}" has been visualized.</p>
                    <p>This is a ${currentStory.genre} story with ${currentStory.characters.length} characters.</p>
                    <p><em>${currentStory.summary}</em></p>
                    <div class="character-preview mt-4">
                        <h5>Featured Characters:</h5>
                        <div class="row">
                            ${currentStory.characters.map(char => `
                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <div class="card-body">
                                            <h6 class="card-title">${char.name}</h6>
                                            <p class="card-text small">${char.role}</p>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Show video container even with fallback
        videoContainer.style.display = 'block';
        
        // Scroll to video container
        videoContainer.scrollIntoView({ behavior: 'smooth' });
        
        // Hide loading overlay and show notification
        loadingOverlay.style.display = 'none';
        showNotification('Using simplified video preview mode', 'info');
    }
    
    // Voice input button
    voiceBtn.addEventListener('click', () => {
        if (!recognition) {
            showNotification('Speech recognition not supported in your browser', 'error');
            return;
        }
        
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    });
    
    // Generate story button
    generateBtn.addEventListener('click', async () => {
        const prompt = promptInput.value.trim();
        
        if (!prompt) {
            showNotification('Please enter a story prompt', 'error');
            return;
        }
        
        // Log current settings for debugging
        console.log(`Generating story with language: ${languageSelect.value}`);
        console.log(`Current language state variable: ${currentLanguage}`);
        
        // Show loading overlay
        const selectedLanguage = languageSelect.options[languageSelect.selectedIndex].text;
        loadingText.textContent = `Generating your story in ${selectedLanguage}...`;
        loadingOverlay.style.display = 'flex';
        
        // Disable generate button
        generateBtn.disabled = true;
        
        try {
            // Get the selected language
            const selectedLanguage = languageSelect.value;
            console.log(`Generating story in language: ${selectedLanguage}`);
            
            // Generate story with the selected language
            const story = await storyGenerator.generateStory(
                prompt,
                genreSelect.value,
                lengthSlider.value,
                charactersSlider.value,
                selectedLanguage
            );
            
            // Verify the language was set correctly
            console.log(`Story generated with language: ${story.language}`);
            
            // Force the language to be the selected one (in case it wasn't set correctly)
            story.language = selectedLanguage;
            
            // Translate the entire story content to the selected language
            if (selectedLanguage !== 'english') {
                console.log(`Translating story to ${selectedLanguage}`);
                
                // Standard translation for other languages
                // First, translate the main story elements
                story.title = languageTranslator.translateText(story.title, selectedLanguage);
                story.summary = languageTranslator.translateText(story.summary, selectedLanguage);
                
                // Then translate each chapter's content and title
                for (let i = 0; i < story.chapters.length; i++) {
                    // Translate chapter title
                    story.chapters[i].title = languageTranslator.translateText(story.chapters[i].title, selectedLanguage);
                    
                    // Translate chapter content paragraph by paragraph
                    const paragraphs = story.chapters[i].content.split('\n\n');
                    const translatedParagraphs = [];
                    
                    for (let j = 0; j < paragraphs.length; j++) {
                        if (paragraphs[j].trim()) {
                            translatedParagraphs.push(languageTranslator.translateText(paragraphs[j], selectedLanguage));
                        }
                    }
                    
                    story.chapters[i].content = translatedParagraphs.join('\n\n');
                }
                
                // Translate character information
                for (let i = 0; i < story.characters.length; i++) {
                    story.characters[i].description = languageTranslator.translateText(story.characters[i].description, selectedLanguage);
                    story.characters[i].backstory = languageTranslator.translateText(story.characters[i].backstory, selectedLanguage);
                    story.characters[i].trait = languageTranslator.translateText(story.characters[i].trait, selectedLanguage);
                    story.characters[i].role = languageTranslator.translateText(story.characters[i].role, selectedLanguage);
                }
                
                console.log(`Story fully translated to ${selectedLanguage}`);
            }
            
            // Verify the language was set correctly
            console.log(`Story generated with language: ${story.language}`);
            
            // Force the language to be the selected one (in case it wasn't set correctly)
            story.language = selectedLanguage;
            
            // Store current story
            currentStory = story;
            
            // Format and display story
            storyContent.innerHTML = storyGenerator.formatStoryForDisplay(story);
            charactersContainer.innerHTML = storyGenerator.formatCharactersForDisplay(story.characters);
            
            // Add event listeners to character edit buttons
            document.querySelectorAll('.character-edit-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const characterId = btn.getAttribute('data-character-id');
                    openCharacterModal(characterId);
                });
            });
            
            // Hide loading overlay and empty state
            loadingOverlay.style.display = 'none';
            emptyState.style.display = 'none';
            
            // Show story content and characters panel
            storyContent.style.display = 'block';
            charactersPanel.style.display = 'block';
            ratingContainer.style.display = 'block';
            
            // Hide video container
            videoContainer.style.display = 'none';
            
            // Reset rating
            currentRating = 0;
            updateRatingDisplay();
            
            // Enable buttons
            saveBtn.disabled = false;
            readBtn.disabled = false;
            videoBtn.disabled = false;
            shareBtn.disabled = false;
            
            // Auto-read the story
            setTimeout(() => {
                readStory();
            }, 1000);
            
            // Auto-generate video for the story
            setTimeout(() => {
                generateStoryVideo();
            }, 2000);
            
            showNotification('Story generated successfully!', 'success');
        } catch (error) {
            console.error('Error generating story:', error);
            showNotification('Error generating story: ' + error.message, 'error');
            
            // Hide loading overlay
            loadingOverlay.style.display = 'none';
        } finally {
            // Re-enable generate button
            generateBtn.disabled = false;
        }
    });
    
    // Read story aloud button
    readBtn.addEventListener('click', () => {
        if (isSpeaking) {
            stopSpeaking();
        } else {
            readStory();
        }
    });
    
    // Save story button
    saveBtn.addEventListener('click', () => {
        if (!currentStory) {
            showNotification('No story to save', 'error');
            return;
        }
        
        // Add rating to story
        currentStory.rating = currentRating;
        
        // Check if story already exists in saved stories
        const existingIndex = savedStories.findIndex(s => s.title === currentStory.title && s.prompt === currentStory.prompt);
        
        if (existingIndex !== -1) {
            // Update existing story
            savedStories[existingIndex] = { ...currentStory, id: savedStories[existingIndex].id };
            showNotification('Story updated successfully!', 'success');
        } else {
            // Add to saved stories
            savedStories.push({
                id: Date.now(),
                ...currentStory
            });
            showNotification('Story saved successfully!', 'success');
        }
        
        // Save to local storage
        saveSavedStories();
    });
    
    // Animation generation button
    videoBtn.addEventListener('click', () => {
        if (!currentStory) {
            showNotification('No story to create video for', 'error');
            return;
        }
        
        // Disable video button temporarily
        videoBtn.disabled = true;
        
        // Generate the video
        generateStoryVideo();
        
        // Re-enable video button after a delay
        setTimeout(() => {
            videoBtn.disabled = false;
        }, 2000);
    });
    
    // Dialogue controls event listeners
    document.addEventListener('click', function(e) {
        // Replay animation button
        if (e.target.id === 'replay-animation' || e.target.closest('#replay-animation')) {
            console.log('Replaying animation');
            if (currentStory) {
                generateStoryVideo();
                showNotification('Replaying character animation', 'info');
            }
        }
        
        // Toggle dialogue button
        if (e.target.id === 'toggle-dialogue' || e.target.closest('#toggle-dialogue')) {
            console.log('Toggling dialogue');
            if (window.characterVideoGenerator && currentStory) {
                generateStoryVideo();
                showNotification('Refreshing character dialogue', 'info');
            }
        }
    });
    
    // Share button
    shareBtn.addEventListener('click', () => {
        if (!currentStory) {
            showNotification('No story to share', 'error');
            return;
        }
        
        // Generate share link (in a real app, this would be a unique URL)
        const shareLink = `https://aistorygenerator.example/share/${Date.now()}`;
        shareLinkInput.value = shareLink;
        
        // Set up share buttons
        const shareText = storyGenerator.getShareSummary(currentStory);
        const encodedText = encodeURIComponent(shareText);
        const encodedUrl = encodeURIComponent(shareLink);
        
        shareTwitterBtn.onclick = () => {
            window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`, '_blank');
        };
        
        shareFacebookBtn.onclick = () => {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
        };
        
        shareEmailBtn.onclick = () => {
            window.open(`mailto:?subject=${encodeURIComponent('Check out this AI-generated story!')}&body=${encodedText}%0A%0A${encodedUrl}`, '_blank');
        };
        
        // Show share modal
        shareModal.show();
    });
    
    // Copy share link button
    copyLinkBtn.addEventListener('click', () => {
        shareLinkInput.select();
        document.execCommand('copy');
        showNotification('Link copied to clipboard!', 'success');
    });
    
    // Saved stories button
    savedStoriesBtn.addEventListener('click', () => {
        // Populate saved stories list
        const savedStoriesList = document.getElementById('saved-stories-list');
        const noSavedStories = document.getElementById('no-saved-stories');
        
        if (savedStories.length === 0) {
            savedStoriesList.innerHTML = '';
            noSavedStories.style.display = 'block';
        } else {
            noSavedStories.style.display = 'none';
            savedStoriesList.innerHTML = savedStories.map(story => {
                const date = new Date(story.createdAt).toLocaleDateString();
                const ratingStars = Array(5).fill('').map((_, i) => 
                    `<span class="star ${i < story.rating ? 'active' : ''}">★</span>`
                ).join('');
                
                return `
                    <div class="col-md-6 mb-3">
                        <div class="saved-story-card" data-story-id="${story.id}">
                            <div class="saved-story-title">${story.title}</div>
                            <div class="saved-story-genre">${story.genre} • ${story.wordCount} words</div>
                            <div class="saved-story-date">Created on ${date}</div>
                            <div class="saved-story-rating">${ratingStars}</div>
                        </div>
                    </div>
                `;
            }).join('');
            
            // Add event listeners to saved story cards
            document.querySelectorAll('.saved-story-card').forEach(card => {
                card.addEventListener('click', () => {
                    const storyId = parseInt(card.getAttribute('data-story-id'));
                    loadSavedStory(storyId);
                    savedStoriesModal.hide();
                });
            });
        }
        
        // Show saved stories modal
        savedStoriesModal.show();
    });
    
    // Save character button
    saveCharacterBtn.addEventListener('click', () => {
        const characterId = characterIdInput.value;
        
        if (!characterId || !currentStory) {
            return;
        }
        
        // Get updated character data
        const updates = {
            name: characterNameInput.value,
            role: characterRoleSelect.value,
            trait: characterTraitSelect.value,
            backstory: characterBackstoryInput.value,
            description: `A ${characterTraitSelect.value} ${characterRoleSelect.value} whose path has become intertwined with ${currentStory.prompt}.`
        };
        
        // Update character in current story
        currentStory = storyGenerator.updateCharacter(currentStory, characterId, updates);
        
        // Update character display
        charactersContainer.innerHTML = storyGenerator.formatCharactersForDisplay(currentStory.characters);
        
        // Re-add event listeners to character edit buttons
        document.querySelectorAll('.character-edit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const charId = btn.getAttribute('data-character-id');
                openCharacterModal(charId);
            });
        });
        
        // Hide modal
        characterModal.hide();
        
        showNotification('Character updated successfully!', 'success');
    });
    
    // Rating stars
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            currentRating = rating;
            updateRatingDisplay();
            
            // If story is already saved, update its rating
            if (currentStory) {
                const existingIndex = savedStories.findIndex(s => s.title === currentStory.title && s.prompt === currentStory.prompt);
                if (existingIndex !== -1) {
                    savedStories[existingIndex].rating = rating;
                    saveSavedStories();
                }
            }
        });
    });
    
    // Helper Functions
    
    // Start listening for voice input
    function startListening() {
        recognition.start();
        isListening = true;
        voiceBtn.innerHTML = '<i class="bi bi-mic-fill"></i>';
        voiceStatus.style.display = 'block';
    }
    
    // Stop listening for voice input
    function stopListening() {
        if (recognition) {
            recognition.stop();
        }
        isListening = false;
        voiceBtn.innerHTML = '<i class="bi bi-mic"></i>';
        voiceStatus.style.display = 'none';
    }
    
    // Read the current story aloud
    function readStory() {
        if (!currentStory || isSpeaking) {
            return;
        }
        
        // Create a clean text version of the story
        let storyText = currentStory.title + '. ';
        storyText += currentStory.summary + ' ';
        
        currentStory.chapters.forEach(chapter => {
            storyText += 'Chapter ' + chapter.title + '. ';
            storyText += chapter.content + ' ';
        });
        
        // Create speech synthesis utterance
        const utterance = new SpeechSynthesisUtterance(storyText);
        
        // Set the language based on the story's language
        const languageMapping = {
            'english': 'en-US',
            'spanish': 'es-ES',
            'french': 'fr-FR',
            'german': 'de-DE',
            'italian': 'it-IT',
            'portuguese': 'pt-BR',
            'russian': 'ru-RU',
            'japanese': 'ja-JP',
            'korean': 'ko-KR',
            'chinese': 'zh-CN',
            'arabic': 'ar-SA',
            'hindi': 'hi-IN',
            'dutch': 'nl-NL',
            'swedish': 'sv-SE',
            'norwegian': 'no-NO',
            'danish': 'da-DK',
            'finnish': 'fi-FI',
            'polish': 'pl-PL',
            'czech': 'cs-CZ',
            'hungarian': 'hu-HU',
            'romanian': 'ro-RO',
            'bulgarian': 'bg-BG',
            'croatian': 'hr-HR',
            'serbian': 'sr-RS',
            'slovak': 'sk-SK',
            'slovenian': 'sl-SI',
            'estonian': 'et-EE',
            'latvian': 'lv-LV',
            'lithuanian': 'lt-LT',
            'greek': 'el-GR',
            'turkish': 'tr-TR',
            'hebrew': 'he-IL',
            'thai': 'th-TH',
            'vietnamese': 'vi-VN',
            'indonesian': 'id-ID',
            'malay': 'ms-MY',
            'filipino': 'fil-PH',
            'swahili': 'sw-KE',
            'afrikaans': 'af-ZA',
            'zulu': 'zu-ZA',
            'xhosa': 'xh-ZA',
            'yoruba': 'yo-NG',
            'igbo': 'ig-NG',
            'hausa': 'ha-NG',
            'amharic': 'am-ET',
            'somali': 'so-SO',
            'malagasy': 'mg-MG',
            'kinyarwanda': 'rw-RW',
            'shona': 'sn-ZW',
            'sesotho': 'st-ZA',
            'setswana': 'tn-ZA',
            'tigrinya': 'ti-ER',
            'oromo': 'om-ET',
            'wolof': 'wo-SN',
            'bambara': 'bm-ML',
            'fula': 'ff-SN',
            'lingala': 'ln-CD',
            'kikongo': 'kg-CD',
            'luganda': 'lg-UG',
            'chichewa': 'ny-MW',
            'bemba': 'bem-ZM',
            'tonga': 'to-ZM',
            'ndebele': 'nr-ZA',
            'venda': 've-ZA',
            'tsonga': 'ts-ZA'
        };
        
        // Set the language for speech synthesis
        const storyLanguage = currentStory.language || 'english';
        const speechLang = languageMapping[storyLanguage] || 'en-US';
        utterance.lang = speechLang;
        
        // Function to set the appropriate voice
        const setVoice = () => {
            const voices = window.speechSynthesis.getVoices();
            if (voices.length === 0) {
                // Voices not loaded yet, try again after a short delay
                setTimeout(setVoice, 100);
                return;
            }
            
            // Try to find a voice that matches the exact language code
            let matchingVoice = voices.find(voice => voice.lang === speechLang);
            
            // If no exact match, try to find a voice that starts with the language code
            if (!matchingVoice) {
                matchingVoice = voices.find(voice => voice.lang.startsWith(speechLang.split('-')[0]));
            }
            
            // If still no match, try to find any voice for the language family
            if (!matchingVoice) {
                const langCode = speechLang.split('-')[0];
                matchingVoice = voices.find(voice => voice.lang.toLowerCase().includes(langCode));
            }
            
            if (matchingVoice) {
                utterance.voice = matchingVoice;
                console.log(`Using voice: ${matchingVoice.name} (${matchingVoice.lang}) for story language: ${storyLanguage}`);
            } else {
                console.log(`No matching voice found for language: ${storyLanguage} (${speechLang}), using default voice`);
            }
            
            // Start speech synthesis
            window.speechSynthesis.speak(utterance);
        };
        
        // Set speech rate and pitch for better listening experience
        utterance.rate = 0.9; // Slightly slower for better comprehension
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        utterance.onstart = () => {
            isSpeaking = true;
            readBtn.innerHTML = '<i class="bi bi-volume-mute"></i> Stop';
            showNotification(`Reading story aloud in ${storyLanguage}...`, 'info');
        };
        
        utterance.onend = () => {
            isSpeaking = false;
            readBtn.innerHTML = '<i class="bi bi-volume-up"></i> Read';
        };
        
        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            isSpeaking = false;
            readBtn.innerHTML = '<i class="bi bi-volume-up"></i> Read';
            showNotification('Error reading story', 'error');
        };
        
        // Set the voice (this will also start the speech)
        setVoice();
    }
    
    // Stop speaking
    function stopSpeaking() {
        window.speechSynthesis.cancel();
        isSpeaking = false;
        readBtn.innerHTML = '<i class="bi bi-volume-up"></i> Read';
    }
    
    // Open character customization modal
    function openCharacterModal(characterId) {
        if (!currentStory) {
            return;
        }
        
        const character = currentStory.characters.find(c => c.id === characterId);
        
        if (character) {
            characterIdInput.value = character.id;
            characterNameInput.value = character.name;
            
            // Set role if it exists in options, otherwise add it
            const roleOption = Array.from(characterRoleSelect.options).find(option => option.value === character.role);
            if (roleOption) {
                characterRoleSelect.value = character.role;
            } else {
                const newOption = new Option(character.role, character.role);
                characterRoleSelect.add(newOption);
                characterRoleSelect.value = character.role;
            }
            
            // Set trait if it exists in options, otherwise add it
            const traitOption = Array.from(characterTraitSelect.options).find(option => option.value === character.trait);
            if (traitOption) {
                characterTraitSelect.value = character.trait;
            } else {
                const newOption = new Option(character.trait, character.trait);
                characterTraitSelect.add(newOption);
                characterTraitSelect.value = character.trait;
            }
            
            characterBackstoryInput.value = character.backstory;
            
            characterModal.show();
        }
    }
    
    // Load a saved story
    function loadSavedStory(storyId) {
        const story = savedStories.find(s => s.id === storyId);
        
        if (story) {
            currentStory = story;
            
            // Format and display story
            storyContent.innerHTML = storyGenerator.formatStoryForDisplay(story);
            charactersContainer.innerHTML = storyGenerator.formatCharactersForDisplay(story.characters);
            
            // Add event listeners to character edit buttons
            document.querySelectorAll('.character-edit-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const characterId = btn.getAttribute('data-character-id');
                    openCharacterModal(characterId);
                });
            });
            
            // Hide empty state
            emptyState.style.display = 'none';
            
            // Show story content and characters panel
            storyContent.style.display = 'block';
            charactersPanel.style.display = 'block';
            ratingContainer.style.display = 'block';
            
            // Hide video container
            videoContainer.style.display = 'none';
            
            // Set rating
            currentRating = story.rating || 0;
            updateRatingDisplay();
            
            // Enable buttons
            saveBtn.disabled = false;
            readBtn.disabled = false;
            videoBtn.disabled = false;
            shareBtn.disabled = false;
            
            showNotification('Story loaded successfully!', 'success');
        }
    }
    
    // Update rating display
    function updateRatingDisplay() {
        stars.forEach((star, index) => {
            if (index < currentRating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
        
        ratingText.textContent = currentRating > 0 ? `You rated this story ${currentRating} out of 5 stars` : 'Not rated yet';
    }
    
    // Show notification
    function showNotification(message, type) {
        const notificationContainer = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        notificationContainer.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notificationContainer.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Load saved stories from local storage
    function loadSavedStories() {
        const savedStoriesJson = localStorage.getItem('savedStories');
        
        if (savedStoriesJson) {
            try {
                return JSON.parse(savedStoriesJson);
            } catch (error) {
                console.error('Error parsing saved stories:', error);
                return [];
            }
        }
        
        return [];
    }
    
    // Save stories to local storage
    function saveSavedStories() {
        localStorage.setItem('savedStories', JSON.stringify(savedStories));
    }
    
    // Initialize
    function initialize() {
        // Load theme preference
        const savedTheme = localStorage.getItem('storyGeneratorTheme') || 'purple';
        currentTheme = savedTheme;
        document.body.className = `theme-${savedTheme}`;
        
        // Set active theme option
        themeOptions.forEach(option => {
            if (option.getAttribute('data-theme') === savedTheme) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        
        // Load language preference
        const savedLanguage = localStorage.getItem('storyGeneratorLanguage') || 'english';
        currentLanguage = savedLanguage;
        languageSelect.value = savedLanguage;
        
        // Update speech recognition language based on selected language
        if (recognition) {
            updateSpeechRecognitionLanguage(savedLanguage);
        }
        
        // Check if speech recognition is supported
        if (!recognition) {
            voiceBtn.disabled = true;
            voiceBtn.title = 'Speech recognition not supported in your browser';
        }
    }
    
    // Update speech recognition language
    function updateSpeechRecognitionLanguage(language) {
        if (!recognition) return;
        
        // Map language to speech recognition language code
        const langMap = {
            'english': 'en-US',
            'spanish': 'es-ES',
            'french': 'fr-FR',
            'german': 'de-DE',
            'italian': 'it-IT',
            'portuguese': 'pt-PT',
            'russian': 'ru-RU',
            'japanese': 'ja-JP',
            'chinese': 'zh-CN',
            'hindi': 'hi-IN'
        };
        
        recognition.lang = langMap[language] || 'en-US';
    }
    
    // Initialize the application
    initialize();
});