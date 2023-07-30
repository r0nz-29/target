import axios from "axios";
import { SERVICE_URLS } from "../config/config";



// Load environment variables
const API_URL = 'http://localhost:3000'

const apiClient = axios.create({
  baseURL: API_URL,
});


// Using interceptors to modify requests
apiClient.interceptors.request.use((config) => {
  return ({
    ...config,
    headers: {
    },
  })
},
  error => Promise.reject(error),
);


// Using interceptors to modify response
apiClient.interceptors.response.use((response) =>
    processResponse(response),
  async (error) => {
    return Promise.reject(ProcessError(error));
  },
);


// reponse function for handling response
const processResponse = (response) => {
    
    const responseData = response;
    console.log(responseData);
    if (responseData.status === 200) {
      return { 
        isSuccess: true, 
        data: responseData 
    };
    } else {
      return {
        isFailure: true,
        code: response.status
      };
    }
  };


// function to handle error
const ProcessError = async (error) => {
    if(!error.success){
        console.log("ERROR IN RESPONSE: ", error.toJSON());
        return {
            isError: true,
            code: error.res.status
          };
    }
}



// api calls using service urls
const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body) =>
        apiClient({
            method: value.method,
            url: value.url,
            data: body,
            headers: {
                      // "Accept": "application/json, form-data", 
                      // "Content-Type": "application/json",
                      // "Authorization" : 'Bearer ' + localStorage.getItem('token')
            },
        });
}

export { API };