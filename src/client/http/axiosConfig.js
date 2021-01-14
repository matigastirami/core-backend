import axios from 'axios';
import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

function onUploadProgress(ev) {
    console.log(ev);
    document.getElementsByClassName("progress").style.display = "block"

    setTimeout(() => {
        document.getElementsByClassName("progress").style.display = "none"
    }, 5000)
    // do your thing here
}

function handleUploadProgress(ev) {
    console.log("HandleUploadProgress")//ev);
    // do your thing here
}

// Add a request interceptor
const http = axios.create({
    baseURL:'/api',
    onDownloadProgress: handleUploadProgress,
    onUploadProgress: handleUploadProgress
})

http.interceptors.request.use(
    config => {
        
        console.log("Request en curso")
        return config;
    },
    error => {
        alert("Ocurrió un error")
    }
)

http.interceptors.response.use((response) => {
    
    console.log("Salio todo OK (Response interceptor)")
    return response;
  }, error => {
    console.warn("Ocurrió un error en el response")
})

export default http;