/**
 * AI Story Generator
 * This script handles the story generation logic
 */

class StoryGenerator {
    constructor() {
        // Character name options by language - ensure uniqueness
        this.nameOptionsByLanguage = {
            english: [
                'Aria', 'Zephyr', 'Thorne', 'Luna', 'Orion', 'Nova', 'Caspian', 'Seraphina', 'Draven', 'Lyra',
                'Kairos', 'Elara', 'Riven', 'Isolde', 'Cyrus', 'Vesper', 'Alaric', 'Elowen', 'Ronan', 'Freya',
                'Atlas', 'Ember', 'Sage', 'Indigo', 'Phoenix', 'Celeste', 'Griffin', 'Octavia', 'Dante', 'Willow',
                'Jasper', 'Astrid', 'Cade', 'Elora', 'Finn', 'Gaia', 'Huxley', 'Iris', 'Jericho', 'Kira',
                'Lysander', 'Maeve', 'Nyx', 'Orion', 'Phoebe', 'Quill', 'Rhys', 'Sylvia', 'Torin', 'Vega'
            ],
            spanish: [
                'Mateo', 'Sofía', 'Alejandro', 'Valentina', 'Diego', 'Isabella', 'Santiago', 'Camila', 'Sebastián', 'Valeria',
                'Emilio', 'Lucía', 'Nicolás', 'Martina', 'Leonardo', 'Regina', 'Emiliano', 'Ximena', 'Adrián', 'Renata',
                'Daniel', 'Paula', 'Tomás', 'Sara', 'Javier', 'Ana', 'Samuel', 'Elena', 'Gabriel', 'Mariana',
                'Carlos', 'Daniela', 'Rafael', 'Gabriela', 'Pablo', 'Fernanda', 'Miguel', 'Natalia', 'Fernando', 'Laura'
            ],
            french: [
                'Lucas', 'Emma', 'Gabriel', 'Léa', 'Louis', 'Chloé', 'Raphaël', 'Manon', 'Jules', 'Jade',
                'Adam', 'Louise', 'Hugo', 'Lina', 'Arthur', 'Rose', 'Nathan', 'Alice', 'Liam', 'Inès',
                'Ethan', 'Camille', 'Maël', 'Zoé', 'Léo', 'Juliette', 'Paul', 'Lucie', 'Sacha', 'Sarah',
                'Victor', 'Charlotte', 'Antoine', 'Jeanne', 'Nolan', 'Léonie', 'Gabin', 'Eva', 'Théo', 'Ambre'
            ],
            german: [
                'Maximilian', 'Sophie', 'Alexander', 'Marie', 'Paul', 'Maria', 'Leon', 'Emma', 'Felix', 'Emilia',
                'Lukas', 'Hannah', 'Luca', 'Mia', 'Jonas', 'Anna', 'Elias', 'Lea', 'Noah', 'Lina',
                'Ben', 'Laura', 'Finn', 'Leonie', 'Luis', 'Lena', 'Henry', 'Nele', 'Emil', 'Julia',
                'Anton', 'Johanna', 'Jakob', 'Charlotte', 'Oskar', 'Amelie', 'David', 'Katharina', 'Julian', 'Helena'
            ],
            italian: [
                'Francesco', 'Sofia', 'Alessandro', 'Giulia', 'Lorenzo', 'Aurora', 'Leonardo', 'Alice', 'Mattia', 'Ginevra',
                'Andrea', 'Emma', 'Gabriele', 'Giorgia', 'Matteo', 'Greta', 'Tommaso', 'Martina', 'Riccardo', 'Beatrice',
                'Edoardo', 'Vittoria', 'Giuseppe', 'Chiara', 'Antonio', 'Ludovica', 'Federico', 'Matilde', 'Diego', 'Bianca',
                'Marco', 'Nicole', 'Giovanni', 'Camilla', 'Nicolo', 'Sara', 'Davide', 'Arianna', 'Pietro', 'Rebecca'
            ],
            portuguese: [
                'Miguel', 'Maria', 'Davi', 'Sofia', 'Arthur', 'Alice', 'Pedro', 'Julia', 'Gabriel', 'Isabella',
                'Bernardo', 'Manuela', 'Lucas', 'Laura', 'Matheus', 'Valentina', 'Rafael', 'Giovanna', 'Heitor', 'Beatriz',
                'Enzo', 'Helena', 'Guilherme', 'Lara', 'Nicolas', 'Mariana', 'Lorenzo', 'Lívia', 'Gustavo', 'Ana',
                'Felipe', 'Lorena', 'Samuel', 'Melissa', 'João', 'Cecília', 'Daniel', 'Clara', 'Vitor', 'Luiza'
            ],
            russian: [
                'Alexander', 'Anastasia', 'Mikhail', 'Maria', 'Dmitry', 'Sofia', 'Ivan', 'Anna', 'Maxim', 'Daria',
                'Kirill', 'Polina', 'Andrei', 'Elizaveta', 'Nikita', 'Ekaterina', 'Artem', 'Veronika', 'Egor', 'Alisa',
                'Ilya', 'Ksenia', 'Daniil', 'Viktoria', 'Roman', 'Olga', 'Vladimir', 'Natalia', 'Sergei', 'Yulia',
                'Pavel', 'Tatiana', 'Nikolai', 'Irina', 'Alexei', 'Svetlana', 'Yuri', 'Elena', 'Oleg', 'Galina'
            ],
            japanese: [
                'Haruto', 'Aoi', 'Yuto', 'Hina', 'Sota', 'Yui', 'Haruki', 'Akari', 'Yuma', 'Miyu',
                'Kota', 'Yuna', 'Sora', 'Hana', 'Minato', 'Riko', 'Kaito', 'Ichika', 'Yamato', 'Saki',
                'Ren', 'Mio', 'Takumi', 'Nanami', 'Hayato', 'Rin', 'Tatsuki', 'Yuka', 'Daiki', 'Ayaka',
                'Koki', 'Hinata', 'Kazuki', 'Nana', 'Riku', 'Momoka', 'Shota', 'Yuka', 'Ryota', 'Misaki'
            ],
            chinese: [
                'Wei', 'Jing', 'Ming', 'Fang', 'Hao', 'Mei', 'Jian', 'Xia', 'Lei', 'Ying',
                'Tao', 'Hui', 'Cheng', 'Na', 'Jun', 'Yan', 'Yi', 'Juan', 'Bo', 'Xue',
                'Peng', 'Qian', 'Gang', 'Li', 'Feng', 'Hong', 'Yang', 'Zhen', 'Yong', 'Hua',
                'Bin', 'Yu', 'Tian', 'Ling', 'Xiong', 'Xin', 'Jie', 'Min', 'Dong', 'Lan'
            ],
            hindi: [
                'Aarav', 'Aanya', 'Vihaan', 'Diya', 'Arjun', 'Saanvi', 'Reyansh', 'Ananya', 'Atharv', 'Pari',
                'Vivaan', 'Aditi', 'Aditya', 'Myra', 'Ishaan', 'Aadhya', 'Shaurya', 'Avni', 'Dhruv', 'Anvi',
                'Kabir', 'Kiara', 'Yuvraj', 'Navya', 'Arnav', 'Amaira', 'Ayaan', 'Riya', 'Rudra', 'Ira',
                'Parth', 'Meera', 'Advait', 'Aisha', 'Krish', 'Sara', 'Pranav', 'Mira', 'Vedant', 'Prisha'
            ]
        };
        
        // Default to English names
        this.nameOptions = this.nameOptionsByLanguage.english;
        
        // Character types with traits and roles
        this.characterTypes = [
            { 
                type: 'hero', 
                traits: ['brave', 'compassionate', 'determined', 'resourceful', 'idealistic', 'honorable', 'selfless'],
                roles: ['protagonist', 'leader', 'chosen one', 'reluctant hero', 'warrior', 'champion', 'savior']
            },
            { 
                type: 'mentor', 
                traits: ['wise', 'patient', 'knowledgeable', 'mysterious', 'eccentric', 'perceptive', 'experienced'],
                roles: ['guide', 'teacher', 'sage', 'advisor', 'guardian', 'elder', 'mystic']
            },
            { 
                type: 'ally', 
                traits: ['loyal', 'funny', 'skilled', 'rebellious', 'optimistic', 'protective', 'resourceful'],
                roles: ['sidekick', 'best friend', 'partner', 'supporter', 'confidant', 'protector', 'specialist']
            },
            { 
                type: 'villain', 
                traits: ['cunning', 'powerful', 'deceptive', 'charismatic', 'ruthless', 'ambitious', 'vengeful'],
                roles: ['antagonist', 'nemesis', 'mastermind', 'tyrant', 'corrupted leader', 'usurper', 'shadow']
            },
            { 
                type: 'neutral', 
                traits: ['ambiguous', 'self-serving', 'unpredictable', 'complex', 'evolving', 'pragmatic', 'mysterious'],
                roles: ['mercenary', 'trickster', 'anti-hero', 'wild card', 'opportunist', 'rogue', 'outcast']
            }
        ];
        
        // Genre settings
        this.genreSettings = {
            fantasy: {
                setting: 'a mystical kingdom',
                style: 'with dragons and magic',
                themes: ['ancient prophecy', 'forbidden magic', 'royal lineage', 'epic quest', 'hidden realm', 'magical awakening', 'elemental balance'],
                elements: ['dragon', 'magic sword', 'ancient tome', 'mystical portal', 'enchanted forest', 'crystal shard', 'runic inscription']
            },
            scifi: {
                setting: 'a futuristic space colony',
                style: 'with advanced technology and aliens',
                themes: ['AI uprising', 'interstellar war', 'genetic engineering', 'time paradox', 'first contact', 'dystopian future', 'space exploration'],
                elements: ['spaceship', 'alien artifact', 'neural implant', 'quantum computer', 'wormhole', 'holographic interface', 'cryogenic chamber']
            },
            mystery: {
                setting: 'a fog-covered city',
                style: 'full of secrets and intrigue',
                themes: ['missing heir', 'corrupt officials', 'hidden treasure', 'unsolved murder', 'conspiracy', 'forgotten crime', 'secret society'],
                elements: ['cryptic note', 'hidden passage', 'mysterious stranger', 'forgotten evidence', 'secret society', 'antique key', 'coded message']
            },
            romance: {
                setting: 'a picturesque countryside',
                style: 'where love blossoms unexpectedly',
                themes: ['forbidden love', 'second chances', 'class differences', 'arranged marriage', 'love triangle', 'soulmates', 'redemption through love'],
                elements: ['love letter', 'chance meeting', 'family heirloom', 'garden gazebo', 'moonlit dance', 'shared secret', 'meaningful gift']
            },
            horror: {
                setting: 'a haunted mansion',
                style: 'where nightmares come alive',
                themes: ['ancient curse', 'demonic possession', 'survival horror', 'psychological terror', 'supernatural entity', 'inherited evil', 'dark ritual'],
                elements: ['cursed artifact', 'shadowy figure', 'blood stain', 'eerie whisper', 'abandoned room', 'mysterious disappearance', 'forgotten grave']
            },
            adventure: {
                setting: 'an uncharted wilderness',
                style: 'full of danger and excitement',
                themes: ['lost civilization', 'treasure hunt', 'survival challenge', 'coming of age', 'redemption journey', 'ancient mystery', 'wilderness trial'],
                elements: ['ancient map', 'hidden temple', 'natural obstacle', 'tribal village', 'exotic animal', 'weathered compass', 'mysterious landmark']
            },
            historical: {
                setting: 'a bygone era',
                style: 'rich with historical detail',
                themes: ['war and peace', 'social change', 'forbidden knowledge', 'political intrigue', 'cultural revolution', 'changing times', 'forgotten history'],
                elements: ['historical document', 'period artifact', 'famous landmark', 'political figure', 'cultural tradition', 'ancient weapon', 'royal seal']
            }
        };
        
        // Chapter title templates
        this.chapterTitles = {
            beginning: ['The Beginning', 'Origins', 'First Steps', 'The Awakening', 'A New Dawn', 'Genesis', 'The Catalyst'],
            middle: ['The Journey', 'Challenges Arise', 'Unexpected Allies', 'Into the Unknown', 'Revelations', 'Crossroads', 'Trials and Tribulations'],
            climax: ['The Confrontation', 'Moment of Truth', 'The Final Test', 'Darkest Hour', 'Point of No Return', 'Ultimate Challenge', 'The Reckoning'],
            resolution: ['The Resolution', 'Aftermath', 'New Horizons', 'Transformation', 'The Return', 'Reconciliation', 'A New Beginning'],
            epilogue: ['Epilogue', 'What Remains', 'Seeds of the Future', 'Legacy', 'Full Circle', 'The Road Ahead', 'Echoes of the Past']
        };
    }
    
