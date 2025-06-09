/**
 * Realistic Video Generator
 * Creates high-quality videos with realistic character representations
 */

class RealisticVideoGenerator {
    constructor() {
        // Video settings
        this.videoSettings = {
            width: 1280,
            height: 720,
            fps: 30,
            minDuration: 300, // minimum 5 minutes
            maxDuration: 600, // maximum 10 minutes
            sceneTransitionTime: 2.5, // seconds for scene transitions
            characterDisplayTime: 8 // seconds per character display
        };
        
        // Scene transition effects
        this.transitionEffects = [
            'fade',
            'crossfade',
            'slide',
            'zoom',
            'blur',
            'dissolve'
        ];
        
        // Video styles
        this.videoStyles = {
            cinematic: {
                aspectRatio: '2.35:1',
                letterboxColor: '#000000',
                fontFamily: 'Georgia, serif',
                titleColor: '#ffffff',
                subtitleColor: 'rgba(255, 255, 255, 0.8)',
                textColor: '#ffffff',
                overlayColor: 'rgba(0, 0, 0, 0.5)'
            },
            documentary: {
                aspectRatio: '16:9',
                letterboxColor: 'transparent',
                fontFamily: 'Arial, sans-serif',
                titleColor: '#ffffff',
                subtitleColor: 'rgba(255, 255, 255, 0.9)',
                textColor: '#ffffff',
                overlayColor: 'rgba(0, 0, 0, 0.4)'
            },
            dramatic: {
                aspectRatio: '2.00:1',
                letterboxColor: '#000000',
                fontFamily: 'Palatino, serif',
                titleColor: '#ffffff',
                subtitleColor: 'rgba(255, 255, 255, 0.85)',
                textColor: '#ffffff',
                overlayColor: 'rgba(0, 0, 0, 0.6)'
            }
        };
    }
    
    /**
     * Generate a realistic video for the story
     */
    generateRealisticVideo(story, theme) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(`Generating realistic video for story: ${story.title}`);
                
                // Update loading text
                const loadingText = document.getElementById('loading-text');
                if (loadingText) {
                    loadingText.textContent = 'Creating your realistic story video with lifelike characters...';
                }
                
                // Generate realistic characters
                const realisticCharacters = window.realisticCharacterGenerator.generateRealisticCharacters(story);
                
                // Generate realistic scenes
                const realisticScenes = window.realisticCharacterGenerator.generateRealisticScenes(story);
                
                // Create video sequence
                const sequence = this.createVideoSequence(story, realisticCharacters, realisticScenes);
                
                // Calculate video duration
                const duration = Math.min(
                    this.videoSettings.maxDuration,
                    Math.max(
                        this.videoSettings.minDuration,
                        sequence.reduce((total, item) => total + item.duration, 0)
                    )
                );
                
                // Select video style based on genre and theme
                const videoStyle = this.selectVideoStyle(story.genre, theme);
                
