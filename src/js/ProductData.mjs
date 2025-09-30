function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// bring in the base URL from .env
const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ProductData {
  constructor() {
    // category is no longer needed in constructor
  }

  // fetch products by category
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result; // API returns an object with Result array
  }

  // fetch a single product by id
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result; // API wraps the product in Result
  }
}
