// FAQ Page JavaScript

// ===== CONFIGURATION =====

// Text strings for this page (English only)
const T = {
    site_title_faq: "MC-Craft | Frequently Asked Questions",
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
    faq_hero_title: "Frequently Asked <span class=\"highlight\">Questions</span>",
    hero_badge: "V 1.0.0 is here",
    faq_hero_desc: "Quickly find answers to your questions about MC-Craft. Our comprehensive FAQ collection helps you with all topics related to our tools.",
    faq_hero_btn_faq: "Discover FAQ",
    faq_hero_btn_contact: "Contact Us",
    faq_grid_faq: "FAQ",
    faq_grid_tips: "Tips",
    faq_grid_support: "Support",
    faq_grid_guides: "Guides",
    faq_section_title: "<span class=\"highlight\">FAQ</span> - Frequently Asked Questions",
    faq_section_subtitle: "Answers to the most frequently asked questions about MC-Craft",
    faq_search_placeholder: "Ask your question or search for a term...",
    faq_search_btn: "Search",
    faq_search_hint: "Tip: Enter a keyword or click on a question for the answer",
    faq_category_all: "All Questions",
    faq_category_general: "General",
    faq_category_tools: "Tools",
    faq_category_technical: "Technical",
    faq_category_general_title: "General Questions",
    faq_category_tools_title: "Tools & Features",
    faq_category_technical_title: "Technical Questions",
    faq_q1_title: "What is MC-Craft?",
    faq_q1_subtitle: "All about our platform and its goals",
    faq_q1_answer: "MC-Craft is a comprehensive platform for Minecraft players offering various tools and information. These include text converters for Minecraft formatting, detailed information on items and mobs, skin lookup functions, and server status checks. Our platform is completely free and continuously expanded.",
    faq_q2_title: "Is MC-Craft free?",
    faq_q2_subtitle: "Information about costs and usage",
    faq_q2_answer: "Yes, MC-Craft is completely free! We believe all Minecraft players should have access to useful tools and information without having to pay. There are no hidden costs or subscriptions.",
    faq_q3_title: "Do I need an account to use MC-Craft?",
    faq_q3_subtitle: "Information about registration",
    faq_q3_answer: "No, you do not need a user account for most functions of MC-Craft. All tools can be used immediately without registration. We do not store any personal data unless you use certain functions that require it.",
    faq_q4_title: "How does the Text Converter work?",
    faq_q4_subtitle: "Instructions for using the Text Converter",
    faq_q4_answer: "The Text Converter converts normal text into the Minecraft Standard Galactic Alphabet. Simply enter your desired text into the input field, and the converter immediately generates the corresponding Minecraft formatting.",
    faq_q5_title: "Can I create colored text with the converter?",
    faq_q5_subtitle: "Color text and formatting options",
    faq_q5_answer: "Yes, our Color Text Converter allows you to create colored text for Minecraft. You can select different color codes and formatting options (bold, italic, strikethrough) to customize your text.",
    faq_q6_title: "How can I look up a Minecraft skin?",
    faq_q6_subtitle: "Skin Lookup functionality",
    faq_q6_answer: "To look up a skin, simply enter the player's username into the search field on the Skin Lookup page. The tool then searches the Minecraft database for the skin, UUID, and any available capes.",
    faq_q9_title: "What can I find in the Items Database?",
    faq_q9_subtitle: "Look up item info and properties",
    faq_q9_answer: "The Items Database lists every Minecraft item by category (building materials, tools, food, redstone, and more) with an image, ID, properties, and description. Use the search or category filters to quickly find the item you're looking for.",
    faq_q10_title: "What does the Mobs Database show me?",
    faq_q10_subtitle: "Creatures, stats, and drops",
    faq_q10_answer: "The Mobs Database lists every Minecraft creature with health points, behavior, spawn conditions, and drops – sorted into categories like Passive, Neutral, Hostile, and Boss mobs.",
    faq_q11_title: "How does the Server Status check work?",
    faq_q11_subtitle: "Check a Minecraft server live",
    faq_q11_answer: "Enter a Minecraft server's address and the tool shows you in real time whether the server is online, how many players are currently active, the current version, and more.",
    faq_q12_title: "What does the Minecraft API Status page show?",
    faq_q12_subtitle: "Availability of the official Mojang services",
    faq_q12_answer: "This page checks the live status of the most important official Mojang/Microsoft services (e.g. login server, session server, Minecraft.net) and instantly shows you whether there are any current issues or outages.",
    faq_q13_title: "How does the Skin Editor work?",
    faq_q13_subtitle: "Edit Minecraft skins directly in your browser",
    faq_q13_answer: "With the Skin Editor you can load an existing skin or start a new template and edit it pixel by pixel directly in your browser with a 3D preview – no extra software needed.",
    faq_q14_title: "What does the Day-Night Cycle simulator do?",
    faq_q14_subtitle: "Visualize Minecraft's time of day",
    faq_q14_answer: "This tool visually simulates Minecraft's day-night cycle, so you can see, for example, when monsters can spawn or how long an in-game day takes in real time.",
    faq_q15_title: "What is the End Poem page?",
    faq_q15_subtitle: "Minecraft's ending credits text",
    faq_q15_answer: "Here you can find the famous \"End Poem\" – the text that appears in the credits after defeating the Ender Dragon – to read at your own pace.",
    faq_q16_title: "What is the Capes Database?",
    faq_q16_subtitle: "All Minecraft capes at a glance",
    faq_q16_answer: "The Cape Gallery shows you every known Minecraft cape – from official Mojang capes to event capes and special community capes – including an image and its origin.",
    faq_q17_title: "What does the Minecraft version overview offer?",
    faq_q17_subtitle: "All releases at a glance",
    faq_q17_answer: "This page lists every Minecraft version from the earliest Alpha builds to the current release, including release date and version type (Release, Snapshot, Beta).",
    faq_q18_title: "What is the Skin Library?",
    faq_q18_subtitle: "Browse skins for inspiration",
    faq_q18_answer: "The Skin Gallery contains a collection of well-known and popular Minecraft skins to browse and use as inspiration for your own skin.",
    faq_q19_title: "What is the Beacon Color Mixer for?",
    faq_q19_subtitle: "Calculate beacon colors",
    faq_q19_answer: "The Beacon Color Mixer calculates which combination of stained glass you need to stack above a beacon to get exactly the light color you want.",
    faq_q20_title: "How does the QR Code Generator work?",
    faq_q20_subtitle: "Create QR codes e.g. for server IPs",
    faq_q20_answer: "Enter any text or link (e.g. your server IP) and the tool instantly generates a QR code you can download – handy for quickly sharing with friends.",
    faq_q21_title: "What does the Advancement Generator do?",
    faq_q21_subtitle: "Create your own advancement notifications",
    faq_q21_answer: "With the Advancement Generator you can design your own custom Minecraft advancement toast notifications and download them as an image – e.g. for videos or thumbnails.",
    faq_q7_title: "Does MC-Craft work on mobile devices?",
    faq_q7_subtitle: "Responsive design and mobile usage",
    faq_q7_answer: "Yes, MC-Craft is fully responsive and works on smartphones, tablets, and desktop computers. The interface automatically adapts to the screen size, so you can use all functions on the go.",
    faq_q8_title: "Which browsers are supported?",
    faq_q8_subtitle: "Browser compatibility",
    faq_q8_answer: "MC-Craft supports all modern browsers, including Chrome (recommended), Brave, Firefox, Safari, and Edge. For older browsers (Internet Explorer), MC-Craft may not function correctly.",
    faq_no_results_title: "No results found",
    faq_no_results_desc: "Try different search terms or ask us your question directly.",
    faq_no_results_btn: "Ask a question",
    faq_cta_title: "Question not found?",
    faq_cta_desc: "Do you have a specific question that isn't answered here? Contact our support team directly - we'll be happy to help!",
    faq_cta_btn_contact: "Contact Us",
    faq_cta_btn_support: "Contact Support",
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
    toast_welcome_title: "FAQ page loaded!",
    toast_welcome_message: "Find answers to your questions!",
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
    faq_search_results: "{count} result|{count} results|{count} results",
    faq_filter_all: "Showing all questions",
    faq_category_filtered: "Filtered",
    loader_text1_faq: "MC-Craft FAQ is loading...",
    loader_text2: "Retrieving questions...",
    loader_text3: "Preparing search function...",
    loader_text4: "Loading categories...",
    loader_text5: "Almost done..."
};

