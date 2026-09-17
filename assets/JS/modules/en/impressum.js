// Imprint Page JavaScript

// ===== CONFIGURATION =====

// Translations (English only)
const T = {
    site_title_impressum: "MC-Craft | Imprint",
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
    impressum_badge: "Legal",
    impressum_hero_title: "Imprint & <span class=\"highlight\">Contact</span>",
    hero_badge: "V 1.0.0 is here",
    impressum_hero_desc: "Legal information and contact details of MC-Craft. We are here for you!",
    impressum_btn_read: "Read Imprint",
    impressum_btn_privacy: "To Privacy Policy",
    impressum_card1_title: "Information according to § 5 DDG",
    impressum_card1_line1: "<strong>MC-Craft</strong><br>Operated by: Mohamad Laith (Blexilein)<br>64297 Darmstadt<br>Germany",
    impressum_card1_line2: "<strong>VAT ID:</strong> Not applicable. MC-Craft is run privately, on a non-commercial basis, and generates no revenue.",
    impressum_card2_title: "Contact",
    impressum_contact_general: "General inquiries:",
    impressum_contact_contact: "Contact:",
    impressum_contact_support: "Support:",
    impressum_contact_bug: "Report a bug:",
    impressum_contact_business: "Business & partnerships:",
    impressum_contact_privacy: "Privacy:",
    impressum_contact_security: "Security:",
    impressum_card2_note: "Please understand that we cannot offer telephone support. For inquiries, please use exclusively the email addresses mentioned above. We handle data-subject requests within the statutory deadlines under the GDPR.",
    impressum_card3_title: "Disclaimer",
    impressum_card3_sub1: "Liability for content",
    impressum_card3_text1: "As a service provider, we are responsible for our own content on these pages under general laws. However, as a service provider we are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information under general law, as well as under Regulation (EU) 2022/2065 (Digital Services Act), remain unaffected. Any liability in this respect is only possible from the point in time at which a specific legal infringement becomes known. Upon becoming aware of any such infringements, we will remove the relevant content immediately.",
    impressum_card3_sub2: "Liability for links",
    impressum_card3_text2: "Our offer contains links to external third-party websites, over whose content we have no influence. Therefore, we cannot assume any liability for this external content. The respective provider or operator of the pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. A permanent review of the linked pages' content without concrete evidence of a violation is unreasonable. Upon becoming aware of any legal violations, we will remove such links immediately.",
    impressum_card3_sub3: "Copyright",
    impressum_card3_text3: "The content and works created by the site operators on these pages are subject to German copyright law. Third-party contributions are identified as such. Duplication, processing, distribution, and any form of commercialization of such material beyond the scope of the copyright law shall require the prior written consent of its respective author or creator.",
    impressum_card4_title: "Privacy",
    impressum_card4_text1: "The use of our website is generally possible without providing personal data. As far as personal data (e.g., name, address, or email addresses) is collected on our pages, this is always done on a voluntary basis as far as possible.",
    impressum_card4_text2: "For more information on data protection, see our <a href=\"/blog/datenschutz.html\">Privacy Policy</a>.",
    impressum_card4_text3: "For more information on our terms of use, see our <a href=\"/blog/nutzungsbedingungen.html\">Terms of Use</a>.",
    impressum_card4_text4: "For more information on our copyright, see our <a href=\"/blog/copyright.html\">Copyright</a> page.",
    impressum_card5_title: "Technologies Used",
    impressum_card5_text: "MC-Craft uses the following technologies and services:",
    impressum_card5_li1: "HTML5, CSS3, JavaScript for frontend development",
    impressum_card5_li2: "Font Awesome for icons (self-hosted)",
    impressum_card5_li3: "Google Fonts (Chakra Petch, Space Grotesk – self-hosted, no direct connection to Google)",
    impressum_card5_li4: "Our own MC-Craft API (api.mc-craft.com), which queries official Minecraft/Mojang services in the background for skin lookups, server status, and more",
    impressum_card5_li5: "Responsive design for mobile devices",
    impressum_card5_li6: "LocalStorage for language, theme, sound and other preferences",
    impressum_card5_li7: "Cookie banner to control optional external content",
    impressum_card5_link: "A full list of every externally contacted service is in our <a href=\"/blog/datenschutz.html\">privacy policy</a>.",
    impressum_card6_title: "Note on Minecraft trademarks",
    impressum_card6_text1: "MC-Craft is a fan project and is not affiliated with Mojang Studios or Microsoft. Minecraft is a registered trademark of Mojang Studios. All rights to Minecraft and related trademarks belong to Mojang Studios and Microsoft.",
    impressum_card6_text2: "This website and its services are in no way associated with Mojang Studios or Microsoft. We respect the rights of the trademark owners and merely provide tools and information for the Minecraft community.",
    impressum_card6_text3: "For the official Minecraft terms of use, privacy policy, and community guidelines, please visit the official Mojang website:",
    impressum_card6_text4: "For more information on Minecraft terms of use, see",
    impressum_card6_text5: "For more information on Minecraft privacy policy, see",
    impressum_card6_text6: "For more information on Minecraft community guidelines, see",
    impressum_card6_note_title: "Important:",
    impressum_card6_note_text: "This site is a fan project and has no official connection to Mojang or Microsoft.",
    impressum_cta_title: "Do you have questions?",
    impressum_cta_desc: "For legal questions or other concerns, we are happy to help.",
    impressum_cta_btn_email: "Write an email",
    impressum_cta_btn_privacy: "View Privacy Policy",
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
    toast_welcome_title: "Imprint page loaded!",
    toast_welcome_message: "Legal information is displayed!",
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
    loader_text1_impressum: "Imprint is loading...",
    loader_text2: "Loading legal information...",
    loader_text3: "Loading contact details...",
    loader_text4: "Loading disclaimer...",
    loader_text5: "Almost done..."
};

// DOM Elements

// Sound Elements

// ===== HELPER FUNCTIONS =====
// ===== INITIALIZATION =====
window.addEventListener('DOMContentLoaded', () => {
    initImpressumCards();
});

// ===== AUDIO =====

// ===== SOUND TOGGLE =====

// ===== LOADER (adjusted) =====

// ===== THEME SYSTEM =====

// ===== MOBILE MENU =====

// ===== THEME SWITCHER =====

// ===== SCROLL EFFECTS =====

// ===== IMPRINT CARDS ANIMATION (Original) =====
function initImpressumCards() {
    const impressumCards = document.querySelectorAll('.impressum-card');
    
    // Add hover effect
    impressumCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Add entrance animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    impressumCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        
        observer.observe(card);
    });
}

// ===== TOAST =====

// ===== FOOTER YEAR =====

// ===== WINDOW RESIZE HANDLER =====

// ===== CLICK SOUND FOR ALL INTERACTIVE ELEMENTS =====

// ===== STYLE FOR LEGAL LINKS (from Original) =====
const style = document.createElement('style');
style.textContent = `
    .impressum-card {
        transition: all var(--transition-normal);
    }
    
    .impressum-card:hover {
        transform: translateY(-8px);
        box-shadow: var(--shadow-xl);
    }
    
    .btn-primary:hover, .btn-secondary:hover, .btn-outline:hover {
        transform: translateY(-2px);
    }
    
    .social-link:hover {
        transform: translateY(-2px);
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
