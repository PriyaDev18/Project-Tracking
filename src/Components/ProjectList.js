import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Projects = props => (
  <tr>
    <td>{props.project.username}</td>
    <td>{props.project.project}</td>
    <td>{props.project.duration}</td>
    <td>{props.project.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.project._id}>edit</Link> | <a href="#" onClick={() => { props.deleteProject(props.project._id) }}>delete</a>
    </td>
  </tr>
)

export default class ProjectList extends Component {
  constructor(props) {
    super(props);

    this.deleteProject = this.deleteProject.bind(this)
    this.state = {projects: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/project/')
      .then(response => {
        this.setState({ projects: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteProject(id) {
    axios.delete('http://localhost:5000/project/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      projects: this.state.projects.filter(el => el._id !== id)
    })
  }

  projectList() {
    return this.state.projects.map(currentProject => {
      return <Projects project={currentProject} deleteProject={this.deleteProject} key={currentProject._id}/>;
    })
  }

  render() {
    return (
      <div className='cont-block'>
  
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Project</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.projectList() }
          </tbody>
        </table>
      </div>
    )
  }
}