    /**
     * Generate a random integer between min and max (inclusive)
     */
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    /**
     * Get a random item from an array
     */
    randomItem(array) {
        return array[this.randomInt(0, array.length - 1)];
    }
    
    /**
     * Generate a unique set of characters for the story
     */
    generateCharacters(prompt, count) {
        // Ensure count is a number and within reasonable limits
        const characterCount = Math.min(Math.max(parseInt(count) || 4, 2), 8);
        
        // Ensure unique names
        const usedNames = new Set();
        
        return Array.from({ length: characterCount }, (_, i) => {
            // Select character type
            const charType = this.characterTypes[i % this.characterTypes.length];
            
            // Generate unique name
            let randomName;
            do {
                randomName = this.randomItem(this.nameOptions);
            } while (usedNames.has(randomName));
            
            usedNames.add(randomName);
            
            // Select random trait and role
            const randomTrait = this.randomItem(charType.traits);
            const randomRole = this.randomItem(charType.roles);
            
            // Generate backstory based on prompt and character type
            let backstory;
            switch (charType.type) {
                case 'hero':
                    backstory = `${randomName} became involved with ${prompt} after a personal tragedy led them to seek answers. Their ${randomTrait} nature drives them forward despite the dangers.`;
                    break;
                case 'mentor':
                    backstory = `${randomName} has studied ${prompt} for decades, gathering ${randomTrait} insights that few others possess. They see potential in the hero that reminds them of themselves in their youth.`;
                    break;
                case 'ally':
                    backstory = `${randomName} joined the quest related to ${prompt} for their own reasons, but their ${randomTrait} personality has made them an invaluable companion.`;
                    break;
                case 'villain':
                    backstory = `${randomName} seeks to control ${prompt} for their own ${randomTrait} ambitions, regardless of the cost to others.`;
                    break;
                case 'neutral':
                    backstory = `${randomName}'s interest in ${prompt} is complicated. Their ${randomTrait} approach means their allegiance could shift depending on how events unfold.`;
                    break;
                default:
                    backstory = `${randomName} has a mysterious connection to ${prompt} that even they don't fully understand.`;
            }
            
            // Create character description
            const description = `A ${randomTrait} ${randomRole} whose path has become intertwined with ${prompt}.`;
            
            // Return character object
            return {
                id: `char-${i}`,
                name: randomName,
                type: charType.type,
                role: randomRole,
                trait: randomTrait,
                description: description,
                backstory: backstory,
                customized: false
            };
        });
    }
    
