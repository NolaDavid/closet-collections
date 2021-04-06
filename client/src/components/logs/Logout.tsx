import * as React from 'react';
import axios from 'axios';
import GoogleButton from 'react-google-button';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { StyleSheet, View } from 'react-native';
import Footer from '../Pages/Footer';
import Box from '@material-ui/core/Box';

const Logsout = (): React.ReactElement => {
  const [login, setLogin] = React.useState(false);

  React.useEffect(() => {
    axios.get('./isloggedin')
      .then(({ data }) => setLogin(data))
      .catch((err) => console.warn(err));
  }, []);


  const logout = ():void => {
    axios.delete('/logout')
      .then(({ data }) => setLogin(data))
      .catch(err => console.warn(err));
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

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Roboto Slab',
    }
  });

  const classes = useStyles();

  return (
    <div>
      {
        login === true ?
          <View style={styles.container}>
            <h1>Goodbye!</h1>
            <img style={{height: 250, width: 250, alignSelf: 'center', marginTop: 25}} src="https://i.ibb.co/g7h4wbp/Closet-Collection-Logo.png" alt="Closet-Collection-Logo" />
            <Button className={classes.root} style={{backgroundColor: '#000000', marginTop: 75}} onClick={():void => logout()}>logout</Button>
            <Box p={9} />
            <Footer></Footer>
          </View>
          :
          <View style={styles.container}>
            <h1>Welcome Please Sign In!</h1>
            <img style={{height: 250, width: 250, alignSelf: 'center', marginTop: 25}} src="https://i.ibb.co/g7h4wbp/Closet-Collection-Logo.png" alt="Closet-Collection-Logo" />
            <a className='loginButton' href="/auth/google"> <GoogleButton /></a>
            <Box p={9} />
            <Footer></Footer>
          </View>
      }

    </div>
  );


};

export default Logsout;
