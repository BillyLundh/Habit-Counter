import {
    collection,
    query,
    where,
    onSnapshot,
    addDoc,
    serverTimestamp
}
from "firebase/firestore";

import {
    signOut
}
from "firebase/auth";

import {
    useEffect,
    useState
}
from "react";

import {
    auth,
    db
}
from "../firebase";

function Dashboard({ user }) {

    const [items, setItems] = useState([]);
    const [logs, setLogs] = useState([]);

    const [newItem, setNewItem] = useState("");

    const [lastLogged, setLastLogged] = useState("");

    // ---------------------------------------------------
    // Load Items
    // ---------------------------------------------------

    useEffect(() => {

        const q = query(
            collection(db, "items"),
            where("ownerId", "==", user.uid)
        );

        return onSnapshot(
            q,
            snapshot => {

                setItems(
                    snapshot.docs.map(
                        doc => ({
                            id: doc.id,
                            ...doc.data()
                        })
                    )
                );
            }
        );

    }, [user.uid]);

    // ---------------------------------------------------
    // Load Logs
    // ---------------------------------------------------

    useEffect(() => {

        const q = query(
            collection(db, "logs"),
            where("ownerId", "==", user.uid)
        );

        return onSnapshot(
            q,
            snapshot => {

                setLogs(
                    snapshot.docs.map(
                        doc => ({
                            id: doc.id,
                            ...doc.data()
                        })
                    )
                );
            }
        );

    }, [user.uid]);

    // ---------------------------------------------------
    // Add Item
    // ---------------------------------------------------

    async function addItem() {

        if (!newItem.trim())
            return;

        await addDoc(
            collection(db, "items"),
            {
                ownerId: user.uid,
                name: newItem,
                category: "consumable",
                icon: "☕"
            }
        );

        setNewItem("");
    }

    // ---------------------------------------------------
    // Log Item
    // ---------------------------------------------------

    async function logItem(item) {

        await addDoc(
            collection(db, "logs"),
            {
                ownerId: user.uid,
                itemName: item.name,
                itemId: item.id,
                timestamp: serverTimestamp()
            }
        );

        setLastLogged(item.name);

        setTimeout(() => {
            setLastLogged("");
        }, 2500);
    }

    // ---------------------------------------------------
    // Count logs today
    // ---------------------------------------------------

    function countToday(item) {

        const today = new Date();

        return logs.filter(log => {

            if (log.itemName !== item.name)
                return false;

            if (!log.timestamp)
                return false;

            const date = log.timestamp.toDate();

            return (
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
            );

        }).length;
    }

    // ---------------------------------------------------
    // UI
    // ---------------------------------------------------

    return (

        <div>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h1 className="mb-0">
                        ☕ Habit Tracker
                    </h1>

                    <small className="text-muted">
                        {user.email}
                    </small>

                </div>

                <button
                    className="btn btn-outline-danger"
                    onClick={() => signOut(auth)}
                >
                    Logout
                </button>

            </div>

            {
                lastLogged &&
                <div className="alert alert-success">
                    Logged {lastLogged}
                </div>
            }

            <div className="card p-3 mb-4 shadow-sm">

                <h5>Add Item</h5>

                <input
                    className="form-control mb-3"
                    placeholder="Coffee"
                    value={newItem}
                    onChange={
                        e => setNewItem(
                            e.target.value
                        )
                    }
                />

                <button
                    className="btn btn-primary"
                    onClick={addItem}
                >
                    Add Item
                </button>

            </div>

            {
                items.map(item => (

                    <div
                        key={item.id}
                        className="card shadow-sm p-3 mb-3"
                    >

                        <div className="d-flex justify-content-between align-items-center">

                            <div>

                                <h4 className="mb-1">
                                    {item.icon} {item.name}
                                </h4>

                                <small className="text-muted">
                                    Logged today: {countToday(item)}
                                </small>

                            </div>

                            <button
                                className="btn btn-success"
                                onClick={() => logItem(item)}
                            >
                                Log
                            </button>

                        </div>

                    </div>

                ))
            }

        </div>
    );
}

export default Dashboard;