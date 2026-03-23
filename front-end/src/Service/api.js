import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
});




api.interceptors.request.use((config) =>{
    const token = localStorage.getItem("token");
    if(token){
             config.headers.Authorization = `Bearer ${token}`;
    } return config;
   
});

export const getproperties = () => api.get("/properties");

export const getpropertyById = (id) => {
    api.get(`/properties/${id}`)
}

export const createproperty = (data) => 
    api.post("/properties", data, {
            headers:{
                "Content-type " : "multipart/from-data"
            }
    })

    export const deleteproperty = (id) => {
        api.delete(`/properties ${id}`);

    }





export default api;
