// Bug Report Page JavaScript

// ===== CONFIGURATION =====

// Text strings for this page (English only)
const T = {
    site_title_bugreport: "MC-Craft | Bug Report via Discord",
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
    bugreport_hero_title: "Bug <span class=\"highlight\">Report</span>",
    hero_badge: "V 1.0.0 is here",
    bugreport_hero_desc: "Did you find a bug? Report it directly on our Discord server! This way you get the fastest help from our community and developers.",
    bugreport_hero_btn_discord: "Open Discord",
    bugreport_hero_btn_support: "General Support",
    bugreport_grid_discord: "Fast Help",
    bugreport_grid_bug: "Report Bug",
    bugreport_grid_quick: "Immediate Response",
    bugreport_grid_community: "Community Support",
    bugreport_discord_title: "Bug Report on <span class=\"highlight\">Discord</span>",
    bugreport_discord_subtitle: "Join our server and report your bug in the #bug-report channel",
    bugreport_widget_title: "MC-Craft Bug Report Discord",
    bugreport_widget_btn: "Join Discord Server",
    bugreport_widget_hint: "After joining, go to channel #bug-report",
    bugreport_card1_title: "Fast Help",
    bugreport_card1_desc: "Our team usually responds within 15-30 minutes. Perfect for critical bugs and urgent problems.",
    bugreport_card2_title: "Community Support",
    bugreport_card2_desc: "Other users can confirm if they have the same issue and help with the error description.",
    bugreport_card3_title: "Direct Contact",
    bugreport_card3_desc: "Talk directly to the developers. We can discuss screenshots immediately and find solutions.",
    bugreport_card4_title: "Live Updates",
    bugreport_card4_desc: "Track the progress of your bug report in real time and get immediate feedback on your issue.",
    bugreport_features_title: "How to report <span class=\"highlight\">a bug</span>",
    bugreport_features_subtitle: "4 simple steps to the perfect bug report",
    bugreport_step1_title: "1. Join Discord",
    bugreport_step1_desc: "Click on \"Join Discord Server\" and join our server",
    bugreport_step2_title: "2. Find channel",
    bugreport_step2_desc: "Navigate to channel <strong>#bug-report</strong> or <strong>#support</strong>",
    bugreport_step3_title: "3. Describe bug",
    bugreport_step3_desc: "Post a detailed description of your problem",
    bugreport_step4_title: "4. Share screenshots",
    bugreport_step4_desc: "Upload screenshots that clearly show the bug",
    bugreport_email_title: "Formal <span class=\"highlight\">Bug Report</span>",
    bugreport_email_subtitle: "For detailed bug descriptions and screenshots",
    bugreport_email_card_title: "Email Bug Report",
    bugreport_email_card_desc: "For complex bugs with many screenshots or detailed instructions, you can also send us an email.",
    bugreport_email_btn: "Send Email",
    bugreport_faq_title: "Frequently Asked <span class=\"highlight\">Questions</span>",
    bugreport_faq_subtitle: "Everything you need to know about bug reports",
    bugreport_faq_q1: "How long does a response on Discord take?",
    bugreport_faq_a1: "Usually within <strong>15-60 minutes</strong> during our support hours (Mon-Fri 10:00-18:00). On weekends it may take a little longer.",
    bugreport_faq_q2: "What happens after I report a bug?",
    bugreport_faq_a2: "1. Our team checks your report\n2. Bug is categorized and prioritized\n3. Development to fix begins\n4. You receive updates in the Discord channel",
    bugreport_faq_q3: "Can I report multiple bugs at once?",
    bugreport_faq_a3: "It's best to report each bug in a separate message. This helps us track and fix them faster.",
    bugreport_faq_q4: "What information should I have ready?",
    bugreport_faq_a4: "• Which tool is affected\n• Detailed error description\n• Screenshots or videos\n• Browser and operating system\n• Steps to reproduce",
    bugreport_faq_cta: "More questions? Visit our <a href=\"/blog/faq.html\">FAQ page</a> or contact us directly.",
    bugreport_faq_link: "FAQ page",
    bugreport_cta_title: "Ready to report your bug?",
    bugreport_cta_desc: "The sooner you report, the sooner we can help! Use Discord for immediate support.",
    bugreport_cta_btn_discord: "Join Discord",
    bugreport_cta_btn_email: "Report via Email",
    bugreport_cta_tip: "Tip:",
    bugreport_cta_tip_text: "Take screenshots before reporting the bug!",
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
    toast_welcome_title: "Bug Report loaded!",
    toast_welcome_message: "Report bugs now via Discord!",
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
    toast_error_message: "A small error occurred. Please report this bug on Discord.",
    toast_online_title: "Connection restored",
    toast_online_message: "You are back online!",
    toast_offline_title: "Offline mode",
    toast_offline_message: "Some features may not be available.",
    toast_discord_ready: "Click to join our Discord server!",
    toast_discord_redirect: "You are being redirected to our Discord server...",
    toast_discord_redirect_message: "You are being redirected to our server...",
    toast_email_opening: "Opening email",
    toast_email_copied: "Email copied",
    loader_text1_bugreport: "Bug Report is loading...",
    loader_text2: "Preparing Discord widget...",
    loader_text3: "Loading support cards...",
    loader_text4: "Preparing FAQ...",
    loader_text5: "Almost done..."
};

