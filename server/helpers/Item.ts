import { Items } from '../db/db';
import { Op } from 'sequelize';

export const addItem = async(body: any): Promise<any> => {
  const { clothingType, description, price, imageUrl } = body;
  const newItem = await Items.create({
    clothingType: clothingType,
    description: description,
    price: price,
    imageUrl: imageUrl
  });
  return newItem.save();
};

export const getAllItems = (): Promise<any> => {
  return Items.findAll();
};

export const deleteItem = (body: any): Promise<any> => {
  const { id } = body;
  return Items.destroy({
    where: {
      id: id
    }
  });
};

export const searchItems = (params: any): Promise<any> => {
  const { query } = params;
  return Items.findAll({
    where: {
      [Op.or]: [
        {clothingType: {[Op.like]: `%${query}%`}},
        {description: {[Op.like]: `%${query}%`}}
      ]
    }
  });
};
