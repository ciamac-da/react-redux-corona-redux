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

function reducer ( state = defaultState, action){
      switch( action.type ){
           case "nameÄndern": break;
           case "testergebnisUmschalten": break;
           case "patientHinzufügen": break;
           case "patientLöschen": break;
           
           default:
      }
      return state;
}



ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
