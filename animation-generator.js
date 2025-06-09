/**
 * Animation Generator
 * This script handles the animation/video generation for stories
 */

class AnimationGenerator {
    constructor() {
        // Animation settings
        this.animationSettings = {
            width: 1280,
            height: 720,
            fps: 30,
            duration: 60, // seconds
            transitionDuration: 2 // seconds
        };
        
        // Genre-based background images and scene elements
        this.sceneElements = {
            fantasy: {
                backgrounds: [
                    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23',
                    'https://images.unsplash.com/photo-1569973762773-96da12cf4d7a',
                    'https://images.unsplash.com/photo-1534447677768-be436bb09401'
                ],
                characters: [
                    'https://i.imgur.com/JWxMjhU.png', // wizard
                    'https://i.imgur.com/8tKQ0Jz.png', // knight
                    'https://i.imgur.com/YQ3WQJv.png', // elf
                    'https://i.imgur.com/LZPqOHC.png', // princess
                    'https://i.imgur.com/6BLHxgU.png'  // dragon
                ],
                objects: [
                    'https://i.imgur.com/nTESMg0.png', // magic wand
                    'https://i.imgur.com/KP2Pbj8.png', // sword
                    'https://i.imgur.com/JfVe3Nb.png', // castle
                    'https://i.imgur.com/H8Xt9KD.png'  // treasure chest
                ],
                music: 'fantasy-music.mp3'
            },
            scifi: {
                backgrounds: [
                    'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
                    'https://images.unsplash.com/photo-1581822261290-991b38693d1b',
                    'https://images.unsplash.com/photo-1484950763426-56b5bf172dbb'
                ],
                characters: [
                    'https://i.imgur.com/QZ4wFjk.png', // astronaut
                    'https://i.imgur.com/1LMfJmU.png', // alien
                    'https://i.imgur.com/pYR36qR.png', // robot
                    'https://i.imgur.com/3TgkB1P.png', // scientist
                    'https://i.imgur.com/NXWb7kY.png'  // space soldier
                ],
                objects: [
                    'https://i.imgur.com/YhqVLLq.png', // spaceship
                    'https://i.imgur.com/8cHGjD4.png', // laser gun
                    'https://i.imgur.com/JKwRQzZ.png', // planet
                    'https://i.imgur.com/2L5SbZ0.png'  // satellite
                ],
                music: 'scifi-music.mp3'
            },
            mystery: {
                backgrounds: [
                    'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0',
                    'https://images.unsplash.com/photo-1508253730651-e5ace4c35922',
                    'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16'
                ],
                characters: [
                    'https://i.imgur.com/L2YS5Xn.png', // detective
                    'https://i.imgur.com/8FKg2DY.png', // suspect
                    'https://i.imgur.com/pQR3QbR.png', // witness
                    'https://i.imgur.com/YHt1QzP.png', // police officer
                    'https://i.imgur.com/ZNjUQXp.png'  // mysterious figure
                ],
                objects: [
                    'https://i.imgur.com/JQKbHRz.png', // magnifying glass
                    'https://i.imgur.com/P8Tz2WK.png', // evidence
                    'https://i.imgur.com/XcBYZjL.png', // old mansion
                    'https://i.imgur.com/1HpvJgS.png'  // mysterious letter
                ],
                music: 'mystery-music.mp3'
            },
            romance: {
                backgrounds: [
                    'https://images.unsplash.com/photo-1518199266791-5375a83190b7',
                    'https://images.unsplash.com/photo-1518895949257-7621c3c786d7',
                    'https://images.unsplash.com/photo-1516589091380-5d8e87df6999'
                ],
                characters: [
                    'https://i.imgur.com/7XgHLjK.png', // romantic lead 1
                    'https://i.imgur.com/2QT8Wpz.png', // romantic lead 2
                    'https://i.imgur.com/YPzNJpQ.png', // friend
                    'https://i.imgur.com/K8ZH4LV.png', // rival
                    'https://i.imgur.com/9TQJfMU.png'  // matchmaker
                ],
                objects: [
                    'https://i.imgur.com/JHLfW7p.png', // rose
                    'https://i.imgur.com/P2X5mJT.png', // love letter
                    'https://i.imgur.com/XNY7gHP.png', // romantic dinner
                    'https://i.imgur.com/1KpZQR8.png'  // engagement ring
                ],
                music: 'romance-music.mp3'
            },
            horror: {
                backgrounds: [
                    'https://images.unsplash.com/photo-1509248961158-e54f6934749c',
                    'https://images.unsplash.com/photo-1526229650576-c5e85789c9ad',
                    'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1'
                ],
                characters: [
                    'https://i.imgur.com/LpX7ZnK.png', // survivor
                    'https://i.imgur.com/2TQWpQz.png', // monster
                    'https://i.imgur.com/YzNJQpQ.png', // ghost
                    'https://i.imgur.com/K8LH4LV.png', // psychic
                    'https://i.imgur.com/9JQfMTU.png'  // mysterious stranger
                ],
                objects: [
                    'https://i.imgur.com/JfLHW7p.png', // haunted house
                    'https://i.imgur.com/P5X2mJT.png', // cursed object
                    'https://i.imgur.com/XY7gNHP.png', // cemetery
                    'https://i.imgur.com/1pZKQR8.png'  // creepy doll
                ],
                music: 'horror-music.mp3'
            },
            adventure: {
                backgrounds: [
                    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
                    'https://images.unsplash.com/photo-1508672019048-805c876b67e2',
                    'https://images.unsplash.com/photo-1530789253388-582c481c54b0'
                ],
                characters: [
                    'https://i.imgur.com/L7XgHjK.png', // explorer
                    'https://i.imgur.com/2T8WQpz.png', // guide
                    'https://i.imgur.com/YzQJNpQ.png', // treasure hunter
                    'https://i.imgur.com/K8H4LZV.png', // survivalist
                    'https://i.imgur.com/9QJTfMU.png'  // local inhabitant
                ],
                objects: [
                    'https://i.imgur.com/JLfHW7p.png', // map
                    'https://i.imgur.com/P2mJXT5.png', // compass
                    'https://i.imgur.com/XNgHP7Y.png', // ancient temple
                    'https://i.imgur.com/1KQpZR8.png'  // treasure
                ],
                music: 'adventure-music.mp3'
            },
            historical: {
                backgrounds: [
                    'https://images.unsplash.com/photo-1564509143629-5a0d7f9b49c5',
                    'https://images.unsplash.com/photo-1577127296888-d3e6f7b5d1e4',
                    'https://images.unsplash.com/photo-1584483766114-2cea6facdf57'
                ],
                characters: [
                    'https://i.imgur.com/L7jKXgH.png', // noble
                    'https://i.imgur.com/2QpzTW8.png', // soldier
                    'https://i.imgur.com/YQpJNzQ.png', // peasant
                    'https://i.imgur.com/KZ4LVH8.png', // merchant
                    'https://i.imgur.com/9fMUJTQ.png'  // ruler
                ],
                objects: [
                    'https://i.imgur.com/JW7fLHp.png', // scroll
                    'https://i.imgur.com/P5JXT2m.png', // ancient weapon
                    'https://i.imgur.com/XHP7NgY.png', // historical building
                    'https://i.imgur.com/1R8pZKQ.png'  // artifact
                ],
                music: 'historical-music.mp3'
            }
        };
        
        // Animation styles for different themes
        this.animationStyles = {
            purple: { 
                fontFamily: 'Georgia, serif', 
                titleColor: '#6a11cb',
                textColor: '#ffffff',
                overlayColor: 'rgba(106, 17, 203, 0.3)',
                transitionEffect: 'fade'
            },
            blue: { 
                fontFamily: 'Arial, sans-serif', 
                titleColor: '#1167cb',
                textColor: '#ffffff',
                overlayColor: 'rgba(17, 103, 203, 0.3)',
                transitionEffect: 'slide'
            },
            green: { 
                fontFamily: 'Verdana, sans-serif', 
                titleColor: '#11cb6a',
                textColor: '#ffffff',
                overlayColor: 'rgba(17, 203, 106, 0.3)',
                transitionEffect: 'zoom'
            },
            orange: { 
                fontFamily: 'Trebuchet MS, sans-serif', 
                titleColor: '#cb6a11',
                textColor: '#ffffff',
                overlayColor: 'rgba(203, 106, 17, 0.3)',
                transitionEffect: 'wipe'
            },
            pink: { 
                fontFamily: 'Courier New, monospace', 
                titleColor: '#cb116a',
                textColor: '#ffffff',
                overlayColor: 'rgba(203, 17, 106, 0.3)',
                transitionEffect: 'dissolve'
            }
        };
        
        // Animation sequence templates
        this.sequenceTemplates = {
            intro: [
                { type: 'background', duration: 3 },
                { type: 'title', duration: 5 },
                { type: 'character', position: 'center', duration: 3 }
            ],
            chapter: [
                { type: 'background', duration: 2 },
                { type: 'chapterTitle', duration: 3 },
                { type: 'text', duration: 5 },
                { type: 'character', position: 'left', duration: 4 },
                { type: 'character', position: 'right', duration: 4 },
                { type: 'object', position: 'center', duration: 3 }
            ],
            climax: [
                { type: 'background', duration: 2 },
                { type: 'text', duration: 4 },
                { type: 'character', position: 'center', duration: 3 },
                { type: 'object', position: 'center', duration: 2 },
                { type: 'effect', name: 'dramatic', duration: 3 }
            ],
            ending: [
                { type: 'background', duration: 3 },
                { type: 'text', duration: 5 },
                { type: 'character', position: 'center', duration: 4 },
                { type: 'title', duration: 4 }
            ]
        };
    }
    
