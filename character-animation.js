/**
 * Character Animation System for AI Story Generator
 * This script provides advanced character animations for story videos
 */

class CharacterAnimationSystem {
    constructor() {
        // Animation types
        this.animationTypes = {
            characterEntrance: this.animateCharacterEntrance,
            characterMovement: this.animateCharacterMovement,
            characterEmote: this.animateCharacterEmote,
            characterInteraction: this.animateCharacterInteraction,
            characterDialog: this.animateCharacterDialog,
            characterEnsemble: this.animateCharacterEnsemble
        };
        
        // Character positions
        this.positions = {
            left: { x: 0.2, y: 0.5 },
            center: { x: 0.5, y: 0.5 },
            right: { x: 0.8, y: 0.5 },
            topLeft: { x: 0.2, y: 0.3 },
            topCenter: { x: 0.5, y: 0.3 },
            topRight: { x: 0.8, y: 0.3 },
            bottomLeft: { x: 0.2, y: 0.7 },
            bottomCenter: { x: 0.5, y: 0.7 },
            bottomRight: { x: 0.8, y: 0.7 }
        };
        
        // Character emotions
        this.emotions = ['neutral', 'happy', 'sad', 'angry', 'surprised', 'thoughtful'];
        
        // Animation speeds
        this.speeds = {
            slow: 0.5,
            normal: 1.0,
            fast: 2.0
        };
    }
    
    /**
     * Get animation function by name
     */
    getAnimationFunction(animationType) {
        return this.animationTypes[animationType] || this.animateCharacterMovement;
    }
    
    /**
     * Animate character entrance
     */
    animateCharacterEntrance(ctx, character, silhouette, canvas, progress, options = {}) {
        const width = canvas.width;
        const height = canvas.height;
        const img = options.loadedImages[silhouette];
        
        if (!img) return;
        
        // Calculate character size
        const charWidth = width * 0.3;
        const charHeight = height * 0.6;
        
        // Calculate position based on progress
        let x, y;
        
        if (progress < 0.5) {
            // Character enters from left or right
            const startX = options.direction === 'right' ? width + charWidth : -charWidth;
            const endX = width * 0.5 - charWidth * 0.5;
            x = startX + (endX - startX) * (progress * 2);
            y = height * 0.5 - charHeight * 0.5;
        } else {
            // Character is in position and scales up
            const scale = 0.8 + (progress - 0.5) * 0.4;
            x = width * 0.5 - (charWidth * scale) * 0.5;
            y = height * 0.5 - (charHeight * scale) * 0.5;
            
            // Draw character
            ctx.drawImage(img, x, y, charWidth * scale, charHeight * scale);
            
            // Draw character name with fade-in
            const nameOpacity = (progress - 0.5) * 2;
            ctx.fillStyle = `rgba(255, 255, 255, ${nameOpacity})`;
            ctx.font = 'bold 32px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(character.name, width * 0.5, height * 0.8);
            
            return;
        }
        
        // Draw character
        ctx.drawImage(img, x, y, charWidth, charHeight);
    }
    
    /**
     * Animate character movement
     */
    animateCharacterMovement(ctx, character, silhouette, canvas, progress, options = {}) {
        const width = canvas.width;
        const height = canvas.height;
        const img = options.loadedImages[silhouette];
        
        if (!img) return;
        
        // Calculate character size
        const charWidth = width * 0.3;
        const charHeight = height * 0.6;
        
        // Calculate movement path
        const path = [
            this.positions.left,
            this.positions.center,
            this.positions.right,
            this.positions.center
        ];
        
        // Get position based on progress
        const pathIndex = Math.floor(progress * path.length);
        const nextPathIndex = (pathIndex + 1) % path.length;
        const pathProgress = (progress * path.length) % 1;
        
        const currentPos = path[pathIndex];
        const nextPos = path[nextPathIndex];
        
        const x = width * (currentPos.x + (nextPos.x - currentPos.x) * pathProgress) - charWidth * 0.5;
        const y = height * (currentPos.y + (nextPos.y - currentPos.y) * pathProgress) - charHeight * 0.5;
        
        // Add slight bounce
        const bounce = Math.sin(progress * Math.PI * 8) * 5;
        
        // Draw character
        ctx.drawImage(img, x, y + bounce, charWidth, charHeight);
        
        // Draw character name
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(character.name, x + charWidth * 0.5, y + charHeight + 30);
    }
    
