import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemText,
  TextField,
} from '@material-ui/core';

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayList: [],
      files: new Map(),
      lastSelectedFile: '',
    };
  }

  _updateSelectedFile(file) {
    this.setState({
      lastSelectedFile: file,
    });
  }

  _onFilterChange(inputText) {
    let displayList = []
    for (var fileName in this.state.files) {
      if (fileName.includes(inputText.target.value)) {
        displayList.push(fileName);
      }
    }
    this.setState({
      displayList: displayList
    }); 
  }

  componentDidMount() {
    fetch('http://localhost:8080')
      .then(response => response.json())
      .then(data => this.setState({
        files: data,
        displayList: Object.keys(data),
        lastSelectedFile: Object.keys(data)[0],
      }));
  }

  render() {
    console.log(this.state.data)
    return (
      <div class="container">
        <div class="search-item">
          <TextField 
            id="outlined-basic" 
            label="Filter" 
            variant="outlined" 
            onChange={this._onFilterChange.bind(this)}/>
        </div>

        <div class="tree-item">
          <List component="nav" aria-label="secondary mailbox folders">
            {this.state.displayList.map((file, index) => {return (
              <ListItem button onClick={this._updateSelectedFile.bind(this, file)}>
                <ListItemText primary={file} />
              </ListItem>)})
            }
          </List>
        </div>

        <div class="content-item">
          File: {this.state.lastSelectedFile} 
          <br />
          <br />
          {this.state.files[this.state.lastSelectedFile]}
        </div>
      </div>
    );
  }
}

export default App;
