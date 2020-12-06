import React from 'react';
import {BrowserRouter, Link} from 'react-router-dom';
/** Assets */
import Brand from '../../assets/ipiring.png';
import {connect} from 'react-redux';
import TrackingOrderType from '../../redux/TrackingOrder/type';

const Header = (props) => {
  const navImg = {
    width: "100px"
  }
  
  const prevHandler = () =>{
    let currentPage = props.currentPage > 1 ? props.currentPage-1: 1
    props.prevPage(currentPage)
  }
  const nextHandler = () => {
    let currentPage = props.currentPage < props.pages ? props.currentPage+1 : props.pages
    props.nextPage(currentPage)
  }

  return (    
    <nav className="w-100 navbar navbar-expand-md bg-dark">
      <ul className="text-white d-flex align-items-center justify-content-between w-100 nav">
        <li className="nav-item">
          <BrowserRouter>
            <Link to="/"><img src={Brand} style={navImg} alt="ipiring"/></Link>
          </BrowserRouter>
        </li>
        <li className="nav-item text-center">
          <div>
            <div>{props.timer}</div>
            <span className="badge badge-light" style={{fontSize: "14px"}}>{props.finishedOrderLength} Order Finished</span>
          </div>
        </li>
        <li className="d-flex text-center nav-item">
          <div>
            <div className="mx-3">Page {props.currentPage} of {props.pages}</div>
            <button type="button" className="mx-1 btn btn-secondary" onClick={prevHandler}>&lt; Prev</button>
            <button type="button" className="btn btn-secondary" onClick={nextHandler}>Next &gt;</button>
          </div>
        </li>
      </ul>
    </nav>
  )
}

const MapStateToProps = (state) => {
  return {
    currentPage : state.TrackingOrder.currentPage,
    pages : state.TrackingOrder.pages
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    prevPage : (payload) => {
      dispatch({type: TrackingOrderType.PREV_PAGE, payload:payload})
    },
    nextPage : (payload) => {
      dispatch({type: TrackingOrderType.NEXT_PAGE, payload:payload})
    }
  }
} 

export default connect(MapStateToProps,MapDispatchToProps)(Header)