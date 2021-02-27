import { useState } from 'react';
import navStyles from '../Layout/Layout.module.css'

const NavCollapse = ({ listItem, burgerVisability, setBurgerVisability }) => {
    const [open, setopen] = useState(false);
    
    return (
        <div>
            <li className={`${open ? navStyles.active : ''}`}>
                <p onClick={() => setopen(!open)}>{listItem.propertyName}</p>
                <div className={navStyles.NavList}>
                    {
                        listItem.cities.map((item,idx) => (
                            <a href={`/projects/${listItem.propertyUrl}/${item.cityUrl}`} key={idx}>
                                <div className={navStyles.NavListItem} onClick={() => {
                                    setBurgerVisability(!burgerVisability)
                                    setopen(!open)
                                }}>{item.name}</div>
                            </a>
                        ))
                    }
                </div>
            </li>
        </div>
    )
}
export default NavCollapse