// Terms of Use Page JavaScript

// ===== CONFIGURATION =====

// Translations (English only)
const T = {
    site_title_terms: "MC-Craft | Terms of Use",
    site_title_short: "MC-Craft",
    nav_home: "Home",
    nav_text_converter: "Text Converter",
    nav_color_text: "Color Text",
    nav_items: "Items Database",
    nav_mobs: "Mobs Database",
    nav_server_status: "Server Status",
    nav_skin_lookup: "Skin Lookup",
    nav_skin_editor: "Skin Editor",
    nav_beacon_mixer: "Beacon Color Mixer",
    nav_day_night_cycle: "Day-Night Cycle",
    nav_end_poem: "End Poem",
    nav_capes: "Capes Database",
    nav_skins: "Skin Library",
    tools_dropdown: "Tools",
    discover_dropdown: "Discover",
    theme_overworld: "Overworld",
    theme_nether: "Nether",
    theme_end: "The End",
    theme_select: "Choose Theme:",
    sound_toggle: "Sound",
    language: "Language",
    terms_hero_badge: "Legal",
    terms_hero_title: "Terms of <span class=\"highlight\">Use</span>",
    hero_badge: "V 1.0.0 is here",
    terms_hero_desc: "General terms and conditions for using MC-Craft. Please read these terms carefully.",
    terms_btn_read: "Read Terms",
    terms_btn_privacy: "Privacy Policy",
    terms_grid_legal: "Legally safe",
    terms_grid_privacy: "Privacy",
    terms_grid_transparent: "Transparent",
    terms_grid_fair: "Fair and clear",
    terms_section_title: "General <span class=\"highlight\">Terms and Conditions</span>",
    terms_section_subtitle: "Conditions for using our services",
    terms_toc_title: "Table of Contents",
    terms_toc_link1: "1. Scope",
    terms_toc_link2: "2. Services",
    terms_toc_link3: "3. Right of Use",
    terms_toc_link4: "4. Copyright",
    terms_toc_link5: "5. Limitation of Liability",
    terms_toc_link6: "6. External Links",
    terms_toc_link7: "7. Privacy",
    terms_toc_link8: "8. Changes",
    terms_toc_link9: "9. Final Provisions",
    terms_toc_link10: "10. Contact",
    terms_card1_title: "Scope",
    terms_card1_p1: "These terms of use govern the legal framework for using the MC-Craft website and all related services and offers.",
    terms_card1_p2: "By using our website, you expressly agree to these terms of use. If you do not agree to these terms, you may not use our website.",
    terms_card1_note: "These terms apply to all visitors and users of our platform.",
    terms_card1_note_minors: "Since our services are also of interest to a younger audience, we ask users under 16 to use our offerings only with the consent of a parent or legal guardian.",
    terms_card2_title: "Services",
    terms_card2_p1: "MC-Craft currently offers the following free tools:",
    terms_card2_li1: "Text converter for Minecraft formatting codes",
    terms_card2_li2: "Color text converter",
    terms_card2_li3: "Items database",
    terms_card2_li4: "Mobs database",
    terms_card2_li5: "Server status checks",
    terms_card2_li6: "Minecraft API status",
    terms_card2_li7: "Skin lookup",
    terms_card2_li8: "Skin editor",
    terms_card2_li9: "Day-night cycle simulator",
    terms_card2_li10: "End poem",
    terms_card2_li11: "Capes database (cape gallery)",
    terms_card2_li12: "Minecraft version overview",
    terms_card2_li13: "Skin library (skin gallery)",
    terms_card2_li14: "Beacon color mixer",
    terms_card2_li15: "QR code generator",
    terms_card2_li16: "Advancement generator",
    terms_card2_p2: "All services are offered free of charge and 'as is'. There is no claim to availability, functionality or error-free operation of the services.",
    terms_card2_p3: "We reserve the right to change, extend, temporarily suspend or permanently discontinue individual tools at any time, without this giving rise to any claims against us. Current changes are documented in the <a href=\"/blog/changelog.html\" class=\"highlight-link\">changelog</a>.",
    terms_card3_title: "Right of Use",
    terms_card3_p1: "We grant you a limited, non-exclusive, non-transferable right to use our website and services for personal, non-commercial use.",
    terms_card3_forbidden_title: "The following actions are prohibited:",
    terms_card3_li1: "Automated queries of our services (scraping, crawling)",
    terms_card3_li2: "Use of our services for commercial purposes without permission",
    terms_card3_li3: "Circumventing security measures",
    terms_card3_li4: "Misuse that affects other users",
    terms_card3_li5: "Using our services for illegal purposes",
    terms_card4_title: "Copyright and Intellectual Property",
    terms_card4_p1: "All content, designs, graphics and software on MC-Craft are protected by copyright and remain our property or the property of our licensors.",
    terms_card4_p2: "The Minecraft brands and assets are the property of Mojang Studios and Microsoft. MC-Craft is an independent fan project and is not affiliated with these companies.",
    terms_card4_you_may: "You may:",
    terms_card4_may_li1: "Download content for personal use",
    terms_card4_may_li2: "Use text converter results in Minecraft",
    terms_card4_may_li3: "Reference information for non-commercial purposes",
    terms_card4_you_may_not: "You may not:",
    terms_card4_may_not_li1: "Copy content without permission",
    terms_card4_may_not_li2: "Embed our services on other websites",
    terms_card4_may_not_li3: "Use our trademarks or logos without permission",
    terms_card5_title: "Limitation of Liability",
    terms_card5_not_liable: "We are not liable for:",
    terms_card5_li1: "Accuracy, completeness or timeliness of the information provided",
    terms_card5_li2: "Damages caused by the use or unavailability of our services",
    terms_card5_li3: "Viruses or other harmful components",
    terms_card5_li4: "Acts of third parties who use or misuse our services",
    terms_card5_note: "Liability for intent and gross negligence, as well as any liability that is mandatory under statutory law – in particular for damages arising from injury to life, body, or health, and under product liability law – remains unaffected by the limitations of liability set out above.",
    terms_card6_title: "External Links",
    terms_card6_p1: "Our website may contain links to external third-party websites. We have no control over the content of these websites and assume no liability for them.",
    terms_card6_p2: "The respective provider or operator of the pages is always responsible for the content of the linked pages.",
    terms_card7_title: "Privacy",
    terms_card7_p1: "Your privacy is important to us. We collect and use personal data only within the framework of the legal provisions.",
    terms_card7_p2: "For details on data processing, see our <a href=\"/blog/datenschutz.html\" class=\"highlight-link\">Privacy Policy</a>.",
    terms_card8_title: "Changes to Terms of Use",
    terms_card8_p1: "We reserve the right to change or supplement these terms of use at any time. Changes will be published on this page.",
    terms_card8_p2: "Please check this page regularly for the current version of these terms of use whenever changes are made.",
    terms_card8_note: "Current changes are documented in the <a href=\"/blog/changelog.html\" class=\"highlight-link\">Changelog</a>.",
    terms_card9_title: "Final Provisions",
    terms_card9_governing_law: "German law applies to the exclusion of the UN Convention on Contracts for the International Sale of Goods.",
    terms_card9_place: "Place of performance and jurisdiction is, if legally permissible, our registered office.",
    terms_card9_severability: "If individual provisions of these terms of use are ineffective, the validity of the remaining provisions remains unaffected.",
    terms_card10_title: "Contact",
    terms_card10_p1: "If you have any questions about these terms of use, please contact us at:",
    terms_card10_last_update: "Last updated:",
    terms_card10_note: "These terms of use constitute the entire agreement between you and MC-Craft and supersede all prior agreements.",
    terms_accept_title: "Declaration of Consent",
    terms_accept_desc: "By using our services, you confirm that you have read, understood and accepted these terms of use.",
    terms_accept_btn: "I understand the terms",
    terms_accept_back: "Back to homepage",
    terms_accepted_btn: "Terms already accepted",
    footer_description: "Free Minecraft tools for the community. Developed by players for players.",
    footer_tools: "Tools",
    footer_more_tools: "More Tools",
    footer_legal: "Legal",
    footer_about: "About Us",
    footer_support: "Support",
    footer_impressum: "Imprint",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Use",
    footer_copyright: "Copyright",
    capes_db_title: "Capes Database",
    skins_library_title: "Skin Library",
    footer_history: "MC-Craft History",
    footer_team: "Our Team",
    footer_about_us: "About us",
    footer_faq: "FAQ & Help",
    footer_bug: "Report Bug",
    footer_support_contact: "Support Contact",
    footer_rights: "All rights reserved.",
    footer_disclaimer: "Minecraft is a trademark of Mojang Studios. This site is not officially affiliated with Mojang or Microsoft.",
    footer_version: "Version 1.0.0",
    footer_changelog: "Changelog",
    toast_welcome_title: "Terms of Use loaded!",
    toast_welcome_message: "Please read these terms carefully.",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound on",
    toast_sound_off: "Sound off",
    toast_language_title: "Language",
    toast_language_de: "German",
    toast_language_en: "English",
    toast_theme_title: "Theme",
    toast_theme_changed: "Theme changed",
    toast_theme_to: "Switched to {theme}",
    toast_error_title: "Oops!",
    toast_error_message: "A small error occurred. The page continues to work.",
    toast_online_title: "Connection restored",
    toast_online_message: "You are back online!",
    toast_offline_title: "Offline mode",
    toast_offline_message: "Some features may not be available.",
    toast_accept_title: "Consent confirmed",
    toast_accept_message: "Thank you for your understanding!",
    toast_already_accepted: "Already accepted",
    toast_accepted_on: "Accepted on",
    loader_text1_terms: "Terms of Use are loading...",
    loader_text2: "Preparing legal documents...",
    loader_text3: "Reading terms...",
    loader_text4: "Almost done...",
    loader_text5: "Almost done..."
};

