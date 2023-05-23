import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {

    const [count, setCount] = useState(0);
    const [text, setText] = useState('');
    const [person, setPerson] = useState({ firstName: '', lastName: '', age: '' });
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        // (async function () {
        //     const { data } = await axios.get('/api/weatherforecast');
        //     setWeather(data);
        // })();

        const getWeather = async () => {
            const { data } = await axios.get('/api/weatherforecast');
            setWeather(data);
        }

        getWeather();
        
    }, []);

    const onButtonClick = () => {
        setCount(count + 1);
    }
    const onPersonTextChange = e => {
        const copy = { ...person };
        copy[e.target.name] = e.target.value;
        setPerson(copy);
    }

    const onSubmitClick = () => console.log(person);

    const { firstName, lastName, age } = person;
    return (
        <div className='container mt-5'>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>TemperatureC</th>
                        <th>TemperatureF</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {weather.map((w, i) => {
                        return <tr key={i}>
                            <td>{w.date}</td>
                            <td>{w.temperatureC}</td>
                            <td>{w.temperatureF}</td>
                            <td>{w.summary}</td>
                        </tr>
                    })}
                </tbody>
            </table>

            <div className='mt-5' style={{ minHeight: 1000 }}>
                <div className="row">
                    <div className='col-md-6 offset-md-3 card bg-light p-4'>
                        <h2>Add a New Person</h2>
                        <input type="text" onChange={onPersonTextChange} value={firstName} className='form-control' name='firstName' placeholder="First Name" />
                        <br />
                        <input type="text" onChange={onPersonTextChange} value={lastName} className='form-control' name='lastName' placeholder="Last Name" />
                        <br />
                        <input type="text" onChange={onPersonTextChange} value={age} className='form-control' name='age' placeholder="Age" />
                        <br />
                        <button onClick={onSubmitClick} className='btn btn-primary btn-lg btn-block'>Submit</button>
                    </div>
                </div>
            </div>
            <div className="row" style={{ marginTop: -600 }}>
                <div className="col-md-6 offset-md-3">
                    <h1>Welcome to React</h1>
                    <button onClick={onButtonClick} className="btn btn-primary mb-3">Click me</button>
                    <h2>{count}</h2>
                    <input type="text" onChange={e => setText(e.target.value)} className='form-control' />
                    <h3>{text}</h3>
                </div>
            </div>

            {/* <div className="app-container">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <h1>Welcome to React</h1>
                    <button onClick={onButtonClick} className="btn btn-primary mb-3">Click me</button>
                    <h2>{count}</h2>
                    <input type="text" onChange={e => setText(e.target.value)} className='form-control' />
                    <h3>{text}</h3>
                </div>


            </div> */}
        </div>
    )
}

export default App;