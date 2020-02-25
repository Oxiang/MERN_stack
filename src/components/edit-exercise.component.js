// Import react and component
import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios';


export default class EditExercise extends Component {
    // Create a constructor method
    constructor(props){
        // Must use super to override the parent constructor
        super(props);

        //Binding the keyword "this", ensure "this" is bind to the right thing
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Create state
        this.state = {
            username : '',
            description : '',
            duration : 0,
            date : new Date(),
            users : []
        }
    }

    //React lifecycle method, called before anything is loaded 
    componentDidMount() {
        // Another axios
        axios.get('http://localhost:5000/exercises/' +this.props.match.params.id)
        .then(response => {
            this.setState({
                username: response.data.username,
                description: response.data.description,
                duration: response.data.duration,
                date: new Date(response.data.date)
            })
        })
        .catch(function (error) {
            console.log(error);
        })


        // Get all the data from database
        axios.get('http://localhost:5000/users/')
        .then(response => {
            if(response.data.length > 0) {
                this.setState({
                    users: response.data.map(user => user.username),
                })
            }
        })
    }

    // Function to change the state
    onChangeUsername(e) {
        // always use setState to change the value 
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        // always use setState to change the value 
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        // always use setState to change the value 
        this.setState({
            duration: e.target.value
        });
    }

    // Use a calendar library for date
    onChangeDate(date) {
        // always use setState to change the value 
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        // cancel the event 
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise)
        .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Edit New Exercise Log</h3>
                {/* { javascript function/variable } */}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        {/* Drop down menu */}
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                                {/* Javascript here. Calls the entire list of user out and use map which iterate through the list */}
                                {
                                    this.state.users.map(function(user) {
                                        return <option
                                            key={user}
                                            value={user}>{user}
                                            </option>;
                                    })
                                }
                            </select>
                    </div>

                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}/>
                    </div>

                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}/>
                    </div>

                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit"
                            value="Edit Exercise Log"
                            className="btn btn-primary"/>
                    </div>
                            
                </form>
            </div>
        )
    }
}