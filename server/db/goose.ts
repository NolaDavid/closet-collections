import mongoose from 'mongoose';
import { Schema, Model, model } from 'mongoose';
import moment from 'moment';
import Twilio from 'twilio';
import dotenv from 'dotenv';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
dotenv.config();

const uri = 'mongodb+srv://iwright123:thesis@cluster0.aqhkv.mongodb.net/notidatabase?retryWrites=true&w=majority';

export const connectDB = async (): Promise<any> => {
  try {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log('MongoDB connected');
  } catch (err) {
    console.warn(err);
  }
};

const AppointmentSchema: Schema = new mongoose.Schema({
  username: String,
  phoneNumber: String,
  notification: String,
  sendNotification: {type: Date, index: true},
  time: {type: Date, index: true}
});

export const Appointment = mongoose.model('Appointment', AppointmentSchema);

// add reminder into db
// set interval to find reminders in the db or create a function that finds all reminders
// push reminders into a storage
// if the storage has a length add them to the message
// create and send message with twilio
// remove reminder
// use set interval to check the storage if step 2 isn't an interval function
// eslint-disable-next-line prefer-const

export const notificationCheck = (): any => {
  // find all notifications in db for user
  Appointment.find({})
    .then((data) => {
      const needToSend = [];

      needToSend.push(data);
      // loop all data
      needToSend.forEach((data) => {
        // now loop single object of data
        data.forEach((obj) => {
          // checks usernames so it sends correct notifications to correct user
          if (obj.username === data[0].username) {
            // this variable is set to the release date subtracted by 1 day example -> takes 3/18/21 and turns it into 3/17/21
            const dayBeforeRelease = moment(obj.time).subtract(1, 'days').format('L');
            // sendNoti is assigned to send notification date which is one prior to release date of item
            const sendNoti = moment(obj.sendNotification).format('L');
            // release date is the reaslse date of item not being used but its just formatted 01/01/21
            const releaseDate = moment(obj.time).format('L');
            // assign today to the days date with the L format
            const today = moment().format('L');

            /*
            if the day before release is the same as todays date and the day before the release is equal to the day that a notification needs to be send out (one day prior to release)
            */

            // if (today === dayBeforeRelease && dayBeforeRelease === sendNoti) {
            //   const options = {
            //     to: obj.phoneNumber,
            //     from: '+15042852518',
            //     body: `Hello this a reminder that the ${obj.notification}`,
            //   };

            //   const client = Twilio(accountSid, authToken);

            //   client.messages.create(options)
            //     .then(() => console.info('message sent'))
            //     .catch((err) => console.warn(err));
            //}
          }

        });
      });
    }).catch((err) => console.warn(err));
};

// Appointment.remove({
//   phoneNumber: '+15047235161'
// }).then(() => console.log('deleted'));

notificationCheck();
// set function to run every 24 hours
const twentyFour = 1000 * 60 * 60 * 24;

//setInterval(notificationCheck, twentyFour);

const likeSchema = new mongoose.Schema({
  name: String,
  outfitId: Number
});


