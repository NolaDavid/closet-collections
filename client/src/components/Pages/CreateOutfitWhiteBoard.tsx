import React, { createRef, useState, useEffect, useCallback, ReactElement } from 'react';
import './styles.css';
import { Image as KonvaImage, Layer, Stage, Transformer } from 'react-konva';
import useImage from 'use-image';
import CreateOutfitItems from './CreateOutfitItems';
import axios from 'axios';
import $ from 'jquery';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import Footer from './Footer';

const CreateOutfitWhiteBoard = (): ReactElement => {

  const [images, setImages] = useState([]);
  const [outfits, getOutfits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [font, setFont] = useState(25);
  const stageRef = React.useRef<any>();
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/geonovember/upload';

  const handleExportClick = async(): Promise<void> => {
    const baseUrl = stageRef.current?.getStage().toDataURL({ mimeType: 'image/png', quality: 1 });
    await setImages([]);
    const data = {
      'file': baseUrl,
      'upload_preset': 'smiuh98k'
    };
    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    })
      .then(async r => {
        const outfitUrl = await r.json();
        axios.post('/outfit', {imageUrl: outfitUrl.url});
      }).catch(err => console.log(err));

  };
  const handleChange = (e: any): any => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (term: string): any => {
    const result = outfits.filter(outfit => {
      return outfit.clothingType.toLowerCase().includes(term.toLowerCase()) || outfit.description.toLowerCase().includes(term.toLowerCase());
    });
    getOutfits(result);
  };

  const handleKeyDown = (e: any): any => {
    if (e.key === 'Enter') {
      return handleSearch(searchTerm);
    }
  };

  const addStickerToPanel = ({ src, width, x, y }): void => {
    setImages((currentImages) => [
      ...currentImages,
      {
        width,
        x,
        y,
        src,
        resetButtonRef: createRef()
      }
    ]);
  };

  const resetAllButtons = useCallback(() => {
    images.forEach((image) => {
      if (image.resetButtonRef.current) {
        image.resetButtonRef.current();
      }
    });
  }, [images]);


  useEffect(() => {
    axios.get('/items')
      .then(({ data }) => getOutfits(data))
      .catch((err) => console.warn(err));
  }, []);


  const larger = (): any => {
    setFont(40);
  };

  const smaller = (): any => {
    setFont(25);
  };



  return (
    <div id="createOutfitWhiteBoard">
      <div id="buttons">
        <ZoomInIcon id='enlarge' onClick={larger} fontSize="small"></ZoomInIcon>
        <ZoomOutIcon id='smaller' onClick={smaller} fontSize="small"></ZoomOutIcon></div>
      <Stage
        style={{border: '1px solid black'}}
        width={400}
        height={400}
        ref={stageRef}
      >
        <Layer>
          {images.map((image, i) => {
            $('img').attr('crossOrigin', 'anonymous');
            return (
              <CreateOutfitItems
                onDelete={(): void => {
                  const newImages = [...images];
                  newImages.splice(i, 1);
                  setImages(newImages);
                }}
                onDragEnd={(event): void => {
                  image.x = event.target.x();
                  image.y = event.target.y();
                }}
                key={i}
                image={image}
              />
            );
          })}
        </Layer>
      </Stage>
      <div id="buttons"><button id="save" onClick={handleExportClick} style={{marginLeft: '125px', backgroundColor: '#000000', color: '#7ed957'}}>Save Outfit</button></div>
      <h4 style={{fontSize: font}}>Tap to add item to outfit!</h4>
      <div className="search">
        <input autoComplete="off" type="text" className="search-input" placeholder="search for item by keyword" value={searchTerm} onChange={handleChange} onKeyDown={handleKeyDown} />
      </div>
      <div className="outfit-item-buttons">
        {outfits.map((outfit, i) => {

          return (
            <button
              key={i}
              className="button"
              onMouseDown={(): void => {
                addStickerToPanel({
                  src: outfit.imageUrl,
                  width: 75,
                  x: 100,
                  y: 100
                });
              }}
            >
              <img alt="item" src={outfit.imageUrl} width={75} crossOrigin="anonymous"/>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  normal: {
    fontSize: 20
  }
});


export default CreateOutfitWhiteBoard;