    /**
     * Generate an animation for a story
     */
    generateAnimation(story, theme) {
        return new Promise((resolve, reject) => {
            try {
                console.log(`Generating animation for story: ${story.title}`);
                
                // Update loading text
                const loadingText = document.getElementById('loading-text');
                if (loadingText) {
                    loadingText.textContent = 'Creating your story animation...';
                }
                
                // Get scene elements for the story genre
                const genreElements = this.sceneElements[story.genre] || this.sceneElements.fantasy;
                
                // Get animation style for the theme
                const style = this.animationStyles[theme] || this.animationStyles.purple;
                
                // Create animation sequence
                const sequence = this.createAnimationSequence(story, genreElements, style);
                
                // Preload all images
                this.preloadImages(sequence).then(() => {
                    // Create the animation
                    const videoUrl = this.renderAnimation(story, sequence, style);
                    
                    // Return animation data
                    resolve({
                        url: videoUrl,
                        title: story.title,
                        duration: this.calculateDuration(sequence),
                        genre: story.genre,
                        createdAt: new Date().toISOString()
                    });
                }).catch(error => {
                    reject(error);
                });
                
            } catch (error) {
                reject(error);
            }
        });
    }
    
    /**
     * Create an animation sequence based on the story
     */
    createAnimationSequence(story, genreElements, style) {
        const sequence = [];
        
        // Add intro sequence
        sequence.push(...this.createSequenceSection('intro', story, genreElements, style));
        
        // Add chapter sequences
        story.chapters.forEach((chapter, index) => {
            if (index === story.chapters.length - 2) {
                // Climax chapter
                sequence.push(...this.createSequenceSection('climax', story, genreElements, style, chapter));
            } else {
                // Regular chapter
                sequence.push(...this.createSequenceSection('chapter', story, genreElements, style, chapter));
            }
        });
        
        // Add ending sequence
        sequence.push(...this.createSequenceSection('ending', story, genreElements, style));
        
        return sequence;
    }
    
