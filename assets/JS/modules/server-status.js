// Server Status JavaScript

const lang = document.documentElement.lang === 'en' ? 'en' : 'de';

// ===== KONFIGURATION =====

// Übersetzungen – alle für die Server-Status-Seite benötigten Schlüssel (inkl. Toast-Texte)
const I18N = {
    de: {
        site_title_serverstatus: "MC-Craft | Server Status",
        site_title_short: "MC-Craft",
        nav_home: "Home",
        nav_text_converter: "Text Konverter",
        nav_color_text: "Farbtext",
        nav_items: "Items Datenbank",
        nav_mobs: "Mobs Datenbank",
        nav_server_status: "Server Status",
        nav_skin_lookup: "Skin Lookup",
        nav_skin_editor: "Skin Editor",
        nav_day_night_cycle: "Tag-Nacht-Zyklus",
        nav_end_poem: "End Poem",
        nav_capes: "Cape-Datenbank",
        nav_skins: "Skin-Bibliothek",
        nav_beacon_mixer: "Beacon Farbmischer",
        tools_dropdown: "Werkzeuge",
        discover_dropdown: "Entdecken",
        theme_overworld: "Overworld",
        theme_nether: "Nether",
        theme_end: "The End",
        theme_select: "Theme auswählen:",
        sound_toggle: "Sound",
        language: "Sprache",
        serverstatus_hero_title: "Minecraft <span class=\"highlight\">Server Status</span>",
        hero_badge: "V 1.0.0 ist da",
        serverstatus_hero_desc: "Prüfe den Status von Java- und Bedrock-Servern in Echtzeit. Sieh dir Spieleranzahl, MOTD, Version und mehr an – alles in einem modernen Design.",
        serverstatus_btn_check: "Server prüfen",
        serverstatus_btn_examples: "Beispiel-Server",
        serverstatus_grid_java_bedrock: "Java & Bedrock",
        serverstatus_grid_realtime: "Echtzeit",
        serverstatus_grid_players: "Spieler-Info",
        serverstatus_grid_stats: "Detaillierte Stats",
        serverstatus_section_title: "Server <span class=\"highlight\">Status prüfen</span>",
        serverstatus_section_subtitle: "Gib eine Server-IP ein oder wähle einen Beispiel-Server",
        serverstatus_tab_java: "Java Edition",
        serverstatus_tab_bedrock: "Bedrock Edition",
        serverstatus_input_placeholder: "z.B. mc-craft.com",
        serverstatus_btn_status: "Status prüfen",
        serverstatus_example_mccraft: "MC Craft",
        serverstatus_online: "Online",
        serverstatus_offline: "Offline",
        serverstatus_players: "Spieler:",
        serverstatus_info_ip: "Adresse",
        serverstatus_info_server_ip: "IP",
        serverstatus_info_port: "Port",
        serverstatus_info_version: "Version",
        serverstatus_info_protocol: "Protokoll",
        serverstatus_info_players: "Spieler",
        serverstatus_info_gamemode: "Gamemode",
        serverstatus_info_serverid: "Server ID",
        serverstatus_info_map: "Map",
        serverstatus_loading_title: "Server wird geprüft",
        serverstatus_loading_connecting: "Verbinde mit dem Server...",
        serverstatus_loading_hint: "Tipp: Große Server können etwas länger zum Laden benötigen",
        serverstatus_loading_search: "Suchen",
        serverstatus_loading_connect: "Verbinden",
        serverstatus_loading_data: "Daten laden",
        serverstatus_loading_done: "Fertig",
        serverstatus_loading_server: "Server:",
        serverstatus_loading_type: "Typ:",
        serverstatus_cta_title: "Mehr Minecraft <span class=\"highlight\">Tools</span> entdecken?",
        serverstatus_cta_desc: "MC-Craft bietet dir viele weitere nützliche Tools für dein Minecraft-Abenteuer.",
        serverstatus_cta_btn_text: "Text Konverter",
        serverstatus_cta_btn_all: "Alle Tools ansehen",
        footer_description: "Kostenlose Minecraft-Tools für die Community. Entwickelt von Spielern für Spieler.",
        footer_tools: "Tools",
        footer_more_tools: "Mehr Tools",
        footer_legal: "Rechtliches",
        footer_about: "Über Uns",
        footer_support: "Support",
        footer_impressum: "Impressum",
        footer_privacy: "Datenschutz",
        footer_terms: "Nutzungsbedingungen",
        footer_copyright: "Copyright",
        capes_db_title: "Cape-Datenbank",
        skins_library_title: "Skin-Bibliothek",
        footer_history: "MC-Craft Geschichte",
        footer_team: "Unser Team",
        footer_about_us: "Über uns",
        footer_faq: "FAQ & Hilfe",
        footer_bug: "Bug melden",
        footer_support_contact: "Support Kontakt",
        footer_rights: "Alle Rechte vorbehalten.",
        footer_disclaimer: "Minecraft ist eine Marke von Mojang Studios. Diese Seite ist nicht offiziell mit Mojang oder Microsoft verbunden.",
        footer_version: "Version 1.0.0",
        footer_changelog: "Changelog",
        loader_text1_serverstatus: "MC-Craft Server Status wird geladen...",
        loader_text2: "Server-API wird initialisiert...",
        loader_text3: "Ladeanimation vorbereiten...",
        loader_text4: "Fast fertig...",
        loader_text5: "Fast fertig...",
        toast_welcome_title: "Server Status geladen!",
        toast_welcome_message: "Prüfe jetzt den Status deiner Minecraft-Server!",
        toast_sound_title: "Sound",
        toast_sound_on: "Sound an",
        toast_sound_off: "Sound aus",
        toast_language_title: "Sprache",
        toast_language_de: "Deutsch",
        toast_language_en: "English",
        toast_theme_title: "Theme",
        toast_theme_changed: "Theme geändert",
        toast_theme_to: "Zu {theme} gewechselt",
        toast_error_title: "Fehler",
        toast_error_message: "Ein Fehler ist aufgetreten.",
        toast_success: "Erfolg",
        toast_rate_limit: "Zu viele Anfragen",
        toast_online_title: "Verbindung wiederhergestellt",
        toast_online_message: "Du bist wieder online!",
        toast_offline_title: "Offline Modus",
        toast_offline_message: "Einige Funktionen sind möglicherweise nicht verfügbar.",
        serverstatus_offline_message: "Server nicht erreichbar",
        serverstatus_hint: "Hinweis",
        serverstatus_err_rate_limit_title: "Serverdienst momentan ausgelastet",
        serverstatus_err_rate_limit_text: "Bitte warte einen Moment und versuche es erneut.",
        serverstatus_err_timeout_title: "Zeitüberschreitung",
        serverstatus_err_timeout_text: "Der Serverdienst antwortet gerade nicht. Bitte versuche es später erneut.",
        serverstatus_err_network_title: "Verbindungsfehler",
        serverstatus_err_network_text: "Die MC-Craft API konnte nicht erreicht werden.",
        serverstatus_err_api_title: "Serverdienst nicht verfügbar",
        serverstatus_err_api_text: "Der Serverstatus konnte gerade nicht abgefragt werden.",
        serverstatus_err_invalid_address_title: "Ungültige Serveradresse",
        serverstatus_err_invalid_address_text: "Bitte gib eine gültige Minecraft-Serveradresse ein.",
        serverstatus_err_address_required_title: "Serveradresse fehlt",
        serverstatus_err_address_required_text: "Bitte gib eine Server-IP oder Domain ein.",
        common_na: "N/A"
    },
    en: {
        site_title_serverstatus: "MC-Craft | Server Status",
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
        serverstatus_hero_title: "Minecraft <span class=\"highlight\">Server Status</span>",
        hero_badge: "V 1.0.0 is here",
        serverstatus_hero_desc: "Check the status of Java and Bedrock servers in real time. View player count, MOTD, version and more – all in a modern design.",
        serverstatus_btn_check: "Check Server",
        serverstatus_btn_examples: "Example Servers",
        serverstatus_grid_java_bedrock: "Java & Bedrock",
        serverstatus_grid_realtime: "Real-time",
        serverstatus_grid_players: "Player Info",
        serverstatus_grid_stats: "Detailed Stats",
        serverstatus_section_title: "Server <span class=\"highlight\">Status Check</span>",
        serverstatus_section_subtitle: "Enter a server IP or select an example server",
        serverstatus_tab_java: "Java Edition",
        serverstatus_tab_bedrock: "Bedrock Edition",
        serverstatus_input_placeholder: "e.g. mc-craft.com",
        serverstatus_btn_status: "Check Status",
        serverstatus_example_mccraft: "MC Craft",
        serverstatus_online: "Online",
        serverstatus_offline: "Offline",
        serverstatus_players: "Players:",
        serverstatus_info_ip: "Address",
        serverstatus_info_server_ip: "IP",
        serverstatus_info_port: "Port",
        serverstatus_info_version: "Version",
        serverstatus_info_protocol: "Protocol",
        serverstatus_info_players: "Players",
        serverstatus_info_gamemode: "Gamemode",
        serverstatus_info_serverid: "Server ID",
        serverstatus_info_map: "Map",
        serverstatus_loading_title: "Checking server",
        serverstatus_loading_connecting: "Connecting to server...",
        serverstatus_loading_hint: "Tip: Large servers may take a little longer to load",
        serverstatus_loading_search: "Search",
        serverstatus_loading_connect: "Connect",
        serverstatus_loading_data: "Load data",
        serverstatus_loading_done: "Done",
        serverstatus_loading_server: "Server:",
        serverstatus_loading_type: "Type:",
        serverstatus_cta_title: "Discover more Minecraft <span class=\"highlight\">Tools</span>?",
        serverstatus_cta_desc: "MC-Craft offers many more useful tools for your Minecraft adventure.",
        serverstatus_cta_btn_text: "Text Converter",
        serverstatus_cta_btn_all: "View all tools",
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
        loader_text1_serverstatus: "MC-Craft Server Status is loading...",
        loader_text2: "Initializing server API...",
        loader_text3: "Preparing loading animation...",
        loader_text4: "Almost done...",
        loader_text5: "Almost done...",
        toast_welcome_title: "Server Status loaded!",
        toast_welcome_message: "Check the status of your Minecraft servers now!",
        toast_sound_title: "Sound",
        toast_sound_on: "Sound on",
        toast_sound_off: "Sound off",
        toast_language_title: "Language",
        toast_language_de: "German",
        toast_language_en: "English",
        toast_theme_title: "Theme",
        toast_theme_changed: "Theme changed",
        toast_theme_to: "Switched to {theme}",
        toast_error_title: "Error",
        toast_error_message: "An error occurred.",
        toast_success: "Success",
        toast_rate_limit: "Too many requests",
        toast_online_title: "Connection restored",
        toast_online_message: "You are back online!",
        toast_offline_title: "Offline mode",
        toast_offline_message: "Some functions may not be available.",
        serverstatus_offline_message: "Server not reachable",
        serverstatus_hint: "Notice",
        serverstatus_err_rate_limit_title: "Server service temporarily busy",
        serverstatus_err_rate_limit_text: "Please wait a moment and try again.",
        serverstatus_err_timeout_title: "Request timed out",
        serverstatus_err_timeout_text: "The server status service is not responding right now. Please try again later.",
        serverstatus_err_network_title: "Connection error",
        serverstatus_err_network_text: "The MC-Craft API could not be reached.",
        serverstatus_err_api_title: "Server service unavailable",
        serverstatus_err_api_text: "The server status could not be checked right now.",
        serverstatus_err_invalid_address_title: "Invalid server address",
        serverstatus_err_invalid_address_text: "Please enter a valid Minecraft server address.",
        serverstatus_err_address_required_title: "Server address required",
        serverstatus_err_address_required_text: "Please enter a server IP or domain.",
        common_na: "N/A"
    }
};

