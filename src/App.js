import React,{useEffect,useState} from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import './App.css';

function App() {
  const [editor,setEditor]=useState(null);

  const myNewComponentTypes = editor => {

    editor.DomComponents.addType('input', {
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
  });
  };
  
  
  useEffect(()=>{
    const editor=grapesjs.init({
      container :"#editor",
      plugins: [gjsPresetWebPage,myNewComponentTypes ],
      pluginsOpts: {
        gjsPresetWebPage: {
          // options
        }
      }
    })
    setEditor(editor);
    var blockManager = editor.BlockManager;

    blockManager.add('the-row-block', {
      label: 'colums',
      content: '<div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row">' +
          '<div class="row-cell" data-gjs-draggable=".row">hello</div>' +
          '<div class="row-cell" data-gjs-draggable=".row">hi</div>' +
        '</div>',
    });

    blockManager.add('details-column', {
      label: 'details',
      content: '<div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row">' +
          '<label/>'+'<input/>' +'<input/>'+
        '</div>',
    });
   
    blockManager.add('my-map-block', {
      label: 'Simple map block',
      content: {
        type: 'map', // Built-in 'map' component
        style: {
          height: '350px'
        },
       // Once inserted it can't be removed
      }
    })
    
 
    editor.addComponents(`<div>
    <img src="https://path/image" />
    <span title="foo">Hello world!!!</span>
    <input type="text"/>
  </div>`);
 
  component.set('draggable', true);

    },[])
 
 
  return (
    <div className="App">
      <div id="editor"></div>
    </div>
  );
}

export default App;
