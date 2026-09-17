// History Page JavaScript

// ===== KONFIGURATION =====

// Texte dieser Seite (nur Deutsch)
const T = {
    // Allgemein
    site_title_history: "MC-Craft | Unsere Geschichte",
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
    nav_day_night_cycle: "Tag-Nacht-Zyklus",
    nav_end_poem: "End Poem",
    nav_capes: "Cape-Datenbank",
    nav_skins: "Skin-Bibliothek",
    nav_beacon_mixer: "Beacon Farbmischer",
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
    hero_badge: "Unsere Geschichte",
    hero_title: "Die Reise von <span class=\"highlight\">MC-Craft</span>",
    hero_badge1: "V 1.0.0 ist da",
    hero_desc: "Von der ersten Idee bis zum stabilen Release 1.0.0: transparent, ehrlich und fokussiert auf Nutzwert.",
    hero_btn_timeline: "Entwicklung ansehen",
    hero_btn_home: "E-Mail Kontakt",
    hero_grid_founded: "Gestartet 2026",
    hero_grid_community: "Für die Community",
    hero_grid_tools: "16 Tools",
    hero_grid_madeby: "Von Spielern gemacht",
    // Timeline
    timeline_section_title: "Unsere <span class=\"highlight\">Zeitreise</span>",
    timeline_section_subtitle: "Die wichtigsten Schritte bis zur Version 1.0.0",
    timeline_item1_date: "März 2026",
    timeline_item1_title: "Die Geburtsstunde",
    timeline_item1_desc: "Alles begann mit dem Ziel, verlässliche Minecraft-Tools ohne unnötige Komplexität bereitzustellen.",
    timeline_item1_list1: "Projektstart und erste Architektur",
    timeline_item1_list2: "Prototypen für Text- und Farbtools",
    timeline_item1_list3: "Erstes internes Test-Setup",
    timeline_item2_date: "2026",
    timeline_item2_title: "Community-Wachstum",
    timeline_item2_desc: "Mit dem Feedback aus der Community wurde aus einem Prototyp eine echte Plattform.",
    timeline_item2_list1: "Ausbau der wichtigsten Tools",
    timeline_item2_list2: "Einheitliche Navigation und Seitenstruktur",
    timeline_item2_list3: "Mehrsprachigkeit (DE/EN) integriert",
    timeline_item2_list4: "Mobile-first Verbesserungen umgesetzt",
    timeline_item3_date: "Version 1.0.0",
    timeline_item3_title: "Stabiler Release",
    timeline_item3_desc: "Mit Version 1.0.0 wurde MC-Craft als konsolidierte, moderne Plattform veröffentlicht.",
    timeline_item3_list1: "Versionierung auf 1.0.0 vereinheitlicht",
    timeline_item3_list2: "Design und Responsiveness modernisiert",
    timeline_item3_list3: "Texte und Übersetzungen verbessert",
    timeline_item3_list4: "Stabilitäts- und Qualitätsfixes abgeschlossen",
    timeline_item4_date: "Dezember 2026",
    timeline_item4_title: "Anerkennung & Ausbau",
    timeline_item4_desc: "MC-Craft wurde in mehreren Minecraft-Communities als beste Tool-Sammlung empfohlen. Wir erweiterten unsere Plattform um neue innovative Tools.",
    timeline_item4_list1: "Empfehlung in großen Minecraft-Communities",
    timeline_item4_list2: "Items Datenbank mit 1.000+ Einträgen",
    timeline_item4_list3: "Kompletter Mobs Guide",
    timeline_item4_list4: "API für Entwickler hinzugefügt",
    timeline_item5_date: "Heute",
    timeline_item5_title: "Die Gegenwart",
    timeline_item5_desc: "Was als kleines Projekt begann, ist heute eine lebendige Plattform mit einer treuen Community. Wir sind stolz darauf, Spielern auf der ganzen Welt zu helfen und das Minecraft-Erlebnis zu verbessern.",
    timeline_item5_list1: "Über 15 nützliche Tools für Spieler und Serverbetreiber",
    timeline_item5_list2: "Aktive Community mit täglichen Interaktionen",
    timeline_item5_list3: "Monatlich über 500.000 zufriedene Nutzer",
    timeline_item5_list4: "Kontinuierliche Verbesserungen basierend auf Feedback",
    history_release_title: "Was Version <span class=\"highlight\">1.0.0</span> ausmacht ✨",
    history_release_desc: "Die 1.0.0 steht für eine konsolidierte Plattform: einheitliches Design, bessere mobile Nutzung, klare Navigation und saubere Übersetzungen in Deutsch und Englisch.",
    history_release_item1_title: "Responsives Rework",
    history_release_item1_desc: "Alle Kernseiten wurden für Smartphone, Tablet und Desktop optimiert.",
    history_release_item2_title: "Bessere Übersetzungen",
    history_release_item2_desc: "Texte wurden sprachlich vereinheitlicht und professioneller formuliert.",
    history_release_item3_title: "Konsistente Navigation",
    history_release_item3_desc: "Verlinkungen und Menüs wurden bereinigt und zuverlässig gemacht.",
    history_release_item4_title: "Stabiler Stand",
    history_release_item4_desc: "Die Plattform ist auf einen stabilen, wartbaren 1.0-Baseline-Stand gebracht.",
    history_release_message: "Fragen zu dieser Entwicklung? Schreib uns direkt per E-Mail oder über Discord.",
    history_release_btn_email: "E-Mail Support",
    // Stats
    stats_section_title: "In <span class=\"highlight\">Zahlen</span>",
    stats_section_subtitle: "Das haben wir bisher erreicht",
    stats_tools: "Verschiedene Tools",
    stats_mobs: "Mobs in Datenbank",
    stats_items: "Items in Datenbank",
    stats_online: "Online",
    // Team
    team_section_title: "Hinter <span class=\"highlight\">MC-Craft</span>",
    team_section_subtitle: "Das Team, das alles möglich macht",
    team_member1_name: "Mohamad Laith",
    team_member1_role: "Gründer & Lead Developer",
    team_member1_bio: "Minecraft-Enthusiast seit 2012. Bringt die Vision und technische Expertise.",
    team_member2_name: "Alex",
    team_member2_role: "Full-Stack Developer",
    team_member2_bio: "Verantwortlich für Backend-APIs und Datenbank-Integrationen.",
    team_member3_name: "Sarah",
    team_member3_role: "UI/UX Designerin",
    team_member3_bio: "Gestaltet die benutzerfreundlichen Interfaces und Theme-Systeme.",
    team_member4_name: "Community Team",
    team_member4_role: "Support & Feedback",
    team_member4_bio: "Unser engagiertes Team, das täglich mit der Community interagiert.",
    // Future
    future_title: "Die <span class=\"highlight\">Zukunft</span> von MC-Craft",
    future_desc: "Unsere Reise ist noch lange nicht zu Ende! Wir arbeiten bereits an aufregenden neuen Funktionen:",
    future_feature1_title: "Minecraft Server Dashboard",
    future_feature1_desc: "Umfassende Server-Statistiken und Management-Tools",
    future_feature2_title: "3D-Skin Editor",
    future_feature2_desc: "Erstelle und bearbeite Skins in einer 3D-Vorschau",
    future_feature3_title: "Redstone Akademie",
    future_feature3_desc: "Lernplattform für Redstone-Schaltungen",
    future_feature4_title: "Community-Marktplatz",
    future_feature4_desc: "Teile und entdecke benutzerdefinierte Inhalte",
    future_message: "Unser Ziel bleibt es, die beste Ressource für Minecraft-Spieler zu sein - jetzt und in Zukunft!",
    future_btn_tools: "Alle Tools entdecken",
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
    toast_welcome_title: "Geschichte-Seite geladen!",
    toast_welcome_message: "Erlebe die Reise von MC-Craft!",
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
    // Loader
    loader_text1_history: "MC-Craft Geschichte wird geladen...",
    loader_text2: "Zeitreise vorbereiten...",
    loader_text3: "Meilensteine sammeln...",
    loader_text4: "Timeline wird erstellt...",
    loader_text5: "Fast fertig..."
};

