// FAQ Page JavaScript

// ===== KONFIGURATION =====

// Texte dieser Seite (nur Deutsch)
const T = {
    // Allgemein
    site_title_faq: "MC-Craft | Häufig gestellte Fragen",
    site_title_short: "MC-Craft",
    // Navigation
    nav_home: "Home",
    nav_text_converter: "Text Konverter",
    nav_color_text: "Farbtext",
    nav_items: "Items Datenbank",
    nav_mobs: "Mobs Datenbank",
    nav_server_status: "Server Status",
    nav_skin_lookup: "Skin Lookup",
    nav_skin_editor: "Skin Editor",
    nav_beacon_mixer: "Beacon Farbmischer",
    nav_day_night_cycle: "Tag-Nacht-Zyklus",
    nav_end_poem: "End Poem",
    nav_capes: "Cape-Datenbank",
    nav_skins: "Skin-Bibliothek",
    // Dropdowns
    tools_dropdown: "Werkzeuge",
    discover_dropdown: "Entdecken",
    // Theme
    theme_overworld: "Overworld",
    theme_nether: "Nether",
    theme_end: "The End",
    theme_select: "Theme auswählen:",
    // Sound & Language
    sound_toggle: "Sound",
    language: "Sprache",
    // Hero
    faq_hero_title: "Häufig gestellte <span class=\"highlight\">Fragen</span>",
    hero_badge: "V 1.0.0 ist da",
    faq_hero_desc: "Finde schnell Antworten auf deine Fragen zu MC-Craft. Unsere umfassende FAQ-Sammlung hilft dir bei allen Themen rund um unsere Tools.",
    faq_hero_btn_faq: "FAQ entdecken",
    faq_hero_btn_contact: "Kontakt aufnehmen",
    faq_grid_faq: "FAQ",
    faq_grid_tips: "Tipps",
    faq_grid_support: "Support",
    faq_grid_guides: "Anleitungen",
    // FAQ Section
    faq_section_title: "<span class=\"highlight\">FAQ</span> - Häufige Fragen",
    faq_section_subtitle: "Antworten auf die am häufigsten gestellten Fragen zu MC-Craft",
    faq_search_placeholder: "Stelle deine Frage oder suche nach einem Begriff...",
    faq_search_btn: "Suchen",
    faq_search_hint: "Tipp: Gib ein Stichwort ein oder klicke auf eine Frage für die Antwort",
    // Kategorien
    faq_category_all: "Alle Fragen",
    faq_category_general: "Allgemein",
    faq_category_tools: "Tools",
    faq_category_technical: "Technisch",
    faq_category_general_title: "Allgemeine Fragen",
    faq_category_tools_title: "Tools & Funktionen",
    faq_category_technical_title: "Technische Fragen",
    // Fragen & Antworten
    faq_q1_title: "Was ist MC-Craft?",
    faq_q1_subtitle: "Alles über unsere Plattform und ihre Ziele",
    faq_q1_answer: "MC-Craft ist eine umfassende Plattform für Minecraft-Spieler, die verschiedene Tools und Informationen bietet. Dazu gehören Textkonverter für Minecraft-Formatierungen, detaillierte Informationen zu Items und Mobs, Skin-Lookup-Funktionen und Server-Status-Checks. Unsere Plattform ist komplett kostenlos und wird kontinuierlich erweitert.",
    faq_q2_title: "Ist MC-Craft kostenlos?",
    faq_q2_subtitle: "Informationen zu Kosten und Nutzung",
    faq_q2_answer: "Ja, MC-Craft ist komplett kostenlos! Wir glauben, dass alle Minecraft-Spieler Zugang zu nützlichen Tools und Informationen haben sollten, ohne dafür bezahlen zu müssen. Es gibt keine versteckten Kosten oder Abonnements.",
    faq_q3_title: "Brauche ich ein Konto, um MC-Craft zu nutzen?",
    faq_q3_subtitle: "Informationen zur Anmeldung",
    faq_q3_answer: "Nein, für die meisten Funktionen von MC-Craft benötigst du kein Benutzerkonto. Alle Tools können sofort und ohne Anmeldung genutzt werden. Wir speichern keine persönlichen Daten, es sei denn, du nutzt bestimmte Funktionen, die das erfordern.",
    faq_q4_title: "Wie funktioniert der Text-Konverter?",
    faq_q4_subtitle: "Anleitung zur Nutzung des Text-Konverters",
    faq_q4_answer: "Der Text-Konverter wandelt normalen Text in das Minecraft-Standard-Galaktische-Alphabet um. Gib einfach deinen gewünschten Text in das Eingabefeld ein, und der Konverter erzeugt sofort die entsprechende Minecraft-Formatierung.",
    faq_q5_title: "Kann ich farbigen Text mit dem Konverter erstellen?",
    faq_q5_subtitle: "Farbtext und Formatierungsoptionen",
    faq_q5_answer: "Ja, unser Color Text Konverter ermöglicht das Erstellen von farbigem Text für Minecraft. Du kannst verschiedene Farbcodes und Formatierungsoptionen (fett, kursiv, durchgestrichen) auswählen, um deinen Text individuell zu gestalten.",
    faq_q6_title: "Wie kann ich einen Minecraft-Skin nachschlagen?",
    faq_q6_subtitle: "Skin Lookup Funktionalität",
    faq_q6_answer: "Um einen Skin nachzuschlagen, gib einfach den Benutzernamen des Spielers in das Suchfeld auf der Skin-Lookup-Seite ein. Das Tool sucht dann in der Minecraft-Datenbank nach dem Skin, der UUID und eventuell verfügbaren Capes.",
    faq_q9_title: "Was finde ich in der Items-Datenbank?",
    faq_q9_subtitle: "Item-Infos und Eigenschaften nachschlagen",
    faq_q9_answer: "Die Items-Datenbank listet alle Minecraft-Items nach Kategorien (Baumaterialien, Werkzeuge, Nahrung, Redstone u.v.m.) mit Bild, ID, Eigenschaften und Beschreibung. Nutze die Suche oder die Kategorie-Filter, um schnell das gesuchte Item zu finden.",
    faq_q10_title: "Was zeigt mir die Mobs-Datenbank?",
    faq_q10_subtitle: "Kreaturen, Werte und Drops",
    faq_q10_answer: "In der Mobs-Datenbank findest du alle Minecraft-Kreaturen mit Lebenspunkten, Verhalten, Spawn-Bedingungen und Drops – sortiert nach Kategorien wie Passiv, Neutral, Feindlich und Boss-Mobs.",
    faq_q11_title: "Wie funktioniert der Server-Status-Check?",
    faq_q11_subtitle: "Minecraft-Server live überprüfen",
    faq_q11_answer: "Gib die Adresse eines Minecraft-Servers ein, und das Tool zeigt dir in Echtzeit, ob der Server online ist, wie viele Spieler gerade aktiv sind, die aktuelle Version und weitere Informationen.",
    faq_q12_title: "Was zeigt die Minecraft API Status-Seite?",
    faq_q12_subtitle: "Verfügbarkeit der offiziellen Mojang-Dienste",
    faq_q12_answer: "Diese Seite prüft live den Status der wichtigsten offiziellen Mojang-/Microsoft-Dienste (z.B. Login-Server, Session-Server, Minecraft.net) und zeigt dir sofort, ob es aktuell Probleme oder Ausfälle gibt.",
    faq_q13_title: "Wie funktioniert der Skin Editor?",
    faq_q13_subtitle: "Minecraft-Skins direkt im Browser bearbeiten",
    faq_q13_answer: "Mit dem Skin Editor kannst du einen bestehenden Skin laden oder eine neue Vorlage erstellen und ihn direkt im Browser in einer 3D-Vorschau pixelweise bearbeiten – ganz ohne zusätzliche Software.",
    faq_q14_title: "Was macht der Tag-Nacht-Zyklus-Simulator?",
    faq_q14_subtitle: "Minecraft-Tageszeiten visualisieren",
    faq_q14_answer: "Dieses Tool simuliert visuell den Tag-Nacht-Zyklus von Minecraft, damit du z.B. nachvollziehen kannst, wann Monster spawnen können oder wie lange ein In-Game-Tag in Echtzeit dauert.",
    faq_q15_title: "Was ist die End Poem-Seite?",
    faq_q15_subtitle: "Der Abspann-Text von Minecraft",
    faq_q15_answer: "Hier findest du das bekannte \"End Poem\" – den Text, der nach dem Besiegen des Enderdrachen im Abspann erscheint – in Ruhe zum Nachlesen.",
    faq_q16_title: "Was ist die Cape-Datenbank?",
    faq_q16_subtitle: "Alle Minecraft-Umhänge im Überblick",
    faq_q16_answer: "Die Cape-Galerie zeigt dir alle bekannten Minecraft-Umhänge (Capes) – von offiziellen Mojang-Capes über Event-Capes bis zu besonderen Community-Capes – inklusive Bild und Herkunft.",
    faq_q17_title: "Was bietet die Minecraft-Versionsübersicht?",
    faq_q17_subtitle: "Alle Releases im Überblick",
    faq_q17_answer: "Diese Seite listet alle Minecraft-Versionen von den ersten Alpha-Builds bis zum aktuellen Release, inklusive Veröffentlichungsdatum und Versionstyp (Release, Snapshot, Beta).",
    faq_q18_title: "Was ist die Skin-Bibliothek?",
    faq_q18_subtitle: "Skins ansehen und als Inspiration nutzen",
    faq_q18_answer: "In der Skin-Galerie findest du eine Sammlung bekannter und beliebter Minecraft-Skins zur Ansicht und als Inspiration für deinen eigenen Skin.",
    faq_q19_title: "Wofür ist der Beacon Color Mixer?",
    faq_q19_subtitle: "Beacon-Farben berechnen",
    faq_q19_answer: "Der Beacon Color Mixer berechnet, welche Kombination an gefärbtem Glas du über einem Beacon stapeln musst, um genau die gewünschte Lichtfarbe zu erhalten.",
    faq_q20_title: "Wie funktioniert der QR-Code-Generator?",
    faq_q20_subtitle: "QR-Codes z.B. für Server-IPs erstellen",
    faq_q20_answer: "Gib einen beliebigen Text oder Link ein (z.B. deine Server-IP), und das Tool erzeugt sofort einen QR-Code zum Herunterladen – praktisch zum schnellen Teilen mit Freunden.",
    faq_q21_title: "Was macht der Advancement Generator?",
    faq_q21_subtitle: "Eigene Fortschritts-Benachrichtigungen erstellen",
    faq_q21_answer: "Mit dem Advancement Generator kannst du eigene, individuelle Minecraft-Fortschritts-Benachrichtigungen (Advancement-Toasts) gestalten und als Bild herunterladen – z.B. für Videos oder Thumbnails.",
    faq_q7_title: "Funktioniert MC-Craft auf mobilen Geräten?",
    faq_q7_subtitle: "Responsive Design und mobile Nutzung",
    faq_q7_answer: "Ja, MC-Craft ist vollständig responsive und funktioniert auf Smartphones, Tablets und Desktop-Computern. Die Benutzeroberfläche passt sich automatisch an die Bildschirmgröße an, sodass du alle Funktionen auch unterwegs nutzen kannst.",
    faq_q8_title: "Welche Browser werden unterstützt?",
    faq_q8_subtitle: "Browser-Kompatibilität",
    faq_q8_answer: "MC-Craft unterstützt alle modernen Browser, darunter Chrome (empfohlen), Brave, Firefox, Safari und Edge. Für ältere Browser (Internet Explorer) wird MC-Craft möglicherweise nicht korrekt funktionieren.",
    // No Results
    faq_no_results_title: "Keine Ergebnisse gefunden",
    faq_no_results_desc: "Versuche es mit anderen Suchbegriffen oder stelle uns deine Frage direkt.",
    faq_no_results_btn: "Frage stellen",
    // CTA
    faq_cta_title: "Frage nicht gefunden?",
    faq_cta_desc: "Du hast eine spezifische Frage, die hier nicht beantwortet wird? Kontaktiere unser Support-Team direkt - wir helfen dir gerne weiter!",
    faq_cta_btn_contact: "Kontakt aufnehmen",
    faq_cta_btn_support: "Support kontaktieren",
    // Footer
    footer_description: "Kostenlose Minecraft-Tools für die Community. Entwickelt von Spielern für Spieler.",
    footer_tools: "Tools",
    footer_more_tools: "Mehr Tools",
    footer_legal: "Rechtliches",
    footer_about: "Über Uns",
    footer_support: "Support",
    footer_impressum: "Impressum",
    footer_privacy: "Datenschutz",
    footer_terms: "Nutzungsbedingungen",
    footer_copyright: "Copyright",
    capes_db_title: "Cape-Datenbank",
    skins_library_title: "Skin-Bibliothek",
    footer_history: "MC-Craft Geschichte",
    footer_team: "Unser Team",
    footer_about_us: "Über uns",
    footer_faq: "FAQ & Hilfe",
    footer_bug: "Bug melden",
    footer_support_contact: "Support Kontakt",
    footer_rights: "Alle Rechte vorbehalten.",
    footer_disclaimer: "Minecraft ist eine Marke von Mojang Studios. Diese Seite ist nicht offiziell mit Mojang oder Microsoft verbunden.",
    footer_version: "Version 1.0.0",
    footer_changelog: "Changelog",
    // Toast-Benachrichtigungen
    toast_welcome_title: "FAQ-Seite geladen!",
    toast_welcome_message: "Finde Antworten auf deine Fragen!",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound an",
    toast_sound_off: "Sound aus",
    toast_language_title: "Sprache",
    toast_language_de: "Deutsch",
    toast_language_en: "Englisch",
    toast_theme_title: "Theme",
    toast_theme_changed: "Theme geändert",
    toast_theme_to: "Zu {theme} gewechselt",
    toast_error_title: "Oops!",
    toast_error_message: "Ein kleiner Fehler ist aufgetreten. Die Seite funktioniert weiterhin.",
    toast_online_title: "Verbindung wiederhergestellt",
    toast_online_message: "Du bist wieder online!",
    toast_offline_title: "Offline Modus",
    toast_offline_message: "Einige Funktionen sind möglicherweise nicht verfügbar.",
    // Such-Ergebnis Toast
    faq_search_results: "{count} Ergebnis|{count} Ergebnisse|{count} Ergebnisse",
    faq_filter_all: "Zeige alle Fragen",
    faq_category_filtered: "Gefiltert",
    // Loader
    loader_text1_faq: "MC-Craft FAQ wird geladen...",
    loader_text2: "Fragen werden abgerufen...",
    loader_text3: "Suchfunktion wird vorbereitet...",
    loader_text4: "Kategorien werden geladen...",
    loader_text5: "Fast fertig..."
};

