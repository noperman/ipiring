import Type from "./type";
const datas = require('../../api.json');

const pages = datas.length%4 === 1 ? (datas.length+1)/4 : datas.length%4 === 2 ? (datas.length+2)/4 :  datas.length%4 === 3 ? (datas.length+1)/4 : datas.length/4;
const time = new Date();
const timer = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;

const initialState = {
  timer: timer,
  data: datas, 
  finishedOrder: [],
  pages: pages,
  currentPage: 1
};

const TrackingOrder = (state = initialState,action) => {
  switch(action.type){
    case Type.PREV_PAGE:
      return{
        ...state,
        currentPage: action.payload
      }
    case Type.NEXT_PAGE:
      return{
        ...state,
        currentPage: action.payload
      }
    case Type.TIMER_CHANGE:
      return{
        ...state,
        timer: action.payload
      }
      
    case Type.RESET_DATA:
      return{
        ...state,
        data: action.payload
      }
    case Type.FINISHED_ORDER:
      return{
        ...state,
        finishedOrder: [action.payload]
      }

    case Type.PAGES_CHANGE:
      return{
        ...state,
        pages: action.payload
      }
    default :
      return state
  }
}

export default TrackingOrder