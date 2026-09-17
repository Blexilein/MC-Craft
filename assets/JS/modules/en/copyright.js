// Copyright Page JavaScript 

// ===== CONFIGURATION =====

// Translations (English only)
const T = {
    site_title_copyright: "MC-Craft | Copyright Information",
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
    copyright_hero_title: "Copyright <span class=\"highlight\">Information</span>",
    hero_badge: "V 1.0.0 is here",
    copyright_hero_desc: "Legal notices and license information for MC-Craft. All important information about copyright and terms of use.",
    copyright_hero_btn_legal: "Legal notices",
    copyright_hero_btn_quick: "Quick access",
    copyright_grid_copyright: "Copyright",
    copyright_grid_legal: "Legal",
    copyright_grid_privacy: "Privacy",
    copyright_grid_licenses: "Licenses",
    copyright_section_title: "<span class=\"highlight\">Legal</span> Information",
    copyright_section_subtitle: "All important legal notices and license information at a glance",
    copyright_card1_title: "Minecraft Copyright",
    copyright_card1_line1: "<strong>Minecraft™</strong> is a registered trademark of <strong>Mojang Studios</strong>. All rights reserved.",
    copyright_card1_line2: "This website uses assets and concepts from Minecraft in compliance with the <a href=\"https://www.minecraft.net/en-us/terms\" target=\"_blank\" class=\"legal-link\">Mojang guidelines</a>.",
    copyright_card1_line3: "MC-Craft is an independent fan website and is not affiliated with Mojang Studios or Microsoft.",
    copyright_card1_line4: "To be clear: our own source code, our own text, graphics, and our logo and design are exclusively our property (see Website License). Minecraft textures, sounds, names, trademarks and models, on the other hand, remain the property of Mojang Studios and Microsoft and are subject to their own terms of use.",
    copyright_card1_line5: "This disclaimer alone does not automatically mean that every use of such Minecraft/Mojang content is permitted – the official <a href=\"https://www.minecraft.net/en-us/terms\" target=\"_blank\" class=\"legal-link\">Minecraft Terms of Use</a> are always decisive.",
    copyright_card2_title: "Website License",
    copyright_card2_line1: "<strong>Copyright © 2026 MC-Craft.</strong> All rights reserved, except as otherwise stated below.",
    copyright_card2_line2: "The source code we developed ourselves (HTML, CSS, JavaScript) is not under any open license either (see <a href=\"https://github.com/Blexilein/MC-Craft/blob/main/LICENSE\" target=\"_blank\" class=\"legal-link\">LICENSE</a>). It may not be copied, modified, distributed or self-hosted without written permission; viewing it on GitHub is allowed.",
    copyright_card2_line3: "The same applies to text, the \"MC-Craft\" name, the logo, and our own graphics and other editorial content. Use, reproduction, or modification is only permitted with the express written permission of the rights holder (requests to contact@mc-craft.com).",
    copyright_card2_line4: "Not officially affiliated with Mojang or Microsoft.",
    copyright_card3_title: "Privacy",
    copyright_card3_line1: "We do not store any personal data without consent. All tools work client-side in the browser.",
    copyright_card3_line2: "For detailed information, see our complete <a href=\"/blog/datenschutz.html\" class=\"legal-link\">Privacy Policy</a>.",
    copyright_card3_line3: "We focus on data minimization and transparency in data processing.",
    copyright_card4_title: "Terms of Use",
    copyright_card4_line1: "Use of this website is subject to our <a href=\"/blog/nutzungsbedingungen.html\" class=\"legal-link\">Terms of Use</a>.",
    copyright_card4_line2: "All tools are provided free of charge. No warranty is assumed for functionality or availability.",
    copyright_card4_line3: "Misuse of the website or tools is not permitted.",
    copyright_card5_title: "Disclaimer",
    copyright_card5_line1: "The contents of this website have been created with the utmost care. However, we cannot guarantee the accuracy, completeness and timeliness of the content.",
    copyright_card5_line2: "As a service provider, we are responsible for our own content on these pages under general laws.",
    copyright_card6_title: "Contact & Imprint",
    copyright_card6_line1: "For legal inquiries, please contact us via our <a href=\"/blog/impressum.html\" class=\"legal-link\">Imprint</a>.",
    copyright_card6_line2: "For support inquiries, please use our <a href=\"/blog/e-mails.html\" class=\"legal-link\">Email</a> or <a href=\"/blog/support.html\" class=\"legal-link\">Support</a> page.",
    copyright_card7_title: "Libraries Used & Licenses",
    copyright_card7_line1: "MC-Craft uses the following open-source libraries, which we self-host to protect your privacy (see our <a href=\"/blog/datenschutz.html\" class=\"legal-link\">Privacy Policy</a>):",
    copyright_card7_li1: "<strong>Font Awesome Free</strong> – Icons: CC BY 4.0 License, Fonts: SIL OFL 1.1, Code: MIT License",
    copyright_card7_li2: "<strong>Google Fonts</strong> (Chakra Petch, Space Grotesk) – SIL Open Font License 1.1",
    copyright_card7_li3: "<strong>three.js</strong> – MIT License",
    copyright_card7_li4: "<strong>SkinView3D</strong> – MIT License",
    copyright_card7_li5: "<strong>QRCode.js</strong> (davidshimjs) – MIT License",
    copyright_card7_line2: "The respective copyrights and license terms of the libraries listed above remain unaffected and apply in addition to our own content.",
    copyright_quicklinks_title: "Quick access to legal documents",
    copyright_quicklink_impressum: "Imprint",
    copyright_quicklink_privacy: "Privacy Policy",
    copyright_quicklink_terms: "Terms of Use",
    copyright_quicklink_email: "Email Contact",
    copyright_quicklink_support: "Support",
    copyright_quicklink_bug: "Report Bug",
    copyright_notice_title: "Important Notice",
    copyright_notice_text: "This website is a fan project and is not officially affiliated with Mojang Studios or Microsoft. Minecraft is a trademark of Mojang Studios. All tools offered here are free and are solely intended to support the Minecraft community.",
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
    toast_welcome_title: "Copyright page loaded!",
    toast_welcome_message: "All legal information at a glance",
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
    loader_text1_copyright: "MC-Craft Copyright is loading...",
    loader_text2: "Retrieving legal information...",
    loader_text3: "Loading license information...",
    loader_text4: "Almost done...",
    loader_text5: "Almost done..."
};

