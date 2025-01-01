import React from "react";
import "./Header.css"

function Header({ setShowForm }) {
    return(
        <header>
        <img src="/image 1.png" alt="Logo" className="header-logo" />
        <div>
                <button onClick={()=>setShowForm(false)}>HOME</button>
                <button className="btn_nuevo_video" onClick={()=>setShowForm(true)}>NUEVO VIDEO</button>
            </div>
        </header>
    )
}



export default Header;