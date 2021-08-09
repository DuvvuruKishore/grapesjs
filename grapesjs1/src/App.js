import React,{useEffect} from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import './App.css';

function App() {

 const myNewComponentTypes = editor => {

  /* editor.DomComponents.addType('input', {
      isComponent: el => el.tagName === 'INPUT',
      model: {
        defaults: {
          traits: [
            
            'name', 
            'placeholder',
            {
              type: 'select', 
              label: 'Type', 
              name: 'type', 
              options: [
                { id: 'text', name: 'Text'},
                { id: 'email', name: 'Email'},
                { id: 'password', name: 'Password'},
                { id: 'number', name: 'Number'},
              ]
            }, {
              type: 'checkbox',
              name: 'required',
          }],
          
          attributes: { type: 'text', required: true },
        },
      },
  });*/

  editor.DomComponents.addType('input', {
    isComponent: el => el.tagName === 'INPUT',
    model: {
      defaults: {
        traits(component) {
          const result = [];

          // Example of some logic
          if (component.get('draggable')) {
            result.push({
              type: 'select', 
              label: 'Type', 
              name: 'type', 
              options: [
                { id: 'text', name: 'Text'},
                { id: 'email', name: 'Email'},
                { id: 'password', name: 'Password'},
                { id: 'number', name: 'Number'},
              ]
            });
          } else {
            result.push('name');
          }

          return result;
        }
      },
    },
});
}

 

  useEffect(()=>{
    const editor=grapesjs.init({
      container :"#editor",
      plugins: [myNewComponentTypes],
      domComponents: {
        // options
      }
    })
    
    var blockManager = editor.BlockManager;

    blockManager.add('Text', {
      label: 'Text',
      content: '<div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row">' +
    
      '<input class="row-cell" data-gjs-draggable=".row"></input>'+
        '</div>',
    });

 
    blockManager.add('the-row-block', {
      label: 'colums',
      content: '<div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row">' +
      '<h4>name<h4>'+
          '<input class="row-cell" data-gjs-draggable=".row"></input>' +
        '</div>',
    });

    const component = editor.addComponents(`<div>
  <img src="https://path/image" />
  <span title="foo">Hello world!!!</span>
</div>`)[0];



const componentType = component.get('image');
component.set('draggable', false);

/*component.set({
  tagName: 'span',
  attributes: { 'title':'Hello' },
 });*/

 
  },[]);
  return (
    <div className="App">
      <div id="editor"></div>

    </div>
  );
}

export default App;
