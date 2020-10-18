// courtesy of https://stackoverflow.com/a/45755948

import React from "react";

const AddFilter = () => {

    return(
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbar1">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <a href="#" id="menu" data-toggle="dropdown" className="nav-link dropdown-toggle">Dropdown</a>
                        <li className="nav-item">
                            <a className="dropdown-item" href="#">Link</a>
                        </li>
                        <ul className="dropdown-menu">
                            <li className="dropdown-item dropdown-submenu">
                                <a href="#" data-toggle="dropdown" className="dropdown-toggle">Submenu-1</a>
                                <ul className="dropdown-menu">
                                    <li className="dropdown-item">
                                        <a href="#">Item-1</a>
                                    </li>
                                    <li className="dropdown-item">
                                        <a href="#">Item-2</a>
                                    </li>
                                    <li className="dropdown-item">
                                        <a href="#">Item-3</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown-item dropdown-submenu">
                                <a href="#" data-toggle="dropdown" className="dropdown-toggle">Submenu-2</a>
                                <ul className="dropdown-menu">
                                    <li className="dropdown-item">
                                        <a href="#">Item-1</a>
                                    </li>
                                    <li className="dropdown-item">
                                        <a href="#">Item-2</a>
                                    </li>
                                    <li className="dropdown-item">
                                        <a href="#">Item-3</a>
                                    </li>
                                </ul>

                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>

    )}

export default AddFilter