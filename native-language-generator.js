/**
 * Native Language Generator for AI Story Generator
 * This module enhances the story generator to create stories directly in Italian, Tamil, and Telugu
 */

document.addEventListener('DOMContentLoaded', () => {
    // Wait for the StoryGenerator to be initialized
    setTimeout(() => {
        if (window.storyGenerator) {
            // Enhance the StoryGenerator with native language capabilities
            enhanceStoryGenerator();
            console.log('Story Generator enhanced with native language capabilities');
        }
    }, 500);
});

/**
 * Enhance the StoryGenerator with native language capabilities
 */
function enhanceStoryGenerator() {
    // Store the original generateCharacters method
    const originalGenerateCharacters = window.storyGenerator.generateCharacters;
    
    // Override the generateCharacters method to use language-specific names
    window.storyGenerator.generateCharacters = function(prompt, count, language) {
        // Use the language from the class if not provided
        language = language || this.storyLanguage || 'english';
        
        // Generate characters using the original method
        const characters = originalGenerateCharacters.call(this, prompt, count);
        
        // For Italian, Tamil, and Telugu, replace with language-specific names
        if (language === 'italian' || language === 'tamil' || language === 'telugu') {
            if (this.nameOptionsByLanguage[language]) {
                const languageNames = this.nameOptionsByLanguage[language];
                
                // Replace character names with language-specific ones
                characters.forEach((character, index) => {
                    const randomIndex = Math.floor(Math.random() * languageNames.length);
                    character.name = languageNames[randomIndex];
                    
                    // Also translate character traits and roles
                    if (window.languageTranslator) {
                        character.trait = window.languageTranslator.translateText(character.trait, language);
                        character.role = window.languageTranslator.translateText(character.role, language);
                        character.type = window.languageTranslator.translateText(character.type, language);
                        character.description = window.languageTranslator.translateText(character.description, language);
                        character.backstory = window.languageTranslator.translateText(character.backstory, language);
                    }
                });
                
                console.log(`Characters generated with ${language} names:`, characters.map(c => c.name).join(', '));
            }
        }
        
        return characters;
    };
    
    // Store the original generateChapter method
    const originalGenerateChapter = window.storyGenerator.generateChapter;
    
    // Override the generateChapter method to generate content in the native language
    window.storyGenerator.generateChapter = function(prompt, characters, genreInfo, theme, chapterType) {
        const language = this.storyLanguage || 'english';
        
        // For Italian, Tamil, and Telugu, generate native language content
        if (language === 'italian' || language === 'tamil' || language === 'telugu') {
            console.log(`Generating native ${language} chapter content for ${chapterType}`);
            
            // Get language-specific templates
            const titleOptions = this.currentLangTemplates?.chapterTitles?.[chapterType] || 
                                this.languageTemplates.english.chapterTitles[chapterType] || 
                                this.languageTemplates.english.chapterTitles.middle;
            
            // Use direct language templates if available
            let title;
            if (this.languageTemplates[language]?.chapterTitles?.[chapterType]) {
                // Use native language title directly
                const nativeTitles = this.languageTemplates[language].chapterTitles[chapterType];
                title = this.randomItem(nativeTitles);
            } else {
                // Translate the title options to the target language
                const translatedTitleOptions = titleOptions.map(title => {
                    return window.languageTranslator.translateText(title, language);
                });
                title = this.randomItem(translatedTitleOptions);
            }
            
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
            
            // Generate paragraphs directly in the target language
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
                            let template;
                            
                            // Use native language template if available
                            if (this.languageTemplates[language]?.beginningIntro) {
                                template = this.languageTemplates[language].beginningIntro;
                            } else {
                                template = this.currentLangTemplates?.beginningIntro || 
                                    "In {setting} {style}, the story of {prompt} began to unfold. {character}, a {trait} {role}, found themselves drawn into events beyond their understanding. The air was thick with anticipation, as if the world itself knew that something momentous was about to occur.";
                                
                                // Translate the template to the target language
                                template = window.languageTranslator.translateText(template, language);
                            }
                            
                            // Translate key terms for better language integration
                            const translatedSetting = window.languageTranslator.translateText(genreInfo.setting, language);
                            const translatedStyle = window.languageTranslator.translateText(genreInfo.style, language);
                            const translatedPrompt = window.languageTranslator.translateText(prompt, language);
                            const translatedTrait = window.languageTranslator.translateText(character.trait, language);
                            const translatedRole = window.languageTranslator.translateText(character.role, language);
                            
                            paragraph = template
                                .replace('{setting}', translatedSetting)
                                .replace('{style}', translatedStyle)
                                .replace('{prompt}', translatedPrompt)
                                .replace('{character}', character.name)
                                .replace('{trait}', translatedTrait)
                                .replace('{role}', translatedRole);
                        } else {
                            // Generate a native language paragraph
                            paragraph = generateNativeLanguageParagraph(language, character, prompt, genreInfo, theme, 'beginning');
                        }
                        break;
                    case 'middle':
                        paragraph = generateNativeLanguageParagraph(language, character, prompt, genreInfo, theme, 'middle');
                        break;
                    case 'climax':
                        paragraph = generateNativeLanguageParagraph(language, character, prompt, genreInfo, theme, 'climax');
                        break;
                    case 'resolution':
                        paragraph = generateNativeLanguageParagraph(language, character, prompt, genreInfo, theme, 'resolution');
                        break;
                    case 'epilogue':
                        paragraph = generateNativeLanguageParagraph(language, character, prompt, genreInfo, theme, 'epilogue');
                        break;
                }
                
                content += paragraph + '\n\n';
            }
            
            // Final check to ensure everything is in the target language
            // This is a safety measure to catch any English text that might have slipped through
            if (language === 'tamil' || language === 'telugu') {
                // For Tamil and Telugu, check for English words and translate them
                const englishWordPattern = /[a-zA-Z]{4,}/g; // Match English words of 4+ characters
                const matches = content.match(englishWordPattern);
                
                if (matches && matches.length > 0) {
                    console.log(`Found ${matches.length} potential English words in ${language} content, translating...`);
                    
                    // Translate the entire content again to ensure full conversion
                    content = window.languageTranslator.translateText(content, language);
                }
            }
            
            return {
                title: title,
                content: content.trim()
            };
        } else {
            // For other languages, use the original method
            return originalGenerateChapter.call(this, prompt, characters, genreInfo, theme, chapterType);
        }
    };
}

