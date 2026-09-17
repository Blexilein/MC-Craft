// Changelog Page JavaScript

// ===== CONFIGURATION =====

// Text strings for this page (English only)
const T = {
    site_title_changelog: "MC-Craft | Changelog",
    site_title_short: "MC-Craft",
    nav_home: "Home",
    nav_text_converter: "Text Converter",
    nav_color_text: "Color Text",
    nav_items: "Items Database",
    nav_mobs: "Mobs Database",
    nav_server_status: "Server Status",
    nav_skin_lookup: "Skin Lookup",
    nav_skin_editor: "Skin Editor",
    nav_day_night_cycle: "Day-Night Cycle",
    nav_end_poem: "End Poem",
    nav_capes: "Capes Database",
    nav_skins: "Skin Library",
    nav_beacon_mixer: "Beacon Color Mixer",
    tools_dropdown: "Tools",
    discover_dropdown: "Discover",
    theme_overworld: "Overworld",
    theme_nether: "Nether",
    theme_end: "The End",
    theme_select: "Choose Theme:",
    sound_toggle: "Sound",
    language: "Language",
    changelog_hero_title: "MC-Craft <span class=\"highlight\">Changelog</span>",
    hero_badge: "V 1.0.0 is here",
    changelog_hero_desc: "All updates, changes and new features of MC-Craft. Here you can find all versions and what has changed.",
    changelog_btn_latest: "View Version 1.0",
    changelog_btn_history: "Learn More",
    changelog_grid_updates: "Updates",
    changelog_grid_bugfixes: "Bugfixes",
    changelog_grid_features: "New Features",
    changelog_grid_improvements: "Improvements",
    changelog_latest_title: "Current <span class=\"highlight\">Version</span>",
    changelog_latest_subtitle: "All final changes for the official 1.0.0 release",
    changelog_v150_version: "v1.0.0",
    changelog_v150_date: "August 22, 2026",
    changelog_v150_title: "Release 1.0.0: Modern Rework & Stable Launch",
    changelog_category_new: "New Features",
    change_type_new: "NEW",
    changelog_v150_feature1: "A unified modern design system across all pages",
    changelog_v150_feature2: "Fully responsive layout for smartphones, tablets, and desktops",
    changelog_v150_feature3: "Improved navigation with consistent paths and controls",
    changelog_v150_feature4: "Refined German and English UI copy",
    changelog_category_improved: "Improvements",
    change_type_improved: "IMPROVED",
    changelog_v150_improvement1: "Better spacing, typography, and contrast for readability",
    changelog_v150_improvement2: "Improved touch targets and focus states",
    changelog_v150_improvement3: "Optimized image and content behavior on small screens",
    changelog_v150_improvement4: "Faster and more consistent page experience through a shared UI base",
    changelog_category_fixed: "Bugfixes",
    change_type_fixed: "FIXED",
    changelog_v150_fixed1: "Fixed inconsistent links to the Skin Editor",
    changelog_v150_fixed2: "Standardized version labels to 1.0.0 on all pages",
    changelog_v150_fixed3: "Cleaned up UI language inconsistencies",
    changelog_v150_fixed4: "Hardened baseline mobile navigation behavior",
    changelog_v150_notes_title: "Notes",
    changelog_v150_notes: "Version 1.0.0 is MC-Craft's consolidated modern baseline: responsive, consistent, stable, and clearly structured.",
    changelog_history_title: "Version <span class=\"highlight\">History</span>",
    changelog_history_subtitle: "All previous versions of MC-Craft",
    changelog_v140_version: "v1.4.0",
    changelog_v140_date: "February 15, 2025",
    changelog_v140_title: "Responsive Design Update",
    changelog_v140_feature1: "Complete mobile optimization",
    changelog_v140_feature2: "Touch-friendly buttons",
    changelog_v140_improvement1: "Performance on mobile devices",
    changelog_v140_fixed1: "Layout issues on tablets",
    changelog_v130_version: "v1.3.0",
    changelog_v130_date: "January 30, 2025",
    changelog_v130_title: "UI/UX Overhaul",
    changelog_v130_feature1: "Modern design system",
    changelog_v130_feature2: "Improved dark mode",
    changelog_v130_improvement1: "Color palette & typography",
    changelog_v130_improvement2: "User friendliness",
    changelog_v120_version: "v1.2.0",
    changelog_v120_date: "January 10, 2025",
    changelog_v120_title: "Tools Update",
    changelog_v120_feature1: "Added Skin Editor",
    changelog_v120_feature2: "Server Status Checker",
    changelog_v120_improvement1: "Text Converter performance",
    changelog_v120_fixed1: "Color text generator bugs",
    changelog_v110_version: "v1.1.0",
    changelog_v110_date: "December 20, 2024",
    changelog_v110_title: "Database Update",
    changelog_v110_feature1: "Items database",
    changelog_v110_feature2: "Mobs Guide",
    changelog_v110_feature3: "Skin Lookup Tool",
    changelog_v110_improvement1: "Database performance",
    changelog_v100_version: "v1.0.0",
    changelog_v100_date: "December 1, 2024",
    changelog_v100_title: "Initial Release",
    changelog_v100_feature1: "MC-Craft website launch",
    changelog_v100_feature2: "Text Converter Tool",
    changelog_v100_feature3: "Color Text Generator",
    changelog_v100_feature4: "Basic structure",
    changelog_future_title: "Planned <span class=\"highlight\">Updates</span>",
    changelog_future_subtitle: "What's coming next?",
    changelog_future_card1_title: "AI Integration",
    changelog_future_card1_desc: "AI-powered tools for Minecraft builders",
    changelog_future_card1_status: "Planning",
    changelog_future_card2_title: "Community Features",
    changelog_future_card2_desc: "User accounts and community area",
    changelog_future_card2_status: "Planned",
    changelog_future_card3_title: "Mobile App",
    changelog_future_card3_desc: "Native iOS & Android App",
    changelog_future_card3_status: "Planned",
    changelog_future_card4_title: "Multilingualism",
    changelog_future_card4_desc: "Support for English & other languages",
    changelog_future_card4_status: "In progress",
    changelog_cta_title: "Stay up to date!",
    changelog_cta_desc: "Don't miss any updates! Follow us for the latest news and upcoming features.",
    changelog_cta_btn_discord: "Discord Community",
    changelog_cta_btn_home: "Back to homepage",
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
    toast_welcome_title: "Changelog loaded!",
    toast_welcome_message: "Discover the latest updates of MC-Craft.",
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
    loader_text1_changelog: "Changelog is loading...",
    loader_text2: "Loading version history...",
    loader_text3: "Analyzing updates...",
    loader_text4: "Almost done...",
    loader_text5: "Almost done..."
};

