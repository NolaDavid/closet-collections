import axios from 'axios';

export const getWeatherByGeoLocation = (latitude: number, longitude: number): any => {

  const url = `http://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHERBIT_TOKEN}`;

  return axios.get(url)
    .then(({ data }): void => data)
    .catch((err): void => console.error(err));

};
