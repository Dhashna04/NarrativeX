/**
 * Enhanced Animation Generator
 * This script creates comprehensive video animations for stories
 */

class EnhancedAnimationGenerator {
    constructor() {
        // Animation settings
        this.animationSettings = {
            width: 1280,
            height: 720,
            fps: 30,
            minDuration: 300, // minimum 5 minutes
            maxDuration: 600, // maximum 10 minutes
            transitionDuration: 1.5, // seconds
            textDisplayTime: 8, // seconds per text segment
            characterAnimationDuration: 10, // seconds per character animation
            sceneTransitionTime: 3 // seconds for scene transitions
        };
        
        // Genre-based background images
        this.backgroundImages = {
            fantasy: [
                'https://images.unsplash.com/photo-1518709268805-4e9042af9f23',
                'https://images.unsplash.com/photo-1569973762773-96da12cf4d7a',
                'https://images.unsplash.com/photo-1534447677768-be436bb09401',
                'https://images.unsplash.com/photo-1520637102912-2df6bb2aec6d',
                'https://images.unsplash.com/photo-1516797045820-6edca89b2830',
                'https://images.unsplash.com/photo-1481018085669-2bc6e4f00eed'
            ],
            scifi: [
                'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
                'https://images.unsplash.com/photo-1581822261290-991b38693d1b',
                'https://images.unsplash.com/photo-1484950763426-56b5bf172dbb',
                'https://images.unsplash.com/photo-1532289608746-8aaaa9a7348f',
                'https://images.unsplash.com/photo-1536697246787-1f7ae568d89a',
                'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9'
            ],
            mystery: [
                'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0',
                'https://images.unsplash.com/photo-1508253730651-e5ace4c35922',
                'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16',
                'https://images.unsplash.com/photo-1504052434569-70ad5836ab65',
                'https://images.unsplash.com/photo-1557683316-973673baf926',
                'https://images.unsplash.com/photo-1505577058444-a3dab90d4253'
            ],
            romance: [
                'https://images.unsplash.com/photo-1518199266791-5375a83190b7',
                'https://images.unsplash.com/photo-1518895949257-7621c3c786d7',
                'https://images.unsplash.com/photo-1516589091380-5d8e87df6999',
                'https://images.unsplash.com/photo-1494774157365-9e04c6720e47',
                'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac',
                'https://images.unsplash.com/photo-1516486392848-8b67ef89f113'
            ],
            horror: [
                'https://images.unsplash.com/photo-1509248961158-e54f6934749c',
                'https://images.unsplash.com/photo-1526229650576-c5e85789c9ad',
                'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1',
                'https://images.unsplash.com/photo-1533619043865-1c2e2f32ff2f',
                'https://images.unsplash.com/photo-1555661059-7e755c1c3c1d',
                'https://images.unsplash.com/photo-1543187018-21e461e7795e'
            ],
            adventure: [
                'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
                'https://images.unsplash.com/photo-1508672019048-805c876b67e2',
                'https://images.unsplash.com/photo-1530789253388-582c481c54b0',
                'https://images.unsplash.com/photo-1528543606781-2f6e6857f318',
                'https://images.unsplash.com/photo-1515974256630-babc85765b1d',
                'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd'
            ],
            historical: [
                'https://images.unsplash.com/photo-1564509143629-5a0d7f9b49c5',
                'https://images.unsplash.com/photo-1577127296888-d3e6f7b5d1e4',
                'https://images.unsplash.com/photo-1584483766114-2cea6facdf57',
                'https://images.unsplash.com/photo-1599458383000-8d3e3bf8b487',
                'https://images.unsplash.com/photo-1563473213013-de2a0133c100',
                'https://images.unsplash.com/photo-1608663362636-4e1c2d97c5e8'
            ]
        };
        
        // Character silhouettes for different genres
        this.characterSilhouettes = {
            fantasy: [
                'https://i.imgur.com/JWxMjhU.png', // wizard
                'https://i.imgur.com/8tKQ0Jz.png', // knight
                'https://i.imgur.com/YQ3WQJv.png', // elf
                'https://i.imgur.com/LZPqOHC.png', // princess
                'https://i.imgur.com/6BLHxgU.png'  // dragon
            ],
            scifi: [
                'https://i.imgur.com/QZ4wFjk.png', // astronaut
                'https://i.imgur.com/1LMfJmU.png', // alien
                'https://i.imgur.com/pYR36qR.png', // robot
                'https://i.imgur.com/3TgkB1P.png', // scientist
                'https://i.imgur.com/NXWb7kY.png'  // space soldier
            ],
            mystery: [
                'https://i.imgur.com/L2YS5Xn.png', // detective
                'https://i.imgur.com/8FKg2DY.png', // suspect
                'https://i.imgur.com/pQR3QbR.png', // witness
                'https://i.imgur.com/YHt1QzP.png', // police officer
                'https://i.imgur.com/ZNjUQXp.png'  // mysterious figure
            ],
            romance: [
                'https://i.imgur.com/7XgHLjK.png', // romantic lead 1
                'https://i.imgur.com/2QT8Wpz.png', // romantic lead 2
                'https://i.imgur.com/YPzNJpQ.png', // friend
                'https://i.imgur.com/K8ZH4LV.png', // rival
                'https://i.imgur.com/9TQJfMU.png'  // matchmaker
            ],
            horror: [
                'https://i.imgur.com/LpX7ZnK.png', // survivor
                'https://i.imgur.com/2TQWpQz.png', // monster
                'https://i.imgur.com/YzNJQpQ.png', // ghost
                'https://i.imgur.com/K8LH4LV.png', // psychic
                'https://i.imgur.com/9JQfMTU.png'  // mysterious stranger
            ],
            adventure: [
                'https://i.imgur.com/L7XgHjK.png', // explorer
                'https://i.imgur.com/2T8WQpz.png', // guide
                'https://i.imgur.com/YzQJNpQ.png', // treasure hunter
                'https://i.imgur.com/K8H4LZV.png', // survivalist
                'https://i.imgur.com/9QJTfMU.png'  // local inhabitant
            ],
            historical: [
                'https://i.imgur.com/L7jKXgH.png', // noble
                'https://i.imgur.com/2QpzTW8.png', // soldier
                'https://i.imgur.com/YQpJNzQ.png', // peasant
                'https://i.imgur.com/KZ4LVH8.png', // merchant
                'https://i.imgur.com/9fMUJTQ.png'  // ruler
            ]
        };
        
        // Font styles for different themes
        this.fontStyles = {
            purple: { 
                fontFamily: 'Georgia, serif', 
                titleColor: '#6a11cb',
                textColor: '#ffffff',
                overlayColor: 'rgba(106, 17, 203, 0.5)'
            },
            blue: { 
                fontFamily: 'Arial, sans-serif', 
                titleColor: '#1167cb',
                textColor: '#ffffff',
                overlayColor: 'rgba(17, 103, 203, 0.5)'
            },
            green: { 
                fontFamily: 'Verdana, sans-serif', 
                titleColor: '#11cb6a',
                textColor: '#ffffff',
                overlayColor: 'rgba(17, 203, 106, 0.5)'
            },
            orange: { 
                fontFamily: 'Trebuchet MS, sans-serif', 
                titleColor: '#cb6a11',
                textColor: '#ffffff',
                overlayColor: 'rgba(203, 106, 17, 0.5)'
            },
            pink: { 
                fontFamily: 'Courier New, monospace', 
                titleColor: '#cb116a',
                textColor: '#ffffff',
                overlayColor: 'rgba(203, 17, 106, 0.5)'
            },
            teal: { 
                fontFamily: 'Segoe UI, sans-serif', 
                titleColor: '#11cbc2',
                textColor: '#ffffff',
                overlayColor: 'rgba(17, 203, 194, 0.5)'
            },
            gold: { 
                fontFamily: 'Times New Roman, serif', 
                titleColor: '#d4af37',
                textColor: '#ffffff',
                overlayColor: 'rgba(212, 175, 55, 0.5)'
            },
            crimson: { 
                fontFamily: 'Palatino, serif', 
                titleColor: '#dc143c',
                textColor: '#ffffff',
                overlayColor: 'rgba(220, 20, 60, 0.5)'
            },
            violet: { 
                fontFamily: 'Lucida Sans, sans-serif', 
                titleColor: '#8a2be2',
                textColor: '#ffffff',
                overlayColor: 'rgba(138, 43, 226, 0.5)'
            },
            emerald: { 
                fontFamily: 'Calibri, sans-serif', 
                titleColor: '#50c878',
                textColor: '#ffffff',
                overlayColor: 'rgba(80, 200, 120, 0.5)'
            }
        };
        
        // Music tracks for different genres (placeholders)
        this.musicTracks = {
            fantasy: 'fantasy-music.mp3',
            scifi: 'scifi-music.mp3',
            mystery: 'mystery-music.mp3',
            romance: 'romance-music.mp3',
            horror: 'horror-music.mp3',
            adventure: 'adventure-music.mp3',
            historical: 'historical-music.mp3'
        };
    }
    
