import * as React from 'react';
import { useForm } from 'react-hook-form';
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget';
import axios from 'axios';

type clothingType = string;
type description = string;
type price = number;
type imageUrl = string;

// This type will be used later in the form.
type Item = {
  clothingType: clothingType;
  description: description;
  imageUrl: imageUrl;
};

const AddItems: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    errors
  } = useForm<Item>();

  const onSubmit = (data: Item, e): void => {
    console.log('DATA', data);
    data['comments'] = [];
    axios.post('/items', data)
      .then(data => console.info(data))
      .catch(err => console.warn(err));
    e.target.reset();
    setImageAdd('');
  };
  const [imageAdd, setImageAdd] = React.useState<string>('');
  const onImageUpload = (result): void => {
    setImageAdd(result.info.url);
  };
  const handleAddImage = (e): void => {
    setImageAdd(e.target.value);
  };
  return (
    <div className="AddItem">
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-item">
          <label>
            Clothing Type:
            <input
              type="text"
              name="clothingType"
              ref={register({ required: true })}
            />
          </label>
        </div>
        {/* When there is an error
              tell the user about it */}
        {errors.clothingType && <div>Type is required.</div>}
        <div className="form-item">
          <label>
            Description:
            <input
              type="text"
              name="description"
              ref={register({ required: true })}
            />
          </label>
        </div>

        {errors.description && <div>Description is required.</div>}
        <div className="form-item">
          <label>
          Image URL:
            <input
              type="text"
              name="imageUrl"
              value={imageAdd}
              onChange={handleAddImage}
              ref={register({ required: true })}
            />
          </label>
        </div>
        <div id='entryWidget'>
          <WidgetLoader /> Upload Image

          <Widget
            sources={ [ 'local', 'camera', 'dropbox' ] }
            resourceType={ 'image' }
            cloudName={ 'geonovember' }
            uploadPreset={ 'smiuh98k' }
            buttonText={ 'Open' }
            style={ {
              color: '#7ed957',
              width: '65px',
              backgroundColor: 'black',
              marginLeft: '5px',
              height: '35px',
              padding: '10px',
              textAlign: 'center',
              verticalAlign: 'middle'
            } }
            folder={ 'demo' }
            cropping={ false }
            onSuccess={ (result): void => onImageUpload(result) }
            onFailure={ console.log('failure!!!') }
            logging={ false }
            customPublicId={ 'sample' }
            eager={ 'w_400,h_300,c_pad|w_260,h_200,c_crop' }
            use_filename={ false }
          />
        </div>
        <button className="add-item-btn" style={{backgroundColor: '#000000', color: '#7ed957'}}>Add Item</button>
      </form>
    </div>
  );
};
export default AddItems;
