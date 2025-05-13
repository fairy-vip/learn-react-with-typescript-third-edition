import React, { ReactNode } from 'react';
import { Alert } from './Alert';
import './App.css';

const nodeArray: ReactNode[] = [
  <p key="1">这是一段文本</p>,
  123,
  true,
  <React.Fragment key="2">
    <p>这是一个片段中的文本</p>
  </React.Fragment>,
];

function App() {
  return (
    <Alert
      closable={true}
      type={'warning'}
      heading="Success"
      onClose={() => {
        alert('closed');
      }}
    >
      {nodeArray}
      Everything is really good!
    </Alert>
  );
}

export default App;
