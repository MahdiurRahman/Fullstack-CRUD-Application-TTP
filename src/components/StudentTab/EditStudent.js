import React, { Component } from 'react';
import {connect} from 'react-redux';
import {editStudent} from '../../actions';
import {Redirect} from 'react-router';

class EditStudent extends Component {
    constructor(props) {
        super(props)

        this.state =
        {
            id: props.student.id,
            name: props.student.name,
            gpa: props.student.gpa,
            img: props.student.img,
            campusId: props.student.campusId,
            nameIsCorrect: true,
            gpaIsCorrect: true,
            Redirect: false
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        let currentStudent = this.props.students.find(student => (student.id === this.props.student.id));

        this.setState({
            id: currentStudent.id,
            name: currentStudent.name,
            gpa: currentStudent.gpa,
            img: currentStudent.img,
            campusId: currentStudent.campusId
        })
    }
    
    onChangeHandler = event => {
        this.setState({
                      [event.target.name]: event.target.value
                      })
    }
    
    onSubmitHandler = event => {
        event.preventDefault()
        let correctName = true;
        let correctGPA = true;
        if (this.state.name.length < 1){
            correctName = false;
        }
        for (let i = 0; i < this.state.name.length; i++){
            if (!(this.state.name[i].toLowerCase() != this.state.name[i].toUpperCase() || this.state.name[i] == " ")){
                correctName = false;
            }
        }
        if (this.state.gpa < 0 || this.state.gpa > 4){
            correctGPA = false;
        }
        this.setState({
            nameIsCorrect: correctName,
            gpaIsCorrect: correctGPA
        })
        if (correctName && correctGPA){
            this.props.editStudent(this.state)
            this.setState({redirect: true})
        }
    }
    
    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={"/students/" + this.state.id}/>
            );
        }
        return (
                <div>
                <form onSubmit={this.onSubmitHandler}>
                <input name="name" type="text" placeholder="Name" value={this.state.name} onChange={this.onChangeHandler} />
                <input name="gpa" type="text" placeholder="GPA" value={this.state.gpa} onChange={this.onChangeHandler} />
                <input name="img" type="text" placeholder="Image URL" value={this.state.img} onChange={this.onChangeHandler} />
                <input type="submit" value="Save Changes" />
                </form>
                <div className="inputErrors">
                    <div>
                        {this.state.nameIsCorrect ? 
                        "" :
                        "Name must be at least one character long and must contain only letters and spaces"}
                        </div>
                        <div>
                        {this.state.gpaIsCorrect ?
                        "":
                        "GPA must be withing the range of 0 and 4"}
                        </div>
                </div>
                </div>
                )
    }
}

const mapStateToProps = state => {
    return {students: state.students}
}

export default connect(mapStateToProps, {
                       editStudent
                       })(EditStudent)
