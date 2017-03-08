import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
 

import { Productos } from '../api/tasks.js';

 
import './task.js';
import './body.html';

 Template.body.onCreated(function bodyOnCreated() {

  this.state = new ReactiveDict();
  this.nuevo = new ReactiveDict();
});

Template.body.helpers({

  tasks() {
    const instance = Template.instance();
   /* if (instance.state.get('hideCompleted')) {

      // If hide completed is checked, filter tasks
    // Show newest tasks at the top

    return Productos.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }*/

    if(instance.nuevo.get('Fruteria') && instance.state.get('hideCompleted')){
      console.log('fruteria');
      return Productos.find({ place: 'Fruteria',checked: { $ne: true }  }, { sort: { createdAt: -1 } });
    }else if(instance.nuevo.get('Fruteria')){
      console.log('congelados');
       return Productos.find({ place: 'Fruteria' }, { sort: { createdAt: -1 } });
    }

    //Congelados
    else if(instance.nuevo.get('Congelados') && instance.state.get('hideCompleted')){
     
      return Productos.find({ place: 'Congelados',checked: { $ne: true }  }, { sort: { createdAt: -1 } });
    }else if(instance.nuevo.get('Congelados')){
     
       return Productos.find({ place: 'Congelados' }, { sort: { createdAt: -1 } });
    }

    //Super
     else if(instance.nuevo.get('Super') && instance.state.get('hideCompleted')){
     
      return Productos.find({ place: 'Super',checked: { $ne: true }  }, { sort: { createdAt: -1 } });
    }else if(instance.nuevo.get('Super')){
     
       return Productos.find({ place: 'Super' }, { sort: { createdAt: -1 } });
    }

    //Todo
     else if(instance.state.get('hideCompleted')){
      console.log('todo');
      return Productos.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }else{
     
      return Productos.find({}, { sort: { createdAt: -1 } });
   
  }
   },
  comprados() {
       

    return Productos.find({ checked: { $eq: true } }, { sort: { comprado: -1 } });
    
},

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

  }

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
    console.log(instance);
  },

  'change [name=agrupar]': function(event, instance){
        var inventar = $(event.target).val();
        

        if (inventar == "Fruteria"){
        instance.nuevo.set('Fruteria', event.target.checked);
        instance.nuevo.set('Congelados', false);
        instance.nuevo.set('Super', false);
        instance.nuevo.set('Todo', false);
        
     
        }
         else if(inventar == "Congelados"){
        instance.nuevo.set('Fruteria', false );
        instance.nuevo.set('Congelados', event.target.checked);
        instance.nuevo.set('Super', false);
        instance.nuevo.set('Todo', false);
    
         }
         else if(inventar == "Super"){
        instance.nuevo.set('Fruteria', false );
        instance.nuevo.set('Congelados', false );
        instance.nuevo.set('Super', event.target.checked);
        instance.nuevo.set('Todo', false);
       
        }
         else if(inventar == "Todo"){
        instance.nuevo.set('Fruteria', false );
        instance.nuevo.set('Congelados', false );
        instance.nuevo.set('Super', false);
        instance.nuevo.set('Todo', event.target.checked);;
         
      }

  }
});