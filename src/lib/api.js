import axios from 'axios';
const BACKEND_DOMAIN = 'https://backendfashionstore.azurewebsites.net/api';

export async function getAllProducts() {
  const response = await axios.get(`${BACKEND_DOMAIN}/Products`);

  let data = [];
  for (let i = 0; i < response.data.length - 123; i++) {
    data.push(response.data[i]);
  }

  return data;
}

export async function postCart(item) {
  await axios
    .post(`${BACKEND_DOMAIN}/Carts`, { ...item })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
