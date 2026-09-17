// History Page JavaScript

// ===== CONFIGURATION =====

// Text strings for this page (English only)
const T = {
    site_title_history: "MC-Craft | Our History",
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
    hero_badge: "Our Story",
    hero_title: "The Journey of <span class=\"highlight\">MC-Craft</span>",
    hero_badge1: "V 1.0.0 is here",
    hero_desc: "From the first idea to the stable 1.0.0 release: transparent, practical, and focused on real usefulness.",
    hero_btn_timeline: "View Development",
    hero_btn_home: "Email Contact",
    hero_grid_founded: "Launched 2026",
    hero_grid_community: "For the Community",
    hero_grid_tools: "16 Tools",
    hero_grid_madeby: "Made by Players",
    timeline_section_title: "Our <span class=\"highlight\">Timeline</span>",
    timeline_section_subtitle: "The key steps toward version 1.0.0",
    timeline_item1_date: "March 2026",
    timeline_item1_title: "The Birth",
    timeline_item1_desc: "It started with one goal: deliver reliable Minecraft tools without unnecessary complexity.",
    timeline_item1_list1: "Project kickoff and initial architecture",
    timeline_item1_list2: "Prototypes for text and color tools",
    timeline_item1_list3: "First internal test setup",
    timeline_item2_date: "2026",
    timeline_item2_title: "Community Growth",
    timeline_item2_desc: "Community feedback helped transform a prototype into a real platform.",
    timeline_item2_list1: "Expansion of core tools",
    timeline_item2_list2: "Unified navigation and page structure",
    timeline_item2_list3: "DE/EN language support integrated",
    timeline_item2_list4: "Mobile-first improvements delivered",
    timeline_item3_date: "Version 1.0.0",
    timeline_item3_title: "Stable Release",
    timeline_item3_desc: "With version 1.0.0, MC-Craft launched as a consolidated and modern platform.",
    timeline_item3_list1: "Version labels standardized to 1.0.0",
    timeline_item3_list2: "Design and responsiveness modernized",
    timeline_item3_list3: "Copy and translations refined",
    timeline_item3_list4: "Stability and quality fixes completed",
    timeline_item4_date: "December 2026",
    timeline_item4_title: "Recognition & Expansion",
    timeline_item4_desc: "MC-Craft was recommended in several Minecraft communities as the best tool collection. We expanded our platform with new innovative tools.",
    timeline_item4_list1: "Recommendation in major Minecraft communities",
    timeline_item4_list2: "Items database with 1,000+ entries",
    timeline_item4_list3: "Complete Mobs Guide",
    timeline_item4_list4: "Added API for developers",
    timeline_item5_date: "Today",
    timeline_item5_title: "The Present",
    timeline_item5_desc: "What started as a small project is now a vibrant platform with a loyal community. We are proud to help players around the world and enhance the Minecraft experience.",
    timeline_item5_list1: "Over 15 useful tools for players and server operators",
    timeline_item5_list2: "Active community with daily interactions",
    timeline_item5_list3: "Over 500,000 satisfied users monthly",
    timeline_item5_list4: "Continuous improvements based on feedback",
    history_release_title: "What Defines Version <span class=\"highlight\">1.0.0</span> ✨",
    history_release_desc: "Version 1.0.0 represents a consolidated platform: unified design, better mobile usability, clear navigation, and cleaner German/English translations.",
    history_release_item1_title: "Responsive Rework",
    history_release_item1_desc: "All core pages were optimized for smartphone, tablet, and desktop.",
    history_release_item2_title: "Improved Translations",
    history_release_item2_desc: "UI text was standardized and rewritten for better language quality.",
    history_release_item3_title: "Consistent Navigation",
    history_release_item3_desc: "Links and menus were cleaned up and made reliable.",
    history_release_item4_title: "Stable Baseline",
    history_release_item4_desc: "The platform now runs on a stable, maintainable 1.0 baseline.",
    history_release_message: "Questions about this development? Contact us directly by email or Discord.",
    history_release_btn_email: "Email Support",
    stats_section_title: "In <span class=\"highlight\">Numbers</span>",
    stats_section_subtitle: "What we have achieved so far",
    stats_tools: "Different Tools",
    stats_mobs: "Mobs in Database",
    stats_items: "Items in Database",
    stats_online: "Online",
    team_section_title: "Behind <span class=\"highlight\">MC-Craft</span>",
    team_section_subtitle: "The team that makes it all possible",
    team_member1_name: "Mohamad Laith",
    team_member1_role: "Founder & Lead Developer",
    team_member1_bio: "Minecraft enthusiast since 2012. Brings the vision and technical expertise.",
    team_member2_name: "Alex",
    team_member2_role: "Full-Stack Developer",
    team_member2_bio: "Responsible for backend APIs and database integrations.",
    team_member3_name: "Sarah",
    team_member3_role: "UI/UX Designer",
    team_member3_bio: "Designs the user-friendly interfaces and theme systems.",
    team_member4_name: "Community Team",
    team_member4_role: "Support & Feedback",
    team_member4_bio: "Our dedicated team interacting daily with the community.",
    future_title: "The <span class=\"highlight\">Future</span> of MC-Craft",
    future_desc: "Our journey is far from over! We are already working on exciting new features:",
    future_feature1_title: "Minecraft Server Dashboard",
    future_feature1_desc: "Comprehensive server statistics and management tools",
    future_feature2_title: "3D Skin Editor",
    future_feature2_desc: "Create and edit skins in a 3D preview",
    future_feature3_title: "Redstone Academy",
    future_feature3_desc: "Learning platform for redstone circuits",
    future_feature4_title: "Community Marketplace",
    future_feature4_desc: "Share and discover custom content",
    future_message: "Our goal remains to be the best resource for Minecraft players - now and in the future!",
    future_btn_tools: "Discover all tools",
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
    toast_welcome_title: "History page loaded!",
    toast_welcome_message: "Experience the journey of MC-Craft!",
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
    loader_text1_history: "MC-Craft History is loading...",
    loader_text2: "Preparing time travel...",
    loader_text3: "Gathering milestones...",
    loader_text4: "Creating timeline...",
    loader_text5: "Almost done..."
};