// DOM Elements

const faqSearch = document.getElementById('faqSearch');
const searchBtn = document.getElementById('searchBtn');
const categoryButtons = document.querySelectorAll('.category-btn');
const faqItems = document.querySelectorAll('.faq-item');
const noResults = document.getElementById('noResults');

// Sound-Elemente

// ===== HILFSFUNKTIONEN =====
// ===== INITIALISIERUNG =====
window.addEventListener('DOMContentLoaded', () => {
    initPageAnalytics();
    initFAQFunctionality();
    initFAQSearch();
    initFAQCategories();
});

// ===== AUDIO =====

// ===== SOUND TOGGLE =====

// ===== LOADER =====

// ===== THEME SYSTEM =====

// ===== MOBILE MENU =====

// ===== THEME SWITCHER =====

// ===== SCROLL EFFECTS =====

// ===== TOAST =====

// ===== FOOTER YEAR =====

// ===== PAGE ANALYTICS =====
function initPageAnalytics() {
    console.log('MC-Craft FAQ-Seite geladen');
}

// ===== FAQ FUNCTIONALITY =====
function initFAQFunctionality() {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active', !isActive);
            
            playClickSound();
            
            // Scroll to item if it was closed and is being opened
            if (!isActive) {
                setTimeout(() => {
                    const headerHeight = header.offsetHeight;
                    const itemPosition = item.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: itemPosition,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
    });
}

// ===== FAQ SEARCH FUNCTIONALITY =====
function initFAQSearch() {
    if (!faqSearch || !searchBtn) return;
    
    searchBtn.addEventListener('click', performSearch);
    
    faqSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    let searchTimeout;
    faqSearch.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 300);
    });
    
    function performSearch() {
        const searchTerm = faqSearch.value.trim().toLowerCase();
        let hasResults = false;
        let visibleCount = 0;
        
        if (searchTerm === '') {
            // Reset to show all items
            faqItems.forEach(item => {
                item.style.display = 'block';
                item.classList.remove('highlight');
                
                // Remove highlight from text (reset to original content)
                const question = item.querySelector('.faq-question h4');
                const answer = item.querySelector('.faq-answer p');
                
                if (question) {
                    const key = question.getAttribute('data-i18n');
                    if (key) question.innerHTML = t(key);
                }
                if (answer) {
                    const key = answer.getAttribute('data-i18n');
                    if (key) answer.innerHTML = t(key);
                }
            });
            
            noResults.style.display = 'none';
            updateCategoryVisibility();
            return;
        }
        
        // Search through all FAQ items
        faqItems.forEach(item => {
            const questionEl = item.querySelector('.faq-question h4');
            const answerEl = item.querySelector('.faq-answer p');
            
            if (!questionEl || !answerEl) return;
            
            // Use the translation keys to get current language text for search
            const qKey = questionEl.getAttribute('data-i18n');
            const aKey = answerEl.getAttribute('data-i18n');
            const questionText = qKey ? t(qKey).toLowerCase() : questionEl.textContent.toLowerCase();
            const answerText = aKey ? t(aKey).toLowerCase() : answerEl.textContent.toLowerCase();
            
            if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                item.style.display = 'block';
                item.classList.add('highlight');
                hasResults = true;
                visibleCount++;
                
                // Highlight the search term
                highlightText(questionEl, searchTerm);
                highlightText(answerEl, searchTerm);
                
                // Open the item to show the answer
                item.classList.add('active');
            } else {
                item.style.display = 'none';
                item.classList.remove('highlight');
                item.classList.remove('active');
            }
        });
        
        if (hasResults) {
            noResults.style.display = 'none';
            const msg = t('faq_search_results').split('|');
            let resultText = '';
            if (visibleCount === 1) resultText = msg[0].replace('{count}', visibleCount);
            else if (visibleCount >= 2 && visibleCount <= 4) resultText = msg[1].replace('{count}', visibleCount);
            else resultText = msg[2].replace('{count}', visibleCount);
            
            showToast(t('faq_search_btn'), resultText, 'success');
        } else {
            noResults.style.display = 'block';
        }
        
        updateCategoryVisibility();
        playClickSound();
    }
    
    function highlightText(element, searchTerm) {
        const text = element.textContent;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        element.innerHTML = text.replace(regex, '<mark class="search-highlight">$1</mark>');
    }
    
    function updateCategoryVisibility() {
        document.querySelectorAll('.faq-category').forEach(category => {
            const items = category.querySelectorAll('.faq-item');
            const visibleItems = Array.from(items).filter(item => 
                item.style.display !== 'none'
            );
            category.style.display = visibleItems.length === 0 ? 'none' : 'block';
        });
    }
}

