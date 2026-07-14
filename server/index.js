const INDEX_PATH = "/index.html";

function assetRequest(request, pathname) {
  const url = new URL(request.url);
  url.pathname = pathname;
  url.search = "";
  return new Request(url, request);
}

async function fetchAsset(request, env) {
  return env.ASSETS.fetch(request);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const asset = await fetchAsset(request, env);

    if (asset.status !== 404) {
      return asset;
    }

    const isStaticAsset = /\.[a-zA-Z0-9]+$/.test(url.pathname);

    if (request.method === "GET" && !isStaticAsset) {
      return fetchAsset(assetRequest(request, INDEX_PATH), env);
    }

    return asset;
  },
};
