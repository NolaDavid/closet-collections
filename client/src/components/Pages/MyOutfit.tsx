import React, { ReactElement, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Zoom from 'react-medium-image-zoom';
import Button from '@material-ui/core/IconButton';
import 'react-medium-image-zoom/dist/styles.css';
import axios from 'axios';
import ListSubheader from '@material-ui/core/ListSubheader';
import UsersOutfits from '../models/UsersOutfits';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: { palette: { background: { paper: any; }; }; }) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1000,
    height: 1000,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const MyOutfit = (): ReactElement => {
  const classes = useStyles();
  //   const comment = (data: {}) => {
  // axios.post('/comment', data: {})
  // .then(data: {} => console.log(data))
  // .catch(err: {} => console.log('errror', err))
  //   }
  const handleDelete = (tile: UsersOutfits, i: number): void => {
    const id = tile.id;
    axios.delete(`/outfit/${id}`)
      .then(() => {
        const newImages = [...images];
        newImages.splice(i, 1);
        setImages(newImages);
      })
      .catch(err => console.warn(err));
  };

  const [images, setImages] = useState([]);
  useEffect((): any => {
    axios.get<UsersOutfits[]>('/outfit/:user')
      .then(({ data }): any => setImages(data))
      .catch((err) => console.warn(err));
  }, []);
  return (
    <div className={classes.root}>
      <h1>Outfits</h1>
      <GridList cellHeight={300} spacing={30} className={classes.gridList}>
        <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
          <ListSubheader component="div"></ListSubheader>
        </GridListTile>
        {images.map((tile: UsersOutfits, i) => (
          <GridListTile key={i}>
            <Zoom>
              <img src={tile.imageUrl} />
            </Zoom>
            <GridListTileBar
              actionIcon={
                <>
                  <Button
                    onClick={(():void => handleDelete(tile, i))}
                  >
                    <DeleteIcon
                      className="buttonIcon"
                      style={{fontSize: 15}}
                    />
                  </Button>
                </>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default MyOutfit;
