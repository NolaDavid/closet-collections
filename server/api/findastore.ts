import Router from 'express';
const Find = Router();
import { findAStore } from '../helpers/FindAStore';

export default Find.get('/:keyword', (req, res) => {
  const { keyword } = req.params;
  findAStore(keyword)
    .then((data) => res.status(200).send(data))
    .catch(() => console.error(404));
});
