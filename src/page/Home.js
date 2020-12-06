import React, {Component} from 'react';
import Header from '../components/layout/Header';
import OrderTracking from '../components/OrderTracking';
/** Redux */
import {connect} from 'react-redux';
import TrackingOrderType from '../redux/TrackingOrder/type';
/** Helper */
import moment from '../helper/moment'

class Home extends Component{
  componentDidMount(){
    document.title = "Ipiring Kitchen"

    this.interval = setInterval(()=>{
      const time = new Date();
      const now = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
      this.setState({timer: now});
      this.props.timerChanger(now);
    },1000);
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  render(){
    return(
      <div>
        <Header timer={this.props.timer} finishedOrderLength={this.props.finishedOrderLength}/>        
        <div className="container-fluid py-2 bg-light">
          <div className="row">
            {
              this.props.dataOrder.map((product)=>{
                return <OrderTracking key={product.id} id={product.id} items={product.items} orderAt={product.orderAt} delayedBy={moment.delayed(product.orderAt)} class={moment.delayedClass(product.orderAt)}/>
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    timerChanger : (now) => {
      dispatch({type: TrackingOrderType.TIMER_CHANGE, payload: now})
    }
  }
}

const MapStateToProps = (state) => {
  let start = state.TrackingOrder.currentPage === 1 ? 0 : (state.TrackingOrder.currentPage * 4) - 4
  let temparray = state.TrackingOrder.data.slice(start, state.TrackingOrder.currentPage*4)

  return{
    dataOrder : temparray,
    finishedOrder : state.TrackingOrder.finishedOrder,

    timer: state.TrackingOrder.timer,
    pages : state.TrackingOrder.pages,
    currentPage : state.TrackingOrder.currentPage,
    finishedOrderLength : state.TrackingOrder.finishedOrder.length
  }
}

export default connect(MapStateToProps, MapDispatchToProps)(Home)