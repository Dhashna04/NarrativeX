/**
 * Language-specific Story Generator
 * This module generates complete stories in different languages
 */

class LanguageGenerator {
    constructor() {
        // Initialize language-specific story templates
        this.storyTemplates = {
            english: {
                beginning: [
                    "Once upon a time in {setting}, there lived a {character}. {pronoun} was known for {trait}.",
                    "In a {setting} far away, a {character} named {name} was about to embark on an adventure.",
                    "The story begins in {setting}, where {name}, a {character}, lived a quiet life until one day...",
                    "Long ago, in {setting}, there was a {character} called {name}. {pronoun} was {trait} and {trait}."
                ],
                middle: [
                    "{name} discovered {element} which revealed a secret about {prompt}.",
                    "As {name} journeyed through {setting}, {pronoun} encountered {character2} who told {object} about {prompt}.",
                    "The mystery of {prompt} deepened when {name} found {element} hidden in {setting}.",
                    "With determination, {name} sought to understand {prompt}, despite the dangers that lay ahead."
                ],
                climax: [
                    "Finally, {name} confronted {antagonist} in a battle of {theme}.",
                    "In a moment of truth, {name} had to choose between {theme} and {theme}.",
                    "The secret of {prompt} was revealed when {name} and {antagonist} faced each other at {setting}.",
                    "Everything changed when {name} realized that {prompt} was actually connected to {element}."
                ],
                resolution: [
                    "In the end, {name} learned that {theme} was the true power all along.",
                    "After the adventure, {name} returned to {setting}, forever changed by the experience.",
                    "{name} and {character2} discovered that {prompt} had transformed their understanding of {theme}.",
                    "Peace returned to {setting}, though {name} knew that the memory of {prompt} would never fade."
                ]
            },
            spanish: {
                beginning: [
                    "Había una vez en {setting}, vivía un {character}. {pronoun} era conocido por {trait}.",
                    "En un {setting} muy lejano, un {character} llamado {name} estaba a punto de embarcarse en una aventura.",
                    "La historia comienza en {setting}, donde {name}, un {character}, vivía una vida tranquila hasta que un día...",
                    "Hace mucho tiempo, en {setting}, había un {character} llamado {name}. {pronoun} era {trait} y {trait}."
                ],
                middle: [
                    "{name} descubrió {element} que reveló un secreto sobre {prompt}.",
                    "Mientras {name} viajaba por {setting}, {pronoun} se encontró con {character2} quien le contó sobre {prompt}.",
                    "El misterio de {prompt} se profundizó cuando {name} encontró {element} escondido en {setting}.",
                    "Con determinación, {name} buscó entender {prompt}, a pesar de los peligros que le esperaban."
                ],
                climax: [
                    "Finalmente, {name} confrontó a {antagonist} en una batalla de {theme}.",
                    "En un momento de verdad, {name} tuvo que elegir entre {theme} y {theme}.",
                    "El secreto de {prompt} se reveló cuando {name} y {antagonist} se enfrentaron en {setting}.",
                    "Todo cambió cuando {name} se dio cuenta de que {prompt} estaba realmente conectado con {element}."
                ],
                resolution: [
                    "Al final, {name} aprendió que {theme} era el verdadero poder desde el principio.",
                    "Después de la aventura, {name} regresó a {setting}, cambiado para siempre por la experiencia.",
                    "{name} y {character2} descubrieron que {prompt} había transformado su comprensión de {theme}.",
                    "La paz volvió a {setting}, aunque {name} sabía que el recuerdo de {prompt} nunca se desvanecería."
                ]
            },
            french: {
                beginning: [
                    "Il était une fois dans {setting}, vivait un {character}. {pronoun} était connu pour {trait}.",
                    "Dans un {setting} lointain, un {character} nommé {name} était sur le point de se lancer dans une aventure.",
                    "L'histoire commence dans {setting}, où {name}, un {character}, menait une vie tranquille jusqu'au jour où...",
                    "Il y a longtemps, dans {setting}, il y avait un {character} appelé {name}. {pronoun} était {trait} et {trait}."
                ],
                middle: [
                    "{name} a découvert {element} qui a révélé un secret sur {prompt}.",
                    "Alors que {name} voyageait à travers {setting}, {pronoun} a rencontré {character2} qui lui a parlé de {prompt}.",
                    "Le mystère de {prompt} s'est approfondi quand {name} a trouvé {element} caché dans {setting}.",
                    "Avec détermination, {name} a cherché à comprendre {prompt}, malgré les dangers qui l'attendaient."
                ],
                climax: [
                    "Finalement, {name} a confronté {antagonist} dans une bataille de {theme}.",
                    "Dans un moment de vérité, {name} a dû choisir entre {theme} et {theme}.",
                    "Le secret de {prompt} a été révélé quand {name} et {antagonist} se sont affrontés à {setting}.",
                    "Tout a changé quand {name} a réalisé que {prompt} était en fait lié à {element}."
                ],
                resolution: [
                    "À la fin, {name} a appris que {theme} était le vrai pouvoir depuis le début.",
                    "Après l'aventure, {name} est retourné à {setting}, à jamais changé par l'expérience.",
                    "{name} et {character2} ont découvert que {prompt} avait transformé leur compréhension de {theme}.",
                    "La paix est revenue à {setting}, bien que {name} savait que le souvenir de {prompt} ne s'effacerait jamais."
                ]
            },
            german: {
                beginning: [
                    "Es war einmal in {setting}, dort lebte ein {character}. {pronoun} war bekannt für {trait}.",
                    "In einem fernen {setting}, war ein {character} namens {name} dabei, sich auf ein Abenteuer zu begeben.",
                    "Die Geschichte beginnt in {setting}, wo {name}, ein {character}, ein ruhiges Leben führte, bis eines Tages...",
                    "Vor langer Zeit, in {setting}, gab es einen {character} namens {name}. {pronoun} war {trait} und {trait}."
                ],
                middle: [
                    "{name} entdeckte {element}, das ein Geheimnis über {prompt} enthüllte.",
                    "Als {name} durch {setting} reiste, traf {pronoun} auf {character2}, der {object} von {prompt} erzählte.",
                    "Das Geheimnis von {prompt} vertiefte sich, als {name} {element} versteckt in {setting} fand.",
                    "Mit Entschlossenheit versuchte {name}, {prompt} zu verstehen, trotz der Gefahren, die vor {object} lagen."
                ],
                climax: [
                    "Schließlich konfrontierte {name} {antagonist} in einem Kampf um {theme}.",
                    "In einem Moment der Wahrheit musste {name} zwischen {theme} und {theme} wählen.",
                    "Das Geheimnis von {prompt} wurde enthüllt, als {name} und {antagonist} sich in {setting} gegenüberstanden.",
                    "Alles änderte sich, als {name} erkannte, dass {prompt} tatsächlich mit {element} verbunden war."
                ],
                resolution: [
                    "Am Ende lernte {name}, dass {theme} die wahre Kraft war.",
                    "Nach dem Abenteuer kehrte {name} nach {setting} zurück, für immer verändert durch die Erfahrung.",
                    "{name} und {character2} entdeckten, dass {prompt} ihr Verständnis von {theme} verändert hatte.",
                    "Frieden kehrte nach {setting} zurück, obwohl {name} wusste, dass die Erinnerung an {prompt} nie verblassen würde."
                ]
            },
            italian: {
                beginning: [
                    "C'era una volta in {setting}, viveva un {character}. {pronoun} era conosciuto per {trait}.",
                    "In un lontano {setting}, un {character} di nome {name} stava per intraprendere un'avventura.",
                    "La storia inizia in {setting}, dove {name}, un {character}, viveva una vita tranquilla fino a quando un giorno...",
                    "Molto tempo fa, in {setting}, c'era un {character} chiamato {name}. {pronoun} era {trait} e {trait}."
                ],
                middle: [
                    "{name} scoprì {element} che rivelò un segreto su {prompt}.",
                    "Mentre {name} viaggiava attraverso {setting}, {pronoun} incontrò {character2} che gli parlò di {prompt}.",
                    "Il mistero di {prompt} si approfondì quando {name} trovò {element} nascosto in {setting}.",
                    "Con determinazione, {name} cercò di capire {prompt}, nonostante i pericoli che lo attendevano."
                ],
                climax: [
                    "Alla fine, {name} affrontò {antagonist} in una battaglia di {theme}.",
                    "In un momento di verità, {name} dovette scegliere tra {theme} e {theme}.",
                    "Il segreto di {prompt} fu rivelato quando {name} e {antagonist} si affrontarono a {setting}.",
                    "Tutto cambiò quando {name} si rese conto che {prompt} era in realtà collegato a {element}."
                ],
                resolution: [
                    "Alla fine, {name} imparò che {theme} era il vero potere fin dall'inizio.",
                    "Dopo l'avventura, {name} tornò a {setting}, cambiato per sempre dall'esperienza.",
                    "{name} e {character2} scoprirono che {prompt} aveva trasformato la loro comprensione di {theme}.",
                    "La pace tornò a {setting}, sebbene {name} sapesse che il ricordo di {prompt} non sarebbe mai svanito."
                ]
            },
            portuguese: {
                beginning: [
                    "Era uma vez em {setting}, vivia um {character}. {pronoun} era conhecido por {trait}.",
                    "Em um {setting} distante, um {character} chamado {name} estava prestes a embarcar em uma aventura.",
                    "A história começa em {setting}, onde {name}, um {character}, vivia uma vida tranquila até que um dia...",
                    "Há muito tempo, em {setting}, havia um {character} chamado {name}. {pronoun} era {trait} e {trait}."
                ],
                middle: [
                    "{name} descobriu {element} que revelou um segredo sobre {prompt}.",
                    "Enquanto {name} viajava por {setting}, {pronoun} encontrou {character2} que lhe contou sobre {prompt}.",
                    "O mistério de {prompt} se aprofundou quando {name} encontrou {element} escondido em {setting}.",
                    "Com determinação, {name} procurou entender {prompt}, apesar dos perigos que o aguardavam."
                ],
                climax: [
                    "Finalmente, {name} confrontou {antagonist} em uma batalha de {theme}.",
                    "Em um momento de verdade, {name} teve que escolher entre {theme} e {theme}.",
                    "O segredo de {prompt} foi revelado quando {name} e {antagonist} se enfrentaram em {setting}.",
                    "Tudo mudou quando {name} percebeu que {prompt} estava realmente conectado a {element}."
                ],
                resolution: [
                    "No final, {name} aprendeu que {theme} era o verdadeiro poder desde o início.",
                    "Depois da aventura, {name} retornou a {setting}, para sempre mudado pela experiência.",
                    "{name} e {character2} descobriram que {prompt} havia transformado sua compreensão de {theme}.",
                    "A paz retornou a {setting}, embora {name} soubesse que a memória de {prompt} nunca desapareceria."
                ]
            }
        };

        // Language-specific character attributes
        this.characterAttributes = {
            english: {
                pronouns: {
                    male: { subject: "he", object: "him", possessive: "his" },
                    female: { subject: "she", object: "her", possessive: "her" },
                    neutral: { subject: "they", object: "them", possessive: "their" }
                },
                traits: [
                    "bravery", "wisdom", "strength", "kindness", "intelligence", 
                    "cunning", "loyalty", "determination", "compassion", "courage"
                ]
            },
            spanish: {
                pronouns: {
                    male: { subject: "él", object: "lo", possessive: "su" },
                    female: { subject: "ella", object: "la", possessive: "su" },
                    neutral: { subject: "ellos", object: "los", possessive: "su" }
                },
                traits: [
                    "valentía", "sabiduría", "fuerza", "bondad", "inteligencia", 
                    "astucia", "lealtad", "determinación", "compasión", "coraje"
                ]
            },
            french: {
                pronouns: {
                    male: { subject: "il", object: "lui", possessive: "son" },
                    female: { subject: "elle", object: "elle", possessive: "sa" },
                    neutral: { subject: "ils", object: "eux", possessive: "leur" }
                },
                traits: [
                    "bravoure", "sagesse", "force", "gentillesse", "intelligence", 
                    "ruse", "loyauté", "détermination", "compassion", "courage"
                ]
            },
            german: {
                pronouns: {
                    male: { subject: "er", object: "ihn", possessive: "sein" },
                    female: { subject: "sie", object: "sie", possessive: "ihr" },
                    neutral: { subject: "sie", object: "sie", possessive: "ihr" }
                },
                traits: [
                    "Tapferkeit", "Weisheit", "Stärke", "Güte", "Intelligenz", 
                    "List", "Loyalität", "Entschlossenheit", "Mitgefühl", "Mut"
                ]
            },
            italian: {
                pronouns: {
                    male: { subject: "lui", object: "lo", possessive: "suo" },
                    female: { subject: "lei", object: "la", possessive: "sua" },
                    neutral: { subject: "loro", object: "li", possessive: "loro" }
                },
                traits: [
                    "coraggio", "saggezza", "forza", "gentilezza", "intelligenza", 
                    "astuzia", "lealtà", "determinazione", "compassione", "audacia"
                ]
            },
            portuguese: {
                pronouns: {
                    male: { subject: "ele", object: "o", possessive: "seu" },
                    female: { subject: "ela", object: "a", possessive: "sua" },
                    neutral: { subject: "eles", object: "os", possessive: "seus" }
                },
                traits: [
                    "bravura", "sabedoria", "força", "bondade", "inteligência", 
                    "astúcia", "lealdade", "determinação", "compaixão", "coragem"
                ]
            }
        };

        // Language-specific settings
        this.settings = {
            english: [
                "a mystical forest", "an ancient castle", "a bustling city", 
                "a quiet village", "a distant planet", "a magical kingdom",
                "a hidden valley", "a mysterious island", "a forgotten temple"
            ],
            spanish: [
                "un bosque místico", "un castillo antiguo", "una ciudad bulliciosa", 
                "un pueblo tranquilo", "un planeta distante", "un reino mágico",
                "un valle escondido", "una isla misteriosa", "un templo olvidado"
            ],
            french: [
                "une forêt mystique", "un château ancien", "une ville animée", 
                "un village tranquille", "une planète lointaine", "un royaume magique",
                "une vallée cachée", "une île mystérieuse", "un temple oublié"
            ],
            german: [
                "einem mystischen Wald", "einer alten Burg", "einer geschäftigen Stadt", 
                "einem ruhigen Dorf", "einem fernen Planeten", "einem magischen Königreich",
                "einem versteckten Tal", "einer geheimnisvollen Insel", "einem vergessenen Tempel"
            ],
            italian: [
                "una foresta mistica", "un antico castello", "una città vivace", 
                "un villaggio tranquillo", "un pianeta lontano", "un regno magico",
                "una valle nascosta", "un'isola misteriosa", "un tempio dimenticato"
            ],
            portuguese: [
                "uma floresta mística", "um castelo antigo", "uma cidade agitada", 
                "uma aldeia tranquila", "um planeta distante", "um reino mágico",
                "um vale escondido", "uma ilha misteriosa", "um templo esquecido"
            ]
        };

        // Language-specific elements
        this.elements = {
            english: [
                "a magical amulet", "an ancient scroll", "a mysterious key", 
                "a glowing crystal", "a hidden map", "a powerful artifact",
                "a secret door", "a forgotten book", "an enchanted sword"
            ],
            spanish: [
                "un amuleto mágico", "un pergamino antiguo", "una llave misteriosa", 
                "un cristal brillante", "un mapa oculto", "un poderoso artefacto",
                "una puerta secreta", "un libro olvidado", "una espada encantada"
            ],
            french: [
                "une amulette magique", "un parchemin ancien", "une clé mystérieuse", 
                "un cristal brillant", "une carte cachée", "un puissant artefact",
                "une porte secrète", "un livre oublié", "une épée enchantée"
            ],
            german: [
                "ein magisches Amulett", "eine alte Schriftrolle", "einen mysteriösen Schlüssel", 
                "einen glühenden Kristall", "eine versteckte Karte", "ein mächtiges Artefakt",
                "eine geheime Tür", "ein vergessenes Buch", "ein verzaubertes Schwert"
            ],
            italian: [
                "un amuleto magico", "una pergamena antica", "una chiave misteriosa", 
                "un cristallo luminoso", "una mappa nascosta", "un potente artefatto",
                "una porta segreta", "un libro dimenticato", "una spada incantata"
            ],
            portuguese: [
                "um amuleto mágico", "um pergaminho antigo", "uma chave misteriosa", 
                "um cristal brilhante", "um mapa oculto", "um poderoso artefato",
                "uma porta secreta", "um livro esquecido", "uma espada encantada"
            ]
        };

        // Language-specific themes
        this.themes = {
            english: [
                "courage", "wisdom", "friendship", "love", "sacrifice", 
                "redemption", "destiny", "power", "truth", "freedom"
            ],
            spanish: [
                "coraje", "sabiduría", "amistad", "amor", "sacrificio", 
                "redención", "destino", "poder", "verdad", "libertad"
            ],
            french: [
                "courage", "sagesse", "amitié", "amour", "sacrifice", 
                "rédemption", "destin", "pouvoir", "vérité", "liberté"
            ],
            german: [
                "Mut", "Weisheit", "Freundschaft", "Liebe", "Opfer", 
                "Erlösung", "Schicksal", "Macht", "Wahrheit", "Freiheit"
            ],
            italian: [
                "coraggio", "saggezza", "amicizia", "amore", "sacrificio", 
                "redenzione", "destino", "potere", "verità", "libertà"
            ],
            portuguese: [
                "coragem", "sabedoria", "amizade", "amor", "sacrifício", 
                "redenção", "destino", "poder", "verdade", "liberdade"
            ]
        };

        // Language-specific character types
        this.characterTypes = {
            english: [
                "brave warrior", "wise wizard", "cunning thief", "noble knight", 
                "mysterious stranger", "powerful sorceress", "humble farmer", 
                "skilled archer", "young apprentice", "ancient guardian"
            ],
            spanish: [
                "valiente guerrero", "sabio mago", "astuto ladrón", "noble caballero", 
                "misterioso extraño", "poderosa hechicera", "humilde granjero", 
                "hábil arquero", "joven aprendiz", "antiguo guardián"
            ],
            french: [
                "guerrier courageux", "sage magicien", "voleur rusé", "noble chevalier", 
                "étranger mystérieux", "puissante sorcière", "humble fermier", 
                "archer habile", "jeune apprenti", "gardien ancien"
            ],
            german: [
                "tapferer Krieger", "weiser Zauberer", "listiger Dieb", "edler Ritter", 
                "mysteriöser Fremder", "mächtige Zauberin", "bescheidener Bauer", 
                "geschickter Bogenschütze", "junger Lehrling", "uralter Wächter"
            ],
            italian: [
                "valoroso guerriero", "saggio mago", "astuto ladro", "nobile cavaliere", 
                "misterioso straniero", "potente strega", "umile contadino", 
                "abile arciere", "giovane apprendista", "antico guardiano"
            ],
            portuguese: [
                "bravo guerreiro", "sábio mago", "astuto ladrão", "nobre cavaleiro", 
                "misterioso estranho", "poderosa feiticeira", "humilde fazendeiro", 
                "habilidoso arqueiro", "jovem aprendiz", "antigo guardião"
            ]
        };
    }

