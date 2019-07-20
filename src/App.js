import React, { Component } from 'react';
import './App.css';
import userList from "./users.json";

export class App extends Component {
  state={
    users: userList,
    search: "",
    filter: "",
    country: ""
  }

  searchUser = (event) => {

    let search = event.target.value;

    const match = userList.slice()
      .filter(u => u.firstName.toLowerCase().match(search.toLowerCase()) || 
        u.lastName.toLowerCase().match(search.toLowerCase()));

    this.setState({
      users: match
    });
  }

  handleCountry = (event) => {

    let value = event.target.value;
    let name = event.target.name;

    console.log(value, name);

    if(value){
      const match = this.state.users.slice()
        .filter(u => u.campus.match(value));

      this.setState({
        users: match
      });
    }
    else{
      this.setState({
        users: userList
      });
    }
  }

  handleChange = (event) => {
    let value = event.target.checked;
    let name = event.target.name;

    this.setState({
      [name]: value
    });

    console.log(value, name);

    if(value){
    const match = this.state.users.slice()
      .filter(u => u.role.match(name));

    this.setState({
      users: match
    });
    }
    else{
      this.setState({
        users: userList
      });
    }
  }

  render() {

    let users = this.state.users.map((u, id) => {

      let li = "";
      if(u.linkedin){
        li = <a href={u.linkedin}><img style={{height: "1rem"}} src="/linkedin.png" alt="" /></a>
      }

      return (
        <tr key={id}>
          <td>{u.firstName}</td>
          <td>{u.lastName}</td>
          <td>{u.campus}</td>
          <td>{u.role}</td>
          <td>{li}</td>
        </tr>
      );

    });

    return (
      <div className="App">
        <h1>IronBook</h1>
        <input type="search" name="search" style={{width: "50%"}} onChange={this.searchUser}/>
        <div>
          <input type="checkbox" name="student" onChange={this.handleChange} />
          <label htmlFor="student">Student</label>
          {"  "}
          <input type="checkbox" name="teacher" onChange={this.handleChange} />
          <label htmlFor="teacher">Teacher</label>
          {"  "}
          <select name="country" onChange={this.handleCountry}>
            <option value="">Select country</option>
            <option value="Berlin">Berlin</option>
            <option value="Lisbon">Lisbon</option>
            <option value="Paris">Paris</option>
          </select>
        </div>
        <div className="container d-flex justify-content-center">
          <table>
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Campus</th>
                <th>Role</th>
                <th>Links</th>
              </tr>
            </thead>
            <tbody>
              {users}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default App;