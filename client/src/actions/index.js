import axios from "axios";
import { FETCH_USER } from "./types";

// action creator which returns a functions and when reduxthunk sees a function it call it with dispatch function
export const fetchUser = () => async (dispatch) => {
    // wait for the result 
    const { data } = await axios.get("/api/current_user");
    // dispatch the action
    dispatch({"type": FETCH_USER, "payload": data });
};

// action creator which handles when user submits credit card and we got the token sucessfully from stripe
export const handleStripe = (token) => async (dispatch) => {
    // send the post request to backend server and fetch the user model
    const { data } = await axios.post("/api/stripe", token);

    dispatch({ type: FETCH_USER, payload: data });
}
