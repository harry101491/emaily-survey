import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

class SurveyForm extends Component {
    render() {
        return (
            <div>
                <Field type="text" name="surveyTitle" component="input" />
            </div>
        );
    }
}

export default reduxForm({ form: "surveyForm" })(SurveyForm);