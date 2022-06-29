import * as React from 'react';
import {FC, useState, useCallback} from 'react';
import '../styles/ui.css';

declare function require(path: string): any;

const App: FC = () => {
  const [isLogining, setIsLogining] = useState(false);

  const handleClosePlugin = useCallback(() => {
    parent.postMessage({pluginMessage: {type: 'cancel'}}, '*');
  }, []);

  const handleLoginAndFetchData = useCallback(() => {
    setIsLogining(true);
    setTimeout(() => {
      // simulate call external API to login Hubspot then retreive the response
      const API_RESPONSE = [
        {r: 1, g: 0, b: 0},
        {r: 1, g: 1, b: 1},
        {r: 1, g: 1, b: 0},
      ];
      parent.postMessage({pluginMessage: {type: 'create-color-palette', colorPalette: API_RESPONSE}}, '*');
    }, 4000);
  }, []);

  return (
    <div>
      <h2>Hubspot Logo Generator</h2>
      {isLogining ? (
        <div>loading...</div>
      ) : (
        <>
          <span>Enter your Hubspot email and password to login</span>
          <div className="form-container">
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Your password" />
          </div>
          <div className="form-button">
            <button onClick={handleLoginAndFetchData}>Submit</button>
            <button onClick={handleClosePlugin}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
