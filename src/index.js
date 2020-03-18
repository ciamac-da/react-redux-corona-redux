import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { connect, Provider } from 'react-redux';
import { TetxField} from '@material-ui/core/TextField';
import { Checkbox} from '@material-ui/core/Checkbox';
import { FormControlLabel} from '@material-ui/core/FormControlLabel';

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
      switch( type ){
           case "nameÄndern":             state = { ...state, name }; break;
           case "testergebnisUmschalten": state = { ...state, testPositiv: ! state.testPositiv }; break;
           case "patientHinzufügen":      state = patientHinzufügen(state); break;
           case "patientBearbeiten":            
           const bearbeitet = [...state[liste]];
           const [eintrag] = bearbeitet.splice(index,1);
           state = {
                 ...state,
                 [liste]: bearbeitet,
                 name: eintrag,
                 testPositiv: liste === "positiv"
           };
           break;

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
const mapStateToProps = state => state;
const adapter = connect(mapActionsToProps,mapStateToProps)

const Eingabe = adapter( function({
      name,nameÄndern,
      testPositiv,testergebnisUmschalten, 
      patientHinzufügen
}){
 return(
       <>
            <TetxField 
            value={name} 
            onChange={e=> nameÄndern(e.target.value)}
            onClick={testergebnisUmschalten}
            />
            <FormControlLabel
            control={
             <Checkbox
             value="positiv" 
            checked={testPositiv}
            onClick={testergebnisUmschalten}
             />
}
label="Test Positiv"
            />
         </>   );
});
const store = createStore(reducer);
ReactDOM.render(
      <Provider store={store}>
            <Eingabe/>>
      </Provider>
, document.getElementById('root'));
serviceWorker.unregister();
