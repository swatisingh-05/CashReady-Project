import { createServer } from "node:http";
import { URL } from "node:url";

const port = Number(process.env.API_PORT ?? 8787);
const providerUrl = process.env.ATM_PROVIDER_URL;
const providerApiKey = process.env.ATM_PROVIDER_API_KEY;
const providerAuthHeader = process.env.ATM_PROVIDER_AUTH_HEADER ?? "Authorization";
const providerAuthPrefix = process.env.ATM_PROVIDER_AUTH_PREFIX ?? "Bearer";

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://127.0.0.1:5173",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(body));
}

function normalizeStatus(payload) {
  const status = payload.status ?? payload.availability ?? "unknown";
  const available = payload.available ?? payload.cashAvailable ?? null;
  const lastUpdated = payload.lastUpdated ?? payload.updatedAt ?? null;

  return {
    available: typeof available === "boolean" ? available : null,
    status: String(status),
    lastUpdated,
    source: "configured-provider",
  };
}

async function getProviderStatus(query) {
  if (!providerUrl) {
    return {
      available: null,
      status: "unavailable",
      lastUpdated: null,
      source: "provider-not-configured",
      message: "Configure ATM_PROVIDER_URL for live cash availability.",
    };
  }

  const upstreamUrl = new URL(providerUrl);
  upstreamUrl.searchParams.set("latitude", query.get("lat"));
  upstreamUrl.searchParams.set("longitude", query.get("lon"));
  upstreamUrl.searchParams.set("radius", query.get("radius") ?? "5000");

  const headers = { Accept: "application/json" };
  if (providerApiKey) {
    headers[providerAuthHeader] = providerAuthPrefix
      ? `${providerAuthPrefix} ${providerApiKey}`
      : providerApiKey;
  }

  const upstreamResponse = await fetch(upstreamUrl, { headers });
  if (!upstreamResponse.ok) {
    throw new Error(`Provider returned ${upstreamResponse.status}`);
  }

  return normalizeStatus(await upstreamResponse.json());
}

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url ?? "/", `http://${request.headers.host}`);

  if (request.method === "GET" && requestUrl.pathname === "/api/health") {
    sendJson(response, 200, { ok: true });
    return;
  }

  if (request.method === "GET" && requestUrl.pathname === "/api/atm-status") {
    try {
      const result = await getProviderStatus(requestUrl.searchParams);
      sendJson(response, 200, result);
    } catch (error) {
      sendJson(response, 502, {
        available: null,
        status: "unavailable",
        lastUpdated: null,
        source: "provider-error",
        message: error instanceof Error ? error.message : "Provider request failed",
      });
    }
    return;
  }

  sendJson(response, 404, { error: "Not found" });
});

server.listen(port, () => {
  console.log(`CashReady API listening on http://127.0.0.1:${port}`);
});
