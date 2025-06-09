 /**
 * Video Generator
 * This script handles the video generation for stories
 */

class VideoGenerator {
    constructor() {
        // Video settings
        this.videoSettings = {
            width: 1280,
            height: 720,
            fps: 30,
            duration: 30, // seconds
            transitionDuration: 2 // seconds
        };

        // Genre-based background images
        this.backgroundImages = {
            fantasy: [
                'https://cdn.pixabay.com/photo/2017/09/12/11/56/universe-2742113_1280.jpg'
            ],
            scifi: [
                'https://cdn.pixabay.com/photo/2017/08/10/02/05/tiles-shapes-2617112_1280.jpg'
            ],
            mystery: [
                'https://cdn.pixabay.com/photo/2020/04/25/12/14/circle-5090539_1280.jpg'
            ],
            romance: [
                'https://cdn.pixabay.com/photo/2017/07/24/12/43/schrecksee-2534484_1280.jpg'
            ],
            horror: [
                'https://cdn.pixabay.com/photo/2016/10/20/18/35/earth-1756274_1280.jpg'
            ],
            adventure: [
                'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_1280.jpg'
            ],
            historical: [
                'https://cdn.pixabay.com/photo/2017/07/01/19/48/background-2462431_1280.jpg'
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

    async generateVideo(story, theme) {
        try {
            console.log(`Generating video for story: ${story.title}`);

            const loadingText = document.getElementById('loading-text');
            if (loadingText) loadingText.textContent = 'Generating your story video...';

            const backgroundImages = this.backgroundImages[story.genre] || this.backgroundImages.fantasy;
            const fontStyle = this.fontStyles[theme] || this.fontStyles.purple;

            const videoUrl = await this.createDemoVideo(story, backgroundImages, fontStyle);

            return {
                url: videoUrl,
                title: story.title,
                duration: this.videoSettings.duration,
                genre: story.genre,
                createdAt: new Date().toISOString()
            };
        } catch (error) {
            console.error('Video generation failed:', error);
            throw error;
        }
    }

    createDemoVideo(story, backgroundImages, fontStyle) {
        return new Promise((resolve, reject) => {
            if (typeof MediaRecorder === 'undefined') {
                reject(new Error('MediaRecorder is not supported in this browser.'));
                return;
            }

            const canvas = document.createElement('canvas');
            canvas.width = this.videoSettings.width;
            canvas.height = this.videoSettings.height;
            const ctx = canvas.getContext('2d');

            const video = document.createElement('video');
            video.width = this.videoSettings.width;
            video.height = this.videoSettings.height;
            video.controls = true;

            const stream = canvas.captureStream(this.videoSettings.fps);
            let recorder;
            try {
                recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
            } catch (e) {
                reject(new Error('Failed to initialize MediaRecorder: ' + e.message));
                return;
            }

            const chunks = [];
            recorder.ondataavailable = e => chunks.push(e.data);

            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);

                const videoContainer = document.getElementById('story-video');
                if (videoContainer && videoContainer.tagName === 'VIDEO') {
                    videoContainer.src = url;
                }

                resolve(url);
            };

            const totalFrames = this.videoSettings.fps * this.videoSettings.duration;
            const framesPerTransition = this.videoSettings.fps * this.videoSettings.transitionDuration;
            let frameCount = 0;

            const images = [];
            let loadedImages = 0;

            backgroundImages.forEach((url) => {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = () => {
                    loadedImages++;
                    if (loadedImages === backgroundImages.length) startAnimation();
                };
                img.onerror = () => {
                    console.warn('Failed to load image:', url);
                    loadedImages++;
                    if (loadedImages === backgroundImages.length) startAnimation();
                };
                img.src = url;
                images.push(img);
            });

            const sentences = this.extractKeySentences(story);

            const startAnimation = () => {
                recorder.start();

                const animate = () => {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    const imageIndex = Math.floor((frameCount / totalFrames) * images.length) % images.length;
                    const nextImageIndex = (imageIndex + 1) % images.length;
                    const transitionPoint = (frameCount % (totalFrames / images.length)) / framesPerTransition;
                    const alpha = Math.min(1, transitionPoint);

                    ctx.globalAlpha = 1;
                    ctx.drawImage(images[imageIndex], 0, 0, canvas.width, canvas.height);

                    if (transitionPoint < 1) {
                        ctx.globalAlpha = alpha;
                        ctx.drawImage(images[nextImageIndex], 0, 0, canvas.width, canvas.height);
                    }

                    ctx.globalAlpha = 1;
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    if (frameCount < this.videoSettings.fps * 5) {
                        ctx.font = `bold 48px ${fontStyle.fontFamily}`;
                        ctx.fillStyle = fontStyle.color;
                        ctx.textAlign = 'center';
                        ctx.fillText(story.title, canvas.width / 2, canvas.height / 2);

                        ctx.font = `24px ${fontStyle.fontFamily}`;
                        ctx.fillText(`A ${story.genre} story`, canvas.width / 2, canvas.height / 2 + 60);
                    } else {
                        const sentenceIndex = Math.floor(((frameCount - this.videoSettings.fps * 5) / (totalFrames - this.videoSettings.fps * 5)) * sentences.length);
                        const sentence = sentences[Math.min(sentenceIndex, sentences.length - 1)];

                        ctx.font = `32px ${fontStyle.fontFamily}`;
                        ctx.fillStyle = 'white';
                        ctx.textAlign = 'center';
                        this.wrapText(ctx, sentence, canvas.width / 2, canvas.height / 2, canvas.width - 200, 40);
                    }

                    frameCount++;
                    if (frameCount < totalFrames) {
                        requestAnimationFrame(animate);
                    } else {
                        recorder.stop();
                    }
                };

                animate();
            };
        });
    }

    extractKeySentences(story) {
        const sentences = [];
        sentences.push(story.summary);

        story.characters.forEach(character => {
            sentences.push(`${character.name}: ${character.description}`);
        });

        story.chapters.forEach(chapter => {
            const chapterSentences = chapter.content.split(/[.!?]+/).filter(s => s.trim().length > 30);
            sentences.push(...chapterSentences.slice(0, 2));
        });

        return sentences.map(s => s.trim()).filter(s => s);
    }

    wrapText(context, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';
        let lineCount = 0;

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y + (lineCount * lineHeight));
                line = words[n] + ' ';
                lineCount++;
            } else {
                line = testLine;
            }
        }

        context.fillText(line, x, y + (lineCount * lineHeight));
    }
}

const videoGenerator = new VideoGenerator();