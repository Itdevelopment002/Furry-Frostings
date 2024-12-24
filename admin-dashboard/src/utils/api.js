export const apiCall = async (method, endpoint, data = null) => {
    const url = process.env.REACT_APP_API_URL + endpoint;
    const headers = {
      'Content-Type': 'application/json',
    };
  
    const response = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    });
  
    if (!response.ok) {
      throw new Error('API call failed');
    }
  
    return await response.json();
  };
  