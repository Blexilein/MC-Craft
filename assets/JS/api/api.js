// MC-Craft API Client

(function (global) {
    'use strict';

    const BASE_URL = 'https://api.mc-craft.com';
    const DEFAULT_TIMEOUT = 12000;

    class MCCraftAPIError extends Error {
        constructor(code, options = {}) {
            super(code);
            this.name = 'MCCraftAPIError';
            this.code = code;
            this.status = options.status ?? null;
            this.endpoint = options.endpoint ?? null;
            this.details = options.details ?? null;
        }
    }

    function normalizeBaseUrl(url) {
        return String(url || '').replace(/\/+$/, '');
    }

    function buildUrl(path) {
        const value = String(path || '');
        const cleanPath = value.startsWith('/') ? value : '/' + value;
        return normalizeBaseUrl(BASE_URL) + cleanPath;
    }

    function createController(timeout) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeout);

        return {
            controller,
            clear() {
                clearTimeout(timer);
            }
        };
    }

    async function readErrorResponse(response, endpoint) {
        const contentType = response.headers.get('Content-Type') || '';
        let details = null;
        let code = 'HTTP_ERROR';

        try {
            if (contentType.includes('application/json')) {
                details = await response.json();

                if (details && typeof details.error === 'string') {
                    code = details.error;
                }
            } else {
                const text = await response.text();

                if (text) {
                    details = { message: text };
                }
            }
        } catch (_) {
            // Fehlerantwort konnte nicht gelesen werden.
        }

        return new MCCraftAPIError(code, {
            status: response.status,
            endpoint,
            details
        });
    }

    async function requestJson(path, options = {}) {
        const endpoint = buildUrl(path);
        const timeout = Number.isFinite(options.timeout)
            ? options.timeout
            : DEFAULT_TIMEOUT;

        const abort = createController(timeout);

        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    ...(options.headers || {})
                },
                cache: options.cache || 'default',
                credentials: 'omit',
                signal: abort.controller.signal
            });

            if (!response.ok) {
                throw await readErrorResponse(response, endpoint);
            }

            try {
                return await response.json();
            } catch (_) {
                throw new MCCraftAPIError('INVALID_JSON_RESPONSE', {
                    status: response.status,
                    endpoint
                });
            }
        } catch (error) {
            if (error instanceof MCCraftAPIError) {
                throw error;
            }

            if (error && error.name === 'AbortError') {
                throw new MCCraftAPIError('TIMEOUT', {
                    endpoint
                });
            }

            throw new MCCraftAPIError('NETWORK_ERROR', {
                endpoint,
                details: error
            });
        } finally {
            abort.clear();
        }
    }

    async function requestBlob(path, options = {}) {
        const endpoint = buildUrl(path);
        const timeout = Number.isFinite(options.timeout)
            ? options.timeout
            : DEFAULT_TIMEOUT;

        const abort = createController(timeout);

        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    Accept: options.accept || 'application/octet-stream',
                    ...(options.headers || {})
                },
                cache: options.cache || 'default',
                credentials: 'omit',
                signal: abort.controller.signal
            });

            if (!response.ok) {
                throw await readErrorResponse(response, endpoint);
            }

            return await response.blob();
        } catch (error) {
            if (error instanceof MCCraftAPIError) {
                throw error;
            }

            if (error && error.name === 'AbortError') {
                throw new MCCraftAPIError('TIMEOUT', {
                    endpoint
                });
            }

            throw new MCCraftAPIError('NETWORK_ERROR', {
                endpoint,
                details: error
            });
        } finally {
            abort.clear();
        }
    }

    async function request(path, options = {}) {
        return requestJson(path, options);
    }

    function cleanPlayerInput(input) {
        return String(input ?? '').trim();
    }

    function cleanServerAddress(address) {
        return String(address ?? '').trim();
    }

    function requirePlayerInput(input) {
        const value = cleanPlayerInput(input);

        if (!value) {
            throw new MCCraftAPIError('PLAYER_REQUIRED');
        }

        return value;
    }

    function playerPath(input) {
        const value = requirePlayerInput(input);
        return '/player/' + encodeURIComponent(value);
    }

    async function getHealth(options = {}) {
        return requestJson('/', options);
    }

    async function getPlayer(input, options = {}) {
        return requestJson(playerPath(input), options);
    }

    function getPlayerSkinUrl(input) {
        return buildUrl(playerPath(input) + '/skin');
    }

    async function getPlayerSkin(input, options = {}) {
        return requestBlob(
            playerPath(input) + '/skin',
            {
                ...options,
                accept: 'image/png,image/*'
            }
        );
    }

    async function getPlayerSkinBlob(input, options = {}) {
        return getPlayerSkin(input, options);
    }

    async function getServer(type, address, options = {}) {
        const edition = String(type || '').toLowerCase();
        const value = cleanServerAddress(address);

        if (edition !== 'java' && edition !== 'bedrock') {
            throw new MCCraftAPIError('INVALID_SERVER_TYPE');
        }

        if (!value) {
            throw new MCCraftAPIError('SERVER_ADDRESS_REQUIRED');
        }

        return requestJson(
            '/server/' +
            edition +
            '/' +
            encodeURIComponent(value),
            options
        );
    }

    async function getJavaServer(address, options = {}) {
        return getServer('java', address, options);
    }

    async function getBedrockServer(address, options = {}) {
        return getServer('bedrock', address, options);
    }

    async function getVersions(options = {}) {
        return requestJson('/versions', options);
    }

    async function getStatus(options = {}) {
        return requestJson('/status', options);
    }

    function isAPIError(error) {
        return error instanceof MCCraftAPIError;
    }

    global.MCCraftAPI = Object.freeze({
        baseUrl: BASE_URL,

        request,
        requestJson,
        requestBlob,

        getHealth,

        getPlayer,
        getPlayerSkin,
        getPlayerSkinBlob,
        getPlayerSkinUrl,

        getServer,
        getJavaServer,
        getBedrockServer,

        getVersions,
        getStatus,

        isAPIError,
        Error: MCCraftAPIError
    });

})(window);