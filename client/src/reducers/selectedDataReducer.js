import {
    SELECTED_DATA,
    SELECTED_PROCESSED_DATA
  } from "../actions/types";
  
  export default function(state = {fullData:[],processedData:{
    _id: '5e9e14576e05b301453ab26d',
    itemName: 'Combination de Dos.csv',
    r2: '0.16407491553644216',
    Sunday: '8.3482666015625',
    Monday: '5.042178153991699',
    Tuesday: '5.375760555267334',
    Wednesday: '5.709342956542969',
    Thursday: '6.042924880981445',
    Friday: '10.016178131103516',
    Saturday: '10.349761009216309',
    dateCreated: '2020-04-20T21:29:59.411Z',
    dateUpdated: '2020-04-20T21:29:59.411Z',
    __v: 0
  }}, action) {
    switch (action.type) {
      case SELECTED_DATA:
        return {...state, fullData: action.payload} ;
        case SELECTED_PROCESSED_DATA:
        return {...state, processedData: action.payload} ;
      default:
        return state;
    }
  }
  