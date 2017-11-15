import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payments extends Component {
    render() {
        return(
            <StripeCheckout
                name="Emaily Survey"
                description="Add 5 credits for $5" 
                amount={500}
                token={ token => this.props.handleStripe(token) }
                stripeKey={ process.env.REACT_APP_STRIPE_KEY }
            >
                <button className="btn primary">
                    Add Credits
                </button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);