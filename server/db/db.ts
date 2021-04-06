import { DataTypes, Sequelize } from 'sequelize';
import mysql from 'mysql2';
import { unique } from 'jquery';


const sequelize: Sequelize = new Sequelize('bao0spze4uyjnrjcstlm', 'us5tvpffhllqetkd', 'vnG2q19b3wbaZXBhVjLY', {
  host: 'bao0spze4uyjnrjcstlm-mysql.services.clever-cloud.com',
  dialect: 'mysql',
  pool: {
    max: 200,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },

});

export const Items = sequelize.define('Items', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  clothingType: {
    type: DataTypes.STRING,
    unique: false
  },

  description: {
    type: DataTypes.STRING,
    unique: false
  },

  price: {
    type: DataTypes.INTEGER,
    unique: false
  },

  imageUrl: {
    type: DataTypes.STRING(1000),
    unique: true
  }

});

export const Outfit = sequelize.define('Outfit', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  user: {
    type: DataTypes.STRING,
    allowNull: false
  },

  outfitTitle: {
    type: DataTypes.STRING,
    unique: true
  },

  imageUrl: {
    type: DataTypes.STRING,
  },

  likesCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
});


export const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: true,

  },
  comment: {
    type: DataTypes.TEXT,

  },
  name: {
    type: DataTypes.STRING,

  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },


});

export const Calendar = sequelize.define('Calendar', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  user: {
    type: DataTypes.STRING,
    allowNull: false
  },

  title: {
    type: DataTypes.STRING
  },

  subTitle: {
    type: DataTypes.STRING,
  },

  imgUrl: {
    type: DataTypes.STRING,
  },

  releaseDate: {
    type: DataTypes.STRING
  }
});

const database = 'bao0spze4uyjnrjcstlm';

sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
sequelize.query(`USE \`${database}\`;`);


export const addUser = (name: string): Promise<any> => {
  return Users.findOrCreate({
    where: {
      username: name
    }
  });
};

export const postComments = async( body: any, name: any): Promise<any> => {
  const { comment, postId} = body;

  const createComment = await Comment.create({
    //maybe need an outfit id here?
    name: name,
    comment: comment,
    postId: postId
  });
  return createComment.save();
};

export const getComments = (): Promise<any> => {
  console.log(Comment.findAll());
  return Comment.findAll();
};

export const updateLike = (id): Promise<any> => {
  return Outfit.increment('likesCount', {where: {id: id}});
};

export const setLike = (id): Promise<any> => {
  return Outfit.findAll({where: {
    id: id
  }, attributes: ['likesCount']});

};

module.exports = {
  Items,
  Users,
  Outfit,
  Calendar,
  getComments,
  postComments,
  addUser,
  updateLike,
  setLike
};

// sequelize.sync({ force: true })
//   .then(() => console.log('Database & tables created!'))
//   .catch((err: any) => console.log(err));


sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((err: string) => console.error('Unable to connect to the database:', err));



