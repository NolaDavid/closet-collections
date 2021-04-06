import axios from 'axios';
import config from '../../config';

export const findAStore = (keyword:any): any => {
  const url = `https://api.yelp.com/v3/businesses/search?term=${keyword}&location=Louisiana&limit=5&key=${config.YELP_API}`;

  return axios.get(url, { headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${config.YELP_API}`
  }})
    .then(({data}) => data)
    .catch(err => console.error(err));
};

