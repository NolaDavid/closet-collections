/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import Footer from './Footer';

const Saved = () => {

  const [item, setItems] = React.useState([]);
  const [page, setPage] = React.useState(true);
  const [clickedItem, setClicked] = React.useState([]);
  const [fontTitle, setTitle] = React.useState(20);
  const [fontS, setSTitle] = React.useState(35);
  const [fontDate, setDate] = React.useState(20);


  const display = (item) => {
    setPage(false);

    setClicked([item.title, item.subTitle, item.imgUrl, item.releaseDate]);

  };


  React.useEffect(() => {
    axios.get('/calendar/get')
      .then(({ data }) => setItems(data))
      .catch((err) => console.warn(err));
  }, []);

  const larger = (): any => {
    setTitle(40);
    setSTitle(50);
    setDate(40);
  };

  const smaller = (): any => {
    setTitle(20);
    setSTitle(30);
    setDate(20);
  };



  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap'
    },

    title: {
      fontSize: 25,
    },

    button: {
      backgroundColor: 'black'
    },

    itemInfo: {
      flex: 1,
      fontSize: fontTitle,
      textAlign: 'center',
      marginVertical: 35,
      marginLeft: 10,
      fontFamily: 'Roboto Slab',
    },

    subItemInfo: {
      flex: 1,
      fontSize: fontS,
      textAlign: 'center',
      marginBottom: 10,
      marginTop: -20,
      marginLeft: 10,
      fontFamily: 'Roboto Slab',
    },

    dateInfo: {
      flex: 1,
      fontSize: fontDate,
      textAlign: 'center',
      marginVertical: 5,
      marginLeft: 10,
      fontFamily: 'Roboto Slab',
    },

    saved: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    }


  });


  return (
    <>
      <View style={styles.container}>
        {

          page === true ?
            item.map((item, v) => {
              return <View
                key={v}>
                <TouchableOpacity
                  onPress={() => display(item)}>
                  <Image
                    style={{width: 185, height: 185, marginVertical: 2, marginLeft: 2}}
                    source={{uri: item.imgUrl}}
                  />
                </TouchableOpacity>
              </View>;
            }) :
            <View style={styles.saved}>
              <div>
                <ZoomInIcon onClick={larger} />
                <ZoomOutIcon onClick={smaller} />
              </div>
              <Image
                style={{width: 400, height: 330}}
                source={{uri: clickedItem[2]}} />
              <Text style={styles.itemInfo}>{clickedItem[0]}</Text>
              <Text style={styles.subItemInfo}>{clickedItem[1]}</Text>
              <Text style={styles.dateInfo}>{clickedItem[3]}</Text>
            </View>
        }
      </View>
    </>
  );

};


export default Saved;