// ===== GLOBALE VARIABLEN =====
let currentApi = 'java';

// ===== DOM ELEMENTE =====

// Server Status spezifische Elemente
const javaTab = document.getElementById('javaTab');
const bedrockTab = document.getElementById('bedrockTab');
const serverIp = document.getElementById('serverIp');
const checkBtn = document.getElementById('checkBtn');
const statusCard = document.getElementById('statusCard');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');
const exampleServers = document.querySelectorAll('.example-server');

// Server Info Elements
const serverIcon = document.getElementById('serverIcon');
const serverName = document.getElementById('serverName');
const serverMotd = document.getElementById('serverMotd');
const serverStatusBadge = document.getElementById('serverStatusBadge');
const serverInfo = document.getElementById('serverInfo');
const playersSection = document.getElementById('playersSection');
const playersCount = document.getElementById('playersCount');
const playersList = document.getElementById('playersList');

// Sound-Elemente

// ===== HILFSFUNKTIONEN =====

// ===== INITIALISIERUNG =====
window.addEventListener('DOMContentLoaded', () => {
    initServerStatus();
});

// ===== AUDIO =====

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

// ===== LOADER =====

// ===== THEME SYSTEM =====

// ===== MOBILE MENU =====

// ===== THEME SWITCHER =====

// ===== SCROLL EFFECTS =====

