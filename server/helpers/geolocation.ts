import axios from 'axios';

export const getGeolocationByIP = (userIP: number): Promise<any> => {

  const url = `http://api.ipstack.com/${userIP}?access_key=${process.env.access_key}`;

  return axios.get(url)
    .then(({ data }) => data)
    .catch((err) => console.error(err));
};
