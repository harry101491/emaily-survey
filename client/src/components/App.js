import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

// helper method to connect to the action creators
import { connect } from "react-redux";

// getting all the actions from the actions folder
import * as actions from "../actions";

// importing all the underlying components
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";

class App extends Component {
    
    // life cycle method 
    //that checks when App component get loaded fetch the user to check if he/she is logged in
    componentDidMount() {
        this.props.fetchUser();
    }
    
    // render method for App Component
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

// calling the connect method
export default connect(null, actions)(App);