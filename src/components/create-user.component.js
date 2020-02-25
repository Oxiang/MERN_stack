// Import react and component
import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props){
        // Must use super to override the parent constructor
        super(props);

        //Binding the keyword "this", ensure "this" is bind to the right thing
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Create state
        this.state = {
            username : '',
        }

        
    }

    onChangeUsername(e) {
        // always use setState to change the value 
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        // cancel the event 
        e.preventDefault();

        const user = {
            username: this.state.username,
        }

        console.log(user);

        // Send to the backend
        axios.post('http://localhost:5000/users/add', user)
        .then(res => console.log(res.data));

        //Let the user stay at the current page
        this.setState({
            username: ''
        })
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" 
                            value="Create User"
                            className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}