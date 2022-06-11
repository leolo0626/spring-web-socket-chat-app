import React, {useContext , useState} from 'react'
import { useEffect } from 'react/cjs/react.production.min';
import Sidebar from '../../components/Sidebar/Sidebar'
import { ThemeContext } from '../../ContextManager/ThemeContext'
import './Layout.css'

export default function Layout(props) {
  const {isDarkMode} = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(true);
  const handleSideBarOpen = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  }
  let homeStyle = isDarkMode ? 'theme dark ': ''
  homeStyle +=  ! isOpen ? 'close ' : ''
  console.log(homeStyle)
  return (
    <>
        <Sidebar isOpen={isOpen} openHandler={handleSideBarOpen} />
        <div className={homeStyle + "layout"}>
            {props.children}
        </div>
    </>
  )
}