// DOM Elements

const quickLinks = document.querySelectorAll('.quick-link');

// Sound Elements

// ===== HELPER FUNCTIONS =====
// ===== INITIALIZATION =====
window.addEventListener('DOMContentLoaded', () => {
    initPageAnalytics();
    initQuickLinks();
});

// ===== AUDIO =====

// ===== SOUND TOGGLE =====

// ===== LOADER (adjusted) =====

// ===== THEME SYSTEM =====

// ===== MOBILE MENU =====

// ===== THEME SWITCHER =====

// ===== SCROLL EFFECTS =====

// ===== TOAST =====

// ===== FOOTER YEAR =====

// ===== PAGE ANALYTICS =====
function initPageAnalytics() {
    console.log('MC-Craft Copyright page loaded');
}

// ===== QUICK LINKS =====
function initQuickLinks() {
    quickLinks.forEach(link => {
        link.addEventListener('click', () => {
            playClickSound();
        });
    });
}

// ===== WINDOW RESIZE HANDLER =====

// ===== CLICK SOUND FOR ALL INTERACTIVE ELEMENTS =====

// ===== STYLE FOR LEGAL LINKS (from Original) =====
const style = document.createElement('style');
style.textContent = `
    .legal-link {
        color: var(--primary);
        text-decoration: none;
        font-weight: 500;
        transition: all var(--transition-fast);
        position: relative;
        padding: 2px 4px;
        border-radius: 3px;
    }
    
    .legal-link:hover {
        text-decoration: underline;
        background-color: rgba(0, 168, 107, 0.1);
    }
    
    .legal-card {
        transition: all var(--transition-normal);
    }
    
    .legal-card:hover {
        border-color: var(--primary);
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
    }
    
    .quick-link {
        transition: all var(--transition-normal);
    }
    
    .quick-link:hover {
        background-color: rgba(0, 168, 107, 0.1);
        border-color: var(--primary);
        color: var(--primary);
        transform: translateY(-3px);
        box-shadow: var(--shadow-md);
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
