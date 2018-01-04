import React, { Component } from "react";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <h2> Dashboard </h2>
                <div className="fixed-action-btn">
                    <a className="btn-floating btn-large blue">
                        <i className="large material-icons">add</i>
                    </a>
                </div>
            </div>
        );
    }
}

export default Dashboard;