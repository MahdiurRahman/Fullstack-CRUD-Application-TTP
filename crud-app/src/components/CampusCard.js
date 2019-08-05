import React from "react"
import "./CampusCard.css"
import {connect} from "react-redux"
import {Redirect} from 'react-router';
import {removeCampus, removeCampusFromStudent} from '../actions/index.js'
import {Link} from 'react-router-dom'

class CampusCard extends React.Component {
	constructor(props) {
    super(props);
    this.removeCampus = this.removeCampus.bind(this);
	}

	removeCampus() {
    this.props.removeCampus(this.props.campus);
    this.props.removeCampusFromStudent(this.props.campus);
  }

    render() {
        return(
            <div className="CampusCard">
              <img className="campus-card-img" src={this.props.campus.img}/>
              <div className="campus-card-info">
                <Link className="campus-card-title" to={"/campuses/" + this.props.campus.id}>{this.props.campus.name}</Link>
                <div className="campus-card-element">{this.props.campus.bio}</div>
                <Link to={"/campuses/" + this.props.campus.id + "/edit"}>
                  <button className="campus-card-element">
                    edit
                  </button>
                </Link>
                <button className="campus-card-element" onClick={this.removeCampus}>remove</button>
              </div>
            </div>
        );
    }
}

const getStateToProps = (State) => {
	return {};
}
export default connect(getStateToProps, {
  removeCampus: removeCampus,
  removeCampusFromStudent: removeCampusFromStudent
})(CampusCard);