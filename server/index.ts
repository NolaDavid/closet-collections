import path from 'path';
import express from 'express';
// import app from 'express'; /* when i switch import express no longer has a () behind it */
const app = express();
import index from './routes/index';
import { Request, Response} from 'express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { GoogleStrategy } = require('./passport');
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {addUser, postComments, getComments, updateLike, setLike} from './db/db';
import { Twilio } from 'twilio';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import usersOutfit from '../client/src/components/models/UsersOutfits';
import moment from 'moment';
import { Appointment, connectDB } from './db/goose';

connectDB();

const httpServer = createServer(app);


dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});


const io = new Server(httpServer, {
  cors: {
    origin: 'localhost:3000',
    methods: ['GET', 'POST']
  }
});


const port = process.env.PORT || 3000;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);
// import client from 'twilio';
// client(accountSid, authToken);
// import MessagingResponse = require('twilio');
// import { twiml } from 'twilio';
// twiml.MessagingResponse;


dotenv.config();

////////////////HELPERS////////////////////
import { addItem, getAllItems, deleteItem, searchItems } from './helpers/Item';
import { saveOutfit, getAllOutfits, deleteOutfit, getUserOutfits, updateFav} from './helpers/Outfit';
import Find from './api/findastore';
////////////////HELPERS////////////////////

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../.env'), });


const dist = path.resolve(__dirname, '..', 'client', 'dist');

app.use(index);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(dist));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api/search', Find);


/*******************DATABASE ROUTES ************************************/

app.get('/outfit/:user', (req: Request, res: Response): Promise<usersOutfit> => {
  return getUserOutfits(req.cookies.thesis)
    .then((data): any => res.json(data))
    .catch((err) => console.warn(err));
});
app.get('/outfit', (req: Request, res: Response): Promise<any> => {
  return getAllOutfits()
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});
app.post('/outfit', (req: Request, res: any): Promise<unknown> => {
  return saveOutfit(req.body, req.cookies.thesis)
    .then((data) => console.log('Outfit created', data))
    .catch((err) => console.warn(err));
});

app.get('/items', (req: Request, res: Response) => {
  return getAllItems()
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});

app.get('items/search', (req: Request, res: Response) => {
  return searchItems(req.body)
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});

app.post('/items', (req: Request, res: Response): Promise<any> => {
  return addItem(req.body)
    .then((data) => res.json(data))
    .catch((err) => console.warn('HERE ERROR', err));

});

// app.get('/likes', (req: Request, res: Response): Promise<any> => {
//   return getLikes(req.cookies.thesis)
//     .then((data) => res.json(data))
//     .catch((err) => console.warn(err));
// });

// app.post('/likes', (req: Request, res: Response): Promise<any> => {
//   return saveLikes(req.body, req.cookies.thesis)
//     .then((data) => console.log('Likes created', data))
//     .catch((err) => console.warn(err));
// });

app.delete('/items/:id', (req: Request, res: Response): Promise<any> => {
  return deleteItem(req.params)
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});

app.delete('/outfit/:id', (req: express.Request, res: express.Response): Promise<any> => {
  console.log('LINE 124', req.params);
  return deleteOutfit(req.params)
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});

/************************************* */

import CalendarItem from './routes/calender';
import Weather from './api/weather';
import Location from './api/geolocation';

app.use('/calendar', CalendarItem);
app.use('/api/weather', Weather);
app.use('/api/location', Location);

/////////GOOGLE AUTH ///////////

app.use(
  session({
    secret: process.env.clientSecret,
    saveUninitialized: false,
    resave: true,
  }),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }), (req: any, res: Response) => {

    const { displayName } = req.user;
    // setting cookie key to thesis and saving the username
    res.cookie('thesis', displayName);
    return addUser(displayName)
      .then(() => res.redirect('/'))
      .catch((err) => console.log('error adding user to db', err));
  });

app.get('/isloggedin', (req: Request, res: Response) => {
  // check to see if the cookie key is thesis
  if (req.cookies.thesis) {
    res.json(true);
  } else {
    res.json(false);
  }
});

app.delete('/logout', (req: Request, res: Response) => {
  // delete the cookie key thesis when logging out
  res.clearCookie('thesis');
  res.json(false);
});


///////////GOOGLE AUTH ^^^^^^///////////

/////////Twilio//////////

app.post('/sms', (req, res) => {
  const { body, phone } = req.body;
  // client.messages.create({
  //   body: body,
  //   from: '+15042852518',
  //   to: phone
  // })
  //   .then((message: any) => console.log('message sid', message.sid))
  //   .catch((err: any) => console.warn('twilio error', err));
});


app.get('/mongod', (req, res, next) => {
  Appointment.find({})
    .then((data) => res.send(data))
    .catch((err) => console.warn(err));
});


app.post('/reminder', (req, res, next) => {
  const { phoneNumber, notification } = req.body;
  const time = moment(req.body.time, 'MMMM-Do-YYYY hh:mma');
  const sendNotification = moment(req.body.sendNotification, 'MMMM-Do-YYYY');

  const appointment = new Appointment({
    username: req.cookies.thesis,
    phoneNumber: phoneNumber,
    notification: notification,
    sendNotification: sendNotification,
    time: time
  });
  appointment.save()
    .then(() => console.log('success'))
    .catch((err) => console.warn(err));

});
/////////Twilio//////////


io.on('connection', (socket: Socket) => {

  socket.on('message', ({name, message}) => {
    io.emit('message', {name, message});
  });
  socket.on('comment', ({name, comment}) => {
    io.emit('comment', {name, comment});
  });
});

app.patch('/outfit/:id', (req: Request, res: Response) => {

  const { id } = req.params;
  return updateLike(id)
    .then(data => res.send(data))
    .catch(err => console.log('error updating like', err));
});
app.get('/likes/:id', (req: Request, res: Response): Promise<any> => {

  const { id } = req.params;

  return setLike(id)
    .then(data => res.send(data))
    .catch(err => console.log('this is the error updating the like', err));
});

app.post('/comment', (req: Request, res: Response):Promise<any> => {

  return postComments(req.body, req.cookies.thesis)
    .then(data => res.send(data))
    .catch(err => console.log('Error posting comment', err));
});

app.get('/comments', (req: Request, res: Response): any => {

  return getComments()
    .then(data => res.send(data))
    .catch(err => console.log('error getting comments', err));
});



httpServer.listen(3000, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