// DOM Elements

// Sound Elements

// ===== HELPER FUNCTIONS =====
// ===== INITIALIZATION =====
window.addEventListener('DOMContentLoaded', () => {
    initChangelogAnimations();
    initPageAnalytics();
});

// ===== AUDIO =====
function initAudio() {
    try {
        levelUpSound = new Audio('/assets/audio/levelup.ogg');
        levelUpSound.volume = 0.3;
        levelUpSound.preload = 'auto';
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

// ===== LOADER (customized) =====

// ===== THEME SYSTEM =====

// ===== MOBILE MENU =====

// ===== THEME SWITCHER =====

// ===== SCROLL EFFECTS =====

// ===== CHANGELOG ANIMATIONS (Original) =====
function initChangelogAnimations() {
    // Version Cards Animation
    const versionCards = document.querySelectorAll('.version-card');
    
    versionCards.forEach((card, index) => {
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
    
    // Timeline Items Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });
    
    // Upcoming Cards Animation
    const upcomingCards = document.querySelectorAll('.upcoming-card');
    
    upcomingCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });
}

// ===== TOAST =====

// ===== FOOTER YEAR =====

// ===== PAGE ANALYTICS =====
function initPageAnalytics() {
    console.log('MC-Craft Changelog page loaded');
}

// ===== WINDOW RESIZE HANDLER =====

// ===== CLICK SOUND FOR ALL INTERACTIVE ELEMENTS =====

// ===== STYLE FOR TIMELINE VISIBLE (from original) =====
const style = document.createElement('style');
style.textContent = `
    .timeline-item.visible {
        opacity: 1 !important;
        transform: translateX(0) !important;
    }
    
    .timeline-item:nth-child(even).visible {
        transform: translateX(0) !important;
    }
    
    .version-card, .upcoming-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
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
