// Team Page JavaScript

// ===== CONFIGURATION =====

// Text strings for this page (English only)
const T = {
    site_title_team: "MC-Craft | Our Team",
    site_title_short: "MC-Craft",
    // Loader
    loader_text1_team: "MC-Craft Team is loading...",
    loader_text2: "Retrieving team info...",
    loader_text3: "Preparing design...",
    loader_text4: "Loading sound system...",
    loader_text5: "Almost done...",
    // Navigation
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
    team_hero_title: "Our <span class=\"highlight\">Team</span>",
    hero_badge: "V 1.0.0 is here",
    team_hero_desc: "The creative minds behind MC-Craft. Meet the developers and designers who create our Minecraft tools with passion and expertise.",
    team_hero_btn_team: "Meet the Team",
    team_hero_btn_about: "About MC-Craft",
    team_grid_development: "Development",
    team_grid_design: "Design",
    team_grid_support: "Support",
    team_grid_passion: "Passion",
    team_section_title: "The <span class=\"highlight\">MC-Craft</span> Team",
    team_section_subtitle: "Developers, designers and community managers who make our tools possible",
    team_member1_name: "Blexilein",
    team_member1_role: "Founder & Lead Developer",
    team_member1_desc: "Blexilein is the founder of MC-Craft and responsible for the technical implementation. With over 10 years of experience in Minecraft modding, he brings the necessary expertise.",
    team_badge_developer: "Developer",
    team_badge_tech: "Tech",
    skill_js: "JavaScript",
    skill_html_css: "HTML/CSS",
    skill_mc_api: "Minecraft API",
    skill_nodejs: "Node.js",
    team_stat_years: "5+",
    team_stat_years_label: "Years Minecraft Experience",
    team_stat_tools: "16",
    team_stat_tools_label: "Minecraft Tools",
    team_stat_members: "1",
    team_stat_members_label: "Team Members",
    team_stat_passion: "100%",
    team_stat_passion_label: "Passion",
    team_cta_title: "Want to join?",
    team_cta_desc: "We are always looking for talented Minecraft enthusiasts to help us build better tools for the community.",
    team_cta_btn: "Contact us",
    team_cta_general_title: "Learn more about <span class=\"highlight\">MC-Craft</span>?",
    team_cta_general_desc: "Discover our history, our mission and how it all began.",
    team_cta_general_btn_history: "Our History",
    team_cta_general_btn_about: "About Us",
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
    toast_welcome_title: "Team page loaded!",
    toast_welcome_message: "Meet our team!",
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
};

// DOM Elements

// Sound Elements

// ===== HELPER FUNCTIONS =====
// ===== INITIALIZATION =====
window.addEventListener('DOMContentLoaded', () => {
    initPageAnalytics();
    initTeamCards();
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

// ===== ANALYTICS =====
function initPageAnalytics() {
    console.log('MC-Craft Team page loaded');
    document.querySelectorAll('.tool-link, .btn').forEach(link => {
        link.addEventListener('click', function() {
            const toolName = this.textContent.trim() || this.querySelector('span')?.textContent || 'Tool';
            console.log(`Tool opened: ${toolName}`);
        });
    });
}

// ===== TEAM CARDS INTERACTIVITY =====
function initTeamCards() {
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-10px)');
        card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
        const socialLinks = card.querySelectorAll('.social-link');
        socialLinks.forEach(link => link.addEventListener('click', playClickSound));
    });
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ===== CLICK SOUND FOR ALL INTERACTIVE ELEMENTS =====

// ===== LOADING PROGRESS ANIMATION =====
function enhanceLoadingAnimation() {
    const loadingText = document.querySelector('.loading-text');
    if (loadingText) {
        const texts = [
            t('loader_text1_team'),
            t('loader_text2'),
            t('loader_text3'),
            t('loader_text4'),
            t('loader_text5')
        ];
        let index = 0;
        const textInterval = setInterval(() => {
            if (index < texts.length - 1) {
                index++;
                loadingText.textContent = texts[index];
            } else {
                clearInterval(textInterval);
            }
        }, 300);
    }
}
window.addEventListener('load', enhanceLoadingAnimation);

// ===== PERFORMANCE OPTIMIZATION =====
function preloadImages() {
    const images = [
        '/assets/img/icons/grassblock.gif',
        '/assets/img/icons/Lava.gif',
        '/assets/img/icons/crystal.gif',
        '/assets/img/backgrounds/Blexilein_helm.png',
    ];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => console.log(`${src} preloaded`);
        img.onerror = () => console.log(`${src} failed to load`);
    });
}
window.addEventListener('load', preloadImages);

// ===== ERROR HANDLING =====

// ===== OFFLINE SUPPORT =====

// Export functions for HTML onclick
window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playClickSound();
};