    /**
     * Create a section of the animation sequence
     */
    createSequenceSection(sectionType, story, genreElements, style, chapter = null) {
        const section = [];
        const template = this.sequenceTemplates[sectionType];
        
        template.forEach(item => {
            const frame = { ...item };
            
            // Set content based on item type
            switch (item.type) {
                case 'background':
                    frame.content = this.getRandomItem(genreElements.backgrounds);
                    break;
                    
                case 'title':
                    frame.content = story.title;
                    frame.style = style;
                    break;
                    
                case 'chapterTitle':
                    if (chapter) {
                        frame.content = chapter.title;
                        frame.style = style;
                    }
                    break;
                    
                case 'text':
                    if (chapter) {
                        // Get a paragraph from the chapter
                        const paragraphs = chapter.content.split('\n\n');
                        frame.content = this.getRandomItem(paragraphs);
                    } else {
                        frame.content = story.summary;
                    }
                    frame.style = style;
                    break;
                    
                case 'character':
                    // Select a character image
                    frame.content = this.getRandomItem(genreElements.characters);
                    
                    // Associate with a story character if possible
                    if (story.characters && story.characters.length > 0) {
                        const character = this.getRandomItem(story.characters);
                        frame.character = character;
                    }
                    break;
                    
                case 'object':
                    frame.content = this.getRandomItem(genreElements.objects);
                    break;
                    
                case 'effect':
                    // Effects are handled during rendering
                    break;
            }
            
            section.push(frame);
        });
        
        return section;
    }
    