// ===== FAQ CATEGORIES FILTER =====
function initFAQCategories() {
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            faqItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    item.classList.remove('active'); // Close all items when filtering
                } else {
                    item.style.display = 'none';
                }
            });
            
            updateCategoryVisibilityAfterFilter(category);
            playClickSound();
            
            // Show notification
            if (category === 'all') {
                showToast(t('faq_category_all'), t('faq_filter_all'), 'info');
            } else {
                const catName = getCategoryName(category);
                showToast(t('faq_category_filtered'), `${t('faq_category_filtered')}: ${catName}`, 'info');
            }
        });
    });
    
    function updateCategoryVisibilityAfterFilter(category) {
        document.querySelectorAll('.faq-category').forEach(cat => {
            if (category === 'all') {
                cat.style.display = 'block';
            } else if (cat.id === `category-${category}`) {
                cat.style.display = 'block';
            } else {
                cat.style.display = 'none';
            }
        });
    }
    
    function getCategoryName(category) {
        switch(category) {
            case 'general': return t('faq_category_general');
            case 'tools': return t('faq_category_tools');
            case 'technical': return t('faq_category_technical');
            default: return category;
        }
    }
}

// ===== WINDOW RESIZE HANDLER =====

// ===== KLICK-SOUND FÜR ALLE INTERAKTIVEN ELEMENTE =====

// ===== STYLE FÜR SUCH-HIGHLIGHT =====
const style = document.createElement('style');
style.textContent = `
    .search-highlight {
        background-color: rgba(255, 215, 0, 0.3);
        color: #d8721e;
        padding: 2px 4px;
        border-radius: 3px;
        font-weight: bold;
    }
    
    .faq-item.highlight {
        border-color: var(--primary);
        box-shadow: 0 0 0 2px rgba(0, 168, 107, 0.2);
    }
`;
document.head.appendChild(style);

// ===== ERROR HANDLING =====

// ===== OFFLINE SUPPORT =====

// ===== EXPORT FUNCTIONS FOR HTML =====
window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playClickSound();
};
