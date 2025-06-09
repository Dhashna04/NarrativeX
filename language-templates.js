/**
 * Language-specific templates for AI Story Generator
 * This module provides templates for generating stories in different languages
 */

document.addEventListener('DOMContentLoaded', () => {
    // Wait for the StoryGenerator to be initialized
    setTimeout(() => {
        if (window.storyGenerator) {
            // Add language templates
            addLanguageTemplates();
            console.log('Language-specific templates added to StoryGenerator');
        }
    }, 500);
});

/**
 * Add language-specific templates to the StoryGenerator
 */
function addLanguageTemplates() {
    // Add Italian templates
    window.storyGenerator.languageTemplates.italian = {
        beginningIntro: "In {setting} {style}, la storia di {prompt} iniziò a svelarsi. {character}, un {role} {trait}, si trovò coinvolto in eventi al di là della sua comprensione. L'aria era densa di attesa, come se il mondo stesso sapesse che stava per accadere qualcosa di importante.",
        titleFormats: [
            "Il {theme} di {prompt}",
            "{prompt}: Una Storia di {theme}",
            "Quando {prompt} Cambiò Tutto",
            "Il Segreto di {prompt}",
            "{prompt} in {setting}"
        ],
        summaryFormat: "In un mondo di {setting}, {mainCharacter} scopre la verità su {prompt}. Con la sua natura {trait}, deve affrontare {antagonist} e il misterioso {element} prima che sia troppo tardi. Una storia di {theme} e coraggio.",
        chapterTitles: {
            beginning: [
                "L'Inizio del Viaggio",
                "I Primi Passi",
                "Un Nuovo Inizio",
                "Il Risveglio",
                "La Chiamata all'Avventura"
            ],
            middle: [
                "Prove e Sfide",
                "Il Cammino Oscuro",
                "Rivelazioni Inaspettate",
                "Alleati e Nemici",
                "La Verità Nascosta"
            ],
            climax: [
                "Lo Scontro Finale",
                "Il Momento della Verità",
                "La Battaglia Decisiva",
                "Faccia a Faccia col Destino",
                "L'Ora più Buia"
            ],
            resolution: [
                "Un Nuovo Equilibrio",
                "Le Conseguenze",
                "Dopo la Tempesta",
                "La Pace Ritrovata",
                "Il Prezzo della Vittoria"
            ],
            epilogue: [
                "Anni Dopo",
                "Il Nuovo Inizio",
                "Ricordi e Promesse",
                "L'Eredità",
                "Ciò che Rimane"
            ]
        }
    };
    
    // Add Tamil templates
    window.storyGenerator.languageTemplates.tamil = {
        beginningIntro: "{setting} {style} இல், {prompt} பற்றிய கதை விரிய ஆரம்பித்தது. {trait} {role} ஆன {character}, தங்களின் புரிதலுக்கு அப்பாற்பட்ட நிகழ்வுகளில் ஈர்க்கப்பட்டனர். உலகம் ஏதோ முக்கியமான ஒன்று நடக்கப்போவதை அறிந்தது போல, காற்று எதிர்பார்ப்புடன் கனமாக இருந்தது.",
        titleFormats: [
            "{prompt} இன் {theme}",
            "{prompt}: ஒரு {theme} கதை",
            "{prompt} எல்லாவற்றையும் மாற்றியபோது",
            "{prompt} இன் ரகசியம்",
            "{setting} இல் {prompt}"
        ],
        summaryFormat: "{setting} உலகில், {mainCharacter} {prompt} பற்றிய உண்மையைக் கண்டறிகிறார். அவரது {trait} இயல்புடன், அவர் {antagonist} மற்றும் மர்மமான {element} ஐ தாமதமாவதற்கு முன் எதிர்கொள்ள வேண்டும். {theme} மற்றும் தைரியத்தின் கதை.",
        chapterTitles: {
            beginning: [
                "பயணத்தின் தொடக்கம்",
                "முதல் அடிகள்",
                "புதிய தொடக்கம்",
                "விழிப்பு",
                "சாகசத்திற்கான அழைப்பு"
            ],
            middle: [
                "சோதனைகளும் சவால்களும்",
                "இருண்ட பாதை",
                "எதிர்பாராத வெளிப்பாடுகள்",
                "நண்பர்களும் எதிரிகளும்",
                "மறைக்கப்பட்ட உண்மை"
            ],
            climax: [
                "இறுதி மோதல்",
                "உண்மையின் தருணம்",
                "தீர்மானகரமான போர்",
                "விதியை நேருக்கு நேர் சந்தித்தல்",
                "மிக இருண்ட நேரம்"
            ],
            resolution: [
                "புதிய சமநிலை",
                "விளைவுகள்",
                "புயலுக்குப் பிறகு",
                "மீண்டும் கண்டெடுக்கப்பட்ட அமைதி",
                "வெற்றியின் விலை"
            ],
            epilogue: [
                "வருடங்களுக்குப் பிறகு",
                "புதிய தொடக்கம்",
                "நினைவுகளும் வாக்குறுதிகளும்",
                "பாரம்பரியம்",
                "மீதமுள்ளவை"
            ]
        }
    };
    
    // Add Telugu templates
    window.storyGenerator.languageTemplates.telugu = {
        beginningIntro: "{setting} {style} లో, {prompt} యొక్క కథ విస్తరించడం ప్రారంభమైంది. {trait} {role} అయిన {character}, వారి అవగాహనకు మించిన సంఘటనలలోకి ఆకర్షించబడ్డారు. ప్రపంచం స్వయంగా ఏదో గొప్ప విషయం జరగబోతుందని తెలిసినట్లుగా, గాలి ఊహతో నిండి ఉంది.",
        titleFormats: [
            "{prompt} యొక్క {theme}",
            "{prompt}: ఒక {theme} కథ",
            "{prompt} అన్నింటినీ మార్చినప్పుడు",
            "{prompt} యొక్క రహస్యం",
            "{setting} లో {prompt}"
        ],
        summaryFormat: "{setting} ప్రపంచంలో, {mainCharacter} {prompt} గురించి నిజాన్ని కనుగొంటారు. వారి {trait} స్వభావంతో, వారు {antagonist} మరియు మిస్టరీయస్ {element} ని ఎదుర్కోవాలి ఆలస్యం కాకముందే. {theme} మరియు ధైర్యం యొక్క కథ.",
        chapterTitles: {
            beginning: [
                "ప్రయాణం ప్రారంభం",
                "మొదటి అడుగులు",
                "కొత్త ప్రారంభం",
                "మేల్కొలుపు",
                "సాహసానికి పిలుపు"
            ],
            middle: [
                "పరీక్షలు మరియు సవాళ్లు",
                "చీకటి మార్గం",
                "అనూహ్య వెల్లడులు",
                "మిత్రులు మరియు శత్రువులు",
                "దాచబడిన సత్యం"
            ],
            climax: [
                "చివరి ఘర్షణ",
                "సత్యం క్షణం",
                "నిర్ణాయక యుద్ధం",
                "విధిని ముఖాముఖి కలుసుకోవడం",
                "అత్యంత చీకటి సమయం"
            ],
            resolution: [
                "కొత్త సమతుల్యత",
                "పరిణామాలు",
                "తుఫాను తర్వాత",
                "తిరిగి పొందిన శాంతి",
                "విజయం ధర"
            ],
            epilogue: [
                "సంవత్సరాల తర్వాత",
                "కొత్త ప్రారంభం",
                "జ్ఞాపకాలు మరియు వాగ్దానాలు",
                "వారసత్వం",
                "మిగిలి ఉన్నది"
            ]
        }
    };
}