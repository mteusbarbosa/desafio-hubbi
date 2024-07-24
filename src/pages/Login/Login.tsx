import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (usuario === "user@hubbi.com" && senha === "password") {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2MzE3ODg1NjgsImV4cCI6MTYzMTc5MjE2OH0.4XZvTZb4l3dQ_VNkB6h-3uYMWojQaLvQ9JkpehCxj7U";
            localStorage.setItem("token", token);
            navigate("/");
        } else {
            setErrorMessage("Credenciais inválidas");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl shadow-gray-400 max-w-sm w-full">
                <h2 className="mb-4 text-xl text-center">Login</h2>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="usuario">Usuário</label>
                    <input
                        type="text"
                        id="usuario"
                        className="w-full p-2 border rounded"
                        value={usuario}
                        onChange={(event) => setUsuario(event.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="senha">Senha</label>
                    <input
                        type="password"
                        id="senha"
                        className="w-full p-2 border rounded"
                        value={senha}
                        onChange={(event) => setSenha(event.target.value)}
                    />
                </div>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
                {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
            </form>
        </div>
    );
}