    /**
     * Animate character emotions
     */
    animateCharacterEmote(ctx, character, silhouette, canvas, progress, options = {}) {
        const width = canvas.width;
        const height = canvas.height;
        const img = options.loadedImages[silhouette];
        
        if (!img) return;
        
        // Calculate character size
        const charWidth = width * 0.35;
        const charHeight = height * 0.65;
        
        // Position character
        const x = width * 0.5 - charWidth * 0.5;
        const y = height * 0.5 - charHeight * 0.5;
        
        // Draw character
        ctx.drawImage(img, x, y, charWidth, charHeight);
        
        // Draw emotion bubble
        const emotion = this.emotions[Math.floor(progress * this.emotions.length) % this.emotions.length];
        const bubbleSize = 80;
        const bubbleX = x + charWidth * 0.8;
        const bubbleY = y + charHeight * 0.2;
        
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(bubbleX, bubbleY, bubbleSize, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw emotion text
        ctx.fillStyle = '#333';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(emotion.toUpperCase(), bubbleX, bubbleY + 8);
        
        // Draw character name
        ctx.fillStyle = 'white';
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(character.name, width * 0.5, height * 0.85);
    }
    
    /**
     * Animate character interaction
     */
    animateCharacterInteraction(ctx, characters, silhouettes, canvas, progress, options = {}) {
        const width = canvas.width;
        const height = canvas.height;
        
        if (!characters || characters.length < 1 || !silhouettes || silhouettes.length < 1) return;
        
        // Limit to 2 characters for interaction
        const char1 = characters[0];
        const char2 = characters.length > 1 ? characters[1] : characters[0];
        const sil1 = silhouettes[0];
        const sil2 = silhouettes.length > 1 ? silhouettes[1] : silhouettes[0];
        
        const img1 = options.loadedImages[sil1];
        const img2 = options.loadedImages[sil2];
        
        if (!img1 || !img2) return;
        
        // Calculate character size
        const charWidth = width * 0.25;
        const charHeight = height * 0.5;
        
        // Calculate positions based on progress
        let x1, y1, x2, y2;
        
        if (progress < 0.3) {
            // Characters move into position
            x1 = width * (0.2 + progress * 0.1) - charWidth * 0.5;
            x2 = width * (0.8 - progress * 0.1) - charWidth * 0.5;
        } else if (progress < 0.7) {
            // Characters are in position
            x1 = width * 0.3 - charWidth * 0.5;
            x2 = width * 0.7 - charWidth * 0.5;
        } else {
            // Characters move closer
            const moveProgress = (progress - 0.7) / 0.3;
            x1 = width * (0.3 + moveProgress * 0.1) - charWidth * 0.5;
            x2 = width * (0.7 - moveProgress * 0.1) - charWidth * 0.5;
        }
        
        y1 = height * 0.5 - charHeight * 0.5;
        y2 = height * 0.5 - charHeight * 0.5;
        
        // Draw characters
        ctx.drawImage(img1, x1, y1, charWidth, charHeight);
        ctx.drawImage(img2, x2, y2, charWidth, charHeight);
        
        // Draw character names
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(char1.name, x1 + charWidth * 0.5, y1 + charHeight + 30);
        ctx.fillText(char2.name, x2 + charWidth * 0.5, y2 + charHeight + 30);
        
        // Draw interaction line or bubble
        if (progress > 0.4) {
            const lineOpacity = Math.min(1, (progress - 0.4) * 5);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x1 + charWidth * 0.8, y1 + charHeight * 0.4);
            ctx.lineTo(x2 + charWidth * 0.2, y2 + charHeight * 0.4);
            ctx.stroke();
        }
    }
    
