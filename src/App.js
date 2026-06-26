import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const unsubscribe =
            onAuthStateChanged(
                auth,
                setUser
            );

        return unsubscribe;

    }, []);

    return (

        <div className="container py-5">

            {
                user
                    ? <Dashboard user={user}/>
                    : <Login/>
            }

        </div>
    );
}

export default App;