    /**
     * Generate a random item from an array
     */
    randomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    /**
     * Generate a complete story in the specified language
     */
    generateStory(prompt, language = 'english', characterCount = 2) {
        // Default to English if language not supported
        const lang = this.storyTemplates[language] ? language : 'english';
        
        console.log(`Generating story in ${lang} about "${prompt}"`);
        
        // Create characters
        const characters = this.generateCharacters(lang, characterCount);
        const mainCharacter = characters[0];
        const secondaryCharacter = characters[1] || characters[0];
        const antagonist = characters.find(c => c.type === 'antagonist') || 
                          {name: this.randomItem(this.characterAttributes[lang].traits)};
        
        // Select story elements
        const setting = this.randomItem(this.settings[lang]);
        const element = this.randomItem(this.elements[lang]);
        const theme1 = this.randomItem(this.themes[lang]);
        const theme2 = this.randomItem(this.themes[lang].filter(t => t !== theme1));
        
        // Generate chapter templates
        const beginningTemplate = this.randomItem(this.storyTemplates[lang].beginning);
        const middleTemplate = this.randomItem(this.storyTemplates[lang].middle);
        const climaxTemplate = this.randomItem(this.storyTemplates[lang].climax);
        const resolutionTemplate = this.randomItem(this.storyTemplates[lang].resolution);
        
        // Fill in templates
        const beginning = this.fillTemplate(beginningTemplate, {
            setting: setting,
            character: mainCharacter.type,
            name: mainCharacter.name,
            pronoun: mainCharacter.pronoun.subject,
            trait: mainCharacter.trait
        });
        
        const middle = this.fillTemplate(middleTemplate, {
            name: mainCharacter.name,
            element: element,
            prompt: prompt,
            setting: setting,
            pronoun: mainCharacter.pronoun.subject,
            character2: secondaryCharacter.name,
            object: mainCharacter.pronoun.object
        });
        
        const climax = this.fillTemplate(climaxTemplate, {
            name: mainCharacter.name,
            antagonist: antagonist.name,
            theme: theme1,
            prompt: prompt,
            setting: setting,
            element: element
        });
        
        const resolution = this.fillTemplate(resolutionTemplate, {
            name: mainCharacter.name,
            setting: setting,
            character2: secondaryCharacter.name,
            prompt: prompt,
            theme: theme2
        });
        
        // Generate chapter titles
        const chapterTitles = this.generateChapterTitles(lang, prompt, theme1);
        
        // Create chapters
        const chapters = [
            { title: chapterTitles[0], content: beginning },
            { title: chapterTitles[1], content: middle },
            { title: chapterTitles[2], content: climax },
            { title: chapterTitles[3], content: resolution }
        ];
        
        // Generate title
        const title = this.generateTitle(lang, prompt, theme1, setting);
        
        // Generate summary
        const summary = this.generateSummary(lang, prompt, mainCharacter, antagonist, element, theme1, setting);
        
        // Create the complete story
        return {
            title: title,
            prompt: prompt,
            language: lang,
            summary: summary,
            characters: characters,
            chapters: chapters,
            wordCount: this.countWords(beginning + middle + climax + resolution),
            createdAt: new Date().toISOString()
        };
    }
    
