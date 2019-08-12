import React, {Component} from 'react';
import './StudentCard.css';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {removeStudent} from '../../actions'

class StudentCard extends Component{
	constructor(props) {
		super(props);
	}

	findCollegeName(id) {
		for (let i = 0; i < this.props.campuses.length; i++) {
			if (this.props.campuses[i].id == id) {
				return this.props.campuses[i].name
			}
		}
		return "undefined"
	}

	render(){
		let thisStudentIdLink = "/students/" + this.props.student.id;
		return(
			<div className="studentInfo">
				<Link to={thisStudentIdLink}>
					<div className="studentImage">
						<img src={this.props.student.img} alt="Student Pic" />
					</div>
					<div className="studentName">
						{this.props.student.name}
					</div>
				</Link>
				<div className="campusName">
				{this.props.student.campusId !== undefined ?
					<Link to={"/campuses/" + this.props.student.campusId}>
						{this.findCollegeName(this.props.student.campusId)}
					</Link>
					:
					"Not Enrolled"
				}
				</div>
				

			</div>
		);
	}
}

const getStateToProps = state => {
	return {
		students: state.students,
		campuses: state.campuses
	}
}

export default connect(getStateToProps, {
	removeStudent
})(StudentCard)