    /**
     * Generate a story chapter
     */
    generateChapter(prompt, characters, genreInfo, theme, chapterType) {
        // Select a title based on chapter type using language-specific templates if available
        const titleOptions = this.currentLangTemplates?.chapterTitles?.[chapterType] || 
                            this.languageTemplates.english.chapterTitles[chapterType] || 
                            this.languageTemplates.english.chapterTitles.middle;
        const title = this.randomItem(titleOptions);
        
        // Determine paragraph count based on chapter type
        let paragraphCount;
        switch (chapterType) {
            case 'beginning':
                paragraphCount = 3;
                break;
            case 'epilogue':
                paragraphCount = 2;
                break;
            case 'climax':
                paragraphCount = 5;
                break;
            default:
                paragraphCount = 4;
        }
        
        // Generate paragraphs
        let content = '';
        
        for (let i = 0; i < paragraphCount; i++) {
            // Select a random character for this paragraph
            const character = this.randomItem(characters);
            
            // Generate paragraph based on chapter type
            let paragraph;
            
            switch (chapterType) {
                case 'beginning':
                    if (i === 0) {
                        // Introduction paragraph using language template
                        const template = this.currentLangTemplates?.beginningIntro || 
                            "In {setting} {style}, the story of {prompt} began to unfold. {character}, a {trait} {role}, found themselves drawn into events beyond their understanding. The air was thick with anticipation, as if the world itself knew that something momentous was about to occur.";
                        
                        // Translate key terms for better language integration
                        const translatedSetting = this.translateTerm(genreInfo.setting, this.storyLanguage) || genreInfo.setting;
                        const translatedStyle = this.translateTerm(genreInfo.style, this.storyLanguage) || genreInfo.style;
                        const translatedPrompt = this.translatePrompt(prompt, this.storyLanguage);
                        const translatedTrait = this.translateTerm(character.trait, this.storyLanguage) || character.trait;
                        const translatedRole = this.translateTerm(character.role, this.storyLanguage) || character.role;
                        
                        paragraph = template
                            .replace('{setting}', translatedSetting)
                            .replace('{style}', translatedStyle)
                            .replace('{prompt}', translatedPrompt)
                            .replace('{character}', character.name)
                            .replace('{trait}', translatedTrait)
                            .replace('{role}', translatedRole);
                    } else {
                        // Early development using language template
                        const template = this.currentLangTemplates?.beginningDev || 
                            "{character} had always suspected that {prompt} would change everything. Their {trait} nature made them particularly sensitive to the signs that others missed. \"This is just the beginning,\" they whispered, eyes fixed on the horizon where {element} had been sighted.";
                        
                        paragraph = template
                            .replace('{character}', character.name)
                            .replace('{prompt}', prompt)
                            .replace('{trait}', character.trait)
                            .replace('{element}', this.randomItem(genreInfo.elements));
                    }
                    break;
                    
                case 'middle':
                    // Development and challenges using language template
                    if (i % 2 === 0) {
                        const template = this.currentLangTemplates?.middleConflict || 
                            "The situation grew more complex as {character} discovered the truth about {prompt}. Their {trait} instincts told them that {antagonist} was somehow involved with the mysterious {element}. \"We need to prepare,\" {character} warned the others.";
                        
                        // Find an antagonist character or use another character
                        const antagonist = characters.find(c => c.type === 'antagonist') || 
                                          characters.find(c => c.name !== character.name) || 
                                          {name: "the unknown adversary"};
                        
                        paragraph = template
                            .replace(/{character}/g, character.name)
                            .replace('{prompt}', prompt)
                            .replace('{trait}', character.trait)
                            .replace('{antagonist}', antagonist.name)
                            .replace('{element}', this.randomItem(genreInfo.elements));
                    } else {
                        const template = this.currentLangTemplates?.middleAlliance || 
                            "It was clear that {character} couldn't face this challenge alone. They sought out {ally}, whose {allyTrait} abilities would prove invaluable. \"Together we might stand a chance,\" {character} said, extending a hand in alliance.";
                        
                        // Find an ally character
                        const ally = characters.find(c => c.type === 'ally' && c.name !== character.name) || 
                                    characters.find(c => c.name !== character.name) || 
                                    {name: "a newfound ally", trait: "unexpected"};
                        
                        paragraph = template
                            .replace(/{character}/g, character.name)
                            .replace('{ally}', ally.name)
                            .replace('{allyTrait}', ally.trait);
                    }
                    break;
                    
                case 'climax':
                    // Confrontation and highest tension using language template
                    if (i % 2 === 0) {
                        const template = this.currentLangTemplates?.climaxConfrontation || 
                            "The moment of truth arrived as {character} confronted {antagonist} amidst {setting}. The air crackled with tension as {element} pulsed with energy. \"{antagonist} must be stopped,\" {character} declared, their {trait} nature giving them courage.";
                        
                        // Find an antagonist character
                        const antagonist = characters.find(c => c.type === 'antagonist') || 
                                          characters.find(c => c.name !== character.name) || 
                                          {name: "the forces of opposition"};
                        
                        paragraph = template
                            .replace(/{character}/g, character.name)
                            .replace(/{antagonist}/g, antagonist.name)
                            .replace('{setting}', genreInfo.setting)
                            .replace('{element}', this.randomItem(genreInfo.elements))
                            .replace('{trait}', character.trait);
                    } else {
                        const template = this.currentLangTemplates?.climaxBattle || 
                            "The conflict reached its peak as {character} and {ally} faced the full power of {antagonist}. The {element} surged with energy as {character}'s {trait} determination was put to the ultimate test.";
                        
                        // Find ally and antagonist characters
                        const ally = characters.find(c => c.type === 'ally' && c.name !== character.name) || 
                                    characters.find(c => c.name !== character.name) || 
                                    {name: "their allies"};
                        
                        const antagonist = characters.find(c => c.type === 'antagonist') || 
                                          characters.find(c => c.name !== character.name && c.name !== ally.name) || 
                                          {name: "the enemy"};
                        
                        paragraph = template
                            .replace(/{character}/g, character.name)
                            .replace('{ally}', ally.name)
                            .replace('{antagonist}', antagonist.name)
                            .replace('{element}', this.randomItem(genreInfo.elements))
                            .replace('{trait}', character.trait);
                    }
                    break;
                    
                case 'resolution':
                    // Aftermath and consequences using language template
                    if (i % 2 === 0) {
                        const template = this.currentLangTemplates?.resolutionVictory || 
                            "In the end, it was {character}'s {trait} spirit that turned the tide. {antagonist} had underestimated their resolve. As {element} settled into a new equilibrium, {character} knew that {prompt} had changed them forever.";
                        
                        // Find an antagonist character
                        const antagonist = characters.find(c => c.type === 'antagonist') || 
                                          characters.find(c => c.name !== character.name) || 
                                          {name: "the opposition"};
                        
                        paragraph = template
                            .replace(/{character}/g, character.name)
                            .replace('{antagonist}', antagonist.name)
                            .replace('{element}', this.randomItem(genreInfo.elements))
                            .replace('{trait}', character.trait)
                            .replace('{prompt}', prompt);
                    } else {
                        const template = this.currentLangTemplates?.resolutionAftermath || 
                            "As {setting} returned to normal, {character} reflected on their journey. They had discovered strengths they never knew they possessed. The {element} would remain as a reminder of what they had overcome.";
                        
                        paragraph = template
                            .replace('{setting}', genreInfo.setting)
                            .replace('{character}', character.name)
                            .replace('{element}', this.randomItem(genreInfo.elements));
                    }
                    break;
                    
                case 'epilogue':
                    // Final reflections using language template
                    if (i === 0) {
                        const template = this.currentLangTemplates?.epilogueReflection || 
                            "Years passed, and the events surrounding {prompt} became legend. {character} had found peace, their {trait} nature now tempered with wisdom. Sometimes, they would look to the horizon, remembering the day when {element} first appeared.";
                        
                        paragraph = template
                            .replace('{prompt}', prompt)
                            .replace('{character}', character.name)
                            .replace('{trait}', character.trait)
                            .replace('{element}', this.randomItem(genreInfo.elements));
                    } else {
                        const template = this.currentLangTemplates?.epilogueFuture || 
                            "Though {antagonist} was gone, {character} remained vigilant. Their experience with {prompt} had taught them that the world was full of wonders and dangers alike. With {ally} by their side, they were ready for whatever might come next.";
                        
                        // Find ally and antagonist characters
                        const ally = characters.find(c => c.type === 'ally' && c.name !== character.name) || 
                                    characters.find(c => c.name !== character.name) || 
                                    {name: "their companions"};
                        
                        const antagonist = characters.find(c => c.type === 'antagonist') || 
                                          characters.find(c => c.name !== character.name && c.name !== ally.name) || 
                                          {name: "the threat"};
                        
                        paragraph = template
                            .replace('{antagonist}', antagonist.name)
                            .replace('{character}', character.name)
                            .replace('{prompt}', prompt)
                            .replace('{ally}', ally.name);
                    }
                    break;
                    
                default:
                    // Generic paragraph using a simple template
                    const defaultTemplate = this.currentLangTemplates?.defaultParagraph || 
                        "The adventure continued as {character} pursued the truth about {prompt}. Their {trait} qualities were exactly what this situation needed. The mystery of {theme} deepened with each discovery they made.";
                    
                    paragraph = defaultTemplate
                        .replace('{character}', character.name)
                        .replace('{prompt}', prompt)
                        .replace('{trait}', character.trait)
                        .replace('{theme}', theme);
            }
            
            content += paragraph + '\n\n';
        }
        
        return {
            title: title,
            content: content.trim()
        };
    }
    
