import Router from 'express';
const Location = Router();
import { getGeolocationByIP } from '../helpers/geolocation';

export default Location.post('/', (req, res): Promise<any> => {
  const { ip } = req.body;

  return getGeolocationByIP(ip)
    .then((data) => res.status(200).send(data))
    .catch(() => res.status(404));
});
