// Support Page JavaScript

// ===== CONFIGURATION =====

// Text strings for this page (English only)
const T = {
    site_title_support: "MC-Craft | Support",
    site_title_short: "MC-Craft",
    site_title_support_email: "MC-Craft | E-Mails",
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
    support_hero_title: "MC-Craft <span class=\"highlight\">Support</span>",
    hero_badge: "V 1.0.0 is here",
    support_hero_desc: "Help and support for all MC-Craft tools. Our team is available to solve problems and answer questions.",
    support_hero_btn_discord: "Discord Support",
    support_hero_btn_email: "Email Page",
    support_grid_discord: "Discord",
    support_grid_email: "Email",
    support_grid_live: "Live Support",
    support_grid_faq: "FAQ",
    email_page_title: "E-Mails <span class=\"highlight\">Contact</span>",
    email_page_desc: "Use direct email contact for bug reports, business requests, and detailed support messages.",
    email_page_btn_contact: "Show Contact",
    email_page_btn_back: "Back to Support",
    email_page_grid1: "Requests",
    email_page_grid2: "Bug Reports",
    email_page_grid3: "Business",
    email_page_grid4: "Response Time",
    email_page_note: "If your case is urgent, use our Discord support as well for faster responses.",
    email_page_btn_discord: "Open Discord",
    email_info_title: "General Inquiries",
    email_info_desc: "General questions about MC-Craft, feedback, and first contact requests.",
    email_contact_title: "Contact",
    email_contact_desc: "General contact requests about MC-Craft, feedback, and notes.",
    email_support_title: "Support",
    email_support_desc: "Questions about usage, help with tools, and technical support.",
    email_bug_title: "Bug Reports",
    email_bug_desc: "Errors, display issues, or unexpected behavior on the website.",
    email_business_title: "Business & Partnerships",
    email_business_desc: "Collaborations, partnerships, press, or business inquiries.",
    email_privacy_title: "Privacy",
    email_privacy_desc: "Requests related to privacy, personal data, or information access.",
    email_security_title: "Security",
    email_security_desc: "Report vulnerabilities or sensitive technical security issues.",
    support_discord_title: "Discord <span class=\"highlight\">Support</span>",
    support_discord_subtitle: "Quick help and community support via our Discord server",
    support_discord_widget_title: "MC-Craft Community Discord",
    support_discord_btn: "Join Discord",
    support_card1_title: "Fast Help",
    support_card1_desc: "Get immediate help from our community and support team. Average response time: 15 minutes.",
    support_card2_title: "Active Community",
    support_card2_desc: "Over 1,000 active members help each other with questions about Minecraft and our tools.",
    support_card3_title: "Developer Contact",
    support_card3_desc: "Talk directly to MC-Craft developers and give feedback on new features.",
    support_card4_title: "Updates & News",
    support_card4_desc: "Stay informed about all updates, new tools and upcoming features.",
    support_features_title: "Why <span class=\"highlight\">Discord?</span>",
    support_features_subtitle: "The best reasons for our Discord support",
    support_feature1_title: "Live Chat",
    support_feature1_desc: "Real-time support from our team",
    support_feature2_title: "Tutorials",
    support_feature2_desc: "Detailed guides for all tools",
    support_feature3_title: "Security",
    support_feature3_desc: "Moderated and safe environment",
    support_feature4_title: "Tips & Tricks",
    support_feature4_desc: "Learn from experienced Minecraft players",
    support_email_title: "E-Mails <span class=\"highlight\">Contact</span>",
    support_email_subtitle: "Formal support for complex inquiries",
    support_email_card_title: "Direct Contact",
    support_email_card_desc: "For detailed inquiries, bug reports or business matters, use our email support.",
    support_email_btn: "Send Email",
    support_faq_title: "Frequently Asked <span class=\"highlight\">Questions</span>",
    support_faq_subtitle: "Answers to frequently asked questions",
    support_faq_q1: "How quickly will I get help on Discord?",
    support_faq_a1: "Our support team is active weekdays from 10:00 AM to 6:00 PM. Average response time is 15-30 minutes.",
    support_faq_q2: "Can I ask for help in English?",
    support_faq_a2: "Yes, our team speaks both German and English. You can make your request in either language.",
    support_faq_q3: "How do I report a bug?",
    support_faq_a3: "You can report bugs either on Discord in the #bug-reports channel or by email to support@mc-craft.com. Please describe the bug in as much detail as possible.",
    support_faq_q4: "Can I suggest new features?",
    support_faq_a4: "Yes! We welcome feature suggestions. Use the #suggestions channel on Discord or email us.",
    support_faq_cta: "More questions? Visit our <a href=\"/blog/faq.html\">FAQ page</a> or contact us directly.",
    support_faq_link: "FAQ page",
    support_cta_title: "Need help?",
    support_cta_desc: "Our support team is happy to assist you. Don't hesitate to contact us with any problems or questions.",
    support_cta_btn: "Join Discord",
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
    toast_welcome_title: "Support page loaded!",
    toast_welcome_message: "We're happy to help!",
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
    loader_text1_support: "MC-Craft Support is loading...",
    loader_text2: "Preparing Discord widget...",
    loader_text3: "Loading email support...",
    loader_text4: "Loading FAQ...",
    loader_text5: "Almost done..."
};

// DOM Elements

const faqItems = document.querySelectorAll('.faq-item');

// Sound Elements

// ===== HELPER FUNCTIONS =====
// ===== INITIALIZATION =====
window.addEventListener('DOMContentLoaded', () => {
    initPageAnalytics();
    initSupportCards();
    initFAQ();
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
    console.log('MC-Craft Support page loaded');
}

// ===== SUPPORT CARDS INTERACTIVITY =====
function initSupportCards() {
    const supportCards = document.querySelectorAll('.support-card, .email-card, .feature-item');
    
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

// ===== FAQ SYSTEM =====
function initFAQ() {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
            playClickSound();
        });
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
