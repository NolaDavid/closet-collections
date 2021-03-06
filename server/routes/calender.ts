import { Router } from 'express';
const CalendarItem = Router();
import { Calendar } from '../db/db';

import { addFav, getFavs, removeFav } from '../helpers/calendar';

CalendarItem.get('/', (req: any, res: any) => {
  return getFavs()
  .then((data: any) => res.send(data))
  .catch((err: string) => console.warn(err))
});

CalendarItem.post('/', (req: any, res: any) => {
  return addFav(req.body)
  .then((data: any) => res.send(data))
  .catch((err: string) => console.warn(err))
});

CalendarItem.delete('/', (req: any, res: any) => {
  return removeFav(req.body)
  .then((data: any) => res.send(data))
  .catch((err: string) => console.warn(err))
});

module.exports = CalendarItem;