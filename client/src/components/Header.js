import React, { Component } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
    
    // render the Header component according to the auth property
    renderContent() {
        switch(this.props.auth) {
            // when the auth is null (we are not sure whether user has logged in or not)
            case null:
                return;
            // when the auth is false (we are sure that user is logged out)
            case false:
                return (
                    <li><a href="/auth/google">Login With Google</a></li>
                );
            // when the auth contains an object (we are sure that user is logged in)
            default:
                return (
                    [
                        <li key="0"><Payments /></li>,
                        <li key="2" style={{ margin: "0 10px" }}> Credits: { this.props.auth.credits }</li>,
                        <li key="1"><a href="/api/logout">Logout</a></li>
                    ]
                );
        }
    }

    // main render function
    render() {
        // console.log(this.props);
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                        to={ this.props.auth ? "/surveys" : "/" } 
                        className="left brand-logo">
                            Emaily
                    </Link>
                    <ul className="right">
                        { this.renderContent() }
                    </ul>
                </div>
            </nav>
        );
    }
}

// function that maps the State to Props in the Header Component
function mapStateToProps(state) {
    return {
        "auth": state.auth
    };
}

export default connect(mapStateToProps)(Header);