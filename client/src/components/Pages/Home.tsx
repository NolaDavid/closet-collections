
import React, { DragEvent, MouseEvent, ReactElement, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import axios from 'axios';
import { title } from 'node:process';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import Footer from './Footer';
import { borders } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import { AnyPtrRecord } from 'node:dns';
import Grid from '@material-ui/core/Grid';

const Home = (): ReactElement => {

  // let _isMounted = false;
  const [mysteryImg, setMysteryImg] = React.useState('');
  const [topOutfit, setTopOutFit] = React.useState([]);
  const [images, setImages] = React.useState({});
  const [font, setFont] = useState(25);
  const [imgSize, setImgSize] = useState(25);
  const [fonth4, setFonth4] = useState(18);
  const [fonth2, setFonth2] = useState(35);
  const [longitude, setLong] = React.useState(0);
  const [latitude, setLat] = React.useState(0);
  const [temp, setTemp] = React.useState('');
  const [desc, setDesc] = React.useState('');

  const [likeCount, setCount] = React.useState(0);


  // const getUserLocation = (): any => {
  //   //get user's ip address
  //   return axios.get('https://api.ipify.org')
  //   // get location data by ip address
  //     .then(({ data }) => axios.post('/api/location', { ip: data }))
  //     .then(({ data: { latitude, longitude } }) => {

  //       setLat(latitude);
  //       setLong(longitude);

  //       getWeatherByUserLocation(latitude, longitude);

  //     }).catch((err) => console.warn(err));
  // };


  // const getWeatherByUserLocation = (latitude, longitude): any => {
  //   _isMounted = true;
  //   axios.post('/api/weather', { latitude, longitude })
  //     .then(({ data: { data } }) => {
  //       _isMounted = false;
  //       const { temp, weather } = data[0];
  //       const { description } = weather;
  //       const descriptionLowerCase = description.toLowerCase();
  //       // change temperature to fahrenheit
  //       const newTemp = Math.round(temp * (9 / 5) + 32);

  //       setTemp(`${newTemp}°F`);
  //       setDesc(descriptionLowerCase);

  //     }).catch((err) => console.warn(err));
  // };
  // React.useEffect(() => {
  //   getUserLocation();
  // });


  // React.useEffect(() => {
  //   axios.get('/outfit')
  //     .then(({ data }) => setImages(data))
  //     .catch((err) => console.warn(err));
  // }, []);


  const larger = (): any => {
    setFont(40);
    setImgSize(40);
    setFonth4(40);
    setFonth2(40);
  };

  const smaller = (): any => {
    setFont(25);
    setFonth2(35);
    setImgSize(15);
    setFonth4(18);
  };






  useEffect(() => {

    axios.get('/outfit')
      .then(({ data }) => setMysteryImg(data[Math.floor(Math.random() * data.length - 1)].imageUrl))
      .catch((err) => console.warn(err));

  }, []);


  useEffect(() => {

    axios.get('/outfit')
      .then(({ data }) => {
        const info = data.reduce((acc, val) => {
          if (acc.likesCount < val.likesCount) {
            acc = val;
          }
          return acc;
        });
        console.log('dddd', info);
        setImages(info);
      })
      .catch((err) => console.warn(err));

  }, []);


  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },

    title: {
      fontSize: font,
      marginVertical: 10
    },

    weather: {
      fontSize: font
    }

  });
  console.log('mystery', mysteryImg);
  return (

    !images ? <h1>Loading</h1> :
      <>
        <Grid container justify = "center" spacing={3}>
          {/* <h2 style={{fontSize: font}}>Currently {temp} and {desc}</h2> */}

          <div id='magnifier'>
            <ZoomInIcon onClick={larger} />
            <ZoomOutIcon onClick={smaller} />
            <h1 style={{fontSize: fonth2}}>Top Rated Outfit </h1>
          </div>
          <h4 style={{fontSize: fonth4, paddingBottom: 0}}> {`This outfit has ${images['likesCount']} likes` }</h4>

          <Box border={1} width="75%" boxShadow={2} display="block" height="65%">
            <img className="photo" alt="outfit" src={
              images['imageUrl']}/>

            {console.log('images', images)}
          </Box>
          <h2 style={{fontSize: fonth2}}>Suggested Outfit Of The Day</h2>
          <Box border={1} width="75%" height="65%" display="block" boxShadow={2}>
            <span><img className="photo" src={mysteryImg} /></span>
          </Box>
        </Grid>
        <Box p={9} />
        <Footer></Footer>
      </>
  );
};



export default Home;
