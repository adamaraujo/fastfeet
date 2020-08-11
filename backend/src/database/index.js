import Sequelize from 'sequelize';

import databaseConfig from '../config/database'; // Importa a configuração do database

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';
import Deliveryman from '../app/models/Deliveryman';
import Order from '../app/models/Order';
import Notification from '../app/models/Notification';
import DeliveryProblems from '../app/models/DeliveryProblems';

const models = [
  User,
  Recipient,
  File,
  Deliveryman,
  Order,
  Notification,
  DeliveryProblems,
];

class Database {
  constructor() {
    this.init();
  }

  // Realiza a conexão com a base de dados e carrega os models

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
