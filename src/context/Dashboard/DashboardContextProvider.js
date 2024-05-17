import React,{ useState } from "react";
import DashboardContext from "./DashboardContext";

const DashboardContextProvider= (props)=>{
    const [isActive, setIsActive] = useState(false);
    const handleClick = () => {
        setIsActive(!isActive);
    };
    return (
        <>
            <DashboardContext.Provider value={ { isActive,setIsActive,handleClick } }>
                {props.children}
            </DashboardContext.Provider>
        </>
    );
}

export default DashboardContextProvider;