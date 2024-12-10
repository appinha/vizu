const BASE_API_URL = import.meta.env.VITE_API_URL;

export async function get(url: string, body?: Record<string, unknown>) {
  const apiUrl = BASE_API_URL + url;

  try {
    const response = await fetch(apiUrl, {
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${apiUrl}: ${response.status} : ${response.statusText}`,
      );
    }
    return response;
  } catch (error) {
    console.error(error);
  }
}
