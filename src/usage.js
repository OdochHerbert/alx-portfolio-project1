import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

function Usage() {
    const [networkData, setNetworkData] = useState({});
    const [outputText, setOutputText] = useState('');
    const [txData, setTxData] = useState([0]);
    const [rxData, setRxData] = useState([0]);
    const [timeData, setTimeData] = useState([0]);
    const [fetching, setFetching] = useState(false);
    

    const fetchDataAndUpdateArrays = () => {
        fetch('https://18.235.255.214/get_network_data')
            .then(response => response.json())
            .then(data => {
                console.log('Raw data:', data);

                setOutputText(data.output);

                const parsedData = parseOutputText(data.output);
                setNetworkData(parsedData);

                // Update state variables for plot data
                setTxData(prevTxData => [...prevTxData, data.tx]);
                setRxData(prevRxData => [...prevRxData, data.rx]);
                setTimeData(prevTimeData => [...prevTimeData, prevTimeData[prevTimeData.length - 1] + 10]);

                // Log TX, RX, and Time arrays
                console.log('TX Array:', txData);
                console.log('RX Array:', rxData);
                console.log('Time Array:', timeData);
            })
            .catch(error => console.error('Error:', error));
    };

    const parseOutputText = output => {
        const rows = output.split('\n');
        const data = {};
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].trim().startsWith('Listening')) {
                data['Listening'] = rows[i].trim().replace('Listening on', '').trim();
            } else if (rows[i].trim().startsWith('Total send rate')) {
                data['Total send rate'] = rows[i].trim();
            } else if (rows[i].trim().startsWith('Total receive rate')) {
                data['Total receive rate'] = rows[i].trim();
            } else if (rows[i].trim().startsWith('Total send and receive rate')) {
                data['Total send and receive rate'] = rows[i].trim();
            }
        }
        return data;
    };

    useEffect(() => {
        let interval;
    
        const startFetching = () => {
            fetchDataAndUpdateArrays();
            interval = setInterval(() => {
                fetchDataAndUpdateArrays();
            }, 5000);
        };
    
        if (fetching) {
            // Clear the previous interval before starting a new one
            clearInterval(interval);
            startFetching();
        } else {
            clearInterval(interval)
        }
    
        return () => clearInterval(interval); // clear interval on component unmount
    }, [fetching]);
    

    const handleStartFetching = () => {
        setFetching(true);
    };

    const handleStopFetching = () => {
        setFetching(false);
        console.log(fetching)
    };

    return (
        <div>
            <h1>Data retrieved from Flask backend:</h1>
            <div id="output"></div>
            <table>
                <tbody>
                    {Object.entries(networkData).map(([key, value]) => (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button className='button1' onClick={handleStartFetching}>Start Fetching</button>
                <button className='button1' onClick={handleStopFetching}>Stop Fetching</button>
            </div>
            <Plot
                data={[
                    {
                        x: timeData,
                        y: txData,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                        name: 'Tx',
                    },
                    {
                        x: timeData,
                        y: rxData,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'blue' },
                        name: 'Rx',
                    },
                ]}
                layout={{ width: 800, height: 400, title: 'Bandwidth Usage on eth0', yaxis:{title: 'Tx and Rx in kb/s'}, xaxis:{title:'Time in seconds'}, }}
            />
        </div>
    );
}

export default Usage;
