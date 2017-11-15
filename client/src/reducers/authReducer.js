import { FETCH_USER } from "../actions/types";

// Reducer that takes care about Auth state of the application
export default function(state = null, action) {
    switch(action.type) {
        // otherwise either return payload or false
        case FETCH_USER:
            return action.payload || false;
        // In the default case return null when we don't know the correct state 
        default:
            return state;
    }
}