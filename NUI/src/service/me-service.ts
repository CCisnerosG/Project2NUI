import axios from "axios";

export const getUserInfo = () => {
    return axios.get('http://localhost:8080/users/me')
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching user info:', error);
            throw error; 
        });
};