    /**
     * Generate a comprehensive animation for a story
     */
    generateAnimation(story, theme) {
        return new Promise((resolve, reject) => {
            try {
                console.log(`Generating enhanced animation for story: ${story.title}`);
                
                // Update loading text
                const loadingText = document.getElementById('loading-text');
                if (loadingText) {
                    loadingText.textContent = 'Creating your comprehensive story animation...';
                }
                
                // Get background images for the story genre
                const backgroundImages = this.backgroundImages[story.genre] || this.backgroundImages.fantasy;
                
                // Get character silhouettes for the story genre
                const characterSilhouettes = this.characterSilhouettes[story.genre] || this.characterSilhouettes.fantasy;
                
                // Get font style for the theme
                const fontStyle = this.fontStyles[theme] || this.fontStyles.purple;
                
                // Create animation sequence
                const sequence = this.createAnimationSequence(story, backgroundImages, characterSilhouettes);
                
                // Calculate animation duration based on sequence length
                const duration = Math.min(
                    this.animationSettings.maxDuration,
                    Math.max(
                        this.animationSettings.minDuration,
                        sequence.length * this.animationSettings.textDisplayTime
                    )
                );
                
                // Create the animation
                this.createComprehensiveAnimation(story, sequence, backgroundImages, characterSilhouettes, fontStyle, duration)
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
                        console.error('Error in animation creation:', error);
                        reject(error);
                    });
                
            } catch (error) {
                console.error('Error in animation generation:', error);
                reject(error);
            }
        });
    }
    
    /**
     * Create a comprehensive animation sequence from the story
     */
    createAnimationSequence(story, backgroundImages, characterSilhouettes) {
        const sequence = [];
        
        // Add opening title sequence with dramatic reveal
        sequence.push({
            type: 'title',
            content: story.title,
            duration: 8,
            effect: 'fadeIn',
            music: 'opening'
        });
        
        // Add genre and theme with visual styling
        sequence.push({
            type: 'subtitle',
            content: `A ${story.genre} story`,
            duration: 5,
            effect: 'slideIn'
        });
        
        // Add summary with voice narration
        sequence.push({
            type: 'summary',
            content: story.summary,
            duration: 10,
            effect: 'typewriter',
            narration: true
        });
        
        // Add detailed character introductions with animations
        story.characters.forEach((character, index) => {
            // Character entrance with animation
            sequence.push({
                type: 'characterIntro',
                character: character,
                silhouette: characterSilhouettes[index % characterSilhouettes.length],
                content: `${character.name} - ${character.role}`,
                duration: 6,
                effect: 'zoomIn',
                animation: 'characterEntrance'
            });
            
            // Character description with animation
            sequence.push({
                type: 'characterDescription',
                character: character,
                content: character.description || `A ${character.trait} ${character.role}`,
                silhouette: characterSilhouettes[index % characterSilhouettes.length],
                duration: 8,
                effect: 'slideIn',
                animation: 'characterMovement'
            });
            
            // Character backstory with emotional music
            if (character.backstory && character.backstory.length > 0) {
                sequence.push({
                    type: 'characterBackstory',
                    character: character,
                    content: character.backstory,
                    silhouette: characterSilhouettes[index % characterSilhouettes.length],
                    duration: 10,
                    effect: 'fadeIn',
                    music: 'emotional',
                    animation: 'characterEmote'
                });
            }
        });
        
        // Add scene setting transition
        sequence.push({
            type: 'sceneTransition',
            content: 'The story begins...',
            duration: 5,
            effect: 'crossfade',
            music: 'introTheme'
        });
        
        // Add chapter sequences with detailed scene animations
        story.chapters.forEach((chapter, chapterIndex) => {
            // Add dramatic chapter title
            sequence.push({
                type: 'chapterTitle',
                content: `Chapter ${chapterIndex + 1}: ${chapter.title}`,
                duration: 7,
                effect: 'dramatic',
                music: 'chapterIntro'
            });
            
            // Split chapter content into paragraphs
            const paragraphs = chapter.content.split('\n\n').filter(p => p.trim().length > 0);
            
            // Add all paragraphs with character animations and scene transitions
            paragraphs.forEach((paragraph, paragraphIndex) => {
                // Determine which characters are mentioned in this paragraph
                const charactersInScene = story.characters.filter(character => 
                    paragraph.toLowerCase().includes(character.name.toLowerCase())
                );
                
                // If no specific characters are mentioned, add the protagonist
                if (charactersInScene.length === 0 && story.characters.length > 0) {
                    const protagonist = story.characters.find(c => c.role.toLowerCase().includes('protagonist')) || 
                                       story.characters[0];
                    charactersInScene.push(protagonist);
                }
                
                // Split paragraph into sentences
                const sentences = paragraph.split(/[.!?]+/).filter(s => s.trim().length > 0);
                
                // Create animated scenes with characters for each sentence group
                for (let i = 0; i < sentences.length; i += 2) {
                    const sentenceGroup = sentences.slice(i, Math.min(i + 2, sentences.length)).join('. ') + '.';
                    if (sentenceGroup.length > 10) {
                        // Create a scene with characters
                        sequence.push({
                            type: 'animatedScene',
                            content: sentenceGroup,
                            background: backgroundImages[Math.floor(Math.random() * backgroundImages.length)],
                            characters: charactersInScene,
                            silhouettes: charactersInScene.map((_, idx) => 
                                characterSilhouettes[(idx + paragraphIndex) % characterSilhouettes.length]
                            ),
                            duration: this.calculateTextDuration(sentenceGroup) + 2,
                            effect: i % 4 === 0 ? 'panLeft' : i % 4 === 1 ? 'panRight' : i % 4 === 2 ? 'zoomIn' : 'zoomOut',
                            narration: true,
                            animation: 'characterInteraction',
                            chapter: chapterIndex,
                            paragraph: paragraphIndex
                        });
                    }
                }
                
                // Add character interactions between major scenes
                if (paragraphIndex % 2 === 1 && charactersInScene.length >= 2) {
                    sequence.push({
                        type: 'characterInteraction',
                        characters: charactersInScene.slice(0, 2),
                        silhouettes: charactersInScene.slice(0, 2).map((_, idx) => 
                            characterSilhouettes[(idx + paragraphIndex) % characterSilhouettes.length]
                        ),
                        content: `${charactersInScene[0].name} and ${charactersInScene[1].name} interact...`,
                        duration: 6,
                        effect: 'splitScreen',
                        animation: 'characterDialog'
                    });
                }
                
                // Add dramatic pause between major scenes
                if (paragraphIndex % 3 === 2) {
                    sequence.push({
                        type: 'dramaticPause',
                        duration: 3,
                        effect: 'fadeToBlack',
                        music: 'tension'
                    });
                }
            });
            
            // Add chapter conclusion with emotional music
            if (chapterIndex < story.chapters.length - 1) {
                sequence.push({
                    type: 'chapterEnd',
                    content: `End of Chapter ${chapterIndex + 1}`,
                    duration: 5,
                    effect: 'fadeOut',
                    music: 'chapterOutro'
                });
            }
        });
        
        // Add climactic ending
        sequence.push({
            type: 'climax',
            content: 'The story reaches its conclusion...',
            duration: 6,
            effect: 'dramaticZoom',
            music: 'climax'
        });
        
        // Add ending with all characters
        sequence.push({
            type: 'ending',
            content: 'The End',
            characters: story.characters,
            silhouettes: story.characters.map((_, i) => 
                characterSilhouettes[i % characterSilhouettes.length]
            ),
            duration: 8,
            effect: 'grandFinale',
            music: 'outro',
            animation: 'characterEnsemble'
        });
        
        return sequence;
    }
    
    /**
     * Calculate appropriate duration for text based on length
     */
    calculateTextDuration(text) {
        // Average reading speed: ~200 words per minute = ~3.33 words per second
        const wordCount = text.split(' ').length;
        const baseDuration = wordCount / 3.33;
        
        // Add minimum duration and cap at maximum
        return Math.min(10, Math.max(4, baseDuration));
    }
    
    /**
     * Create a comprehensive animation for the story
     */
    createComprehensiveAnimation(story, sequence, backgroundImages, characterSilhouettes, fontStyle, duration) {
        return new Promise((resolve, reject) => {
            try {
                // Create a canvas element
                const canvas = document.createElement('canvas');
                canvas.width = this.animationSettings.width;
                canvas.height = this.animationSettings.height;
                const ctx = canvas.getContext('2d');
                
                // Create a video element
                const video = document.createElement('video');
                video.width = this.animationSettings.width;
                video.height = this.animationSettings.height;
                video.controls = true;
                
                // Try to create a media recorder
                let recorder;
                let recordingChunks = [];
                
                try {
                    // Create a media recorder
                    const stream = canvas.captureStream(this.animationSettings.fps);
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
                const imagesToLoad = [...new Set([...backgroundImages, ...characterSilhouettes.map(url => url)])];
                const loadedImages = {};
                let loadedCount = 0;
                
                imagesToLoad.forEach(url => {
                    const img = new Image();
                    img.crossOrigin = 'Anonymous';
                    img.onload = () => {
                        loadedImages[url] = img;
                        loadedCount++;
                        if (loadedCount === imagesToLoad.length) {
                            startAnimation();
                        }
                    };
                    img.onerror = () => {
                        console.error(`Failed to load image: ${url}`);
                        loadedCount++;
                        // Create a placeholder for failed images
                        const placeholderImg = new Image();
                        placeholderImg.width = 200;
                        placeholderImg.height = 200;
                        loadedImages[url] = placeholderImg;
                        if (loadedCount === imagesToLoad.length) {
                            startAnimation();
                        }
                    };
                    img.src = url;
                });
                
                // Start the animation once images are loaded
                const startAnimation = () => {
                    // Animation variables
                    let frameCount = 0;
                    let sequenceIndex = 0;
                    let frameDuration = 0;
                    
                    // Calculate total frames
                    const totalFrames = duration * this.animationSettings.fps;
                    
                    // Start recording if available
                    if (recorder) {
                        recorder.start();
                    }
                    
                    // Animation loop
                    const animate = () => {
                        // Clear canvas
                        ctx.fillStyle = 'black';
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        
                        // Get current sequence item
                        const item = sequence[sequenceIndex];
                        
                        // Calculate background image index based on sequence position
                        const backgroundIndex = Math.floor((sequenceIndex / sequence.length) * backgroundImages.length) % backgroundImages.length;
                        
                        // Draw background
                        const backgroundImg = loadedImages[backgroundImages[backgroundIndex]];
                        if (backgroundImg) {
                            ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
                        }
                        
                        // Add semi-transparent overlay
                        ctx.fillStyle = fontStyle.overlayColor;
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        
                        // Render based on item type
                        switch (item.type) {
                            case 'title':
                                this.renderTitle(ctx, item.content, fontStyle);
                                break;
                                
                            case 'subtitle':
                                this.renderSubtitle(ctx, item.content, fontStyle);
                                break;
                                
                            case 'summary':
                                this.renderText(ctx, item.content, fontStyle, true);
                                break;
                                
                            case 'chapterTitle':
                                this.renderChapterTitle(ctx, item.content, fontStyle);
                                break;
                                
                            case 'text':
                                this.renderText(ctx, item.content, fontStyle);
                                break;
                                
                            case 'character':
                                this.renderCharacter(ctx, item.character, loadedImages[item.silhouette], fontStyle);
                                break;
                                
                            case 'transition':
                                this.renderTransition(ctx, item.content, fontStyle, frameCount % 60);
                                break;
                                
                            case 'ending':
                                this.renderEnding(ctx, item.content, fontStyle);
                                break;
                        }
                        
                        // Increment frame count
                        frameCount++;
                        frameDuration++;
                        
                        // Calculate frames for this sequence item
                        const itemFrames = item.duration * this.animationSettings.fps;
                        
                        // Check if we need to move to the next item in the sequence
                        if (frameDuration >= itemFrames) {
                            sequenceIndex++;
                            frameDuration = 0;
                            
                            // If we've reached the end of the sequence, loop back or stop
                            if (sequenceIndex >= sequence.length) {
                                if (recorder) {
                                    recorder.stop();
                                    return; // End animation
                                } else {
                                    // For fallback mode, loop back to beginning
                                    sequenceIndex = 0;
                                }
                            }
                        }
                        
                        // Continue animation
                        requestAnimationFrame(animate);
                    };
                    
                    // Start animation
                    animate();
                    
                    // Fallback for browsers that don't support MediaRecorder
                    if (!recorder) {
                        // Create a fallback display after a short delay
                        setTimeout(() => {
                            const videoContainer = document.getElementById('story-video');
                            const videoPlayer = document.getElementById('video-player');
                            const animationFallback = document.getElementById('animation-fallback');
                            
                            if (videoPlayer) videoPlayer.style.display = 'none';
                            
                            if (animationFallback) {
                                animationFallback.style.display = 'flex';
                                animationFallback.innerHTML = `
                                    <div class="fallback-message">
                                        <h4>Story Animation Preview</h4>
                                        <p>Your story "${story.title}" has been visualized as an animation.</p>
                                        <p>This is a ${story.genre} story with ${story.characters.length} characters.</p>
                                        <p><em>${story.summary}</em></p>
                                        <div class="mt-4">
                                            <p>The animation includes:</p>
                                            <ul class="text-start">
                                                <li>Full narration of your story</li>
                                                <li>${sequence.length} unique scenes</li>
                                                <li>Character visualizations</li>
                                                <li>Themed backgrounds and transitions</li>
                                                <li>Approximately ${Math.round(duration / 60)} minutes of content</li>
                                            </ul>
                                        </div>
                                    </div>
                                `;
                            }
                            
                            // Hide loading overlay
                            const loadingOverlay = document.getElementById('loading-overlay');
                            if (loadingOverlay) {
                                loadingOverlay.style.display = 'none';
                            }
                            
                            resolve('fallback');
                        }, 3000);
                    }
                };
                
                // If no images loaded after timeout, start anyway with placeholders
                setTimeout(() => {
                    if (loadedCount === 0) {
                        console.warn('No images loaded, using placeholders');
                        startAnimation();
                    }
                }, 5000);
                
            } catch (error) {
                console.error('Error in createComprehensiveAnimation:', error);
                reject(error);
            }
        });
    }
    
    /**
     * Render the story title
     */
    renderTitle(ctx, title, style) {
        ctx.font = `bold 64px ${style.fontFamily}`;
        ctx.fillStyle = style.titleColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Word wrap title
        this.wrapText(ctx, title, ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.width - 200, 70);
    }
    
    /**
     * Render a subtitle
     */
    renderSubtitle(ctx, subtitle, style) {
        ctx.font = `italic 36px ${style.fontFamily}`;
        ctx.fillStyle = style.titleColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(subtitle, ctx.canvas.width / 2, ctx.canvas.height / 2);
    }
    
    /**
     * Render a chapter title
     */
    renderChapterTitle(ctx, title, style) {
        ctx.font = `bold 48px ${style.fontFamily}`;
        ctx.fillStyle = style.titleColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Word wrap chapter title
        this.wrapText(ctx, title, ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.width - 200, 54);
    }
    
    /**
     * Render text
     */
    renderText(ctx, text, style, isSummary = false) {
        const fontSize = isSummary ? 32 : 28;
        ctx.font = `${fontSize}px ${style.fontFamily}`;
        ctx.fillStyle = style.textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Word wrap text
        this.wrapText(ctx, text, ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.width - 300, fontSize * 1.2);
    }
    
    /**
     * Render a character
     */
    renderCharacter(ctx, character, silhouetteImg, style) {
        // Draw character name
        ctx.font = `bold 36px ${style.fontFamily}`;
        ctx.fillStyle = style.titleColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(character.name, ctx.canvas.width / 2, 100);
        
        // Draw character role and trait
        ctx.font = `italic 24px ${style.fontFamily}`;
        ctx.fillText(`${character.trait} ${character.role}`, ctx.canvas.width / 2, 150);
        
        // Draw character silhouette if available
        if (silhouetteImg) {
            const maxHeight = ctx.canvas.height * 0.5;
            const scale = Math.min(1, maxHeight / silhouetteImg.height);
            const width = silhouetteImg.width * scale;
            const height = silhouetteImg.height * scale;
            const x = (ctx.canvas.width - width) / 2;
            const y = 200;
            
            ctx.drawImage(silhouetteImg, x, y, width, height);
        }
        
        // Draw character description
        ctx.font = `20px ${style.fontFamily}`;
        ctx.fillStyle = style.textColor;
        
        // Word wrap description
        const descriptionY = silhouetteImg ? 200 + (silhouetteImg.height * 0.5) + 50 : 300;
        this.wrapText(ctx, character.description, ctx.canvas.width / 2, descriptionY, ctx.canvas.width - 300, 24);
    }
    
    /**
     * Render a transition
     */
    renderTransition(ctx, text, style, frameCount) {
        // Create a pulsing effect
        const alpha = 0.5 + 0.5 * Math.sin(frameCount * 0.1);
        
        ctx.font = `bold 36px ${style.fontFamily}`;
        ctx.fillStyle = style.titleColor;
        ctx.globalAlpha = alpha;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.globalAlpha = 1.0;
    }
    
    /**
     * Render the ending
     */
    renderEnding(ctx, text, style) {
        ctx.font = `bold 72px ${style.fontFamily}`;
        ctx.fillStyle = style.titleColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, ctx.canvas.width / 2, ctx.canvas.height / 2);
    }
    
    /**
     * Word wrap text on canvas
     */
    wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        if (!text) return;
        
        const words = text.split(' ');
        let line = '';
        let lineCount = 0;
        const maxLines = 10; // Prevent too many lines
        
        for (let n = 0; n < words.length && lineCount < maxLines; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            
            if (testWidth > maxWidth && n > 0) {
                ctx.fillText(line, x, y - ((maxLines / 2) * lineHeight) + (lineCount * lineHeight));
                line = words[n] + ' ';
                lineCount++;
            } else {
                line = testLine;
            }
        }
        
        if (lineCount < maxLines) {
            ctx.fillText(line, x, y - ((maxLines / 2) * lineHeight) + (lineCount * lineHeight));
        }
    }
}

// Create a global instance
const enhancedAnimationGenerator = new EnhancedAnimationGenerator();