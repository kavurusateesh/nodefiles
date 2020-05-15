var encryption = require('../helpers/Encryption');
module.exports = (sequelize, Sequelize) => {
    const users_tbl = sequelize.define("users_tbl", {
      mobile_no: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      registration_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      device_registration_id: {
        allowNull: true,
        type: Sequelize.STRING
      },
      mac_id: {
        allowNull: true,
        type: Sequelize.STRING
      },
      
    }, 
    {
      getterMethods:{
        email: function(){ return encryption.decryptData(this.getDataValue('email')); },
        mobile_no: function(){ return encryption.decryptData(this.getDataValue('mobile_no')); },
        password: function(){ return encryption.decryptData(this.getDataValue('password')); },
        user_type: function(){ return encryption.decryptData(this.getDataValue('user_type')); },
        status: function(){ return encryption.decryptData(this.getDataValue('status')); },
        registration_type: function(){ return encryption.decryptData(this.getDataValue('registration_type')); },
        device_registration_id: function(){ return encryption.decryptData(this.getDataValue('device_registration_id')); },
        mac_id: function(){ return encryption.decryptData(this.getDataValue('mac_id')); },
      },
      setterMethods:{
        email: function(value){ this.setDataValue('email', encryption.encryptData(value)); },
        mobile_no: function(value){ this.setDataValue('mobile_no', encryption.encryptData(value)); },
        password: function(value){ this.setDataValue('password', encryption.encryptData(value)); },
        user_type: function(value){ this.setDataValue('user_type', encryption.encryptData(value)); },
        status: function(value){ this.setDataValue('status', encryption.encryptData(value)); },
        registration_type: function(value){ this.setDataValue('registration_type', encryption.encryptData(value)); },
        device_registration_id: function(value){ this.setDataValue('device_registration_id', encryption.encryptData(value)); },
        mac_id: function(value){ this.setDataValue('mac_id', encryption.encryptData(value)); },
        
      }
    });

    return users_tbl;
  };
  