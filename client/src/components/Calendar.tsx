import React, { ReactElement } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Saved from './Pages/SavedItems';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import { items } from '../../../releaseData/calendarItems';
import Footer from './Pages/Footer';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';

const Props = {
  items
};

const Calendar: React.FC = () => {

  const [notify, setNotify] = React.useState(false);
  const [favItems, setFaveItems] = React.useState([]);
  const [liked, setLike] = React.useState('');
  const [phone, setNumber] = React.useState('');
  const [dummyNumber, setPhone] = React.useState('');
  const [page, setPage] = React.useState(true);
  const [fontTitle, setTitle] = React.useState(15);
  const [fontS, setSTitle] = React.useState(25);
  const [titleFont, setTitleFont] = React.useState(35);

  const push = (item): void => {
    setNotify(true);


    const message = {
      phone: `+1${phone}`,
      body: `You will receive a reminder for the ${item.title} ${item.subTitle}'s, Thank you!`
    };

    const post = {
      phoneNumber: `+1${phone}`,
      notification: `${item.title} ${item.subTitle}'s are releasing tomorrow!`,
      sendNotification: `${item.sendReminder}`,
      time: `${item.release}`
    };

    axios.post('/reminder', post)
      .then((data: any) => console.log(data))
      .catch((err: string) => console.warn('Error here', err));

    axios.post('/sms', message)
      .then((data: any) => console.log(data))
      .catch((err: string) => console.warn('Error here', err));

  };

  const favItem = (item): void => {
    alert(`${item.title} ${item.subTitle} has been added to items`);
    setLike('red');

    setFaveItems([item.title, item.subTitle, item.img, item.release]);

    const data = {
      title: item.title,
      subTitle: item.subTitle,
      imgUrl: item.img,
      releaseDate: item.release
    };

    axios.post('/calendar', data)
      .then((data: any) => console.log(data) )
      .catch((err: string) => console.warn('Error here', err));
  };

  const larger = (): any => {
    setTitle(40);
    setSTitle(35);
    setTitleFont(40);
  };

  const smaller = (): any => {
    setTitle(15);
    setSTitle(20);
    setTitleFont(35);
  };

  const handleChange = (e): any => {
    setNumber(e.target.value);
    setPhone(e.target.value);
  };


  const useStyles = makeStyles({
    root: {
      background: '#000000',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
      color: '#7ed957',
      height: 48,
      padding: '0 30px',
      fontFamily: 'Roboto Slab',
    },
  });

  const classes = useStyles();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Roboto Slab',
    },
    buttonContainer: {
      flexDirection: 'row'
    },
    title: {
      fontSize: titleFont,
      alignSelf: 'center',
      fontFamily: 'Roboto Slab',
    },

    button: {
      backgroundColor: '#7ED957',
      marginVertical: -30,
      alignSelf: 'center'
    },

    itemInfo: {
      flex: 1,
      fontSize: fontTitle,
      textAlign: 'center',
      marginVertical: -10,
      fontFamily: 'Roboto Slab',
    },

    subItemInfo: {
      flex: 1,
      fontSize: fontS,
      textAlign: 'center',
      marginVertical: 10,
      fontFamily: 'Roboto Slab',
    },


  });

  return (
    <>
      <View>
        {

          page === true ?
            <View>
              <div>
                <ZoomInIcon style={{alignSelf: 'left'}} onClick={larger} />
                <ZoomOutIcon onClick={smaller} />
              </div>

              <View style={styles.container}>
                <TouchableOpacity style={styles.buttonContainer}>

                  <Button className={classes.root} style={{backgroundColor: '#000000'}} onClick={(): void => setPage(false)}>Items</Button>
                  <div>
                    <input
                      type='text'
                      placeholder ='Add phone number'
                      value={ dummyNumber }
                      onChange={(e): any => handleChange(e)}
                      onKeyDown={(e): any => {
                        if (e.key === 'Enter') {
                          setPhone('');
                        }
                      }}
                      className={classes.root} style={{backgroundColor: '#000000'}} ></input>
                  </div>
                </TouchableOpacity>
                <Text style={styles.title}>Upcoming Releases!</Text>

                {
                  items.map((item, v) => {
                    return <View
                      key={v}>
                      <Image
                        style={{width: 250, height: 250, marginVertical: 10, alignSelf: 'center'}}
                        source={{uri: item.img}}
                      />
                      <Text style={styles.itemInfo}>{item.title}</Text>
                      <Text style={styles.subItemInfo}>
                        <FavoriteIcon onClick={(): void => favItem(item)} /> {item.subTitle}</Text>
                      <Button className={classes.root}
                        style={{backgroundColor: '#000000'}}
                        onClick={(): void => push(item)}> Notify me!
                      </Button>
                    </View>;
                  })
                }
              </View>
            </View> :
            <View>
              <ExitToAppIcon onClick={(): void => setPage(true)}/>
              <Saved />
            </View>
        }
      </View>
    </>
  );
};

export default Calendar;