    /**
     * Set the language for story generation
     */
    setLanguage(language) {
        console.log(`Setting language to: ${language}`);
        
        // Set name options based on language
        this.nameOptions = this.nameOptionsByLanguage[language] || this.nameOptionsByLanguage.english;
        this.currentLanguage = language || 'english';
        
        // Set language-specific templates and phrases
        this.initializeLanguageTemplates(language);
        
        // Log the current language templates to verify they're set correctly
        console.log(`Language templates initialized for: ${this.currentLanguage}`);
        
        return this;
    }
    
    /**
     * Initialize language-specific templates for story generation
     */
    initializeLanguageTemplates(language) {
        // Default to English if language not supported
        const lang = this.languageTemplates[language] ? language : 'english';
        this.currentLangTemplates = this.languageTemplates[lang];
        
        // For debugging - log the templates being used
        console.log(`Using language templates for: ${lang}`);
        
        // Make sure templates are properly initialized
        if (!this.currentLangTemplates) {
            console.error(`Failed to initialize language templates for ${language}, falling back to English`);
            this.currentLangTemplates = this.languageTemplates.english;
        }
        
        // Initialize translation dictionary for common terms
        this.initializeTranslationDictionary(language);
    }
    
    /**
     * Initialize translation dictionary for common terms
     */
    initializeTranslationDictionary(language) {
        // Common terms used in story generation
        this.translationDict = {
            english: {
                'magic': 'magic',
                'forest': 'forest',
                'adventure': 'adventure',
                'mystery': 'mystery',
                'journey': 'journey',
                'hero': 'hero',
                'villain': 'villain',
                'quest': 'quest',
                'ancient': 'ancient',
                'power': 'power',
                'secret': 'secret',
                'kingdom': 'kingdom',
                'wizard': 'wizard',
                'warrior': 'warrior',
                'princess': 'princess',
                'dragon': 'dragon',
                'sword': 'sword',
                'spell': 'spell',
                'treasure': 'treasure',
                'battle': 'battle'
            },
            spanish: {
                'magic': 'magia',
                'forest': 'bosque',
                'adventure': 'aventura',
                'mystery': 'misterio',
                'journey': 'viaje',
                'hero': 'héroe',
                'villain': 'villano',
                'quest': 'búsqueda',
                'ancient': 'antiguo',
                'power': 'poder',
                'secret': 'secreto',
                'kingdom': 'reino',
                'wizard': 'mago',
                'warrior': 'guerrero',
                'princess': 'princesa',
                'dragon': 'dragón',
                'sword': 'espada',
                'spell': 'hechizo',
                'treasure': 'tesoro',
                'battle': 'batalla'
            },
            french: {
                'magic': 'magie',
                'forest': 'forêt',
                'adventure': 'aventure',
                'mystery': 'mystère',
                'journey': 'voyage',
                'hero': 'héros',
                'villain': 'méchant',
                'quest': 'quête',
                'ancient': 'ancien',
                'power': 'pouvoir',
                'secret': 'secret',
                'kingdom': 'royaume',
                'wizard': 'sorcier',
                'warrior': 'guerrier',
                'princess': 'princesse',
                'dragon': 'dragon',
                'sword': 'épée',
                'spell': 'sortilège',
                'treasure': 'trésor',
                'battle': 'bataille'
            },
            german: {
                'magic': 'Magie',
                'forest': 'Wald',
                'adventure': 'Abenteuer',
                'mystery': 'Geheimnis',
                'journey': 'Reise',
                'hero': 'Held',
                'villain': 'Bösewicht',
                'quest': 'Suche',
                'ancient': 'uralt',
                'power': 'Macht',
                'secret': 'Geheimnis',
                'kingdom': 'Königreich',
                'wizard': 'Zauberer',
                'warrior': 'Krieger',
                'princess': 'Prinzessin',
                'dragon': 'Drache',
                'sword': 'Schwert',
                'spell': 'Zauberspruch',
                'treasure': 'Schatz',
                'battle': 'Kampf'
            },
            // Add other languages as needed
        };
        
        // Default to English if language not supported
        this.currentTranslationDict = this.translationDict[language] || this.translationDict.english;
    }
    