/**
 * Generate a paragraph in the native language
 * @param {string} language - The target language
 * @param {Object} character - The character for this paragraph
 * @param {string} prompt - The story prompt
 * @param {Object} genreInfo - The genre information
 * @param {string} theme - The story theme
 * @param {string} chapterType - The type of chapter
 * @returns {string} - A paragraph in the native language
 */
function generateNativeLanguageParagraph(language, character, prompt, genreInfo, theme, chapterType) {
    // Language-specific templates
    const languageTemplates = {
        italian: {
            beginning: [
                "{character} guardò intorno al {setting}, chiedendosi come fosse stato coinvolto in questa avventura di {theme}. Il {element} sembrava chiamarlo, promettendo risposte su {prompt}.",
                "Mentre {character} si avventurava più a fondo nel {setting}, non poteva fare a meno di sentire che la sua natura {trait} sarebbe stata messa alla prova dalle sfide che lo attendevano. Il {element} era solo l'inizio del mistero che circondava {prompt}.",
                "Il {setting} era diverso da qualsiasi cosa {character} avesse mai visto. Il suo istinto {trait} gli diceva che il {element} era in qualche modo collegato a {prompt}, ma non riusciva ancora a capire come."
            ],
            middle: [
                "{character} incontrò un {obstacle} che bloccava il suo cammino. Usando le sue abilità {trait}, riuscì a superarlo, avvicinandosi a comprendere la verità su {prompt}.",
                "Il {element} rivelò nuove informazioni a {character} su {prompt}. La sua natura {trait} lo aiutò a vedere connessioni che altri avevano perso.",
                "Mentre {character} continuava il suo viaggio attraverso il {setting}, scoprì che il {element} era più potente di quanto avesse inizialmente creduto. Il mistero di {prompt} si approfondì.",
                "Un confronto con {antagonist} lasciò {character} a mettere in dubbio tutto ciò che sapeva su {prompt}. La sua determinazione {trait} era l'unica cosa che lo teneva in piedi."
            ],
            climax: [
                "Lo scontro finale tra {character} e {antagonist} ebbe inizio. Il {element} pulsava di energia mentre la verità su {prompt} stava per essere rivelata.",
                "{character} si trovò faccia a faccia con {antagonist}, il {element} tra loro. Tutto ciò che avevano appreso su {prompt} li aveva condotti a questo momento.",
                "Il {setting} tremò mentre {character} scatenava il suo potere {trait}. {antagonist} aveva sottovalutato la sua determinazione a scoprire la verità su {prompt}.",
                "Con il {element} in mano, {character} finalmente comprese il completo mistero di {prompt}. Ora doveva solo sopravvivere allo scontro con {antagonist}.",
                "Il {theme} della storia raggiunse il suo apice mentre {character} faceva la sua ultima resistenza. Il {element} e la verità su {prompt} avrebbero cambiato tutto."
            ],
            resolution: [
                "Con {antagonist} sconfitto, {character} finalmente comprese la completa verità su {prompt}. Il {element} aveva servito il suo scopo.",
                "{character} guardò indietro al {setting}, riflettendo su come la sua natura {trait} lo avesse aiutato a superare le sfide e risolvere il mistero di {prompt}.",
                "Il {element} ora riposava al sicuro con {character}, il suo legame con {prompt} finalmente compreso. Il viaggio di {theme} lo aveva cambiato per sempre.",
                "Mentre {character} lasciava il {setting}, sapeva che la verità su {prompt} sarebbe rimasta con lui per sempre. Il suo spirito {trait} era stato messo alla prova e aveva dimostrato il suo valore."
            ],
            epilogue: [
                "Anni dopo, {character} avrebbe ancora pensato alla sua avventura e alla verità che aveva scoperto su {prompt}. Il {element} era diventato parte della sua leggenda.",
                "La storia di {character}, del {element} e del mistero di {prompt} sarebbe stata raccontata per generazioni. Un racconto di {theme} e coraggio che avrebbe ispirato molti altri."
            ]
        },
        tamil: {
            beginning: [
                "{character} {setting}ஐச் சுற்றிப் பார்த்தார், இந்த {theme} சாகசத்தில் எப்படி சிக்கிக்கொண்டார் என்று யோசித்தார். {element} அவர்களை அழைப்பது போல் தோன்றியது, {prompt} பற்றிய பதில்களை வாக்குறுதி அளித்தது.",
                "{character} {setting}க்குள் ஆழமாக சென்றபோது, அவர்களின் {trait} இயல்பு எதிர்வரும் சவால்களால் சோதிக்கப்படும் என்று உணர்ந்தார். {element} {prompt}ஐச் சுற்றியுள்ள மர்மத்தின் தொடக்கம் மட்டுமே.",
                "{setting} {character} இதுவரை பார்த்திராத ஒன்றாக இருந்தது. அவர்களின் {trait} உள்ளுணர்வு {element} ஏதோ ஒரு வகையில் {prompt}உடன் தொடர்புடையது என்று கூறியது, ஆனால் அவர்களால் அது எப்படி என்று புரிந்துகொள்ள முடியவில்லை."
            ],
            middle: [
                "{character} அவர்களின் பாதையை தடுக்கும் ஒரு {obstacle}ஐ சந்தித்தார். அவர்களின் {trait} திறன்களைப் பயன்படுத்தி, அவர்கள் அதை வெற்றிகொண்டு, {prompt} பற்றிய உண்மையைப் புரிந்துகொள்ள நெருங்கினார்.",
                "{element} {character}க்கு {prompt} பற்றிய புதிய தகவல்களை வெளிப்படுத்தியது. அவர்களின் {trait} இயல்பு மற்றவர்கள் தவறவிட்ட தொடர்புகளைக் காண உதவியது.",
                "{character} {setting} வழியாக தங்கள் பயணத்தைத் தொடர்ந்தபோது, {element} அவர்கள் முதலில் நம்பியதை விட அதிக சக்திவாய்ந்தது என்பதைக் கண்டறிந்தார். {prompt}இன் மர்மம் ஆழமடைந்தது.",
                "{antagonist}உடனான மோதல் {character} {prompt} பற்றி அவர்கள் அறிந்த எல்லாவற்றையும் கேள்விக்குள்ளாக்கியது. அவர்களின் {trait} உறுதி மட்டுமே அவர்களை முன்னேறச் செய்தது."
            ],
            climax: [
                "{character} மற்றும் {antagonist} இடையேயான இறுதி மோதல் தொடங்கியது. {prompt} பற்றிய உண்மை வெளிப்படும் நிலையில் {element} சக்தியுடன் துடித்தது.",
                "{character} {antagonist}ஐ நேருக்கு நேர் சந்தித்தார், அவர்களுக்கிடையே {element} இருந்தது. {prompt} பற்றி அவர்கள் கற்றுக்கொண்ட அனைத்தும் இந்த தருணத்திற்கு வழிவகுத்தது.",
                "{character} தங்களின் {trait} சக்தியை வெளிப்படுத்தியபோது {setting} நடுங்கியது. {prompt} பற்றிய உண்மையைக் கண்டறியும் அவர்களின் உறுதியை {antagonist} குறைத்து மதிப்பிட்டிருந்தார்.",
                "{element}ஐக் கையில் வைத்திருந்த {character} இறுதியாக {prompt}இன் முழு மர்மத்தையும் புரிந்துகொண்டார். இப்போது அவர்கள் {antagonist}உடனான மோதலில் உயிர் பிழைக்க வேண்டும்.",
                "கதையின் {theme} {character} தனது இறுதி நிலைப்பாட்டை எடுத்தபோது உச்சத்தை அடைந்தது. {element} மற்றும் {prompt} பற்றிய உண்மை எல்லாவற்றையும் மாற்றும்."
            ],
            resolution: [
                "{antagonist} தோற்கடிக்கப்பட்டதும், {character} இறுதியாக {prompt} பற்றிய முழு உண்மையையும் புரிந்துகொண்டார். {element} அதன் நோக்கத்தை நிறைவேற்றியது.",
                "{character} {setting}ஐ திரும்பிப் பார்த்தார், அவர்களின் {trait} இயல்பு சவால்களை எதிர்கொள்ளவும் {prompt}இன் மர்மத்தைத் தீர்க்கவும் எவ்வாறு உதவியது என்பதை சிந்தித்தார்.",
                "{element} இப்போது {character}உடன் பாதுகாப்பாக இருந்தது, {prompt}உடனான அதன் தொடர்பு இறுதியாக புரிந்துகொள்ளப்பட்டது. {theme} பயணம் அவர்களை என்றென்றும் மாற்றியிருந்தது.",
                "{character} {setting}ஐ விட்டு வெளியேறியபோது, {prompt} பற்றிய உண்மை எப்போதும் அவர்களுடன் இருக்கும் என்பதை அறிந்திருந்தார். அவர்களின் {trait} ஆன்மா சோதிக்கப்பட்டு நிரூபிக்கப்பட்டது."
            ],
            epilogue: [
                "வருடங்களுக்குப் பிறகு, {character} இன்னும் தங்கள் சாகசத்தைப் பற்றியும் {prompt} பற்றி கண்டறிந்த உண்மையைப் பற்றியும் நினைத்துப் பார்ப்பார். {element} அவர்களின் புராணத்தின் ஒரு பகுதியாக மாறியிருந்தது.",
                "{character}, {element} மற்றும் {prompt}இன் மர்மம் பற்றிய கதை பல தலைமுறைகளாக சொல்லப்படும். பலரை ஊக்குவிக்கும் ஒரு {theme} மற்றும் தைரியத்தின் கதை."
            ]
        },
        telugu: {
            beginning: [
                "{character} {setting} చుట్టూ చూశారు, ఈ {theme} సాహసంలో తాను ఎలా పాల్గొన్నారో ఆలోచిస్తూ. {element} వారిని పిలుస్తున్నట్లు అనిపించింది, {prompt} గురించి సమాధానాలు ఇస్తానని వాగ్దానం చేసింది.",
                "{character} {setting}లోకి లోతుగా వెళ్తున్నప్పుడు, వారి {trait} స్వభావం ముందున్న సవాళ్లచే పరీక్షించబడుతుందని భావించకుండా ఉండలేకపోయారు. {element} {prompt}ని చుట్టుముట్టిన రహస్యానికి కేవలం ప్రారంభం మాత్రమే.",
                "{setting} {character} ఇంతకు ముందు చూసిన దేనికీ భిన్నంగా ఉంది. వారి {trait} సహజ జ్ఞానం {element} ఏదో విధంగా {prompt}తో సంబంధం ఉందని చెప్పింది, కానీ అది ఎలా అని వారు ఇంకా అర్థం చేసుకోలేకపోయారు."
            ],
            middle: [
                "{character} వారి మార్గాన్ని అడ్డుకునే {obstacle}ని ఎదుర్కొన్నారు. వారి {trait} సామర్థ్యాలను ఉపయోగించి, వారు దానిని అధిగమించి, {prompt} గురించిన సత్యాన్ని అర్థం చేసుకోవడానికి దగ్గరగా వచ్చారు.",
                "{element} {character}కి {prompt} గురించి కొత్త సమాచారాన్ని వెల్లడించింది. వారి {trait} స్వభావం ఇతరులు చూడలేని అనుసంధానాలను చూడటానికి సహాయపడింది.",
                "{character} {setting} గుండా తమ ప్రయాణాన్ని కొనసాగించినప్పుడు, {element} వారు మొదట నమ్మినదానికంటే శక్తివంతమైనదని కనుగొన్నారు. {prompt} యొక్క రహస్యం లోతుగా మారింది.",
                "{antagonist}తో ఘర్షణ {character}ని {prompt} గురించి వారు తెలుసుకున్న ప్రతిదాన్ని ప్రశ్నించేలా చేసింది. వారి {trait} పట్టుదలే వారిని ముందుకు సాగేలా చేసింది."
            ],
            climax: [
                "{character} మరియు {antagonist} మధ్య చివరి ఘర్షణ ప్రారంభమైంది. {prompt} గురించిన సత్యం బయటపడబోతున్నప్పుడు {element} శక్తితో స్పందించింది.",
                "{character} {antagonist}ని ముఖాముఖి చూశారు, వారి మధ్య {element} ఉంది. {prompt} గురించి వారు నేర్చుకున్నదంతా ఈ క్షణానికి దారితీసింది.",
                "{character} తమ {trait} శక్తిని విడుదల చేసినప్పుడు {setting} వణికింది. {prompt} గురించిన సత్యాన్ని కనుగొనే వారి నిశ్చయాన్ని {antagonist} తక్కువగా అంచనా వేశారు.",
                "{element}ని చేతిలో పట్టుకుని, {character} చివరికి {prompt} యొక్క పూర్తి రహస్యాన్ని అర్థం చేసుకున్నారు. ఇప్పుడు వారు {antagonist}తో ఘర్షణలో బతకాలి.",
                "కథ యొక్క {theme} {character} తన చివరి నిలబడినప్పుడు గరిష్ఠ స్థాయికి చేరుకుంది. {element} మరియు {prompt} గురించిన సత్యం అన్నింటినీ మార్చేస్తుంది."
            ],
            resolution: [
                "{antagonist} ఓడిపోయిన తర్వాత, {character} చివరికి {prompt} గురించిన పూర్తి సత్యాన్ని అర్థం చేసుకున్నారు. {element} దాని ప్రయోజనాన్ని నెరవేర్చింది.",
                "{character} {setting}ని వెనక్కి చూశారు, వారి {trait} స్వభావం సవాళ్లను అధిగమించడానికి మరియు {prompt} యొక్క రహస్యాన్ని పరిష్కరించడానికి ఎలా సహాయపడిందో ఆలోచిస్తూ.",
                "{element} ఇప్పుడు {character}తో సురక్షితంగా ఉంది, {prompt}తో దాని సంబంధం చివరికి అర్థమైంది. {theme} ప్రయాణం వారిని శాశ్వతంగా మార్చింది.",
                "{character} {setting}ని వదిలిపెట్టినప్పుడు, {prompt} గురించిన సత్యం ఎల్లప్పుడూ వారితో ఉంటుందని తెలుసు. వారి {trait} స్ఫూర్తి పరీక్షించబడి నిరూపించబడింది."
            ],
            epilogue: [
                "సంవత్సరాల తర్వాత, {character} ఇంకా తమ సాహసం గురించి మరియు {prompt} గురించి కనుగొన్న సత్యం గురించి ఆలోచిస్తారు. {element} వారి కథలో భాగమైంది.",
                "{character}, {element} మరియు {prompt} యొక్క రహస్యం గురించిన కథ తరతరాలుగా చెప్పబడుతుంది. ఇతరులకు స్ఫూర్తినిచ్చే {theme} మరియు ధైర్యం కథ."
            ]
        }
    };
    
    // Default templates in English (fallback)
    const defaultTemplates = {
        beginning: [
            "{character} looked around the {setting}, wondering how they had become involved in this {theme} adventure. The {element} seemed to call to them, promising answers about {prompt}.",
            "As {character} ventured deeper into the {setting}, they couldn't help but feel that their {trait} nature would be tested by the challenges ahead. The {element} was just the beginning of the mystery surrounding {prompt}.",
            "The {setting} was unlike anything {character} had ever seen. Their {trait} instincts told them that the {element} was somehow connected to {prompt}, but they couldn't yet understand how."
        ],
        middle: [
            "{character} encountered a {obstacle} that blocked their path. Using their {trait} abilities, they managed to overcome it, getting closer to understanding the truth about {prompt}.",
            "The {element} revealed new information to {character} about {prompt}. Their {trait} nature helped them see connections that others had missed.",
            "As {character} continued their journey through the {setting}, they discovered that the {element} was more powerful than they had initially believed. The mystery of {prompt} deepened.",
            "A confrontation with {antagonist} left {character} questioning everything they knew about {prompt}. Their {trait} resolve was the only thing keeping them going."
        ],
        climax: [
            "The final confrontation between {character} and {antagonist} began. The {element} pulsed with energy as the truth about {prompt} was about to be revealed.",
            "{character} stood face to face with {antagonist}, the {element} between them. Everything they had learned about {prompt} had led to this moment.",
            "The {setting} trembled as {character} unleashed their {trait} power. {antagonist} had underestimated their determination to uncover the truth about {prompt}.",
            "With the {element} in hand, {character} finally understood the complete mystery of {prompt}. Now they just had to survive the confrontation with {antagonist}.",
            "The {theme} of the story reached its peak as {character} made their final stand. The {element} and the truth about {prompt} would change everything."
        ],
        resolution: [
            "With {antagonist} defeated, {character} finally understood the complete truth about {prompt}. The {element} had served its purpose.",
            "{character} looked back at the {setting}, reflecting on how their {trait} nature had helped them overcome the challenges and solve the mystery of {prompt}.",
            "The {element} now rested safely with {character}, its connection to {prompt} understood at last. The {theme} journey had changed them forever.",
            "As {character} departed the {setting}, they knew that the truth about {prompt} would remain with them always. Their {trait} spirit had been tested and proven."
        ],
        epilogue: [
            "Years later, {character} would still think about their adventure and the truth they discovered about {prompt}. The {element} had become a part of their legend.",
            "The story of {character}, the {element}, and the mystery of {prompt} would be told for generations. A tale of {theme} and courage that would inspire many others."
        ]
    };
    
    // Choose the appropriate templates based on language
    let templates;
    if (languageTemplates[language]) {
        templates = languageTemplates[language];
    } else {
        // If no language-specific templates, use default and translate
        templates = defaultTemplates;
    }
    
    // Select a random template for this paragraph type
    const template = templates[chapterType][Math.floor(Math.random() * templates[chapterType].length)];
    
    // Find the antagonist character
    const antagonist = character.type === 'antagonist' ? 
        character.name : 
        (window.storyGenerator.characters?.find(c => c.type === 'antagonist')?.name || 'the enemy');
    
    // Select a random element from the genre
    const element = window.storyGenerator.randomItem(genreInfo.elements);
    
    // Select a random obstacle from the genre
    const obstacle = window.storyGenerator.randomItem(genreInfo.obstacles);
    
    // If we're using language-specific templates, no need to translate the template itself
    let finalTemplate = template;
    
    // Translate all elements to the target language if needed
    const translatedSetting = window.languageTranslator.translateText(genreInfo.setting, language);
    const translatedElement = window.languageTranslator.translateText(element, language);
    const translatedObstacle = window.languageTranslator.translateText(obstacle, language);
    const translatedPrompt = window.languageTranslator.translateText(prompt, language);
    const translatedTheme = window.languageTranslator.translateText(theme, language);
    const translatedAntagonist = window.languageTranslator.translateText(antagonist, language);
    const translatedTrait = window.languageTranslator.translateText(character.trait, language);
    
    // Replace placeholders with translated values
    let paragraph = finalTemplate
        .replace(/{character}/g, character.name)
        .replace(/{setting}/g, translatedSetting)
        .replace(/{element}/g, translatedElement)
        .replace(/{obstacle}/g, translatedObstacle)
        .replace(/{prompt}/g, translatedPrompt)
        .replace(/{theme}/g, translatedTheme)
        .replace(/{trait}/g, translatedTrait)
        .replace(/{antagonist}/g, translatedAntagonist);
    
    // For Italian, Tamil, and Telugu, ensure the entire paragraph is in the target language
    if (!languageTemplates[language]) {
        // If we didn't use language-specific templates, translate the entire paragraph
        paragraph = window.languageTranslator.translateText(paragraph, language);
    }
    
    return paragraph;
}