import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

export const AdminAuth =  ({ children }) => {
     
    const navigate = useNavigate();

    const checkUser = async () => {
        try {
            console.log("apiUrl",`${apiUrl}/v1/admin/check-admin`);
            const response = await axios({
                url: `${apiUrl}/v1/admin/check-admin`,
                method: "GET",
                withCredentials: true,
            });

            console.log("check user",response);
            
        } catch (error) {
            navigate("/login");
            console.log(error);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

  return children;
}