// DOM Elements

const acceptBtn = document.getElementById('acceptBtn');
const tocLinks = document.querySelectorAll('.toc-link');

// Sound Elements

// ===== HELPER FUNCTIONS =====
// ===== INITIALIZATION =====
window.addEventListener('DOMContentLoaded', () => {
    initTermsNavigation();
    initAcceptButton();
    initPageAnalytics();
    initSupportCards();
    checkTermsAcceptance();
});

// ===== AUDIO =====
function initAudio() {
    try {
        levelUpSound = new Audio('/assets/audio/levelup.ogg');
        levelUpSound.volume = 0.3;
        levelUpSound.preload = 'auto';
        levelUpSound.addEventListener('error', () => {
            console.log('Sound file not found, trying default path...');
            levelUpSound = new Audio('/assets/audio/levelup.ogg');
            levelUpSound.volume = 0.3;
        });
    } catch (error) {
        console.log('Failed to initialize audio:', error);
        initWebAudioFallback();
    }
}

function initWebAudioFallback() {
    if (window.AudioContext || window.webkitAudioContext) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            oscillator.start();
            setTimeout(() => oscillator.stop(), 200);
        } catch (error) {
            console.log('Web Audio API fallback failed:', error);
        }
    }
}

// ===== SOUND TOGGLE =====