    /**
     * Generate characters for the story
     */
    generateCharacters(language, count) {
        const lang = this.characterAttributes[language] ? language : 'english';
        const characterCount = Math.min(Math.max(parseInt(count) || 2, 1), 5);
        
        // Ensure unique names
        const usedNames = new Set();
        
        return Array.from({ length: characterCount }, (_, i) => {
            // Determine character type
            const isProtagonist = i === 0;
            const isAntagonist = i === 1;
            const type = isProtagonist ? 'protagonist' : 
                        isAntagonist ? 'antagonist' : 'ally';
            
            // Generate name
            let name;
            do {
                name = this.randomItem(this.characterTypes[lang]);
            } while (usedNames.has(name));
            usedNames.add(name);
            
            // Determine gender and pronouns (simplified for this example)
            const gender = this.randomItem(['male', 'female', 'neutral']);
            const pronoun = this.characterAttributes[lang].pronouns[gender];
            
            // Select trait
            const trait = this.randomItem(this.characterAttributes[lang].traits);
            
            return {
                name: name,
                type: type,
                gender: gender,
                pronoun: pronoun,
                trait: trait
            };
        });
    }
    
    /**
     * Fill a template with values
     */
    fillTemplate(template, values) {
        let result = template;
        for (const [key, value] of Object.entries(values)) {
            result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
        }
        return result;
    }
    
