import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function RootLayout() {
  return (
    <div className="d-flex flex-column min-vh-100 app-wrapper">
      <Navbar />
      <main className="flex-grow-1 main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout
