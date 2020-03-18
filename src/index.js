import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const defaultState ={
      name:"",
      testPositiv:false,
      positiv:[
            "anx"
      ],
      negativ:[
            "shahin"
      ]
};

function patientHinzufügen(state){
      const welcheListe = state.testPositiv ? 'positiv' : 'negativ';
      // Mit array.push würde Redux nicht verstehen, dass der Array sich geändert hat.
      const neueListe = [...state[welcheListe], state.name]; 
      return {...state, [welcheListe]:neueListe};
}


// reducer function!
function reducer ( state = defaultState, action){
      const { type, name, liste, index } = action;
      switch( action.type ){
           case "nameÄndern":             state = { ...state, name }; break;
           case "testergebnisUmschalten": state = { ...state, testPositiv: ! state.testPositiv }; break;
           case "patientHinzufügen":      state = patientHinzufügen(state); break;
           case "patientBearbeiten":      state = { ...state, }; break;          
           case "patientLöschen":           
           // Erstelle eine Kopiew von der Liste, aus welcher wir den Patienten löschen wollen.
           const neueListe = [...state[liste] ]; // const neueListe = state[liste].splice
           neueListe.splice( index, 1);
           state = { ...state, [liste]: neueListe };
           break;
           default:
      }
      return state;
}

function mapActionsToProps ( dispatch ){
      return{
            testergebnisUmschalten:             ()=>{ dispatch({ type:"testergebnisUmschalten"           })},
            patientHinzufügen:                  ()=>{ dispatch({ type:"patientHinzufügen",               })},
            nameÄndern:                     (name)=>{ dispatch({ type:"nameÄndern",            name      })},
            patientLöschen:         (liste, index)=>{ dispatch({ type:"patientLöschen",     liste,index  })},
            patientBearbeiten:      (liste, index)=>{ dispatch({ type:"patientBearbeiten",  liste,index  })},

      }
}
const mapActionsToProps = state => state;

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