    /**
     * Preload all images in the sequence
     */
    preloadImages(sequence) {
        const imageUrls = new Set();
        
        // Collect all image URLs
        sequence.forEach(frame => {
            if (frame.type === 'background' || frame.type === 'character' || frame.type === 'object') {
                imageUrls.add(frame.content);
            }
        });
        
        // Preload all images
        const promises = Array.from(imageUrls).map(url => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
                img.crossOrigin = 'Anonymous';
                img.src = url;
            });
        });
        
        return Promise.all(promises);
    }
    
    /**
     * Calculate the total duration of the animation
     */
    calculateDuration(sequence) {
        return sequence.reduce((total, frame) => total + frame.duration, 0);
    }
    
    /**
     * Render the animation to a video
     */
    renderAnimation(story, sequence, style) {
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
        
        // Create a media recorder
        const stream = canvas.captureStream(this.animationSettings.fps);
        const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
        
        // Store recorded chunks
        const chunks = [];
        recorder.ondataavailable = e => chunks.push(e.data);
        
        // When recording is complete
        recorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            video.src = URL.createObjectURL(blob);
            
            // Add the video to the page
            const videoContainer = document.getElementById('story-video');
            if (videoContainer) {
                videoContainer.src = video.src;
            }
        };
        
        // Start recording
        recorder.start();
        
        // Animation variables
        let frameCount = 0;
        let sequenceIndex = 0;
        let frameDuration = 0;
        
        // Animation loop
        const animate = () => {
            // Clear canvas
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Get current frame in sequence
            const frame = sequence[sequenceIndex];
            
            // Render frame based on type
            switch (frame.type) {
                case 'background':
                    this.renderBackground(ctx, frame.content);
                    break;
                    
                case 'title':
                    this.renderTitle(ctx, frame.content, style);
                    break;
                    
                case 'chapterTitle':
                    this.renderChapterTitle(ctx, frame.content, style);
                    break;
                    
                case 'text':
                    this.renderText(ctx, frame.content, style);
                    break;
                    
                case 'character':
                    this.renderCharacter(ctx, frame.content, frame.position, frame.character);
                    break;
                    
                case 'object':
                    this.renderObject(ctx, frame.content, frame.position);
                    break;
                    
                case 'effect':
                    this.renderEffect(ctx, frame.name, style);
                    break;
            }
            
            // Increment frame count
            frameCount++;
            frameDuration++;
            
            // Check if we need to move to the next frame in the sequence
            const frameLengthInFrames = frame.duration * this.animationSettings.fps;
            if (frameDuration >= frameLengthInFrames) {
                sequenceIndex++;
                frameDuration = 0;
            }
            
            // Continue animation or stop recording
            if (sequenceIndex < sequence.length) {
                requestAnimationFrame(animate);
            } else {
                recorder.stop();
            }
        };
        
        // Start animation
        animate();
        
        // Return a placeholder URL until the video is ready
        return 'placeholder';
    }
    
    /**
     * Render a background image
     */
    renderBackground(ctx, imageUrl) {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
        };
        img.src = imageUrl;
    }
    
    /**
     * Render the story title
     */
    renderTitle(ctx, title, style) {
        // Add semi-transparent overlay
        ctx.fillStyle = style.overlayColor;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        // Draw title
        ctx.font = `bold 48px ${style.fontFamily}`;
        ctx.fillStyle = style.titleColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Word wrap title
        this.wrapText(ctx, title, ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.width - 200, 60);
    }
    
    /**
     * Render a chapter title
     */
    renderChapterTitle(ctx, title, style) {
        // Add semi-transparent overlay
        ctx.fillStyle = style.overlayColor;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        // Draw chapter title
        ctx.font = `bold 36px ${style.fontFamily}`;
        ctx.fillStyle = style.titleColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(title, ctx.canvas.width / 2, ctx.canvas.height / 2);
    }
    
    /**
     * Render text
     */
    renderText(ctx, text, style) {
        // Add semi-transparent overlay
        ctx.fillStyle = style.overlayColor;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        // Draw text
        ctx.font = `24px ${style.fontFamily}`;
        ctx.fillStyle = style.textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Word wrap text
        this.wrapText(ctx, text, ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.width - 200, 36);
    }
    
    /**
     * Render a character
     */
    renderCharacter(ctx, imageUrl, position, character) {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            // Calculate position
            let x, y, width, height;
            
            width = img.width;
            height = img.height;
            
            // Scale image if needed
            const maxHeight = ctx.canvas.height * 0.7;
            if (height > maxHeight) {
                const scale = maxHeight / height;
                width *= scale;
                height *= scale;
            }
            
            // Position based on parameter
            switch (position) {
                case 'left':
                    x = ctx.canvas.width * 0.25 - width / 2;
                    break;
                case 'right':
                    x = ctx.canvas.width * 0.75 - width / 2;
                    break;
                case 'center':
                default:
                    x = ctx.canvas.width / 2 - width / 2;
                    break;
            }
            
            y = ctx.canvas.height - height;
            
            // Draw character
            ctx.drawImage(img, x, y, width, height);
            
            // Add character name if available
            if (character) {
                ctx.font = 'bold 24px Arial';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.fillText(character.name, x + width / 2, y - 10);
            }
        };
        img.src = imageUrl;
    }
    
    /**
     * Render an object
     */
    renderObject(ctx, imageUrl, position) {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            // Calculate position
            let x, y, width, height;
            
            width = img.width;
            height = img.height;
            
            // Scale image if needed
            const maxWidth = ctx.canvas.width * 0.3;
            if (width > maxWidth) {
                const scale = maxWidth / width;
                width *= scale;
                height *= scale;
            }
            
            // Position based on parameter
            switch (position) {
                case 'left':
                    x = ctx.canvas.width * 0.25 - width / 2;
                    break;
                case 'right':
                    x = ctx.canvas.width * 0.75 - width / 2;
                    break;
                case 'center':
                default:
                    x = ctx.canvas.width / 2 - width / 2;
                    break;
            }
            
            y = ctx.canvas.height / 2 - height / 2;
            
            // Draw object
            ctx.drawImage(img, x, y, width, height);
        };
        img.src = imageUrl;
    }
    
    /**
     * Render a special effect
     */
    renderEffect(ctx, effectName, style) {
        switch (effectName) {
            case 'dramatic':
                // Create a dramatic flash effect
                ctx.fillStyle = style.titleColor;
                ctx.globalAlpha = 0.5;
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.globalAlpha = 1.0;
                break;
                
            // Add more effects as needed
        }
    }
    
    /**
     * Word wrap text on canvas
     */
    wrapText(context, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';
        let lineCount = 0;
        
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;
            
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y - (lineHeight * (Math.floor(lineCount / 2) - lineCount / 2)));
                line = words[n] + ' ';
                lineCount++;
            } else {
                line = testLine;
            }
        }
        
        context.fillText(line, x, y + (lineHeight * (Math.floor(lineCount / 2) + 0.5)));
    }
    
    /**
     * Get a random item from an array
     */
    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    /**
     * Create a simple animated GIF as a fallback
     * This is used when the full video generation isn't possible
     */
    createAnimatedGif(story, genreElements, style) {
        // In a real implementation, this would create an animated GIF
        // For this demo, we'll just return a placeholder
        return 'placeholder-animation.gif';
    }
}

// Create a global instance
const animationGenerator = new AnimationGenerator();