    /**
     * Translate a term using the translation dictionary
     */
    translateTerm(term, language) {
        if (!term) return '';
        const dict = this.translationDict[language] || this.translationDict.english;
        return dict[term.toLowerCase()] || term;
    }
    
    /**
     * Translate a prompt by breaking it into words and translating each one
     */
    translatePrompt(prompt, language) {
        if (!prompt) return '';
        
        // If language is English, return the original prompt
        if (language === 'english') return prompt;
        
        // Split the prompt into words
        const words = prompt.split(/\s+/);
        
        // Translate each word if it exists in the dictionary
        const translatedWords = words.map(word => {
            // Remove any punctuation for lookup
            const cleanWord = word.toLowerCase().replace(/[^\w\s]/g, '');
            const translated = this.translateTerm(cleanWord, language);
            
            // If the original word had punctuation, preserve it
            if (cleanWord !== word.toLowerCase()) {
                return word.replace(new RegExp(cleanWord, 'i'), translated);
            }
            return translated;
        });
        
        // Join the translated words back together
        return translatedWords.join(' ');
    }
    
    /**
     * Language-specific templates for story generation
     */
    get languageTemplates() {
        return {
            english: {
                beginningIntro: "In {setting} {style}, the story of {prompt} began to unfold. {character}, a {trait} {role}, found themselves drawn into events beyond their understanding. The air was thick with anticipation, as if the world itself knew that something momentous was about to occur.",
                beginningDev: "{character} had always suspected that {prompt} would change everything. Their {trait} nature made them particularly sensitive to the signs that others missed. \"This is just the beginning,\" they whispered, eyes fixed on the horizon where {element} had been sighted.",
                middleConflict: "The situation grew more complex as {character} discovered the truth about {prompt}. Their {trait} instincts told them that {antagonist} was somehow involved with the mysterious {element}. \"We need to prepare,\" {character} warned the others.",
                middleAlliance: "It was clear that {character} couldn't face this challenge alone. They sought out {ally}, whose {allyTrait} abilities would prove invaluable. \"Together we might stand a chance,\" {character} said, extending a hand in alliance.",
                climaxConfrontation: "The moment of truth arrived as {character} confronted {antagonist} amidst {setting}. The air crackled with tension as {element} pulsed with energy. \"{antagonist} must be stopped,\" {character} declared, their {trait} nature giving them courage.",
                climaxBattle: "The conflict reached its peak as {character} and {ally} faced the full power of {antagonist}. The {element} surged with energy as {character}'s {trait} determination was put to the ultimate test.",
                resolutionVictory: "In the end, it was {character}'s {trait} spirit that turned the tide. {antagonist} had underestimated their resolve. As {element} settled into a new equilibrium, {character} knew that {prompt} had changed them forever.",
                resolutionAftermath: "As {setting} returned to normal, {character} reflected on their journey. They had discovered strengths they never knew they possessed. The {element} would remain as a reminder of what they had overcome.",
                epilogueReflection: "Years passed, and the events surrounding {prompt} became legend. {character} had found peace, their {trait} nature now tempered with wisdom. Sometimes, they would look to the horizon, remembering the day when {element} first appeared.",
                epilogueFuture: "Though {antagonist} was gone, {character} remained vigilant. Their experience with {prompt} had taught them that the world was full of wonders and dangers alike. With {ally} by their side, they were ready for whatever might come next.",
                titleFormats: [
                    "The {theme} of {prompt}",
                    "{prompt}: A Tale of {theme}",
                    "When {prompt} Changed Everything",
                    "The Secret of {prompt}",
                    "{prompt} in {setting}"
                ],
                summaryFormat: "In a world of {setting}, {mainCharacter} discovers the truth about {prompt}. With their {trait} nature, they must confront {antagonist} and the mysterious {element} before it's too late. A tale of {theme} and courage.",
                chapterTitles: {
                    beginning: ["The Beginning", "First Steps", "Awakening", "The Call"],
                    middle: ["Challenges Arise", "Growing Darkness", "Unexpected Allies", "The Journey"],
                    climax: ["Confrontation", "The Final Stand", "Moment of Truth", "Facing Destiny"],
                    resolution: ["Aftermath", "A New Dawn", "Reflections", "The Return"],
                    epilogue: ["Years Later", "New Beginnings", "Legacy", "The Future Awaits"]
                }
            },
            spanish: {
                beginningIntro: "En {setting} {style}, la historia de {prompt} comenzó a desarrollarse. {character}, un {role} {trait}, se encontró atraído por eventos más allá de su comprensión. El aire estaba cargado de anticipación, como si el mundo mismo supiera que algo trascendental estaba a punto de ocurrir.",
                beginningDev: "{character} siempre había sospechado que {prompt} lo cambiaría todo. Su naturaleza {trait} lo hacía particularmente sensible a las señales que otros pasaban por alto. \"Esto es solo el comienzo\", susurró, con la mirada fija en el horizonte donde {element} había sido avistado.",
                middleConflict: "La situación se volvió más compleja cuando {character} descubrió la verdad sobre {prompt}. Sus instintos {trait} le dijeron que {antagonist} estaba de alguna manera involucrado con el misterioso {element}. \"Necesitamos prepararnos\", advirtió {character} a los demás.",
                middleAlliance: "Estaba claro que {character} no podía enfrentar este desafío solo. Buscó a {ally}, cuyas habilidades {allyTrait} serían invaluables. \"Juntos podríamos tener una oportunidad\", dijo {character}, extendiendo una mano en alianza.",
                climaxConfrontation: "El momento de la verdad llegó cuando {character} confrontó a {antagonist} en medio de {setting}. El aire crepitaba con tensión mientras {element} pulsaba con energía. \"{antagonist} debe ser detenido\", declaró {character}, su naturaleza {trait} dándole coraje.",
                climaxBattle: "El conflicto alcanzó su punto máximo cuando {character} y {ally} enfrentaron todo el poder de {antagonist}. El {element} surgió con energía mientras la determinación {trait} de {character} era puesta a prueba definitiva.",
                resolutionVictory: "Al final, fue el espíritu {trait} de {character} lo que cambió el rumbo. {antagonist} había subestimado su resolución. Mientras {element} se asentaba en un nuevo equilibrio, {character} sabía que {prompt} lo había cambiado para siempre.",
                resolutionAftermath: "Mientras {setting} volvía a la normalidad, {character} reflexionaba sobre su viaje. Había descubierto fortalezas que nunca supo que poseía. El {element} permanecería como un recordatorio de lo que habían superado.",
                epilogueReflection: "Pasaron los años, y los eventos relacionados con {prompt} se convirtieron en leyenda. {character} había encontrado paz, su naturaleza {trait} ahora templada con sabiduría. A veces, miraba hacia el horizonte, recordando el día en que {element} apareció por primera vez.",
                epilogueFuture: "Aunque {antagonist} se había ido, {character} permaneció vigilante. Su experiencia con {prompt} le había enseñado que el mundo estaba lleno de maravillas y peligros por igual. Con {ally} a su lado, estaban listos para lo que pudiera venir.",
                titleFormats: [
                    "El {theme} de {prompt}",
                    "{prompt}: Un Cuento de {theme}",
                    "Cuando {prompt} Lo Cambió Todo",
                    "El Secreto de {prompt}",
                    "{prompt} en {setting}"
                ],
                summaryFormat: "En un mundo de {setting}, {mainCharacter} descubre la verdad sobre {prompt}. Con su naturaleza {trait}, debe enfrentar a {antagonist} y al misterioso {element} antes de que sea demasiado tarde. Una historia de {theme} y coraje.",
                chapterTitles: {
                    beginning: ["El Comienzo", "Primeros Pasos", "Despertar", "El Llamado"],
                    middle: ["Surgen Desafíos", "Oscuridad Creciente", "Aliados Inesperados", "El Viaje"],
                    climax: ["Confrontación", "La Última Batalla", "Momento de Verdad", "Enfrentando el Destino"],
                    resolution: ["Consecuencias", "Un Nuevo Amanecer", "Reflexiones", "El Regreso"],
                    epilogue: ["Años Después", "Nuevos Comienzos", "Legado", "El Futuro Espera"]
                }
            },
            french: {
                beginningIntro: "Dans {setting} {style}, l'histoire de {prompt} commença à se dévoiler. {character}, un {role} {trait}, s'est retrouvé entraîné dans des événements dépassant sa compréhension. L'air était chargé d'anticipation, comme si le monde lui-même savait que quelque chose d'important allait se produire.",
                beginningDev: "{character} avait toujours soupçonné que {prompt} changerait tout. Sa nature {trait} le rendait particulièrement sensible aux signes que les autres manquaient. \"Ce n'est que le début\", murmura-t-il, les yeux fixés sur l'horizon où {element} avait été aperçu.",
                middleConflict: "La situation devint plus complexe lorsque {character} découvrit la vérité sur {prompt}. Ses instincts {trait} lui disaient que {antagonist} était d'une manière ou d'une autre impliqué avec le mystérieux {element}. \"Nous devons nous préparer\", avertit {character} les autres.",
                middleAlliance: "Il était clair que {character} ne pouvait pas affronter ce défi seul. Il chercha {ally}, dont les capacités {allyTrait} seraient inestimables. \"Ensemble, nous pourrions avoir une chance\", dit {character}, tendant une main en alliance.",
                climaxConfrontation: "Le moment de vérité arriva lorsque {character} confronta {antagonist} au milieu de {setting}. L'air crépitait de tension tandis que {element} pulsait d'énergie. \"{antagonist} doit être arrêté\", déclara {character}, sa nature {trait} lui donnant du courage.",
                climaxBattle: "Le conflit atteignit son apogée lorsque {character} et {ally} affrontèrent toute la puissance de {antagonist}. Le {element} surgit avec énergie tandis que la détermination {trait} de {character} était mise à l'épreuve ultime.",
                resolutionVictory: "À la fin, ce fut l'esprit {trait} de {character} qui changea la donne. {antagonist} avait sous-estimé sa résolution. Alors que {element} s'installait dans un nouvel équilibre, {character} savait que {prompt} l'avait changé pour toujours.",
                resolutionAftermath: "Alors que {setting} revenait à la normale, {character} réfléchissait à son voyage. Il avait découvert des forces qu'il ne savait pas posséder. Le {element} resterait comme un rappel de ce qu'ils avaient surmonté.",
                epilogueReflection: "Les années passèrent, et les événements entourant {prompt} devinrent légende. {character} avait trouvé la paix, sa nature {trait} maintenant tempérée par la sagesse. Parfois, il regardait vers l'horizon, se souvenant du jour où {element} était apparu pour la première fois.",
                epilogueFuture: "Bien que {antagonist} soit parti, {character} resta vigilant. Son expérience avec {prompt} lui avait appris que le monde était plein de merveilles et de dangers. Avec {ally} à ses côtés, ils étaient prêts pour ce qui pourrait venir ensuite.",
                titleFormats: [
                    "Le {theme} de {prompt}",
                    "{prompt}: Un Conte de {theme}",
                    "Quand {prompt} a Tout Changé",
                    "Le Secret de {prompt}",
                    "{prompt} dans {setting}"
                ],
                summaryFormat: "Dans un monde de {setting}, {mainCharacter} découvre la vérité sur {prompt}. Avec sa nature {trait}, il doit affronter {antagonist} et le mystérieux {element} avant qu'il ne soit trop tard. Une histoire de {theme} et de courage.",
                chapterTitles: {
                    beginning: ["Le Commencement", "Premiers Pas", "L'Éveil", "L'Appel"],
                    middle: ["Les Défis Surgissent", "L'Obscurité Grandissante", "Alliés Inattendus", "Le Voyage"],
                    climax: ["Confrontation", "L'Ultime Combat", "Moment de Vérité", "Face au Destin"],
                    resolution: ["Conséquences", "Une Nouvelle Aube", "Réflexions", "Le Retour"],
                    epilogue: ["Des Années Plus Tard", "Nouveaux Débuts", "Héritage", "L'Avenir Attend"]
                }
            },
            german: {
                beginningIntro: "In {setting} {style} begann sich die Geschichte von {prompt} zu entfalten. {character}, ein {trait}er {role}, wurde in Ereignisse hineingezogen, die über sein Verständnis hinausgingen. Die Luft war erfüllt von Erwartung, als ob die Welt selbst wüsste, dass etwas Bedeutendes bevorstand.",
                beginningDev: "{character} hatte immer vermutet, dass {prompt} alles verändern würde. Seine {trait}e Natur machte ihn besonders empfänglich für die Zeichen, die andere übersahen. \"Dies ist erst der Anfang\", flüsterte er, den Blick auf den Horizont gerichtet, wo {element} gesichtet worden war.",
                middleConflict: "Die Situation wurde komplexer, als {character} die Wahrheit über {prompt} entdeckte. Seine {trait}en Instinkte sagten ihm, dass {antagonist} irgendwie mit dem mysteriösen {element} verbunden war. \"Wir müssen uns vorbereiten\", warnte {character} die anderen.",
                middleAlliance: "Es war klar, dass {character} dieser Herausforderung nicht allein begegnen konnte. Er suchte {ally}, dessen {allyTrait}e Fähigkeiten von unschätzbarem Wert sein würden. \"Gemeinsam könnten wir eine Chance haben\", sagte {character} und streckte eine Hand zum Bündnis aus.",
                climaxConfrontation: "Der Moment der Wahrheit kam, als {character} {antagonist} inmitten von {setting} konfrontierte. Die Luft knisterte vor Spannung, während {element} vor Energie pulsierte. \"{antagonist} muss aufgehalten werden\", erklärte {character}, seine {trait}e Natur gab ihm Mut.",
                climaxBattle: "Der Konflikt erreichte seinen Höhepunkt, als {character} und {ally} der vollen Macht von {antagonist} gegenüberstanden. Das {element} wogte vor Energie, während {character}s {trait}e Entschlossenheit auf die ultimative Probe gestellt wurde.",
                resolutionVictory: "Am Ende war es {character}s {trait}er Geist, der das Blatt wendete. {antagonist} hatte seine Entschlossenheit unterschätzt. Als {element} sich in ein neues Gleichgewicht einfügte, wusste {character}, dass {prompt} ihn für immer verändert hatte.",
                resolutionAftermath: "Als {setting} zur Normalität zurückkehrte, reflektierte {character} über seine Reise. Er hatte Stärken entdeckt, von denen er nie wusste, dass er sie besaß. Das {element} würde als Erinnerung an das, was sie überwunden hatten, bleiben.",
                epilogueReflection: "Jahre vergingen, und die Ereignisse um {prompt} wurden zur Legende. {character} hatte Frieden gefunden, seine {trait}e Natur nun mit Weisheit gemäßigt. Manchmal blickte er zum Horizont und erinnerte sich an den Tag, als {element} zum ersten Mal erschien.",
                epilogueFuture: "Obwohl {antagonist} verschwunden war, blieb {character} wachsam. Seine Erfahrung mit {prompt} hatte ihn gelehrt, dass die Welt voller Wunder und Gefahren war. Mit {ally} an seiner Seite waren sie bereit für alles, was kommen mochte.",
                titleFormats: [
                    "Das {theme} von {prompt}",
                    "{prompt}: Eine Geschichte von {theme}",
                    "Als {prompt} Alles Veränderte",
                    "Das Geheimnis von {prompt}",
                    "{prompt} in {setting}"
                ],
                summaryFormat: "In einer Welt von {setting} entdeckt {mainCharacter} die Wahrheit über {prompt}. Mit seiner {trait}en Natur muss er sich {antagonist} und dem mysteriösen {element} stellen, bevor es zu spät ist. Eine Geschichte von {theme} und Mut.",
                chapterTitles: {
                    beginning: ["Der Anfang", "Erste Schritte", "Erwachen", "Der Ruf"],
                    middle: ["Herausforderungen Entstehen", "Wachsende Dunkelheit", "Unerwartete Verbündete", "Die Reise"],
                    climax: ["Konfrontation", "Der Letzte Stand", "Moment der Wahrheit", "Dem Schicksal Entgegen"],
                    resolution: ["Nachwirkungen", "Ein Neuer Morgen", "Reflexionen", "Die Rückkehr"],
                    epilogue: ["Jahre Später", "Neue Anfänge", "Vermächtnis", "Die Zukunft Wartet"]
                }
            },
            // Add templates for other languages similarly
            // For brevity, I'm only implementing a few languages fully
            // The others will fall back to English if not implemented
            italian: {
                titleFormats: [
                    "Il {theme} di {prompt}",
                    "{prompt}: Una Storia di {theme}",
                    "Quando {prompt} Cambiò Tutto",
                    "Il Segreto di {prompt}",
                    "{prompt} in {setting}"
                ],
                summaryFormat: "In un mondo di {setting}, {mainCharacter} scopre la verità su {prompt}. Con la sua natura {trait}, deve affrontare {antagonist} e il misterioso {element} prima che sia troppo tardi. Una storia di {theme} e coraggio."
                // Other templates would be added here
            },
            portuguese: {
                titleFormats: [
                    "O {theme} de {prompt}",
                    "{prompt}: Uma História de {theme}",
                    "Quando {prompt} Mudou Tudo",
                    "O Segredo de {prompt}",
                    "{prompt} em {setting}"
                ],
                summaryFormat: "Em um mundo de {setting}, {mainCharacter} descobre a verdade sobre {prompt}. Com sua natureza {trait}, deve enfrentar {antagonist} e o misterioso {element} antes que seja tarde demais. Uma história de {theme} e coragem."
                // Other templates would be added here
            }
            // Additional languages would be implemented similarly
        };
    }
    
