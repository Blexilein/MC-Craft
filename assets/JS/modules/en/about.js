// About Page JavaScript

// ===== CONFIGURATION =====

// Text strings for this page (English only)
const T = {
    site_title_about: "MC-Craft | About Us",
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
    about_hero_title: "About <span class=\"highlight\">MC-Craft</span>",
    hero_badge: "V 1.0.0 is here",
    about_hero_desc: "Your ultimate resource for Minecraft tools and community. Discover the story, mission and values behind MC-Craft.",
    about_hero_btn_mission: "Our Mission",
    about_hero_btn_features: "Features",
    about_grid_founded: "Founded 2026",
    about_grid_tools: "16 Tools",
    about_grid_free: "100% Free",
    about_grid_community: "Community",
    about_history_title: "Our <span class=\"highlight\">History</span>",
    about_history_subtitle: "How it all began and where we're going",
    about_who_title: "Who We Are",
    about_badge_founded: "Founded 2026",
    about_who_desc1: 'MC-Craft was founded in 2026 by me "Blexilein" with the vision of providing high-quality Minecraft tools to the community for free.',
    about_who_desc2: "Our team consists of Minecraft enthusiasts, developers and designers who all share a common passion: Minecraft and its incredible community.",
    about_mission_title: "Our Mission",
    about_badge_vision: "Vision",
    about_badge_goals: "Goals",
    about_mission_desc: "At MC-Craft we believe Minecraft is more than just a game - it's a platform for creativity, learning and community.",
    about_mission_item1: "Provide high-quality tools for free",
    about_mission_item2: "Support and connect the Minecraft community",
    about_mission_item3: "Be a trusted resource for all Minecraft topics",
    about_offer_title: "What We Offer",
    about_badge_tools: "Tools",
    about_badge_resources: "Resources",
    about_offer_desc: "MC-Craft now offers 16 free tools and resources for Minecraft players, including:",
    about_offer_tool1_title: "Text Converter",
    about_offer_tool1_desc: "- Create stylish chat text and formatting codes for your server",
    about_offer_tool2_title: "Skin Lookup",
    about_offer_tool2_desc: "- Find the skin, UUID, and capes for any Minecraft account",
    about_offer_tool3_title: "Items Database",
    about_offer_tool3_desc: "- Comprehensive information on every item and material",
    about_offer_tool4_title: "Mobs Database",
    about_offer_tool4_desc: "- Stats, behavior, and drops for every creature",
    about_offer_tool5_title: "And many more",
    about_offer_tool5_desc: "- from Server Status to the Skin Editor and Advancement Generator. <a href=\"/index.html#tools\">Discover all 16 tools</a>",
    about_features_title: "Why <span class=\"highlight\">MC-Craft?</span>",
    about_features_subtitle: "What makes us unique",
    about_feature1_title: "Powerful Tools",
    about_feature1_desc: "Our tools are regularly updated and improved to provide you with the best Minecraft experience.",
    about_feature2_title: "Community Focus",
    about_feature2_desc: "We listen to our community and develop tools based on your needs and wishes.",
    about_feature3_title: "Secure & Trustworthy",
    about_feature3_desc: "Your data is safe with us. We respect your privacy and protect your information.",
    about_feature4_title: "Always Up-to-Date",
    about_feature4_desc: "We keep all tools and information synchronized with the latest Minecraft updates.",
    about_feature5_title: "Transparent",
    about_feature5_desc: "Our source code can be viewed on GitHub – report bugs and ideas to us at any time.",
    about_feature6_title: "Excellent Support",
    about_feature6_desc: "Our support team helps you with questions and problems regarding our tools.",
    about_values_title: "Our <span class=\"highlight\">Values</span>",
    about_values_subtitle: "The principles we work by",
    about_value1_title: "Transparency",
    about_value1_desc: "We are open and honest about our work and goals.",
    about_value2_title: "Passion",
    about_value2_desc: "Minecraft is our passion, and it shows in our work.",
    about_value3_title: "Community",
    about_value3_desc: "The community is our top priority.",
    about_value4_title: "Innovation",
    about_value4_desc: "We constantly seek new ways to improve Minecraft tools.",
    about_cta_title: "Ready to get started?",
    about_cta_desc: "Discover our collection of Minecraft tools and become part of our growing community.",
    about_cta_btn_home: "Go to Homepage",
    about_cta_btn_tools: "Discover Tools",
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
    toast_welcome_title: "About page loaded!",
    toast_welcome_message: "Learn more about MC-Craft!",
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
    loader_text1_about: "MC-Craft About is loading...",
    loader_text2: "Loading history...",
    loader_text3: "Preparing mission...",
    loader_text4: "Loading features...",
    loader_text5: "Almost done..."
};

// DOM Elements

// Sound Elements

// ===== HELPER FUNCTIONS =====
// ===== INITIALIZATION =====
window.addEventListener('DOMContentLoaded', () => {
    initPageAnalytics();
    initAboutCards();
    initFeatureCards();
});

// ===== AUDIO =====

// ===== SOUND TOGGLE =====

// ===== LOADER (customized) =====

// ===== THEME SYSTEM =====

// ===== MOBILE MENU =====

// ===== THEME SWITCHER =====

// ===== SCROLL EFFECTS =====

// ===== TOAST =====

// ===== FOOTER YEAR =====

// ===== PAGE ANALYTICS =====
function initPageAnalytics() {
    console.log('MC-Craft About page loaded');
}

// ===== ABOUT CARDS INTERACTIVITY =====
function initAboutCards() {
    const aboutCards = document.querySelectorAll('.about-card');
    
    aboutCards.forEach((card, index) => {
        // Add hover animation
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
        // Staggered animation on load
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Add animation to value items
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// ===== FEATURE CARDS INTERACTIVITY =====
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
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
