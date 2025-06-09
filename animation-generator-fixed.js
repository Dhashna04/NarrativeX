executre/**
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
            duration: 30, // seconds
            transitionDuration: 2 // seconds
        };
        
        // Genre-based background images
        this.backgroundImages = {
            fantasy: [
                'https://images.unsplash.com/photo-1518709268805-4e9042af9f23',
                'https://images.unsplash.com/photo-1569973762773-96da12cf4d7a',
                'https://images.unsplash.com/photo-1534447677768-be436bb09401'
            ],
            scifi: [
                'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
                'https://images.unsplash.com/photo-1581822261290-991b38693d1b',
                'https://images.unsplash.com/photo-1484950763426-56b5bf172dbb'
            ],
            mystery: [
                'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0',
                'https://images.unsplash.com/photo-1508253730651-e5ace4c35922',
                'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16'
            ],
            romance: [
                'https://images.unsplash.com/photo-1518199266791-5375a83190b7',
                'https://images.unsplash.com/photo-1518895949257-7621c3c786d7',
                'https://images.unsplash.com/photo-1516589091380-5d8e87df6999'
            ],
            horror: [
                'https://images.unsplash.com/photo-1509248961158-e54f6934749c',
                'https://images.unsplash.com/photo-1526229650576-c5e85789c9ad',
                'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1'
            ],
            adventure: [
                'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
                'https://images.unsplash.com/photo-1508672019048-805c876b67e2',
                'https://images.unsplash.com/photo-1530789253388-582c481c54b0'
            ],
            historical: [
                'https://images.unsplash.com/photo-1564509143629-5a0d7f9b49c5',
                'https://images.unsplash.com/photo-1577127296888-d3e6f7b5d1e4',
                'https://images.unsplash.com/photo-1584483766114-2cea6facdf57'
            ]
        };
        
        // Font styles for different themes
        this.fontStyles = {
            purple: { fontFamily: 'Georgia, serif', color: '#6a11cb' },
            blue: { fontFamily: 'Arial, sans-serif', color: '#1167cb' },
            green: { fontFamily: 'Verdana, sans-serif', color: '#11cb6a' },
            orange: { fontFamily: 'Trebuchet MS, sans-serif', color: '#cb6a11' },
            pink: { fontFamily: 'Courier New, monospace', color: '#cb116a' }
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
                
                // Get background images for the story genre
                const backgroundImages = this.backgroundImages[story.genre] || this.backgroundImages.fantasy;
                
                // Get font style for the theme
                const fontStyle = this.fontStyles[theme] || this.fontStyles.purple;
                
                // Simulate animation generation process
                setTimeout(() => {
                    // Create a simulated animation
                    const videoUrl = this.createAnimation(story, backgroundImages, fontStyle);
                    
                    resolve({
                        url: videoUrl,
                        title: story.title,
                        duration: this.animationSettings.duration,
                        genre: story.genre,
                        createdAt: new Date().toISOString()
                    });
                }, 3000); // Simulate 3 seconds of processing time
                
            } catch (error) {
                reject(error);
            }
        });
    }
    
    /**
     * Create an animation for the story
     */
    createAnimation(story, backgroundImages, fontStyle) {
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
        
        try {
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
                    videoContainer.innerHTML = '';
                    videoContainer.src = video.src;
                    videoContainer.appendChild(video);
                }
            };
            
            // Start recording
            recorder.start();
            
            // Animation variables
            let frameCount = 0;
            const totalFrames = this.animationSettings.fps * this.animationSettings.duration;
            const framesPerTransition = this.animationSettings.fps * this.animationSettings.transitionDuration;
            
            // Preload images
            const images = [];
            let loadedImages = 0;
            
            backgroundImages.forEach((url, index) => {
                const img = new Image();
                img.crossOrigin = 'Anonymous';
                img.onload = () => {
                    loadedImages++;
                    images[index] = img;
                    if (loadedImages === backgroundImages.length) {
                        // Start animation when all images are loaded
                        startAnimation();
                    }
                };
                img.onerror = () => {
                    console.error(`Failed to load image: ${url}`);
                    loadedImages++;
                    // Use a placeholder for failed images
                    const placeholderImg = new Image();
                    placeholderImg.width = this.animationSettings.width;
                    placeholderImg.height = this.animationSettings.height;
                    images[index] = placeholderImg;
                    if (loadedImages === backgroundImages.length) {
                        startAnimation();
                    }
                };
                img.src = url;
            });
            
            // Extract key sentences from the story
            const sentences = this.extractKeySentences(story);
            
            // Start the animation
            const startAnimation = () => {
                const animate = () => {
                    // Clear canvas
                    ctx.fillStyle = 'black';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    
                    // Calculate current image index
                    const imageIndex = Math.floor((frameCount / totalFrames) * images.length) % images.length;
                    const nextImageIndex = (imageIndex + 1) % images.length;
                    
                    // Calculate transition progress
                    const transitionPoint = (frameCount % (totalFrames / images.length)) / framesPerTransition;
                    const alpha = Math.min(1, transitionPoint);
                    
                    // Draw current image
                    ctx.globalAlpha = 1;
                    if (images[imageIndex] && images[imageIndex].complete) {
                        ctx.drawImage(images[imageIndex], 0, 0, canvas.width, canvas.height);
                    }
                    
                    // Draw next image with transition
                    if (transitionPoint < 1 && images[nextImageIndex] && images[nextImageIndex].complete) {
                        ctx.globalAlpha = alpha;
                        ctx.drawImage(images[nextImageIndex], 0, 0, canvas.width, canvas.height);
                    }
                    
                    // Reset alpha
                    ctx.globalAlpha = 1;
                    
                    // Add semi-transparent overlay
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    
                    // Draw title at the beginning
                    if (frameCount < this.animationSettings.fps * 5) {
                        ctx.font = `bold 48px ${fontStyle.fontFamily}`;
                        ctx.fillStyle = fontStyle.color;
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(story.title, canvas.width / 2, canvas.height / 2);
                        
                        // Draw subtitle
                        ctx.font = `24px ${fontStyle.fontFamily}`;
                        ctx.fillText(`A ${story.genre} story`, canvas.width / 2, canvas.height / 2 + 60);
                    } else {
                        // Calculate which sentence to show
                        const sentenceIndex = Math.floor(((frameCount - this.animationSettings.fps * 5) / (totalFrames - this.animationSettings.fps * 5)) * sentences.length);
                        const sentence = sentences[Math.min(sentenceIndex, sentences.length - 1)];
                        
                        // Draw text
                        ctx.font = `32px ${fontStyle.fontFamily}`;
                        ctx.fillStyle = 'white';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        
                        // Word wrap text
                        this.wrapText(ctx, sentence, canvas.width / 2, canvas.height / 2, canvas.width - 200, 40);
                    }
                    
                    // Increment frame count
                    frameCount++;
                    
                    // Continue animation or stop recording
                    if (frameCount < totalFrames) {
                        requestAnimationFrame(animate);
                    } else {
                        recorder.stop();
                    }
                };
                
                // Start animation
                animate();
            };
            
            // Return a placeholder URL until the video is ready
            return 'placeholder';
        } catch (error) {
            console.error('Error creating animation:', error);
            
            // Fallback for browsers that don't support MediaRecorder
            const videoContainer = document.getElementById('story-video');
            if (videoContainer) {
                videoContainer.innerHTML = `
                    <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#000;color:#fff;text-align:center;padding:20px;">
                        <div>
                            <h3>Animation Preview</h3>
                            <p>Your story "${story.title}" has been visualized as an animation.</p>
                            <p>This is a ${story.genre} story with ${story.characters.length} characters.</p>
                            <p><em>${story.summary}</em></p>
                        </div>
                    </div>
                `;
            }
            
            return 'fallback';
        }
    }
    
    /**
     * Extract key sentences from the story
     */
    extractKeySentences(story) {
        const sentences = [];
        
        // Add title
        sentences.push(story.title);
        
        // Add summary
        sentences.push(story.summary);
        
        // Add character introductions
        story.characters.forEach(character => {
            sentences.push(`${character.name}: ${character.description}`);
        });
        
        // Add key sentences from each chapter
        story.chapters.forEach(chapter => {
            // Split content into sentences
            const chapterSentences = chapter.content.split(/[.!?]+/).filter(s => s.trim().length > 30);
            sentences.push(`Chapter: ${chapter.title}`);
            sentences.push(...chapterSentences.slice(0, 2));
        });
        
        return sentences.map(s => s.trim()).filter(s => s);
    }
    
    /**
     * Word wrap text on canvas
     */
    wrapText(context, text, x, y, maxWidth, lineHeight) {
        if (!text) return;
        
        const words = text.split(' ');
        let line = '';
        let lineCount = 0;
        
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;
            
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y + (lineCount * lineHeight) - (lineHeight * Math.floor(words.length / 20)));
                line = words[n] + ' ';
                lineCount++;
            } else {
                line = testLine;
            }
        }
        
        context.fillText(line, x, y + (lineCount * lineHeight) - (lineHeight * Math.floor(words.length / 20)));
    }
}

// Create a global instance
const animationGenerator = new AnimationGenerator();