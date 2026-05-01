import Header from '../../components/header/Header'
import './style.css'

function Main() {

const email = localStorage.getItem('email')

    return (
        <div className="div-body">
            <Header />
            <iframe
                src={`https://vendy-view.vercel.app/?email=${email}`}
                style={{ border: "none" }}
            />
        </div>
    )
}

export default Main