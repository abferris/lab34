import React from 'react';

import RecordList from './record/list.js';

class App extends React.Component {
  render() {
    return ( 
      <div>

        <h2>Players</h2>

        <RecordList model="players" />



         <h2>Teams</h2> 

         <RecordList model="teams" />

      </div>
    );
  }
}

export default App;
