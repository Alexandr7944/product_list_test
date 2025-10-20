export function getBaseUrl(): string {
    const isProd = import.meta.env.MODE === "production";
    const base = isProd ? import.meta.env.VITE_SERVER_PATH : import.meta.env.VITE_URL_DEV_API;
    if (!base) {
        throw new Error("Base API URL is not configured. Set VITE_SERVER_PATH or VITE_URL_DEV_API.");
    }
    return String(base);
}

/**
 * Делает fetch на baseUrl + path, возвращает JSON или бросает Response с кодом ошибки.
 * Оставляет оригинальные заголовки content-type, чтобы роутер корректно обрабатывал ошибки.
 */
export async function httpJson<T>(path: string, init: RequestInit & { signal?: AbortSignal } = {}): Promise<T> {
    const url = getBaseUrl() + path;
    const res = await fetch(url, {
        ...init,
        headers:     {
            "Content-Type":  "application/json",
            ...init.headers,
        },
    });

    if (!res.ok) {
        const contentType = res.headers.get("content-type") ?? "application/json";
        const text = await res.text().catch(() => "");
        const body = text || JSON.stringify({message: "Request failed"});
        throw new Response(body, {status: res.status, headers: {"Content-Type": contentType}});
    }

    if (res.status === 204) {
        return undefined as unknown as T;
    }

    return (await res.json()) as T;
}