// DOM Elements

const faqItems = document.querySelectorAll('.faq-item');
const supportCards = document.querySelectorAll('.support-card');
const featureItems = document.querySelectorAll('.feature-item');
const emailCard = document.querySelector('.email-card');

// Sound Elements

// ===== HELPER FUNCTIONS =====
// ===== INITIALIZATION =====
window.addEventListener('DOMContentLoaded', () => {
    initPageAnalytics();
    initSupportCards();
    initFeatureItems();
    initEmailCard();
    initFAQ();
    initDiscordWidget();
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
    console.log('MC-Craft Bug Report page loaded');
}

// ===== SUPPORT CARDS INTERACTIVITY (Original) =====
function initSupportCards() {
    supportCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== FEATURE ITEMS INTERACTIVITY (Original) =====
function initFeatureItems() {
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100 + 200);
    });
}

// ===== EMAIL CARD INTERACTIVITY (Original) =====
function initEmailCard() {
    if (emailCard) {
        emailCard.style.opacity = '0';
        emailCard.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            emailCard.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            emailCard.style.opacity = '1';
            emailCard.style.transform = 'scale(1)';
        }, 500);
    }
}

// ===== FAQ SYSTEM (Original) =====
function initFAQ() {
    faqItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100 + 300);
        
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

// ===== DISCORD WIDGET (Original) =====
function initDiscordWidget() {
    const discordWidget = document.querySelector('.discord-widget iframe');
    if (discordWidget) {
        discordWidget.addEventListener('load', () => {
            console.log('Discord widget loaded');
            showToast(
                'Discord widget ready',
                t('toast_discord_ready'),
                'info'
            );
        });
    }
    
    const discordButtons = document.querySelectorAll('a[href*="discord"], .btn-discord');
    discordButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Discord link clicked');
            showToast(
                t('toast_discord_redirect') || 'Open Discord',
                t('toast_discord_redirect_message') || 'You will be redirected to our server...',
                'info'
            );
        });
    });
}

// ===== WINDOW RESIZE HANDLER =====

// ===== CLICK SOUND FOR ALL INTERACTIVE ELEMENTS =====

// ===== PERFORMANCE OPTIMIZATION (Original) =====
function preloadImages() {
    const images = [
        '/assets/img/icons/grassblock.gif',
        '/assets/img/icons/Lava.gif',
        '/assets/img/icons/crystal.gif'
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

// ===== EXPORT FUNCTIONS FOR HTML =====
window.openDiscordQuick = function() {
    playClickSound();
    showToast(
        t('toast_discord_redirect'),
        t('toast_discord_redirect_message'),
        'info'
    );
    setTimeout(() => {
        window.open('https://discord.gg/eVVpQD75w4', '_blank');
    }, 500);
};

window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playClickSound();
};

window.playBugSound = function() {
    playClickSound();
};

window.playSuccessSound = function() {
    playClickSound();
    setTimeout(playClickSound, 120);
};
