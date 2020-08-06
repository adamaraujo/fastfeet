import Sequelize, { Model } from 'sequelize';

class Notification extends Model {
  static init(sequelize) {
    super.init(
      {
        content: Sequelize.STRING,
        read: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Deliveryman, {
      foreignKey: 'user_id',
      as: 'deliveryman',
    });
  }
}

export default Notification;