    /**
     * Generate a complete story based on user input
     */
    generateStory(prompt, genre, length, characterCount, language = 'english') {
        return new Promise((resolve, reject) => {
            try {
                // Ensure language is valid
                const validLanguage = ['english', 'spanish', 'french', 'german', 'italian', 
                                      'portuguese', 'russian', 'japanese', 'chinese', 'hindi'].includes(language) 
                                      ? language : 'english';
                
                console.log(`Generating ${length}-word ${genre} story about "${prompt}" with ${characterCount} characters in ${validLanguage}`);
                
                // Validate inputs
                if (!prompt) {
                    throw new Error('Story prompt is required');
                }
                
                // If the language is not English, translate the prompt for better context
                // This is just for internal processing, we'll keep the original prompt for display
                let processPrompt = prompt;
                
                // Set the language BEFORE generating any content
                this.setLanguage(validLanguage);
                console.log(`Language set to: ${validLanguage}`);
                
                // Double-check that language templates are initialized
                if (!this.currentLangTemplates) {
                    console.warn(`Language templates not initialized properly, reinitializing for ${validLanguage}`);
                    this.initializeLanguageTemplates(validLanguage);
                }
                
                // Store the language in the generator for later use
                this.storyLanguage = validLanguage;
                
                // Log the templates being used
                console.log(`Using templates for ${validLanguage}:`, 
                    this.currentLangTemplates?.beginningIntro?.substring(0, 50) + '...',
                    this.currentLangTemplates?.titleFormats?.[0]);
                
                // Set default values if needed
                const storyGenre = genre || 'fantasy';
                const storyLength = parseInt(length) || 1000;
                const charCount = parseInt(characterCount) || 4;
                
                // Get genre settings
                const genreInfo = this.genreSettings[storyGenre] || this.genreSettings.fantasy;
                
                // Select a theme for the story
                const theme = this.randomItem(genreInfo.themes);
                
                // Generate characters
                const characters = this.generateCharacters(prompt, charCount);
                
                // Determine number of chapters based on length
                let chapterCount;
                if (storyLength < 800) {
                    chapterCount = 3;
                } else if (storyLength > 1500) {
                    chapterCount = 7;
                } else {
                    chapterCount = 5;
                }
                
                // Translate key terms for better language integration
                const translatedPrompt = this.translatePrompt(prompt, this.storyLanguage);
                const translatedTheme = this.translateTerm(theme, this.storyLanguage) || theme;
                const translatedSetting = this.translateTerm(genreInfo.setting, this.storyLanguage) || genreInfo.setting;
                
                console.log(`Translated terms: prompt="${translatedPrompt}", theme="${translatedTheme}", setting="${translatedSetting}"`);
                
                // Generate title using language-specific templates
                const titleFormats = this.currentLangTemplates?.titleFormats || [
                    `The ${translatedTheme} of ${translatedPrompt}`,
                    `${translatedPrompt}: A Tale of ${translatedTheme}`,
                    `When ${translatedPrompt} Changed Everything`,
                    `The Secret of ${translatedPrompt}`,
                    `${translatedPrompt} in ${translatedSetting}`
                ];
                
                const titleTemplate = this.randomItem(titleFormats);
                const title = titleTemplate
                    .replace('{theme}', translatedTheme)
                    .replace('{prompt}', translatedPrompt)
                    .replace('{setting}', translatedSetting);
                
                // Generate summary using language-specific template
                const summaryTemplate = this.currentLangTemplates?.summaryFormat || 
                    "In a world of {setting}, {mainCharacter} discovers the truth about {prompt}. With their {trait} nature, they must confront {antagonist} and the mysterious {element} before it's too late. A tale of {theme} and courage.";
                
                const mainCharacter = characters[0];
                const antagonistChar = characters.find(c => c.type === 'antagonist') || characters[1];
                
                // Translate character traits for better language integration
                const translatedTrait = this.translateTerm(mainCharacter.trait, this.storyLanguage) || mainCharacter.trait;
                const translatedElement = this.translateTerm(this.randomItem(genreInfo.elements), this.storyLanguage);
                
                const summary = summaryTemplate
                    .replace('{setting}', translatedSetting)
                    .replace('{mainCharacter}', mainCharacter.name)
                    .replace('{prompt}', translatedPrompt)
                    .replace('{trait}', translatedTrait)
                    .replace('{antagonist}', antagonistChar.name)
                    .replace('{element}', translatedElement)
                    .replace('{theme}', translatedTheme);
                
                // Generate chapters
                const chapters = [];
                
                // Beginning chapter
                chapters.push(this.generateChapter(prompt, characters, genreInfo, theme, 'beginning'));
                
                // Middle chapters
                const middleChaptersCount = chapterCount - 3; // Subtract beginning, climax, and resolution
                for (let i = 0; i < middleChaptersCount; i++) {
                    chapters.push(this.generateChapter(prompt, characters, genreInfo, theme, 'middle'));
                }
                
                // Climax chapter
                chapters.push(this.generateChapter(prompt, characters, genreInfo, theme, 'climax'));
                
                // Resolution chapter
                chapters.push(this.generateChapter(prompt, characters, genreInfo, theme, 'resolution'));
                
                // Epilogue for longer stories
                if (chapterCount >= 5) {
                    chapters.push(this.generateChapter(prompt, characters, genreInfo, theme, 'epilogue'));
                }
                
                // Calculate approximate word count
                const wordCount = chapters.reduce((total, chapter) => {
                    return total + chapter.content.split(/\s+/).length;
                }, summary.split(/\s+/).length);
                
                // Create the complete story object
                const story = {
                    title: title,
                    prompt: prompt,
                    translatedPrompt: translatedPrompt, // Store the translated prompt
                    genre: storyGenre,
                    theme: theme,
                    translatedTheme: translatedTheme, // Store the translated theme
                    summary: summary,
                    characters: characters,
                    chapters: chapters,
                    wordCount: wordCount,
                    rating: 0,
                    language: this.storyLanguage || language, // Store the language
                    createdAt: new Date().toISOString()
                };
                
                // Log the story language for debugging
                console.log(`Story created with language: ${story.language}`);
                console.log(`Story title: ${story.title}`);
                console.log(`Story summary: ${story.summary.substring(0, 100)}...`);
                
                // Simulate API delay
                setTimeout(() => {
                    resolve(story);
                }, 2000);
                
            } catch (error) {
                reject(error);
            }
        });
    }
    
