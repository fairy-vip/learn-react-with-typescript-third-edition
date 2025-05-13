import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Alert} from "./components/Alert.jsx";

function App() {
    const [count, setCount] = useState(0)
    const closed = () => {
        alert('closed')
    }
    return (<>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
            <p>
                <Alert onClose={closed}
                       closable={true}
                       heading={'你大爷的'}
                       children={'<div>世界你好！！</div>'}
                       type="warning"
                >
                    <div>Hello World</div>
                </Alert>
            </p>
        </>)
}

export default App
