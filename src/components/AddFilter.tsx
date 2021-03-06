// courtesy of https://stackoverflow.com/a/45755948

import React, { FunctionComponent } from "react";
import { ColumnData } from './Home';

interface FilterProps {
    columns: ColumnData[],
    loading: boolean

}

const AddFilter: FunctionComponent<FilterProps> = ({ columns, loading }) => {
    const [openDropdown, setOpenDropdown] = React.useState(false)
    const [openHoverOptions, setOpenHoverOptions] = React.useState(true)

    let shouldOpenDropdown = () => {
        setOpenDropdown(!openDropdown)
    }

    return(
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbar1">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <a href="#" id="menu" data-toggle="dropdown" className="nav-link dropdown-toggle" onClick={() => shouldOpenDropdown()} >Dropdown</a>
                        <ul className="dropdown-menu show">
                            <li className="dropdown-item">
                                <a href="#">Another Link</a>
                                <ul className="dropdown-menu">
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                Wump
                                            </a>
                                        </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="collapse navbar-collapse" id="navbar1">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <a href="#" id="menu" data-toggle="dropdown" className="nav-link dropdown-toggle" onClick={() => shouldOpenDropdown()} >Dropdown</a>
                        <ul className={openDropdown ? "dropdown-menu show" : "dropdown-menu"}>
                            {columns.length > 0 && columns.map(gh => <li className="dropdown-item">
                                <a key={gh.id} href="#">{gh.sampleHeader}</a>
                                                
                                    
                                        <ul className="dropdown-menu show">
                                    {gh.sample.map(wump => (
                                                <li>
                                                    <a className="dropdown-item" href="#">
                                                            {wump}
                                                    </a>
                                                </li>
                                            ))}
                                </ul>
                            </li>
                                                      
                            
                            
                            
                            )}
                        </ul>

                    </li>
                </ul>
            </div>
        </nav>

    )}

export default AddFilter