    /**
     * Format a story for display
     */
    formatStoryForDisplay(story) {
        // Set the language for formatting
        if (story.language) {
            console.log(`Formatting story for display in language: ${story.language}`);
            this.setLanguage(story.language);
        }
        
        // Get language-specific chapter label
        const chapterLabel = this.getLanguageText('chapter', story.language) || 'Chapter';
        
        let formattedStory = `<div class="story-title">${story.title}</div>`;
        
        // Add language indicator
        const languageName = this.getLanguageName(story.language);
        if (languageName) {
            formattedStory += `<div class="story-language">${languageName}</div>`;
        }
        
        // Add summary
        formattedStory += `<p class="story-paragraph">${story.summary}</p>`;
        
        // Add chapters
        story.chapters.forEach((chapter, index) => {
            formattedStory += `<div class="chapter-title">${chapterLabel} ${index + 1}: ${chapter.title}</div>`;
            
            // Split content into paragraphs
            const paragraphs = chapter.content.split('\n\n');
            paragraphs.forEach(paragraph => {
                if (paragraph.trim()) {
                    formattedStory += `<p class="story-paragraph">${paragraph}</p>`;
                }
            });
        });
        
        return formattedStory;
    }
    
    /**
     * Get language-specific text for UI elements
     */
    getLanguageText(key, language) {
        const texts = {
            english: { chapter: 'Chapter' },
            spanish: { chapter: 'Capítulo' },
            french: { chapter: 'Chapitre' },
            german: { chapter: 'Kapitel' },
            italian: { chapter: 'Capitolo' },
            tamil: { chapter: 'அத்தியாயம்' },
            telugu: { chapter: 'అధ్యాయం' }
        };
        
        return texts[language]?.[key] || texts.english[key];
    }
    
