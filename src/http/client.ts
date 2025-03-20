export interface HttpRequestInit extends RequestInit {
  url: string;
  data?: unknown;
}

export async function http<T>({
  url,
  data,
  ...init
}: HttpRequestInit): Promise<T> {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333';
  const fullUrl = new URL(url, baseUrl);

  const requestInit: RequestInit = {
    ...init,
    headers: {
      ...init.headers,
      ...(data ? { 'Content-Type': 'application/json' } : {}),
    },
    credentials: 'include',
  };

  if (data && init.method?.toUpperCase() !== 'GET') {
    requestInit.body = JSON.stringify(data);
  } else if (data && (!init.method || init.method.toUpperCase() === 'GET')) {
    console.warn(
      'Requisições GET não devem enviar body; os dados foram ignorados.'
    );
  }

  const response = await fetch(fullUrl.toString(), requestInit);
  if (!response.ok) {
    let errorMessage = `HTTP error! Status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {}
    return Promise.reject(new Error(errorMessage));
  }

  const contentType = response.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    return response.json() as Promise<T>;
  }

  return response.text() as unknown as T;
}