// DOM Elements

// Sound-Elemente

// ===== HILFSFUNKTIONEN =====
// ===== INITIALISIERUNG =====
window.addEventListener('DOMContentLoaded', () => {
    initCounters();
    initTimelineAnimation();
    initPageAnalytics();
});

// ===== AUDIO =====

// ===== SOUND TOGGLE =====

// ===== LOADER =====

// ===== THEME SYSTEM =====

// ===== MOBILE MENU =====

// ===== THEME SWITCHER =====

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
        backToTop.classList.toggle('show', window.scrollY > 300);
        updateActiveNavLink();
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        playClickSound();
    });
    
    document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header.offsetHeight;
                window.scrollTo({ top: target.offsetTop - headerHeight, behavior: 'smooth' });
                playClickSound();
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}` || 
                   (sectionId === 'home' && link.getAttribute('href') === 'history.html')) {
                    link.classList.add('active');
                }
            });
            
            document.querySelectorAll('.mobile-nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}` ||
                   (sectionId === 'home' && link.getAttribute('href') === 'history.html')) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== TIMELINE ANIMATION =====
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.transitionDelay = `${index * 0.2}s`;
        
        observer.observe(item);
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100);
    });
}

// ===== ANIMATED COUNTERS =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count') || counter.textContent);
                
                if (!counter.dataset.animated) {
                    animateCounter(counter, target);
                    counter.dataset.animated = true;
                }
                
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '50px'
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = Math.floor(duration / 100);
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            clearInterval(timer);
            
            // Special formatting for specific numbers
            if (target === 7) element.textContent = '7';
            else if (target === 90) element.textContent = '90+';
            else if (target === 1000) element.textContent = '1k';
            else if (target === 24) element.textContent = '24/7';
            else element.textContent = target;
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ===== TOAST =====

// ===== FOOTER YEAR =====

// ===== PAGE ANALYTICS =====
function initPageAnalytics() {
    console.log('MC-Craft Geschichte-Seite geladen');
}

// ===== WINDOW RESIZE HANDLER =====

// ===== KLICK-SOUND FÜR ALLE INTERAKTIVEN ELEMENTE =====

// ===== ERROR HANDLING =====

// ===== OFFLINE SUPPORT =====

// ===== EXPORT FUNCTIONS FOR HTML =====
window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playClickSound();
};
