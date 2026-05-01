import { useState } from "react"
import Header from "../header/Header"
import './style.css'
import { useNavigate } from "react-router-dom"
import OtpInput from "react-otp-input";
import imgArrow from '../../assets/arrow.svg'

function Login() {
    const [email, setEmail] = useState("");

    const navigate = useNavigate()

    function login() {
        const safeEmail = email.replaceAll('.', '_')
        localStorage.setItem('email', safeEmail)
        navigate('/main')
    }

    function openUrl() {
        window.electronAPI.openUrl("https://vendyapp.vercel.app/login");
    }

    

    return (
        <div className="div-body-login">
            <Header />
            <div className="div-login">
                <h1>Inicia sesión con el codigo de tu cuenta</h1>
                <p>Ingresa el código que se muestra en tu Vendy. ¿No tengo código? <span onClick={() => openUrl()}>Crear tu tienda.</span></p>
                <input
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                    placeholder="Tu correo electrónico"
                />
                {/* <input value={email} type="text" placeholder="Tu correo electronico" onChange={(e) => { setEmail(e.target.value) }} /> */}
                <button className="button-login" onClick={login}>
                    <img src={imgArrow} alt="Arrow" />
                </button>
            </div>
        </div>
    )
}

export default Login