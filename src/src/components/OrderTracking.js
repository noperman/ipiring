import React from 'react';
/** Redux */
import {connect} from 'react-redux';
import TrackingOrderType from '../redux/TrackingOrder/type';

const OrderTracking = (props) => {
  const processMarkedBy = (id) => {
    const datas = props.data
    let dataToDispatch = null

    if(datas.length>0){
      for(let i = 0; i < datas.length; i++){
        if(datas[i].id === id){
          dataToDispatch = datas[i]
          datas.splice(i,1)
        }
      }
    }

    if(dataToDispatch !== null){
      const finishedOrder = props.finishedOrder
      if(finishedOrder.length < 1){
        props.MarkedAsReady(dataToDispatch)
      }else{
        finishedOrder.push(dataToDispatch)
      }
    }

    const pages = datas.length%4 === 1 ? (datas.length+3)/4 : datas.length%4 === 2 ? (datas.length+2)/4 :  datas.length%4 === 3 ? (datas.length+1)/4 : datas.length/4;
    props.pageChange(pages)
    props.resetDatas(datas)
  }

  return(
    <div className="py-2 col-sm-12 col-md-6 col-lg-3">
      <div className={'card bg-'+props.class} style={{minHeight: "450px"}}>
        <div className="text-left  text-white font-weight-bold card-header">Order ID #{props.id}</div>
        
        <div className="bg-light text-left p-2 card-body">
          {
            props.items.map((item)=>{
              return (
                <div className="border-bottom pt-3 pb-1 row">
                  <div className="col">
                    <div className="d-flex justify-content-between">
                      <h6 className="font-weight-bold">{item.name} <small>{item.varian}</small></h6>
                      <div>
                        <span className={'badge badge-'+props.class} style={{fontSize: "18px"}}>{item.quantity}</span>
                      </div>
                    </div>
                    {
                      item.extra.length > 0 ? 
                        <span className="text-muted" style={{fontSize: "12px"}}>Extra:
                          {
                            item.extra.map((extra)=>{
                              return extra+' '
                            })
                          }
                        </span>
                      :
                        ''
                    }
                  </div>
                </div>
              )
            })
          }
        </div>

        <div className="card-footer">
          <div className="d-flex justify-content-between text-white font-weight-bold">
            <div className="text-left">
              <small style={{fontSize: "10px"}}>ORDER ACCEPTED AT</small>
              <p style={{fontSize: "11px"}}>{props.orderAt}</p>
            </div>

            <div className="text-right">
              <small style={{fontSize: "10px"}}>DELAYED BY</small>
              <p style={{fontSize: "11px"}}>{props.delayedBy}</p>
            </div>
          </div>

          <button type="button" className={'w-100 font-weight-bold text-'+props.class+' btn btn-light'} onClick={() => processMarkedBy(props.id)}>MARK AS READY</button>
        </div>
      </div>
    </div>
  )
}

const MapStoreToProps = (state) => {
  return{
    data: state.TrackingOrder.data,
    finishedOrder: state.TrackingOrder.finishedOrder
  }
}

const MapDispatchToProps = (dispatch) => {
  return{
    MarkedAsReady : (payload) => {
      dispatch({type: TrackingOrderType.FINISHED_ORDER, payload:payload})
    },
    resetDatas : (payload) => {
      dispatch({type: TrackingOrderType.RESET_DATA, payload: payload})
    },
    pageChange : (payload) => {
      dispatch({type: TrackingOrderType.PAGES_CHANGE, payload: payload})
    }
  }
}

export default connect(MapStoreToProps,MapDispatchToProps)(OrderTracking)