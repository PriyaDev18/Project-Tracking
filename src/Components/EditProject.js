import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default class EditProject extends Component {
  constructor(props) {
  super(props);
   console.log(this.props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeProject = this.onChangeProject.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      project: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }
  
  componentDidMount() {
    var url_str = window.location.href;
    var url =url_str.split('/');
    var urlId=url.pop();
    console.log(urlId);
    axios.get('http://localhost:5000/project/'+urlId)
      .then(response => {
        console.log(response);
        this.setState({
          username: response.data.username,
          project: response.data.project,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeProject(e) {
    this.setState({
      project: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const project = {
      username: this.state.username,
      project: this.state.project,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(project);
    var url_str = window.location.href;
    var url =url_str.split('/');
    var urlId=url.pop();
    console.log(urlId);
    axios.post('http://localhost:5000/project/update/'+urlId,project)
      .then(res => console.log(res.data));
      window.location = '/';
  }

  render() {
   
   return (
    <div>
      <h3>Edit Project Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
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
          <label>Project: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.project}
              onChange={this.onChangeProject}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Project Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
