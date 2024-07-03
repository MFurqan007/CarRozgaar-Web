import React, { useState } from 'react';
import { storage, db } from '../../lib/firebase_config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import axios from 'axios';

export default function UploadVid() {
    // State to store the selected file
    const [file, setFile] = useState(null);

    // Function to call when the form is submitted
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            alert('No file selected');
            return;
        }

        const storageRef = ref(storage, `videos/${file.name}`);
        uploadBytes(storageRef, file).then((snapshot) => {
            alert('Uploaded a video!');
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                alert(`File available at ${downloadURL}`);

                // Write the URL to Firestore under a specific UID
                const uid = 'VyD1mG3YS4ZRsJr8iE9mAAdtyUc2'; // This should be dynamically set based on your app's logic
                const videoRef = doc(db, "videos", uid);

                // You can store additional data here as needed
                setDoc(videoRef, { downloadURL: downloadURL, name: file.name }).then(() => {
                    alert('Video URL has been written to Firestore');
                }).catch((error) => {
                    alert(`Error writing document to Firestore: ${error}`);
                });
            });
        });
    };

    const fetchJobResult = async (jobId) => {
        try {
          const resultResponse = await axios({
            method: 'GET',
            url: `https://api.edenai.run/v2/video/logo_detection_async/${jobId}`,
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzE2MDVhOWMtMzEwNS00NmNhLTg0NDYtMTZiOWY3YTllZmRiIiwidHlwZSI6ImFwaV90b2tlbiJ9.0NM6mpSSsmfU4GV8zbiMxpUVPDF5zuESd-hK21xfnjE',
            },
          });
    
          console.log(resultResponse.data);
          alert('Logo detection result: Check the console for details.');
        } catch (error) {
          console.error(error);
          alert('An error occurred while fetching logo detection results.');
        }
    };

    const handleSubmitLogo = async (event) => {
        event.preventDefault();
    
        if (!file) {
          alert('Please select a file first.');
          return;
        }
    
        const form = new FormData();
        form.append('providers', 'google');
        form.append('file', file);
    
        try {
          const response = await axios({
            method: 'POST',
            url: 'https://api.edenai.run/v2/video/logo_detection_async',
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzE2MDVhOWMtMzEwNS00NmNhLTg0NDYtMTZiOWY3YTllZmRiIiwidHlwZSI6ImFwaV90b2tlbiJ9.0NM6mpSSsmfU4GV8zbiMxpUVPDF5zuESd-hK21xfnjE', // Make sure to replace YOUR_ACTUAL_API_KEY with your actual API key
              'Content-Type': 'multipart/form-data',
            },
            data: form,
          });
    
          console.log(response.data);
          if (response.data && response.data.public_id) {
            fetchJobResult(response.data.public_id);
          } else {
            console.error('Job ID not found in response:', response.data);
          }
          alert('Logo detection initiated successfully. Check the console for details.');
        } catch (error) {
          console.log(error);
          alert('An error occurred while detecting logos.');
        }
    };

    // Update the file in state when a file is selected
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className='w-full flex justify-center items-center'>
            <form className='flex flex-col gap-4' onSubmit={handleSubmitLogo}>
                <input className='file-input w-full max-w-xs' type="file" accept="video/*" onChange={handleFileChange} />
                <button type="submit" className='btn'>Upload Video</button>
                <button className='btn' onClick={() =>fetchJobResult("8978d46c-5b8b-45c3-928d-c8ad6a6e781d")}>Get Results</button>
            </form>
        </div>
    );
}
