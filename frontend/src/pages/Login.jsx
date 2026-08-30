import { useState } from "react";
import './Login.css';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("Contacting your parents and initializing email bomber...");
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <h1>Login</h1>

                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">
                        Login
                    </button>
                </form>

                {message && (
                    <p className="login-message">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Login;