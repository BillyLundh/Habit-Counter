import { useState } from "react";

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
}
from "firebase/auth";

import { auth } from "../firebase";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [register, setRegister] =
        useState(false);

    async function submit() {

        try {

            if (register) {

                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            } else {

                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
            }

        } catch (e) {

            alert(e.message);
        }
    }

    return (

        <div className="card p-4 mx-auto"
             style={{maxWidth:400}}>

            <h2 className="mb-4 text-center">
                Coffee Tracker
            </h2>

            <input
                className="form-control mb-3"
                placeholder="Email"
                value={email}
                onChange={
                    e => setEmail(e.target.value)
                }
            />

            <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={
                    e => setPassword(e.target.value)
                }
            />

            <button
                className="btn btn-primary w-100"
                onClick={submit}
            >
                {
                    register
                        ? "Create Account"
                        : "Login"
                }
            </button>

            <button
                className="btn btn-link"
                onClick={() =>
                    setRegister(!register)
                }
            >
                {
                    register
                        ? "Already have account?"
                        : "Create account"
                }
            </button>

        </div>
    );
}

export default Login;