
import * as express from 'express';
const router = express.Router();
export default router.get('/chat', (req, res) => {
  res.send({ response: 'I am alive' }).status(200);
});

module.exports = router;