    /**
     * Generate chapter titles
     */
    generateChapterTitles(language, prompt, theme) {
        const lang = language in this.themes ? language : 'english';
        
        // Language-specific chapter titles
        const titles = {
            english: [
                `The Beginning of ${prompt}`,
                `The Journey Through ${theme}`,
                `The Confrontation`,
                `The Resolution`
            ],
            spanish: [
                `El Comienzo de ${prompt}`,
                `El Viaje a Través de ${theme}`,
                `La Confrontación`,
                `La Resolución`
            ],
            french: [
                `Le Début de ${prompt}`,
                `Le Voyage à Travers ${theme}`,
                `La Confrontation`,
                `La Résolution`
            ],
            german: [
                `Der Anfang von ${prompt}`,
                `Die Reise Durch ${theme}`,
                `Die Konfrontation`,
                `Die Auflösung`
            ],
            italian: [
                `L'Inizio di ${prompt}`,
                `Il Viaggio Attraverso ${theme}`,
                `Il Confronto`,
                `La Risoluzione`
            ],
            portuguese: [
                `O Início de ${prompt}`,
                `A Jornada Através de ${theme}`,
                `O Confronto`,
                `A Resolução`
            ]
        };
        
        return titles[lang];
    }
    
    /**
     * Generate a title for the story
     */
    generateTitle(language, prompt, theme, setting) {
        const lang = language in this.themes ? language : 'english';
        
        // Language-specific title templates
        const templates = {
            english: [
                `The ${theme} of ${prompt}`,
                `${prompt}: A Tale of ${theme}`,
                `The Secret of ${prompt}`,
                `${prompt} in ${setting}`
            ],
            spanish: [
                `El ${theme} de ${prompt}`,
                `${prompt}: Un Cuento de ${theme}`,
                `El Secreto de ${prompt}`,
                `${prompt} en ${setting}`
            ],
            french: [
                `Le ${theme} de ${prompt}`,
                `${prompt}: Un Conte de ${theme}`,
                `Le Secret de ${prompt}`,
                `${prompt} dans ${setting}`
            ],
            german: [
                `Das ${theme} von ${prompt}`,
                `${prompt}: Eine Geschichte von ${theme}`,
                `Das Geheimnis von ${prompt}`,
                `${prompt} in ${setting}`
            ],
            italian: [
                `Il ${theme} di ${prompt}`,
                `${prompt}: Una Storia di ${theme}`,
                `Il Segreto di ${prompt}`,
                `${prompt} in ${setting}`
            ],
            portuguese: [
                `O ${theme} de ${prompt}`,
                `${prompt}: Uma História de ${theme}`,
                `O Segredo de ${prompt}`,
                `${prompt} em ${setting}`
            ]
        };
        
        return this.randomItem(templates[lang]);
    }
    
