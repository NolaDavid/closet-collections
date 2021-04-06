import React, { useState, } from 'react';
import axios from 'axios';
import SearchBar from 'material-ui-search-bar';
import Button from '@material-ui/core/Button';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
interface findAStore{
  keyword: any
}
const findAStore = (): any => {
  const [keyword, setKeyword] = React.useState<string>();
  const [results, setResults] = React.useState([]);
  const [font, setFont] = React.useState(35);
  const [fontName, setFontName] = React.useState(25);
  const [fontDets, setFontDets] = React.useState(20);

  const larger = (): any => {
    setFont(50);
    setFontName(40);
    setFontDets(35);
  };

  const smaller = (): any => {
    setFont(35);
    setFontName(25);
    setFontDets(20);

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
    },
  });

  const classes = useStyles();

  return (
    <div>
      <div>
        <ZoomInIcon onClick={larger} />
        <ZoomOutIcon onClick={smaller} />
      </div>
      <h1 style={{fontSize: font}}>Find A Store</h1>
      <SearchBar
        value={keyword}
        onChange={(e): void => setKeyword(e)}
      />
      <Box textAlign='center'>
        <Button className={classes.root} variant="contained" color="primary" style={{backgroundColor: '#000000', fontFamily: 'Roboto Slab', justifyContent: 'center'}}
          onClick={(): void => {
            axios.get(`/api/search/${keyword}`)
              .then(({data}) => {
                console.log(data);
                setResults(data.businesses);
              }).catch(err => console.error(err));
          }}
        >Search
        </Button>
      </Box>
      <div className='stores'>
        {results.map((data:any, i:number) => {
          if (data) {
            return (
              <div key={String(i)}>
                <div key={String(i)}>
                  <h2 style={{fontSize: fontName}}>{data.name}</h2>
                  <h3 style={{fontSize: fontDets}}>{data.location.address1} {data.location.city} {data.location.state} {data.location.zip_code}</h3>
                  <h3 style={{fontSize: fontDets}}>{data.phone}</h3>
                  <h3 style={{fontSize: fontDets}}>Rating: {data.rating}</h3>
                </div>
                <br></br>
              </div>
            );
          }
          return null;
        })}
      </div>

    </div>
  );
};

export default findAStore;
