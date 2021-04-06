import * as React from 'react';
import axios from 'axios';
import GoogleButton from 'react-google-button';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Footer from '../Pages/Footer';
import Box from '@material-ui/core/Box';

const Logs = (): React.ReactElement => {
  const [login, setLogin] = React.useState(false);

  React.useEffect(() => {
    axios.get('./isloggedin')
      .then(({ data }) => setLogin(data))
      .catch((err) => console.warn(err));
  }, []);


  const logout = (): void => {
    axios.delete('/logout')
      .then(({ data }) => setLogin(data))
      .catch(err => console.warn(err));
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Roboto Slab',
    }
  });

  return (
    <div>
      {
        login === false ?
          <View style={styles.container}>
            <Text style={{fontSize: 30, fontFamily: 'Roboto Slab'}}>Welcome, Sign In!</Text>
            <img style={{height: 250, width: 250, alignSelf: 'center', marginTop: 25}} src="https://i.ibb.co/g7h4wbp/Closet-Collection-Logo.png" alt="Closet-Collection-Logo" />
            <a className='loginButton' style={{marginTop: 75}} href="/auth/google"> <GoogleButton /></a>
            <Box p={9} />
            <Footer></Footer>
          </View>
          :
          <div>
            <Button onClick={(): void => logout()}>logout</Button>
          </div>
      }
    </div>
  );

};

export default Logs;