// ===== TOAST =====

// ===== FOOTER YEAR =====

// ===== SERVER STATUS FUNKTIONALITÄT (mit verbesserter Fehlerbehandlung) =====
function initServerStatus() {
    // Tab-Wechsel
    javaTab.addEventListener('click', () => {
        currentApi = 'java';
        javaTab.classList.add('active');
        bedrockTab.classList.remove('active');
        serverIp.placeholder = t('serverstatus_input_placeholder');
        playClickSound();
    });

    bedrockTab.addEventListener('click', () => {
        currentApi = 'bedrock';
        bedrockTab.classList.add('active');
        javaTab.classList.remove('active');
        serverIp.placeholder = t('serverstatus_input_placeholder');
        playClickSound();
    });

    // Status prüfen
    checkBtn.addEventListener('click', checkServerStatus);
    serverIp.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkServerStatus();
        }
    });

    // Beispiel-Server
    exampleServers.forEach(server => {
        server.addEventListener('click', () => {
            serverIp.value = server.getAttribute('data-ip');
            checkServerStatus();
            playClickSound();
        });
    });
}

function checkServerStatus() {
    const ip = serverIp.value.trim();
    if (!ip) {
        showError(t('serverstatus_err_address_required_title'), t('serverstatus_err_address_required_text'));
        return;
    }

    // Minecraft XP-Balken Ladeanimation
    loadingIndicator.classList.add('active');
    loadingIndicator.innerHTML = `
        <div class="minecraft-xp-loading">
            <div class="loading-header">
                <div class="minecraft-icon">
                    <i class="fas fa-server"></i>
                </div>
                <div class="loading-text">
                    <h3>${t('serverstatus_loading_title')}</h3>
                    <p>${t('serverstatus_loading_connecting')}</p>
                </div>
            </div>

            <div class="xp-container">
                <div class="xp-bar">
                    <div class="xp-fill" id="xpFill"></div>
                </div>
                <div class="xp-labels">
                    <span>${t('serverstatus_loading_search')}</span>
                    <span>${t('serverstatus_loading_connect')}</span>
                    <span>${t('serverstatus_loading_data')}</span>
                    <span>${t('serverstatus_loading_done')}</span>
                </div>
            </div>

            <div class="server-info-loading">
                <div class="info-item">
                    <i class="fas fa-globe"></i>
                    <span>${t('serverstatus_loading_server')} <span id="loadingIndicatorIp"></span></span>
                </div>
                <div class="info-item">
                    <i class="fas fa-plug"></i>
                    <span>${t('serverstatus_loading_type')} ${currentApi === 'java' ? t('serverstatus_tab_java') : t('serverstatus_tab_bedrock')}</span>
                </div>
            </div>

            <div class="minecraft-hint">
                <i class="fas fa-lightbulb"></i>
                ${t('serverstatus_loading_hint')}
            </div>
        </div>
    `;
    // ip ist rohe Nutzereingabe - separat per textContent setzen statt in obigem
    // Template zu interpolieren (verhindert DOM-XSS über das IP-Feld).
    loadingIndicator.querySelector('#loadingIndicatorIp').textContent = ip;

    errorMessage.classList.remove('active');
    statusCard.classList.remove('active');

    // Starte die XP-Balken Animation
    const xpFill = document.getElementById('xpFill');
    let progress = 0;
    const animationInterval = setInterval(() => {
        progress += 0.5;
        xpFill.style.width = `${Math.min(progress, 90)}%`;

        if (progress < 30) {
            xpFill.style.background = 'linear-gradient(90deg, #4CAF50, #8BC34A)';
        } else if (progress < 60) {
            xpFill.style.background = 'linear-gradient(90deg, #2196F3, #03A9F4)';
        } else {
            xpFill.style.background = 'linear-gradient(90deg, #9C27B0, #E91E63)';
        }
    }, 20);

    loadingIndicator.animationInterval = animationInterval;

    MCCraftAPI.getServer(currentApi, ip)
        .then(data => {
            clearInterval(animationInterval);
            xpFill.style.width = '100%';
            xpFill.style.background = 'linear-gradient(90deg, #FF9800, #FFC107)';

            setTimeout(() => {
                loadingIndicator.classList.remove('active');
                if (data.online) {
                    displayServerInfo(data, ip);
                } else {
                    showOffline(ip);
                }
            }, 500);
        })
        .catch(error => {
            clearInterval(animationInterval);
            loadingIndicator.classList.remove('active');
            console.error('API Error:', error);

            const code = error && error.code;
            switch (code) {
                case 'RATE_LIMIT':
                    showError(t('serverstatus_err_rate_limit_title'), t('serverstatus_err_rate_limit_text'));
                    break;
                case 'SERVER_API_TIMEOUT':
                    showError(t('serverstatus_err_timeout_title'), t('serverstatus_err_timeout_text'));
                    break;
                case 'NETWORK_ERROR':
                    showError(t('serverstatus_err_network_title'), t('serverstatus_err_network_text'));
                    break;
                case 'INVALID_SERVER_ADDRESS':
                    showError(t('serverstatus_err_invalid_address_title'), t('serverstatus_err_invalid_address_text'));
                    break;
                case 'SERVER_ADDRESS_REQUIRED':
                    showError(t('serverstatus_err_address_required_title'), t('serverstatus_err_address_required_text'));
                    break;
                case 'SERVER_API_ERROR':
                default:
                    showError(t('serverstatus_err_api_title'), t('serverstatus_err_api_text'));
                    break;
            }
        });
}

