import React, { Component } from "react";
import { Link } from "react-router-dom";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <h2> Dashboard </h2>
                <div className="fixed-action-btn">
                   <Link to="/surveys/new" className="btn-floating btn-large blue">
                        <i className="large material-icons">add</i>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Dashboard;