// ===== LOADER (adjusted) =====

// ===== THEME SYSTEM =====

// ===== MOBILE MENU =====

// ===== THEME SWITCHER =====

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
        backToTop.classList.toggle('show', window.scrollY > 300);
        highlightCurrentSection();
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
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                playClickSound();
            }
        });
    });
}

// ===== TERMS NAVIGATION (Original) =====
function initTermsNavigation() {
    tocLinks.forEach(link => {
        link.addEventListener('click', () => {
            tocLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

function highlightCurrentSection() {
    const sections = document.querySelectorAll('.terms-card');
    const scrollPos = window.scrollY + 150;
    let currentSection = null;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== ACCEPT BUTTON (adjusted for translation) =====
function initAcceptButton() {
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('mc-craft-terms-accepted', 'true');
            localStorage.setItem('mc-craft-terms-accepted-date', new Date().toISOString());
            
            showToast(
                t('toast_accept_title'),
                t('toast_accept_message'),
                'success'
            );
            
            acceptBtn.innerHTML = '<i class="fas fa-check-circle"></i> ' + t('terms_accepted_btn');
            acceptBtn.disabled = true;
            acceptBtn.classList.remove('btn-primary');
            acceptBtn.classList.add('btn-outline');
            
            playClickSound();
        });
    }
}

function checkTermsAcceptance() {
    const accepted = localStorage.getItem('mc-craft-terms-accepted');
    if (accepted === 'true' && acceptBtn) {
        acceptBtn.innerHTML = '<i class="fas fa-check-circle"></i> ' + t('terms_accepted_btn');
        acceptBtn.disabled = true;
        acceptBtn.classList.remove('btn-primary');
        acceptBtn.classList.add('btn-outline');
        
        const acceptedDate = localStorage.getItem('mc-craft-terms-accepted-date');
        if (acceptedDate) {
            const date = new Date(acceptedDate);
            showToast(
                t('toast_already_accepted'),
                `${t('toast_accepted_on')} ${date.toLocaleDateString('en-US')}`,
                'info'
            );
        }
    }
}

// ===== TOAST =====

// ===== FOOTER YEAR =====

// ===== PAGE ANALYTICS =====
function initPageAnalytics() {
    console.log('MC-Craft Terms of Use page loaded');
}

// ===== SUPPORT CARDS INTERACTIVITY (Original) =====
function initSupportCards() {
    const supportCards = document.querySelectorAll('.terms-card, .grid-item, .toc-card');
    
    supportCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ===== WINDOW RESIZE HANDLER =====

// ===== CLICK SOUND FOR ALL INTERACTIVE ELEMENTS =====

// ===== ERROR HANDLING =====

// ===== OFFLINE SUPPORT =====

// ===== EXPORT FUNCTIONS FOR HTML =====
window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playClickSound();
};