    /**
     * Animate character dialog
     */
    animateCharacterDialog(ctx, characters, silhouettes, canvas, progress, options = {}) {
        const width = canvas.width;
        const height = canvas.height;
        
        if (!characters || characters.length < 1 || !silhouettes || silhouettes.length < 1) return;
        
        // Limit to 2 characters for dialog
        const char1 = characters[0];
        const char2 = characters.length > 1 ? characters[1] : characters[0];
        const sil1 = silhouettes[0];
        const sil2 = silhouettes.length > 1 ? silhouettes[1] : silhouettes[0];
        
        const img1 = options.loadedImages[sil1];
        const img2 = options.loadedImages[sil2];
        
        if (!img1 || !img2) return;
        
        // Calculate character size
        const charWidth = width * 0.25;
        const charHeight = height * 0.5;
        
        // Position characters
        const x1 = width * 0.25 - charWidth * 0.5;
        const x2 = width * 0.75 - charWidth * 0.5;
        const y1 = height * 0.5 - charHeight * 0.5;
        const y2 = height * 0.5 - charHeight * 0.5;
        
        // Draw characters
        ctx.drawImage(img1, x1, y1, charWidth, charHeight);
        ctx.drawImage(img2, x2, y2, charWidth, charHeight);
        
        // Draw character names
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(char1.name, x1 + charWidth * 0.5, y1 + charHeight + 30);
        ctx.fillText(char2.name, x2 + charWidth * 0.5, y2 + charHeight + 30);
        
        // Draw dialog bubbles
        const dialogProgress = progress * 3 % 1;
        const speakingChar = Math.floor(progress * 3) % 2;
        
        if (speakingChar === 0) {
            // First character is speaking
            this.drawDialogBubble(ctx, x1 + charWidth * 0.8, y1 + charHeight * 0.3, 
                                 dialogProgress, char1.trait || 'interesting');
        } else {
            // Second character is speaking
            this.drawDialogBubble(ctx, x2 + charWidth * 0.2, y2 + charHeight * 0.3, 
                                 dialogProgress, char2.trait || 'thoughtful');
        }
    }
    
    /**
     * Draw a dialog bubble
     */
    drawDialogBubble(ctx, x, y, progress, text) {
        const bubbleWidth = 150;
        const bubbleHeight = 80;
        const bubbleRadius = 10;
        
        // Draw bubble
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 20, y + 20);
        ctx.lineTo(x, y + 10);
        ctx.fill();
        
        ctx.beginPath();
        ctx.roundRect(x, y - bubbleHeight, bubbleWidth, bubbleHeight, bubbleRadius);
        ctx.fill();
        
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw text with typewriter effect
        const displayText = text.substring(0, Math.floor(text.length * progress));
        
        ctx.fillStyle = '#333';
        ctx.font = '18px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(displayText, x + 10, y - bubbleHeight/2);
    }
    
    /**
     * Animate character ensemble
     */
    animateCharacterEnsemble(ctx, characters, silhouettes, canvas, progress, options = {}) {
        const width = canvas.width;
        const height = canvas.height;
        
        if (!characters || characters.length < 1 || !silhouettes || silhouettes.length < 1) return;
        
        // Limit to 5 characters max for ensemble
        const charCount = Math.min(characters.length, 5);
        
        // Calculate character size based on count
        const charWidth = width * (0.2 - charCount * 0.01);
        const charHeight = height * (0.4 - charCount * 0.01);
        
        // Calculate positions
        for (let i = 0; i < charCount; i++) {
            const character = characters[i];
            const silhouette = silhouettes[i % silhouettes.length];
            const img = options.loadedImages[silhouette];
            
            if (!img) continue;
            
            // Calculate position in arc formation
            const angle = Math.PI * (0.2 + 0.6 * (i / (charCount - 1 || 1)));
            const radius = height * 0.3;
            
            // Start off-screen and move into position
            let x, y;
            
            if (progress < 0.5) {
                // Characters move into position
                const entryProgress = progress * 2;
                const startX = width * 1.5;
                const startY = height * 1.5;
                const endX = width * 0.5 + Math.cos(angle) * radius - charWidth * 0.5;
                const endY = height * 0.6 - Math.sin(angle) * radius - charHeight * 0.5;
                
                x = startX + (endX - startX) * entryProgress;
                y = startY + (endY - startY) * entryProgress;
            } else {
                // Characters are in position and do slight movement
                const bounceProgress = (progress - 0.5) * 2;
                const bounce = Math.sin(bounceProgress * Math.PI * 2) * 10;
                
                x = width * 0.5 + Math.cos(angle) * radius - charWidth * 0.5;
                y = height * 0.6 - Math.sin(angle) * radius - charHeight * 0.5 + bounce;
            }
            
            // Draw character
            ctx.drawImage(img, x, y, charWidth, charHeight);
            
            // Draw character name
            if (progress > 0.7) {
                const nameOpacity = (progress - 0.7) * 3;
                ctx.fillStyle = `rgba(255, 255, 255, ${nameOpacity})`;
                ctx.font = 'bold 20px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(character.name, x + charWidth * 0.5, y + charHeight + 25);
            }
        }
        
        // Draw "The End" text
        if (progress > 0.8) {
            const textOpacity = (progress - 0.8) * 5;
            ctx.fillStyle = `rgba(255, 255, 255, ${textOpacity})`;
            ctx.font = 'bold 48px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('The End', width * 0.5, height * 0.3);
        }
    }
}

// Initialize the character animation system
const characterAnimationSystem = new CharacterAnimationSystem();