// Baut ein .info-item sicher über die DOM-API statt per innerHTML-Template:
// labelHTML darf nur interne, feste Strings (Icon + übersetztes Label) enthalten,
// valueText ist potenziell nutzer-/serverbeeinflusst (IP-Eingabe bzw. mcsrvstat.us-Antwortfelder
// wie Version/Map/Gamemode) und wird deshalb ausschließlich per textContent gesetzt.
function buildInfoItem(iconClass, labelText, valueText) {
    const item = document.createElement('div');
    item.className = 'info-item';

    const label = document.createElement('div');
    label.className = 'info-label';
    const icon = document.createElement('i');
    icon.className = iconClass;
    label.appendChild(icon);
    label.appendChild(document.createTextNode(' ' + labelText));

    const value = document.createElement('div');
    value.className = 'info-value';
    value.textContent = valueText;

    item.appendChild(label);
    item.appendChild(value);
    return item;
}

function displayServerInfo(data, ip) {
    statusCard.classList.add('active');

    if (currentApi === 'java' && data.icon) {
        serverIcon.src = data.icon;
        serverIcon.style.display = 'block';
        serverIcon.onerror = function() {
            serverIcon.style.display = 'none';
        };
    } else {
        serverIcon.style.display = 'none';
    }

    serverName.textContent = ip;
    if (data.motd?.clean) {
        serverMotd.textContent = data.motd.clean.join(' ');
    } else {
        serverMotd.textContent = '-';
    }

    serverStatusBadge.className = 'server-status status-online';
    serverStatusBadge.textContent = t('serverstatus_online');

    const items = [];

    if (currentApi === 'java') {
        items.push(
            buildInfoItem('fas fa-server', t('serverstatus_info_ip'), ip),
            buildInfoItem('fas fa-network-wired', t('serverstatus_info_server_ip'), data.ip || t('common_na')),
            buildInfoItem('fas fa-plug', t('serverstatus_info_port'), data.port || '25565'),
            buildInfoItem('fas fa-code-branch', t('serverstatus_info_version'), data.version || t('common_na')),
            buildInfoItem('fas fa-project-diagram', t('serverstatus_info_protocol'), data.protocol?.name || t('common_na')),
            buildInfoItem('fas fa-users', t('serverstatus_info_players'), `${data.players?.online || 0} / ${data.players?.max || 0}`)
        );
    } else {
        items.push(
            buildInfoItem('fas fa-server', t('serverstatus_info_ip'), ip),
            buildInfoItem('fas fa-gamepad', t('serverstatus_info_gamemode'), data.gamemode || t('common_na')),
            buildInfoItem('fas fa-plug', t('serverstatus_info_port'), data.port || '19132'),
            buildInfoItem('fas fa-id-card', t('serverstatus_info_serverid'), data.serverid || t('common_na')),
            buildInfoItem('fas fa-map', t('serverstatus_info_map'), data.map?.clean || t('common_na')),
            buildInfoItem('fas fa-users', t('serverstatus_info_players'), `${data.players?.online || 0} / ${data.players?.max || 0}`)
        );
    }

    serverInfo.replaceChildren(...items);

    playersCount.textContent = `${data.players?.online || 0}/${data.players?.max || 0}`;

    if (data.players?.list && data.players.list.length > 0) {
        playersList.innerHTML = '';
        data.players.list.forEach(player => {
            const playerElement = document.createElement('span');
            playerElement.className = 'player-badge';
            playerElement.textContent = player;
            playersList.appendChild(playerElement);
        });
        playersSection.style.display = 'block';
    } else {
        playersSection.style.display = 'none';
    }

    setTimeout(() => {
        statusCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);

    showToast(t('toast_success'), `${ip} ${t('serverstatus_online')}`, 'success');
}

function showOffline(ip) {
    statusCard.classList.add('active');

    serverIcon.style.display = 'none';
    serverName.textContent = ip;
    serverMotd.textContent = t('serverstatus_offline');

    serverStatusBadge.className = 'server-status status-offline';
    serverStatusBadge.textContent = t('serverstatus_offline');

    serverInfo.replaceChildren(
        buildInfoItem('fas fa-server', t('serverstatus_info_ip'), ip),
        buildInfoItem('fas fa-exclamation-triangle', t('serverstatus_hint'), t('serverstatus_offline_message'))
    );

    playersSection.style.display = 'none';

    showToast(t('toast_error_title'), `${ip} ${t('serverstatus_offline')}`, 'error');
}

function showError(title, message) {
    errorMessage.innerHTML = '';
    const strong = document.createElement('strong');
    strong.textContent = title;
    errorMessage.appendChild(strong);
    errorMessage.appendChild(document.createElement('br'));
    errorMessage.appendChild(document.createTextNode(message));
    errorMessage.classList.add('active');
    playClickSound();
}

// ===== WINDOW RESIZE HANDLER =====

// ===== KLICK-SOUND FÜR ALLE INTERAKTIVEN ELEMENTE =====

// ===== ERROR HANDLING =====

// ===== OFFLINE SUPPORT =====

// ===== BILDER PRELOADING =====
window.addEventListener('load', () => {
    const images = [
        '/assets/img/icons/grassblock.gif',
        '/assets/img/icons/Lava.gif',
        '/assets/img/icons/crystal.gif'
    ];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});
