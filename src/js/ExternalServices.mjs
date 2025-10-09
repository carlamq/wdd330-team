const baseURL = import.meta.env.VITE_SERVER_URL || "https://wdd330-backend.onrender.com/";

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Bad Response: ${res.status} ${res.statusText}`);
  }
}

export default class ExternalServices {
  constructor() {
 
  }
  
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    };
    
    const response = await fetch(`${baseURL}checkout`, options);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Bad Response: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    return await response.json();
  }
}