// DOM Elements

// Sound Elements

// ===== HELPER FUNCTIONS =====
// ===== INITIALIZATION =====
window.addEventListener('DOMContentLoaded', () => {
    initCounters();
    initTimelineAnimation();
    initPageAnalytics();
});

// ===== AUDIO =====

// ===== SOUND TOGGLE =====

// ===== LOADER (customized) =====

// ===== THEME SYSTEM =====

// ===== MOBILE MENU =====

// ===== THEME SWITCHER =====

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
        backToTop.classList.toggle('show', window.scrollY > 300);
        updateActiveNavLink();
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
                window.scrollTo({ top: target.offsetTop - headerHeight, behavior: 'smooth' });
                playClickSound();
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}` || 
                   (sectionId === 'home' && link.getAttribute('href') === 'history.html')) {
                    link.classList.add('active');
                }
            });
            
            document.querySelectorAll('.mobile-nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}` ||
                   (sectionId === 'home' && link.getAttribute('href') === 'history.html')) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== TIMELINE ANIMATION =====
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.transitionDelay = `${index * 0.2}s`;
        
        observer.observe(item);
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100);
    });
}

// ===== ANIMATED COUNTERS =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count') || counter.textContent);
                
                if (!counter.dataset.animated) {
                    animateCounter(counter, target);
                    counter.dataset.animated = true;
                }
                
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '50px'
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = Math.floor(duration / 100);
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            clearInterval(timer);
            
            // Special formatting for specific numbers
            if (target === 7) element.textContent = '7';
            else if (target === 90) element.textContent = '90+';
            else if (target === 1000) element.textContent = '1k';
            else if (target === 24) element.textContent = '24/7';
            else element.textContent = target;
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ===== TOAST =====

// ===== FOOTER YEAR =====

// ===== PAGE ANALYTICS =====
function initPageAnalytics() {
    console.log('MC-Craft History page loaded');
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