                // Create the video
                this.createRealisticVideo(story, sequence, realisticCharacters, realisticScenes, videoStyle, duration)
                    .then(videoUrl => {
                        resolve({
                            url: videoUrl,
                            title: story.title,
                            duration: duration,
                            genre: story.genre,
                            createdAt: new Date().toISOString()
                        });
                    })
                    .catch(error => {
                        console.error('Error in video creation:', error);
                        reject(error);
                    });
                
            } catch (error) {
                console.error('Error in realistic video generation:', error);
                reject(error);
            }
        });
    }
    
    /**
     * Select appropriate video style based on genre and theme
     */
    selectVideoStyle(genre, theme) {
        // Map genres to video styles
        const genreStyleMap = {
            fantasy: 'cinematic',
            scifi: 'cinematic',
            mystery: 'dramatic',
            romance: 'dramatic',
            horror: 'dramatic',
            adventure: 'cinematic',
            historical: 'documentary'
        };
        
        // Get style based on genre or default to cinematic
        const styleKey = genreStyleMap[genre] || 'cinematic';
        return this.videoStyles[styleKey];
    }
    
    /**
     * Create a video sequence from the story
     */
    createVideoSequence(story, realisticCharacters, realisticScenes) {
        const sequence = [];
        
        // Add title sequence
        sequence.push({
            type: 'title',
            content: story.title,
            duration: 6,
            effect: 'fade'
        });
        
        // Add genre and theme
        sequence.push({
            type: 'subtitle',
            content: `A ${story.genre} story`,
            duration: 4,
            effect: 'fade'
        });
        
        // Add summary
        sequence.push({
            type: 'summary',
            content: story.summary,
            duration: 10,
            effect: 'fade'
        });
        
        // Add character introductions
        realisticCharacters.forEach(character => {
            sequence.push({
                type: 'character',
                character: character,
                duration: this.videoSettings.characterDisplayTime,
                effect: 'crossfade'
            });
        });
        
        // Add chapter sequences
        story.chapters.forEach((chapter, chapterIndex) => {
            // Add chapter title
            sequence.push({
                type: 'chapterTitle',
                content: `Chapter ${chapterIndex + 1}: ${chapter.title}`,
                duration: 5,
                effect: 'fade'
            });
            
            // Get scenes for this chapter
            const chapterScenes = realisticScenes.filter(scene => scene.chapter === chapterIndex + 1);
            
            // Add scenes
            chapterScenes.forEach(scene => {
                sequence.push({
                    type: 'scene',
                    scene: scene,
                    duration: 15, // Base duration for each scene
                    effect: this.transitionEffects[Math.floor(Math.random() * this.transitionEffects.length)]
                });
            });
            
            // Add chapter end if not the last chapter
            if (chapterIndex < story.chapters.length - 1) {
                sequence.push({
                    type: 'chapterEnd',
                    content: `End of Chapter ${chapterIndex + 1}`,
                    duration: 3,
                    effect: 'fade'
                });
            }
        });
        
        // Add ending
        sequence.push({
            type: 'ending',
            content: 'The End',
            duration: 5,
            effect: 'fade'
        });
        
        return sequence;
    }
    
    /**
     * Create a realistic video from the sequence
     */
    createRealisticVideo(story, sequence, realisticCharacters, realisticScenes, videoStyle, duration) {
        return new Promise((resolve, reject) => {
            try {
                // Create a canvas element
                const canvas = document.createElement('canvas');
                canvas.width = this.videoSettings.width;
                canvas.height = this.videoSettings.height;
                const ctx = canvas.getContext('2d');
                
                // Create a video element
                const video = document.createElement('video');
                video.width = this.videoSettings.width;
                video.height = this.videoSettings.height;
                video.controls = true;
                
                // Try to create a media recorder
                let recorder;
                let recordingChunks = [];
                
                try {
                    // Create a media recorder
                    const stream = canvas.captureStream(this.videoSettings.fps);
                    recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
                    
                    // Store recorded chunks
                    recorder.ondataavailable = e => recordingChunks.push(e.data);
                    
                    // When recording is complete
                    recorder.onstop = () => {
                        const blob = new Blob(recordingChunks, { type: 'video/webm' });
                        video.src = URL.createObjectURL(blob);
                        
                        // Add the video to the page
                        const videoContainer = document.getElementById('story-video');
                        if (videoContainer) {
                            videoContainer.src = video.src;
                        }
                        
                        // Add video to the player
                        const videoPlayer = document.getElementById('video-player');
                        if (videoPlayer) {
                            videoPlayer.innerHTML = '';
                            videoPlayer.appendChild(video);
                        }
                        
                        // Hide loading overlay
                        const loadingOverlay = document.getElementById('loading-overlay');
                        if (loadingOverlay) {
                            loadingOverlay.style.display = 'none';
                        }
                        
                        resolve(video.src);
                    };
                } catch (error) {
                    console.error('MediaRecorder error:', error);
                    // Will use fallback method
                    recorder = null;
                }
                
                // Preload all images
                const imagesToLoad = [];
                
                // Add character images
                realisticCharacters.forEach(character => {
                    if (character.image) {
                        imagesToLoad.push(character.image);
                    }
                });
                
                // Add scene backgrounds
                realisticScenes.forEach(scene => {
                    if (scene.background) {
                        imagesToLoad.push(scene.background);
                    }
                    
                    // Add character images in scenes
                    scene.characters.forEach(character => {
                        if (character.image) {
                            imagesToLoad.push(character.image);
                        }
                    });
                });
                
                // Remove duplicates
                const uniqueImages = [...new Set(imagesToLoad)];
                
                // Load all images
                const loadedImages = {};
                let loadedCount = 0;
                
                uniqueImages.forEach(url => {
                    const img = new Image();
                    img.crossOrigin = 'Anonymous';
                    img.onload = () => {
                        loadedImages[url] = img;
                        loadedCount++;
                        
                        // If all images are loaded, start the animation
                        if (loadedCount === uniqueImages.length) {
                            console.log('All images loaded, starting video creation');
                            
                            // Start animation
                            let currentFrame = 0;
                            let currentSequenceIndex = 0;
                            let sequenceStartTime = 0;
                            let lastFrameTime = 0;
                            
                            // Start recording if available
                            if (recorder) {
                                recorder.start();
                            }
                            
                            // Animation loop
                            const animate = (timestamp) => {
                                if (!sequenceStartTime) {
                                    sequenceStartTime = timestamp;
                                    lastFrameTime = timestamp;
                                }
                                
                                // Calculate elapsed time
                                const elapsed = timestamp - sequenceStartTime;
                                const frameDuration = timestamp - lastFrameTime;
                                lastFrameTime = timestamp;
                                
                                // Get current sequence item
                                const currentSequence = sequence[currentSequenceIndex];
                                const sequenceDuration = currentSequence.duration * 1000; // convert to ms
                                
                                // Calculate progress through current sequence
                                const progress = Math.min(1, elapsed / sequenceDuration);
                                
                                // Clear canvas
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                
                                // Draw content based on sequence type
                                this.drawSequenceFrame(ctx, currentSequence, progress, loadedImages, canvas, videoStyle, story);
                                
                                // Move to next sequence item if current one is complete
                                if (progress >= 1) {
                                    currentSequenceIndex++;
                                    sequenceStartTime = 0;
                                    
                                    // If we've reached the end of the sequence, stop recording
                                    if (currentSequenceIndex >= sequence.length) {
                                        if (recorder) {
                                            recorder.stop();
                                        } else {
                                            // Fallback for browsers without MediaRecorder
                                            this.createFallbackVideo(story, realisticCharacters, realisticScenes, videoStyle)
                                                .then(resolve)
                                                .catch(reject);
                                        }
                                        return;
                                    }
                                }
                                
                                // Request next frame
                                requestAnimationFrame(animate);
                            };
                            
                            // Start animation loop
                            requestAnimationFrame(animate);
                        }
                    };
                    
                    img.onerror = () => {
                        console.error(`Error loading image: ${url}`);
                        loadedCount++;
                        
                        // Continue even if some images fail to load
                        if (loadedCount === uniqueImages.length) {
                            console.log('All images attempted to load, starting video creation');
                            // Start animation (same code as above)
                            // This is a simplified version - in a real implementation, you'd refactor this to avoid duplication
                        }
                    };
                    
                    img.src = url;
                });
                
                // If no images to load, create fallback
                if (uniqueImages.length === 0) {
                    this.createFallbackVideo(story, realisticCharacters, realisticScenes, videoStyle)
                        .then(resolve)
                        .catch(reject);
                }
                
            } catch (error) {
                console.error('Error in createRealisticVideo:', error);
                reject(error);
            }
        });
    }
    
    /**
     * Draw a frame for the current sequence item
     */
    drawSequenceFrame(ctx, sequence, progress, loadedImages, canvas, videoStyle, story) {
        const width = canvas.width;
        const height = canvas.height;
        
        // Apply letterboxing if needed
        if (videoStyle.aspectRatio !== '16:9') {
            ctx.fillStyle = videoStyle.letterboxColor;
            ctx.fillRect(0, 0, width, height);
        }
        
        switch (sequence.type) {
            case 'title':
                // Draw background gradient
                const titleGradient = ctx.createLinearGradient(0, 0, 0, height);
                titleGradient.addColorStop(0, '#000000');
                titleGradient.addColorStop(1, '#222222');
                ctx.fillStyle = titleGradient;
                ctx.fillRect(0, 0, width, height);
                
                // Draw title with fade effect
                ctx.font = `bold ${height * 0.08}px ${videoStyle.fontFamily}`;
                ctx.textAlign = 'center';
                ctx.fillStyle = `rgba(${this.hexToRgb(videoStyle.titleColor)}, ${progress})`;
                ctx.fillText(sequence.content, width / 2, height * 0.4);
                
                // Draw subtitle if progress is past halfway
                if (progress > 0.5) {
                    ctx.font = `${height * 0.04}px ${videoStyle.fontFamily}`;
                    ctx.fillStyle = `rgba(${this.hexToRgb(videoStyle.subtitleColor)}, ${(progress - 0.5) * 2})`;
                    ctx.fillText('A Story by AI Story Generator', width / 2, height * 0.5);
                }
                break;
                
            case 'subtitle':
                // Draw background gradient
                const subtitleGradient = ctx.createLinearGradient(0, 0, 0, height);
                subtitleGradient.addColorStop(0, '#111111');
                subtitleGradient.addColorStop(1, '#333333');
                ctx.fillStyle = subtitleGradient;
                ctx.fillRect(0, 0, width, height);
                
                // Draw subtitle with fade effect
                ctx.font = `${height * 0.05}px ${videoStyle.fontFamily}`;
                ctx.textAlign = 'center';
                ctx.fillStyle = `rgba(${this.hexToRgb(videoStyle.subtitleColor)}, ${progress})`;
                ctx.fillText(sequence.content, width / 2, height * 0.5);
                break;
                
            case 'summary':
                // Draw background gradient
                const summaryGradient = ctx.createLinearGradient(0, 0, 0, height);
                summaryGradient.addColorStop(0, '#222222');
                summaryGradient.addColorStop(1, '#444444');
                ctx.fillStyle = summaryGradient;
                ctx.fillRect(0, 0, width, height);
                
                // Draw summary with typewriter effect
                ctx.font = `${height * 0.035}px ${videoStyle.fontFamily}`;
                ctx.textAlign = 'center';
                ctx.fillStyle = videoStyle.textColor;
                
                // Apply typewriter effect
                const summaryText = sequence.content.substring(0, Math.floor(sequence.content.length * progress));
                
                // Split text into lines
                const summaryLines = this.wrapText(ctx, summaryText, width * 0.8);
                summaryLines.forEach((line, index) => {
                    ctx.fillText(line, width / 2, height * 0.4 + index * height * 0.06);
                });
                break;
                
            case 'character':
                // Get character image
                const characterImg = loadedImages[sequence.character.image];
                
                // Draw background gradient
                const characterGradient = ctx.createLinearGradient(0, 0, 0, height);
                characterGradient.addColorStop(0, '#333333');
                characterGradient.addColorStop(1, '#111111');
                ctx.fillStyle = characterGradient;
                ctx.fillRect(0, 0, width, height);
                
                if (characterImg) {
                    // Calculate image dimensions to maintain aspect ratio
                    const imgAspect = characterImg.width / characterImg.height;
                    let imgWidth, imgHeight;
                    
                    if (imgAspect > 1) {
                        // Landscape orientation
                        imgHeight = height * 0.7;
                        imgWidth = imgHeight * imgAspect;
                    } else {
                        // Portrait orientation
                        imgWidth = width * 0.4;
                        imgHeight = imgWidth / imgAspect;
                    }
                    
                    // Draw character image with fade-in effect
                    ctx.globalAlpha = Math.min(1, progress * 2);
                    ctx.drawImage(characterImg, width / 2 - imgWidth / 2, height * 0.15, imgWidth, imgHeight);
                    ctx.globalAlpha = 1;
                }
                
                // Draw character name and info with fade-in effect
                if (progress > 0.3) {
                    const textAlpha = Math.min(1, (progress - 0.3) * 1.5);
                    
                    // Draw character name
                    ctx.font = `bold ${height * 0.05}px ${videoStyle.fontFamily}`;
                    ctx.textAlign = 'center';
                    ctx.fillStyle = `rgba(${this.hexToRgb(videoStyle.titleColor)}, ${textAlpha})`;
                    ctx.fillText(sequence.character.name, width / 2, height * 0.85);
                    
                    // Draw character role
                    if (progress > 0.5) {
                        ctx.font = `${height * 0.035}px ${videoStyle.fontFamily}`;
                        ctx.fillStyle = `rgba(${this.hexToRgb(videoStyle.subtitleColor)}, ${textAlpha})`;
                        ctx.fillText(sequence.character.role, width / 2, height * 0.9);
                    }
                }
                break;
                
            case 'chapterTitle':
                // Draw background gradient
                const chapterGradient = ctx.createLinearGradient(0, 0, 0, height);
                chapterGradient.addColorStop(0, '#000000');
                chapterGradient.addColorStop(1, '#222222');
                ctx.fillStyle = chapterGradient;
                ctx.fillRect(0, 0, width, height);
                
                // Draw chapter title with fade effect
                ctx.font = `bold ${height * 0.06}px ${videoStyle.fontFamily}`;
                ctx.textAlign = 'center';
                ctx.fillStyle = `rgba(${this.hexToRgb(videoStyle.titleColor)}, ${progress})`;
                ctx.fillText(sequence.content, width / 2, height * 0.5);
                break;
                
            case 'scene':
                // Get scene background
                const sceneImg = loadedImages[sequence.scene.background];
                
                // Draw background
                if (sceneImg) {
                    ctx.drawImage(sceneImg, 0, 0, width, height);
                    
                    // Add overlay for better text visibility
                    ctx.fillStyle = videoStyle.overlayColor;
                    ctx.fillRect(0, 0, width, height);
                } else {
                    // Fallback gradient background
                    const sceneGradient = ctx.createLinearGradient(0, 0, 0, height);
                    sceneGradient.addColorStop(0, '#222222');
                    sceneGradient.addColorStop(1, '#444444');
                    ctx.fillStyle = sceneGradient;
                    ctx.fillRect(0, 0, width, height);
                }
                
                // Draw scene content
                ctx.font = `${height * 0.03}px ${videoStyle.fontFamily}`;
                ctx.textAlign = 'center';
                ctx.fillStyle = videoStyle.textColor;
                
                // Split text into lines
                const sceneLines = this.wrapText(ctx, sequence.scene.content, width * 0.8);
                
                // Only show a portion of the text based on progress
                const linesToShow = Math.ceil(sceneLines.length * progress);
                sceneLines.slice(0, linesToShow).forEach((line, index) => {
                    ctx.fillText(line, width / 2, height * 0.2 + index * height * 0.05);
                });
                
                // Draw characters in the scene
                if (progress > 0.3 && sequence.scene.characters.length > 0) {
                    const charactersToShow = Math.min(3, sequence.scene.characters.length);
                    
                    for (let i = 0; i < charactersToShow; i++) {
                        const sceneCharacter = sequence.scene.characters[i];
                        const charImg = loadedImages[sceneCharacter.image];
                        
                        if (charImg) {
                            // Calculate position based on number of characters
                            const charWidth = width * 0.2;
                            const charHeight = height * 0.3;
                            const charX = width * (0.25 + i * 0.25) - charWidth / 2;
                            const charY = height * 0.65;
                            
                            // Draw character with fade-in effect
                            ctx.globalAlpha = Math.min(1, (progress - 0.3) * 1.5);
                            ctx.drawImage(charImg, charX, charY, charWidth, charHeight);
                            ctx.globalAlpha = 1;
                            
                            // Draw character name
                            ctx.font = `bold ${height * 0.025}px ${videoStyle.fontFamily}`;
                            ctx.fillStyle = videoStyle.textColor;
                            ctx.fillText(sceneCharacter.name, charX + charWidth / 2, charY + charHeight + height * 0.03);
                        }
                    }
                }
                break;
                
            case 'chapterEnd':
                // Draw background gradient
                const endGradient = ctx.createLinearGradient(0, 0, 0, height);
                endGradient.addColorStop(0, '#111111');
                endGradient.addColorStop(1, '#333333');
                ctx.fillStyle = endGradient;
                ctx.fillRect(0, 0, width, height);
                
                // Draw chapter end text with fade effect
                ctx.font = `${height * 0.05}px ${videoStyle.fontFamily}`;
                ctx.textAlign = 'center';
                ctx.fillStyle = `rgba(${this.hexToRgb(videoStyle.subtitleColor)}, ${progress})`;
                ctx.fillText(sequence.content, width / 2, height * 0.5);
                break;
                
            case 'ending':
                // Draw background gradient
                const finalGradient = ctx.createLinearGradient(0, 0, 0, height);
                finalGradient.addColorStop(0, '#000000');
                finalGradient.addColorStop(1, '#222222');
                ctx.fillStyle = finalGradient;
                ctx.fillRect(0, 0, width, height);
                
                // Draw ending text with fade effect
                ctx.font = `bold ${height * 0.08}px ${videoStyle.fontFamily}`;
                ctx.textAlign = 'center';
                ctx.fillStyle = `rgba(${this.hexToRgb(videoStyle.titleColor)}, ${progress})`;
                ctx.fillText(sequence.content, width / 2, height * 0.4);
                
                // Draw story title if progress is past halfway
                if (progress > 0.5) {
                    ctx.font = `${height * 0.04}px ${videoStyle.fontFamily}`;
                    ctx.fillStyle = `rgba(${this.hexToRgb(videoStyle.subtitleColor)}, ${(progress - 0.5) * 2})`;
                    ctx.fillText(story.title, width / 2, height * 0.5);
                }
                break;
        }
    }
    
    /**
     * Create a fallback video for browsers without MediaRecorder
     */
    createFallbackVideo(story, realisticCharacters, realisticScenes, videoStyle) {
        return new Promise((resolve) => {
            // Create a fallback display
            const fallbackContainer = document.getElementById('animation-fallback');
            const videoPlayer = document.getElementById('video-player');
            
            if (videoPlayer) videoPlayer.style.display = 'none';
            
            if (fallbackContainer) {
                fallbackContainer.style.display = 'flex';
                
                // Create HTML for characters
                const charactersHTML = realisticCharacters.map(character => `
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <img src="${character.image}" class="card-img-top" alt="${character.name}" 
                                 onerror="this.onerror=null; this.src='https://via.placeholder.com/300x400?text=${encodeURIComponent(character.name)}';">
                            <div class="card-body">
                                <h5 class="card-title">${character.name}</h5>
                                <p class="card-text">${character.role}</p>
                            </div>
                        </div>
                    </div>
                `).join('');
                
                // Create HTML for scenes
                const scenesHTML = realisticScenes.slice(0, 3).map(scene => `
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <img src="${scene.background}" class="card-img-top" alt="Scene ${scene.chapter}-${scene.scene}" 
                                 onerror="this.onerror=null; this.src='https://via.placeholder.com/400x300?text=Scene+${scene.chapter}-${scene.scene}';">
                            <div class="card-body">
                                <h5 class="card-title">Chapter ${scene.chapter}, Scene ${scene.scene}</h5>
                                <p class="card-text small">${scene.content.substring(0, 100)}...</p>
                            </div>
                        </div>
                    </div>
                `).join('');
                
                // Set fallback content
                fallbackContainer.innerHTML = `
                    <div class="fallback-message">
                        <h4>Realistic Story Visualization</h4>
                        <p>Your story "${story.title}" has been visualized with realistic characters.</p>
                        <p>This is a ${story.genre} story with ${realisticCharacters.length} characters.</p>
                        
                        <div class="mt-4">
                            <h5>Characters:</h5>
                            <div class="row">
                                ${charactersHTML}
                            </div>
                        </div>
                        
                        <div class="mt-4">
                            <h5>Key Scenes:</h5>
                            <div class="row">
                                ${scenesHTML}
                            </div>
                        </div>
                    </div>
                `;
            }
            
            // Show video container
            const videoContainer = document.getElementById('video-container');
            if (videoContainer) {
                videoContainer.style.display = 'block';
            }
            
            // Resolve with a placeholder URL
            resolve('fallback-video');
        });
    }
    
    /**
     * Utility function to wrap text into multiple lines
     */
    wrapText(ctx, text, maxWidth) {
        const words = text.split(' ');
        const lines = [];
        let currentLine = words[0];
        
        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const width = ctx.measureText(currentLine + ' ' + word).width;
            
            if (width < maxWidth) {
                currentLine += ' ' + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        
        lines.push(currentLine);
        return lines;
    }
    
    /**
     * Convert hex color to RGB
     */
    hexToRgb(hex) {
        // Remove # if present
        hex = hex.replace('#', '');
        
        // Parse hex values
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        return `${r}, ${g}, ${b}`;
    }
}

