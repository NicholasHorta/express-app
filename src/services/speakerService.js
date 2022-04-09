/// Revealing Module Pattern
// Service which has a bunch of functions and will return an Object with the methods on it

import axios from "axios";

const speakerService = {
    getSpeakerById: function(id){
        return new Promise((resolve, reject) => {
            console.log('PRIOR TO AXIOS CALL')
            axios.get('http://localhost:3000/speakers/' + id)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    clg: function(something){
        return something;
    }
}

export default speakerService;