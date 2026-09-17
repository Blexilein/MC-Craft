// Privacy Policy Page JavaScript

// ===== CONFIGURATION =====

// Translations (English only)
const T = {
    site_title_datenschutz: "MC-Craft | Privacy Policy",
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
    datenschutz_hero_title: "Privacy <span class=\"highlight\">Policy</span>",
    hero_badge: "V 1.0.0 is here",
    datenschutz_hero_desc: "Your privacy is important to us. Here you can find out how we handle your data and what your rights are.",
    datenschutz_btn_read: "Read Privacy Policy",
    datenschutz_btn_impressum: "To Imprint",
    datenschutz_grid_privacy: "Privacy",
    datenschutz_grid_rights: "Your Rights",
    datenschutz_grid_contact: "Contact",
    datenschutz_grid_legal: "Legal",
    datenschutz_section_title: "Our <span class=\"highlight\">Privacy</span> Policy",
    datenschutz_section_subtitle: "Status: August 24, 2026",
    datenschutz_card1_title: "1. General Information",
    datenschutz_card1_desc: "We take the protection of your personal data very seriously. This privacy policy informs you about how we handle your personal data when you use our website.",
    datenschutz_card1_note: "Our services address a general audience interested in Minecraft and do not collect any age-specific data. People under 16 should only give consent to optional external content (see points 3 and 6) with the approval of a parent or legal guardian.",
    datenschutz_card2_title: "2. Responsible Party",
    datenschutz_card2_desc: "<strong>MC-Craft</strong><br>Operated by: Mohamad Laith (Blexilein)<br>64297 Darmstadt<br>Germany<br><br>Email: <a href=\"mailto:privacy@mc-craft.com\">privacy@mc-craft.com</a>",
    datenschutz_cardlegal_title: "3. Legal Basis for Processing",
    datenschutz_cardlegal_desc: "We process personal data solely on the basis of the following legal grounds:",
    datenschutz_cardlegal_li1: "<strong>Art. 6(1)(f) GDPR (legitimate interest):</strong> for automatically collected server log data (see point 4) and for technically necessary local storage, e.g. language, theme and sound settings (see point 5) – our legitimate interest lies in the secure and stable operation of the website.",
    datenschutz_cardlegal_li1b: "<strong>Art. 6(1)(f) GDPR (legitimate interest):</strong> for processing the values you enter (e.g. a player name, UUID, or server address) through our own MC-Craft API (see point 6) – our legitimate interest lies in providing the tools technically without requiring your browser to connect directly to third-party providers.",
    datenschutz_cardlegal_li2: "<strong>Art. 6(1)(a) GDPR in conjunction with § 25(1) TDDDG (consent):</strong> for the one non-technically-necessary external resource (optional font, see point 6), which is only loaded after your explicit consent in the cookie banner.",
    datenschutz_cardlegal_li3: "<strong>§ 25(2) no. 2 TDDDG:</strong> for local storage that is strictly necessary to provide a service you explicitly requested (e.g. your saved language selection) – no separate consent is required for this.",
    datenschutz_cardlegal_note: "We do not pass your data on to third parties for advertising purposes. The direct connections to Mojang described in point 6 now only cover the loading of skin and cape image files, and arise solely from your active use of a tool.",
    datenschutz_card3_title: "4. Hosting and Server Log Files",
    datenschutz_card3_desc: "With each access to our website, connection data is automatically stored:",
    datenschutz_card3_li1: "IP address",
    datenschutz_card3_li2: "Date and time of access",
    datenschutz_card3_li3: "Browser and operating system used",
    datenschutz_card3_li4: "Name of the retrieved file",
    datenschutz_card3_hosting1: "This website is provided via <strong>Cloudflare Pages</strong>, a service of Cloudflare, Inc. (USA). The connection data listed above – in particular the IP address and HTTP request data – is processed by Cloudflare in order to deliver the website securely and reliably (content delivery, DDoS protection, technical operation).",
    datenschutz_card3_hosting2: "The legal basis for this is Art. 6(1)(f) GDPR (legitimate interest in a secure and stable operation of the website). The recipient of the data is Cloudflare as our hosting and content delivery provider. Because Cloudflare operates a global network, this can involve a transfer to third countries outside the EU/EEA, including the USA; Cloudflare relies on the EU Standard Contractual Clauses (Art. 46 GDPR) as an appropriate safeguard for this.",
    datenschutz_card3_note: "This data is collected purely for technical purposes – to ensure smooth operation, system security, and to optimize our offering – and is not combined with other data sources. The retention period follows the standard retention periods of our hosting provider Cloudflare for connection and log data; security-relevant incidents may require longer retention for evidentiary purposes.",
    datenschutz_card4_title: "5. Cookies & Local Storage",
    datenschutz_card4_desc: "We do not use classic server-side cookies for tracking. Instead your browser stores a few settings purely locally on your own device (localStorage) – this data is never sent to us:",
    datenschutz_card4_li1: "<code>mc-craft-skin-poser</code> (IndexedDB) – images you save under “My Renders” in the Skin Poser; only when you save them yourself, and you can delete them right in the gallery",
    datenschutz_card4_li2: "<code>mc-craft-theme</code> – chosen color theme (Overworld/Nether/End)",
    datenschutz_card4_li3: "<code>mc-craft-sound</code> – whether sound effects are on or off",
    datenschutz_card4_li4: "<code>mc-craft-color-edition</code> – chosen edition (Java/Bedrock) in the color text converter",
    datenschutz_card4_li5: "<code>mc-craft-terms-accepted</code>, <code>mc-craft-terms-accepted-date</code> – whether and when you accepted the terms of use",
    datenschutz_card4_li6: "<code>mc-craft-cookie-consent</code> – your own cookie banner decision",
    datenschutz_card4_note: "On your first visit we show a cookie banner. If you reject \"external content\", the content it affects (an optional font on the Advancement Generator page and the Discord widget, see point 6) really is not loaded – not just the banner hidden. You can also load the Discord widget once with a click instead. You can change your decision at any time via the cookie button in the bottom-left corner of every page. You can also disable storage entirely in your browser settings.",
    datenschutz_card5_title: "6. External Services, Fonts & APIs",
    datenschutz_card5_desc1: "<strong>Self-hosted:</strong> Fonts (Chakra Petch, Space Grotesk – Google Fonts, SIL Open Font License), the Font Awesome icon library, the three.js/SkinView3D 3D libraries, the libraries for the 3D mob models (Bridge Model Viewer, Wintersky, MoLang), gif.js for GIF exports, UPNG.js for APNG exports and deepslate for the Schematic Viewer are served from our own server. Your browser does not load them directly from Google, Font Awesome, or their respective external CDNs, but via MC-Craft's hosting infrastructure. Information about the Cloudflare infrastructure used for this is available in point 4 (Hosting and Server Log Files).",
    datenschutz_card5_desc2: "<strong>Optional external content:</strong> on the Advancement Generator page we optionally load a pixel font from <code>fonts.cdnfonts.com</code> for the preview image. On the Support, Bug Report and Emails pages we show the widget of our Discord server from <code>discord.com</code>; Discord may set its own cookies, and Discord's privacy policy applies. In both cases your IP address is transmitted to the respective provider. Both only happen if you choose \"Accept all\" in the cookie banner – alternatively you can load the Discord widget once with a click. If you reject it, the preview uses a fallback font and a notice is shown instead of the widget.",
    datenschutz_card5_desc3: "<strong>Our own MC-Craft API:</strong> the Server Status, Skin Lookup, Skin Editor, Skin Poser, Minecraft Versions, and Minecraft API Status tools send the value you enter (e.g. a Minecraft username/UUID or a server address) to our own interface at <code>api.mc-craft.com</code> when actively used. Like our website itself, this runs on Cloudflare's infrastructure (Cloudflare Workers, see point 4) and queries the respective official Minecraft/Mojang services in the background, so your browser no longer has to connect to these third-party providers directly. In Skin Lookup, Skin Editor, and Skin Poser, our API also delivers the skin texture itself (source: <code>textures.minecraft.net</code>), so your browser no longer connects directly to Mojang for that either. Your input is processed only to answer the respective request and is not permanently stored or logged.",
    datenschutz_card5_desc4: "<strong>Still loaded directly by your browser:</strong> the default skins (Steve/Alex) and cape images in Skin Lookup, Skin Editor, and Skin Poser are fetched directly by your browser, since these are plain image resources. The Capes Database and the Skin Library only use images from our own server:",
    datenschutz_card5_li1: "<strong>Default skins and cape images (Skin Lookup, Skin Editor, Skin Poser):</strong> <code>textures.minecraft.net</code>",
    datenschutz_card5_note: "These image requests run directly between your browser and Mojang – our server never sees or stores this data. These are official/public Minecraft services, not advertising or tracking providers.",
    datenschutz_card6_title: "7. Data Security",
    datenschutz_card6_desc: "We use technical and organizational security measures to protect your data against loss, manipulation or unauthorized access.",
    datenschutz_card6_note: "We do not share your data with third parties for advertising or analytics purposes. The direct connections to Mojang/Microsoft services described in point 6 arise solely from your active use of a tool and are outside our control. Once the website is live over HTTPS, data transmission between your browser and our server is encrypted (SSL/TLS).",
    datenschutz_card7_title: "8. Analysis Tools",
    datenschutz_card7_desc: "<strong>Important:</strong> We do <strong>not</strong> use any tracking or analysis tools like Google Analytics. Your visit remains private.",
    datenschutz_card8_title: "9. Your Rights",
    datenschutz_card8_desc: "You have the right to:",
    datenschutz_card8_li1: "Information about your stored data (Art. 15 GDPR)",
    datenschutz_card8_li2: "Correction of incorrect data (Art. 16 GDPR)",
    datenschutz_card8_li3: "Deletion of your data (Art. 17 GDPR)",
    datenschutz_card8_li4: "Restriction of processing (Art. 18 GDPR)",
    datenschutz_card8_li5: "Data portability (Art. 20 GDPR)",
    datenschutz_card8_li6: "Objection to processing (Art. 21 GDPR)",
    datenschutz_card8_li7: "Withdrawing any consent given, with effect for the future (Art. 7(3) GDPR)",
    datenschutz_card8_li8: "Lodging a complaint with a data protection supervisory authority (Art. 77 GDPR)",
    datenschutz_card8_note: "We aim to respond to requests regarding the rights listed above within one month, in accordance with Art. 12(3) GDPR. Simply reach out via the contact email below.",
    datenschutz_card9_title: "10. Contact",
    datenschutz_card9_desc: "If you have any questions about data protection, contact us:",
    datenschutz_hinweis_title: "Important to know",
    datenschutz_hinweis_desc: "This privacy policy may be changed to adapt it to new legal requirements. The current version can be found on this page.",
    datenschutz_cta_title: "Questions about privacy?",
    datenschutz_cta_desc: "We are happy to help you. Contact us with any questions or concerns.",
    datenschutz_cta_btn_email: "Write email",
    datenschutz_cta_btn_impressum: "Imprint",
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
    toast_welcome_title: "Privacy Policy loaded!",
    toast_welcome_message: "Your privacy is important to us.",
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
    loader_text1_datenschutz: "Privacy Policy is loading...",
    loader_text2: "Loading legal information...",
    loader_text3: "Almost done...",
    loader_text4: "Almost done...",
    loader_text5: "Almost done..."
};

// DOM Elements

// Sound Elements

// ===== HELPER FUNCTIONS =====
// ===== INITIALIZATION =====
window.addEventListener('DOMContentLoaded', () => {
    initDatenschutzCards();
    initPageAnalytics();
});

// ===== AUDIO =====

// ===== SOUND TOGGLE =====

// ===== LOADER (adjusted) =====

// ===== THEME SYSTEM =====

// ===== MOBILE MENU =====

// ===== THEME SWITCHER =====

// ===== SCROLL EFFECTS =====

// ===== PRIVACY CARDS ANIMATION =====
function initDatenschutzCards() {
    const datenschutzCards = document.querySelectorAll('.datenschutz-card');
    
    datenschutzCards.forEach((card, index) => {
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

// ===== TOAST =====

// ===== FOOTER YEAR =====

// ===== PAGE ANALYTICS =====
function initPageAnalytics() {
    console.log('MC-Craft Privacy Policy page loaded');
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
