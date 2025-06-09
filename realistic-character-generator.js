/**
 * Realistic Character Generator
 * Creates lifelike character representations for story videos
 */

class RealisticCharacterGenerator {
    constructor() {
        // Character model types
        this.characterModelTypes = {
            male: [
                'realistic-male-casual',
                'realistic-male-formal',
                'realistic-male-adventurer',
                'realistic-male-scholarly',
                'realistic-male-heroic',
                'realistic-male-mysterious'
            ],
            female: [
                'realistic-female-casual',
                'realistic-female-formal',
                'realistic-female-adventurer',
                'realistic-female-scholarly',
                'realistic-female-heroic',
                'realistic-female-mysterious'
            ],
            nonbinary: [
                'realistic-nonbinary-casual',
                'realistic-nonbinary-formal',
                'realistic-nonbinary-adventurer',
                'realistic-nonbinary-scholarly',
                'realistic-nonbinary-heroic',
                'realistic-nonbinary-mysterious'
            ]
        };
        
        // Realistic character image URLs by genre and type
        this.realisticCharacterImages = {
            fantasy: {
                male: [
                    'https://images.unsplash.com/photo-1566577739112-5180d4bf9390',
                    'https://images.unsplash.com/photo-1597347316205-36f6c451902a',
                    'https://images.unsplash.com/photo-1570470836811-49e7525fbe3e'
                ],
                female: [
                    'https://images.unsplash.com/photo-1613876215075-276638e9a67c',
                    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91',
                    'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604'
                ],
                nonbinary: [
                    'https://images.unsplash.com/photo-1596075780750-81249df16d19',
                    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04',
                    'https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc'
                ]
            },
            scifi: {
                male: [
                    'https://images.unsplash.com/photo-1601574465779-76d6dbb88557',
                    'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3',
                    'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5'
                ],
                female: [
                    'https://images.unsplash.com/photo-1535295972055-1c762f4483e5',
                    'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
                    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04'
                ],
                nonbinary: [
                    'https://images.unsplash.com/photo-1596075780750-81249df16d19',
                    'https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc',
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'
                ]
            },
            mystery: {
                male: [
                    'https://images.unsplash.com/photo-1553514029-1318c9127859',
                    'https://images.unsplash.com/photo-1605462863863-10d9e47e15ee',
                    'https://images.unsplash.com/photo-1600486913747-55e5470d6f40'
                ],
                female: [
                    'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604',
                    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91',
                    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f'
                ],
                nonbinary: [
                    'https://images.unsplash.com/photo-1596075780750-81249df16d19',
                    'https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc',
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'
                ]
            },
            romance: {
                male: [
                    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce',
                    'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f',
                    'https://images.unsplash.com/photo-1600486913747-55e5470d6f40'
                ],
                female: [
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
                    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
                    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91'
                ],
                nonbinary: [
                    'https://images.unsplash.com/photo-1596075780750-81249df16d19',
                    'https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc',
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'
                ]
            },
            horror: {
                male: [
                    'https://images.unsplash.com/photo-1605462863863-10d9e47e15ee',
                    'https://images.unsplash.com/photo-1600486913747-55e5470d6f40',
                    'https://images.unsplash.com/photo-1553514029-1318c9127859'
                ],
                female: [
                    'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604',
                    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91',
                    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f'
                ],
                nonbinary: [
                    'https://images.unsplash.com/photo-1596075780750-81249df16d19',
                    'https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc',
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'
                ]
            },
            adventure: {
                male: [
                    'https://images.unsplash.com/photo-1566577739112-5180d4bf9390',
                    'https://images.unsplash.com/photo-1597347316205-36f6c451902a',
                    'https://images.unsplash.com/photo-1570470836811-49e7525fbe3e'
                ],
                female: [
                    'https://images.unsplash.com/photo-1613876215075-276638e9a67c',
                    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91',
                    'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604'
                ],
                nonbinary: [
                    'https://images.unsplash.com/photo-1596075780750-81249df16d19',
                    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04',
                    'https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc'
                ]
            },
            historical: {
                male: [
                    'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f',
                    'https://images.unsplash.com/photo-1553514029-1318c9127859',
                    'https://images.unsplash.com/photo-1566577739112-5180d4bf9390'
                ],
                female: [
                    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91',
                    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f',
                    'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604'
                ],
                nonbinary: [
                    'https://images.unsplash.com/photo-1596075780750-81249df16d19',
                    'https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc',
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'
                ]
            }
        };
        
        // Realistic scene backgrounds
        this.realisticSceneBackgrounds = {
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
        
        // Character expressions
        this.characterExpressions = [
            'neutral',
            'happy',
            'sad',
            'angry',
            'surprised',
            'thoughtful',
            'fearful',
            'confident'
        ];
    }
    
    /**
     * Determine the gender presentation for a character based on their description
     */
    determineGenderPresentation(character) {
        const name = character.name.toLowerCase();
        const description = (character.description || '').toLowerCase();
        const role = (character.role || '').toLowerCase();
        
        // Check for explicit gender mentions
        if (description.includes('woman') || description.includes('female') || 
            description.includes('she') || description.includes('her') || 
            role.includes('woman') || role.includes('female') || 
            role.includes('she') || role.includes('her') || 
            role.includes('princess') || role.includes('queen') || 
            role.includes('duchess') || role.includes('lady')) {
            return 'female';
        }
        
        if (description.includes('man') || description.includes('male') || 
            description.includes('he') || description.includes('his') || 
            role.includes('man') || role.includes('male') || 
            role.includes('he') || role.includes('his') || 
            role.includes('prince') || role.includes('king') || 
            role.includes('duke') || role.includes('lord')) {
            return 'male';
        }
        
        if (description.includes('non-binary') || description.includes('nonbinary') || 
            description.includes('they') || description.includes('them') || 
            role.includes('non-binary') || role.includes('nonbinary') || 
            role.includes('they') || role.includes('them')) {
            return 'nonbinary';
        }
        
        // Default to a random gender presentation if no clear indicators
        const genders = ['male', 'female', 'nonbinary'];
        return genders[Math.floor(Math.random() * genders.length)];
    }
    
    /**
     * Get a realistic character image based on genre and character traits
     */
    getRealisticCharacterImage(character, genre) {
        // Determine gender presentation
        const genderPresentation = this.determineGenderPresentation(character);
        
        // Get appropriate images for the genre and gender
        const genreImages = this.realisticCharacterImages[genre] || this.realisticCharacterImages.fantasy;
        const genderImages = genreImages[genderPresentation] || genreImages.male;
        
        // Select a random image from the appropriate category
        return genderImages[Math.floor(Math.random() * genderImages.length)];
    }
    
    /**
     * Get a realistic scene background based on genre
     */
    getRealisticSceneBackground(genre) {
        const backgrounds = this.realisticSceneBackgrounds[genre] || this.realisticSceneBackgrounds.fantasy;
        return backgrounds[Math.floor(Math.random() * backgrounds.length)];
    }
    
    /**
     * Generate realistic character representations for a story
     */
    generateRealisticCharacters(story) {
        const characters = [];
        
        // Process each character in the story
        story.characters.forEach(character => {
            const characterImage = this.getRealisticCharacterImage(character, story.genre);
            
            characters.push({
                name: character.name,
                role: character.role,
                description: character.description || '',
                trait: character.trait || '',
                image: characterImage,
                genderPresentation: this.determineGenderPresentation(character)
            });
        });
        
        return characters;
    }
    
    /**
     * Generate realistic scene backgrounds for a story
     */
    generateRealisticScenes(story) {
        const scenes = [];
        
        // Generate a scene for each chapter
        story.chapters.forEach((chapter, index) => {
            // Split chapter into paragraphs
            const paragraphs = chapter.content.split('\n\n').filter(p => p.trim().length > 0);
            
            // Create a scene for each paragraph
            paragraphs.forEach((paragraph, pIndex) => {
                // Determine which characters are in this scene
                const charactersInScene = story.characters.filter(character => 
                    paragraph.toLowerCase().includes(character.name.toLowerCase())
                );
                
                scenes.push({
                    chapter: index + 1,
                    scene: pIndex + 1,
                    content: paragraph,
                    background: this.getRealisticSceneBackground(story.genre),
                    characters: charactersInScene.map(character => ({
                        name: character.name,
                        image: this.getRealisticCharacterImage(character, story.genre),
                        expression: this.characterExpressions[Math.floor(Math.random() * this.characterExpressions.length)]
                    }))
                });
            });
        });
        
        return scenes;
    }
}

// Initialize the realistic character generator
const realisticCharacterGenerator = new RealisticCharacterGenerator();