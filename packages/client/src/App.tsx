import { useEffect, useState } from 'react';

const App = () => {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const fetchServerData = async () => {
            const url = `http://localhost:${__SERVER_PORT__}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
        };

        fetchServerData();
    }, []);

    return (
        <div className="App">
            <h1>{count}</h1>
            <button onClick={() => setCount((i) => i + 1)}>+</button>
        </div>
    );
};

export default App;
