import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
 

import { Productos } from '../api/tasks.js';

 
import './task.js';
import './body.html';


 Template.body.onCreated(function bodyOnCreated() {

  this.state = new ReactiveDict();
  const instance = Template.instance();
  instance.state.set("place", "Todo");
  //es necesario asignar este valor en instance.state porque si no, no me 
  //arrancaa la template de productos
});

Template.body.helpers({

  tasks() {
    const instance = Template.instance();
    var place = instance.state.get('place');
    
    //Seleccionado cualquier "place" , excepto "general, y "hideCompleted" 
    if (place !== "Todo" && instance.state.get('hideCompleted') ){

    return Productos.find({place : place, checked: { $ne: true }},{sort: {createdAt: -1}});

    }

    //Seleccionado cualquier "place" sin seleccionar "hideCompleted"
    else if(place !== "Todo"){

      return Productos.find({place : place},{sort: {createdAt: -1}});

    }

    //Seleccionado "General" y "hideCompleted"
    else if(place === "Todo" && instance.state.get('hideCompleted') ) {

    return Productos.find({checked: { $ne: true }},{sort: {createdAt: -1}});

    }

    //Seleccionado sólo "General"
    else{

      return Productos.find({}, { sort: { createdAt: -1 } });;
    }


   
 
   },
  comprados() {
       
    //Devuelve los productos comprados
    return Productos.find({ checked: { $eq: true } }, { sort: { comprado: -1 } });
    
},

allCount: function(){
   var numero =  Productos.find({ checked: { $eq: false } }).count();
    var prod = false;
    if (numero !== 0){
      prod = true;
    }
    return prod;
},
compradosCount: function(){
  var numero =  Productos.find({ checked: { $eq: true } }).count();
    var prod = false;
    if (numero !== 0){
      prod = true;
    }
    return prod;
}

//Con las dos funciones anteriores, se pueden hacer condicionales en las templates

});
 Template.listas.helpers({
 incompleteCountSuper() {

    return Productos.find({$and:[{checked: {$ne: true}},{place : 'Super'}]}).count();

},
 incompleteCountCongelados() {

    return Productos.find({$and:[{checked: {$ne: true}},{place : 'Congelados'}]}).count();

},
 incompleteCountFruteria() {

    return Productos.find({$and:[{checked: {$ne: true}},{place : 'Fruteria'}]}).count();

},
  incompleteCount(){

     return Productos.find({$and:[{checked: {$ne: true}}]}).count();

  },



});
 

Template.body.events({

  'submit .new-product'(event) {

    // Prevent default browser form submit

    event.preventDefault();

    

    // Get value from form element

    const target = event.target;
    const text = target.text.value;
    const quantity = target.quantity.value;
    const place = target.place.value;

    if( text == ""){

      alert("Debe tener un nombre");
    }else if( quantity == ""){
      alert("Debe marcar la cantidad de producto a comprar")
    }else{

    // Insert a task into the collection

        // Insert a task into the collection

    Meteor.call('productos.insert', text, quantity, place);

    // Clear form


    target.text.value = '';
    target.quantity.value ="";
   
  }
  },

  
  'change .hide-completed input'(event,instance) {

    instance.state.set('hideCompleted', event.target.checked);
   
  },

  'change [name=agrupar]': function(event, instance){
        var inventar = $(event.target).val();
        
        instance.state.set("place", inventar);


      }

 
});