    /**
     * Generate a summary for the story
     */
    generateSummary(language, prompt, mainCharacter, antagonist, element, theme, setting) {
        const lang = language in this.themes ? language : 'english';
        
        // Language-specific summary templates
        const templates = {
            english: [
                `In ${setting}, ${mainCharacter.name} discovers the truth about ${prompt}. With ${mainCharacter.pronoun.possessive} ${mainCharacter.trait}, ${mainCharacter.pronoun.subject} must confront ${antagonist.name} and the mysterious ${element} before it's too late. A tale of ${theme} and courage.`
            ],
            spanish: [
                `En ${setting}, ${mainCharacter.name} descubre la verdad sobre ${prompt}. Con su ${mainCharacter.trait}, ${mainCharacter.pronoun.subject} debe enfrentar a ${antagonist.name} y el misterioso ${element} antes de que sea demasiado tarde. Una historia de ${theme} y coraje.`
            ],
            french: [
                `Dans ${setting}, ${mainCharacter.name} découvre la vérité sur ${prompt}. Avec ${mainCharacter.pronoun.possessive} ${mainCharacter.trait}, ${mainCharacter.pronoun.subject} doit confronter ${antagonist.name} et le mystérieux ${element} avant qu'il ne soit trop tard. Un conte de ${theme} et de courage.`
            ],
            german: [
                `In ${setting} entdeckt ${mainCharacter.name} die Wahrheit über ${prompt}. Mit ${mainCharacter.pronoun.possessive} ${mainCharacter.trait} muss ${mainCharacter.pronoun.subject} ${antagonist.name} und das mysteriöse ${element} konfrontieren, bevor es zu spät ist. Eine Geschichte von ${theme} und Mut.`
            ],
            italian: [
                `In ${setting}, ${mainCharacter.name} scopre la verità su ${prompt}. Con il suo ${mainCharacter.trait}, ${mainCharacter.pronoun.subject} deve affrontare ${antagonist.name} e il misterioso ${element} prima che sia troppo tardi. Una storia di ${theme} e coraggio.`
            ],
            portuguese: [
                `Em ${setting}, ${mainCharacter.name} descobre a verdade sobre ${prompt}. Com seu ${mainCharacter.trait}, ${mainCharacter.pronoun.subject} deve enfrentar ${antagonist.name} e o misterioso ${element} antes que seja tarde demais. Uma história de ${theme} e coragem.`
            ]
        };
        
        return this.randomItem(templates[lang]);
    }
    
    /**
     * Count words in a text
     */
    countWords(text) {
        return text.split(/\s+/).length;
    }
}

// Create a global instance
const languageGenerator = new LanguageGenerator();