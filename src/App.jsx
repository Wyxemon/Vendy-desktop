import { Routes, Route } from "react-router-dom"
import Main from "./components/main/Main"
import Login from "./components/login/Login"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </>
  )
}

export default App