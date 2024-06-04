import { Outlet } from 'react-router-dom'
import Header from './Header'
import NavigationBar from './NavigationBar'
import '../style/BasicLayout.css'

const BasicLayout = () => {
  return (
    <div className="main-layout">
      <NavigationBar />
      <div className="main-content">
        <Header />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default BasicLayout