// DOM Elements

const faqSearch = document.getElementById('faqSearch');
const searchBtn = document.getElementById('searchBtn');
const categoryButtons = document.querySelectorAll('.category-btn');
const faqItems = document.querySelectorAll('.faq-item');
const noResults = document.getElementById('noResults');

// Sound Elements

// ===== HELPER FUNCTIONS =====
// ===== INITIALIZATION =====
window.addEventListener('DOMContentLoaded', () => {
    initPageAnalytics();
    initFAQFunctionality();
    initFAQSearch();
    initFAQCategories();
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
    console.log('MC-Craft FAQ page loaded');
}

// ===== FAQ FUNCTIONALITY =====
function initFAQFunctionality() {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active', !isActive);
            
            playClickSound();
            
            // Scroll to item if it was closed and is being opened
            if (!isActive) {
                setTimeout(() => {
                    const headerHeight = header.offsetHeight;
                    const itemPosition = item.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: itemPosition,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
    });
}

// ===== FAQ SEARCH FUNCTIONALITY =====
function initFAQSearch() {
    if (!faqSearch || !searchBtn) return;
    
    searchBtn.addEventListener('click', performSearch);
    
    faqSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    let searchTimeout;
    faqSearch.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 300);
    });
    
    function performSearch() {
        const searchTerm = faqSearch.value.trim().toLowerCase();
        let hasResults = false;
        let visibleCount = 0;
        
        if (searchTerm === '') {
            // Reset to show all items
            faqItems.forEach(item => {
                item.style.display = 'block';
                item.classList.remove('highlight');
                
                // Remove highlight from text (reset to original content)
                const question = item.querySelector('.faq-question h4');
                const answer = item.querySelector('.faq-answer p');
                
                if (question) {
                    const key = question.getAttribute('data-i18n');
                    if (key) question.innerHTML = t(key);
                }
                if (answer) {
                    const key = answer.getAttribute('data-i18n');
                    if (key) answer.innerHTML = t(key);
                }
            });
            
            noResults.style.display = 'none';
            updateCategoryVisibility();
            return;
        }
        
        // Search through all FAQ items
        faqItems.forEach(item => {
            const questionEl = item.querySelector('.faq-question h4');
            const answerEl = item.querySelector('.faq-answer p');
            
            if (!questionEl || !answerEl) return;
            
            // Use the translation keys to get current language text for search
            const qKey = questionEl.getAttribute('data-i18n');
            const aKey = answerEl.getAttribute('data-i18n');
            const questionText = qKey ? t(qKey).toLowerCase() : questionEl.textContent.toLowerCase();
            const answerText = aKey ? t(aKey).toLowerCase() : answerEl.textContent.toLowerCase();
            
            if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                item.style.display = 'block';
                item.classList.add('highlight');
                hasResults = true;
                visibleCount++;
                
                // Highlight the search term
                highlightText(questionEl, searchTerm);
                highlightText(answerEl, searchTerm);
                
                // Open the item to show the answer
                item.classList.add('active');
            } else {
                item.style.display = 'none';
                item.classList.remove('highlight');
                item.classList.remove('active');
            }
        });
        
        if (hasResults) {
            noResults.style.display = 'none';
            const msg = t('faq_search_results').split('|');
            let resultText = '';
            if (visibleCount === 1) resultText = msg[0].replace('{count}', visibleCount);
            else if (visibleCount >= 2 && visibleCount <= 4) resultText = msg[1].replace('{count}', visibleCount);
            else resultText = msg[2].replace('{count}', visibleCount);
            
            showToast(t('faq_search_btn'), resultText, 'success');
        } else {
            noResults.style.display = 'block';
        }
        
        updateCategoryVisibility();
        playClickSound();
    }
    
    function highlightText(element, searchTerm) {
        const text = element.textContent;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        element.innerHTML = text.replace(regex, '<mark class="search-highlight">$1</mark>');
    }
    
    function updateCategoryVisibility() {
        document.querySelectorAll('.faq-category').forEach(category => {
            const items = category.querySelectorAll('.faq-item');
            const visibleItems = Array.from(items).filter(item => 
                item.style.display !== 'none'
            );
            category.style.display = visibleItems.length === 0 ? 'none' : 'block';
        });
    }
}

// ===== FAQ CATEGORIES FILTER =====
function initFAQCategories() {
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            faqItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    item.classList.remove('active'); // Close all items when filtering
                } else {
                    item.style.display = 'none';
                }
            });
            
            updateCategoryVisibilityAfterFilter(category);
            playClickSound();
            
            // Show notification
            if (category === 'all') {
                showToast(t('faq_category_all'), t('faq_filter_all'), 'info');
            } else {
                const catName = getCategoryName(category);
                showToast(t('faq_category_filtered'), `${t('faq_category_filtered')}: ${catName}`, 'info');
            }
        });
    });
    
    function updateCategoryVisibilityAfterFilter(category) {
        document.querySelectorAll('.faq-category').forEach(cat => {
            if (category === 'all') {
                cat.style.display = 'block';
            } else if (cat.id === `category-${category}`) {
                cat.style.display = 'block';
            } else {
                cat.style.display = 'none';
            }
        });
    }
    
    function getCategoryName(category) {
        switch(category) {
            case 'general': return t('faq_category_general');
            case 'tools': return t('faq_category_tools');
            case 'technical': return t('faq_category_technical');
            default: return category;
        }
    }
}

// ===== WINDOW RESIZE HANDLER =====

// ===== CLICK SOUND FOR ALL INTERACTIVE ELEMENTS =====

// ===== STYLE FOR SEARCH HIGHLIGHT =====
const style = document.createElement('style');
style.textContent = `
    .search-highlight {
        background-color: rgba(255, 215, 0, 0.3);
        color: #d8721e;
        padding: 2px 4px;
        border-radius: 3px;
        font-weight: bold;
    }
    
    .faq-item.highlight {
        border-color: var(--primary);
        box-shadow: 0 0 0 2px rgba(0, 168, 107, 0.2);
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
