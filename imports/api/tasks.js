import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';

import { check } from 'meteor/check';

 

export const Productos = new Mongo.Collection('productos');


Meteor.methods({

  'productos.insert'(text, quantity, place) {

    check(text, String);
    

    // Make sure the user is logged in before inserting a product

    if (! this.userId) {

      throw new Meteor.Error('not-authorized');

    }

 

    Productos.insert({

      text,

      quantity,

      place,

      createdAt: new Date(),

      owner: this.userId,

      username: Meteor.users.findOne(this.userId).username,

    });

  },

  'productos.remove'(prodId) {
   
   
    check(prodId, String);
    var propietario= "";

    Productos.find({_id:prodId}).forEach(function(obj){
          propietario = obj.owner;
      });

    if(propietario !== this.userId){
      alert("No puede borrar las comandas de otra persona")
    }else{

 

    Productos.remove(prodId);
  }
  },

  'productos.setChecked'(prodId, setChecked) {

    check(prodId, String);

    check(setChecked, Boolean);

    

    Productos.update(prodId, { $set: { checked: setChecked } });
    Productos.update(prodId,{$set: {comprador: Meteor.users.findOne(this.userId).username}});
    Productos.update(prodId,{$set: {comprado: new Date()}});
  },

 

});


