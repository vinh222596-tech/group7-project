import { useState } from 'react'
import './App.css'
import UserList from './components/UserList'
import AddUser from './components/AddUser'

function App() {
  const [currentView, setCurrentView] = useState('list')

  return (
    <div className="app-container">
      <nav>
        <button onClick={() => setCurrentView(currentView === 'list' ? 'add' : 'list')}>
          {currentView === 'list' ? 'Thêm Người Dùng' : 'Danh Sách Người Dùng'}
        </button>
      </nav>

      {currentView === 'list' ? <UserList /> : <AddUser />}
    </div>
  )
}

export default App
