const VITE_URL = import.meta.env.VITE_API_URL;

export const generateWebsiteHTML = async (prompt: string): Promise<string> => {
  const response = await fetch(`${VITE_URL}/generate-site`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate website');
  }

  return await response.text();
};
