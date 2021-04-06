/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Calendar } from '../db/db';

export const addFav = async(body: {
  title: string,
  subTitle: string
  imgUrl: string
  releaseDate: number
}, user: unknown): Promise<any> => {
  const title = body.title;
  const subTitle = body.subTitle;
  const imgUrl = body.imgUrl;
  const releaseDate = body.releaseDate;

  const favItem = await Calendar.create({
    user: user,
    title: title,
    subTitle: subTitle,
    imgUrl: imgUrl,
    releaseDate: releaseDate
  });
  return favItem.save();
};

export const getFavs = (user: number): Promise<any> => {
  return Calendar.findAll({
    where: {user: user}
  });
};

export const removeFav = (body: any): Promise<any> => {
  const id = body.id;
  return Calendar.destroy({
    where: {
      id: id
    }
  });
};
