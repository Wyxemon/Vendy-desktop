import './style.css'
import imgLogo from '../../../icon.ico'
import closeSvg from '../../assets/close.svg'

function Header() {
  function closeButton() {
    window.electronAPI.closeApp()
  }

  return (
    <header>
      <img id="icon" src={imgLogo} alt="Vendy" />
      <button id="close-btn" onClick={closeButton}>
        <img src={closeSvg} alt="Close" />
      </button>
    </header>
  )
}

export default Header