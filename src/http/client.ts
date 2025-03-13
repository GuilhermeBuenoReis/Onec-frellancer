import Cookies from 'universal-cookie';

async function getHeaders(
  headers: Record<string, string> = {}
): Promise<Record<string, string>> {
  const cookie = new Cookies();
  const token = cookie.get('app-token');

  if (token) {
    return { ...headers, Authorization: `Bearer ${token}` };
  }

  return headers;
}

interface HttpRequestOptions extends RequestInit {
  url: string;
  data?: unknown;
}

export async function http<T>({
  url,
  data,
  ...options
}: HttpRequestOptions): Promise<T> {
  const headers = await getHeaders(
    (options.headers ?? {}) as Record<string, string>
  );

  let body = options.body;
  if (data !== undefined) {
    body = JSON.stringify(data);
    if (!headers['Content-Type'] && !headers['content-type']) {
      headers['Content-Type'] = 'application/json';
    }
  }

  const finalUrl = new URL(url, import.meta.env.VITE_API_URL);
  console.log('URL construída:', finalUrl.toString());

  const request = new Request(finalUrl.toString(), {
    ...options,
    headers,
    body,
  });

  const response = await fetch(request);

  if (response.ok) {
    if (response.headers.get('content-type')?.includes('application/json')) {
      const responseData = await response.json();
      return responseData as T;
    }
    const responseData = await response.text();
    return responseData as T;
  }

  return Promise.reject(response);
}
