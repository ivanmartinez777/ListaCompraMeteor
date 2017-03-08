

import { Template } from 'meteor/templating';

 

import { Productos } from '../api/tasks.js';

 

import './task.html';

 

Template.producto.events({

  'click .toggle-checked'() {

    // Set the checked property to the opposite of its current value

    Meteor.call('productos.setChecked', this._id, !this.checked);

  },

  'click .delete'() {

    Meteor.call('productos.remove', this._id);

  },

});

Template.comprado.events({

  'click .toggle-checked'() {

    // Set the checked property to the opposite of its current value

    Meteor.call('productos.setChecked', this._id, !this.checked);

  },

  'click .delete'() {

    Meteor.call('productos.remove', this._id);

  },
  
  

});


