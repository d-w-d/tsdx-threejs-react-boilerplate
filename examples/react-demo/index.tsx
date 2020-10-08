import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';

import { TsdxThreeJsReactBoilerplate } from '../..';

const App = () => {
  return (
    <div className={''}>
      <TsdxThreeJsReactBoilerplate
        width="100vw"
        height="100vh"
        backgroundColor="rgba(0,0,0,0.999)"
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
