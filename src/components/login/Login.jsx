import { useEffect, useState } from "react"
import Header from "../header/Header"
import './style.css'
import { useNavigate } from "react-router-dom"
import imgArrow from '../../assets/arrow.svg'
import { getEmail } from '../../firebase/db'

function Login() {
    const [email, setEmail] = useState("");
    const [showError, setShowError] = useState(false);

    useEffect(() => {
    }, [email])

    const navigate = useNavigate()

    async function login() {
        const result = await getEmail(email);
        if (result && email.length > 0) {
            setShowError(false);
            const safeEmail = email.replaceAll('.', '_')
            localStorage.setItem('email', safeEmail)
            navigate('/main')
        } else {
            setShowError(true);
        }
    }

    function openUrl() {
        window.electronAPI.openUrl("https://vendyapp.vercel.app/login");
    }


    return (
        <div className="div-body-login">
            <Header />
            <div className="div-login">
                <h1>Inicia sesión con el codigo de tu cuenta</h1>
                <p>Ingresa el email con el que se ha registrado en Vendy. ¿No estás registrado? <span onClick={() => openUrl()}>Crear tu tienda.</span></p>                <input
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    placeholder="Tu correo electrónico"
                />
                {/* <input value={email} type="text" placeholder="Tu correo electronico" onChange={(e) => { setEmail(e.target.value) }} /> */}
                <button className="button-login" onClick={login}>
                    <img src={imgArrow} alt="Arrow" />
                </button>
                {showError && <p id="p-info">No hay ninguna tienda creada con este correo</p>}
            </div>
        </div>
    )
}

export default Login