    /**
     * Get the full language name
     */
    getLanguageName(languageCode) {
        const names = {
            english: 'English',
            spanish: 'Español (Spanish)',
            french: 'Français (French)',
            german: 'Deutsch (German)',
            italian: 'Italiano (Italian)',
            tamil: 'தமிழ் (Tamil)',
            telugu: 'తెలుగు (Telugu)'
        };
        
        return names[languageCode] || 'English';
    }
    
    /**
     * Format characters for display
     */
    formatCharactersForDisplay(characters) {
        return characters.map(character => {
            return `
                <div class="col-md-6 mb-4">
                    <div class="character-card">
                        <button class="character-edit-btn" data-character-id="${character.id}">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <div class="character-name">${character.name}</div>
                        <div class="character-role">${character.role} (${character.type})</div>
                        <div class="character-description">${character.description}</div>
                        <hr>
                        <div class="character-backstory">${character.backstory}</div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    /**
     * Get plain text version of the story
     */
    getPlainTextStory(story) {
        let text = `${story.title}\n\n`;
        text += `${story.summary}\n\n`;
        
        text += 'CHARACTERS\n';
        story.characters.forEach(character => {
            text += `${character.name} - ${character.role} (${character.type})\n`;
            text += `${character.description}\n`;
            text += `${character.backstory}\n\n`;
        });
        
        text += '\n';
        
        story.chapters.forEach((chapter, index) => {
            text += `CHAPTER ${index + 1}: ${chapter.title}\n\n`;
            text += chapter.content + '\n\n';
        });
        
        return text;
    }
    
    /**
     * Get a summary of the story for sharing
     */
    getShareSummary(story) {
        return `"${story.title}" - A ${story.genre} story about ${story.prompt}. ${story.summary.substring(0, 100)}...`;
    }
    
    /**
     * Update a character in the story
     */
    updateCharacter(story, characterId, updates) {
        const updatedStory = { ...story };
        const characterIndex = updatedStory.characters.findIndex(c => c.id === characterId);
        
        if (characterIndex !== -1) {
            updatedStory.characters[characterIndex] = {
                ...updatedStory.characters[characterIndex],
                ...updates,
                customized: true
            };
        }
        
        return updatedStory;
    }
}

// Create a global instance
const storyGenerator = new StoryGenerator();