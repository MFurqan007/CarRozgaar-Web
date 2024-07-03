import React, {useState, useEffect} from 'react'
import { db } from '../../lib/firebase_config';
import { doc, getDoc } from 'firebase/firestore';
import axios from 'axios';

export default function VideoCheck() {
  const [downloadURL, setDownloadURL] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // UID of the video document to fetch
  const uid = 'VyD1mG3YS4ZRsJr8iE9mAAdtyUc2';

  useEffect(() => {
      const fetchVideoURL = async () => {
          setIsLoading(true);
          const docRef = doc(db, "videos", uid);
          try {
              const docSnap = await getDoc(docRef);

              if (docSnap.exists()) {
                  // Document found, set the download URL
                  setDownloadURL(docSnap.data().downloadURL);
              } else {
                  // No such document!
                  setError('No such document!');
              }
          } catch (error) {
              setError('Error fetching document: ', error);
          } finally {
              setIsLoading(false);
          }
      };

      fetchVideoURL();
  }, [uid]); // UID as dependency, if it changes, re-run useEffect

  if (isLoading) {
      return <div>Loading...</div>;
  }

  if (error) {
      return <div>Error: {error}</div>;
  }

    // Function to call Eden AI logo detection API
    // const handleLogoDetection = (downloadURL) => {
    //   const options = {
    //     method: 'POST',
    //     url: 'https://api.edenai.run/v2/video/logo_detection_async',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //       // You should replace 'YOUR_API_KEY' with your actual Eden AI API key
    //       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzE2MDVhOWMtMzEwNS00NmNhLTg0NDYtMTZiOWY3YTllZmRiIiwidHlwZSI6ImFwaV90b2tlbiJ9.0NM6mpSSsmfU4GV8zbiMxpUVPDF5zuESd-hK21xfnjE'
    //     },
    //     data: {
    //       show_original_response: false,
    //       providers: ['twelvelabs', 'google'],
    //       file_url: downloadURL // Use the dynamically obtained download URL
    //     }
    //   };
  
    //   axios.request(options)
    //     .then(response => {
    //       alert(response.data);
    //       console.log(response.data);
    //       // Handle the response data as needed
    //     })
    //     .catch(error => {
    //       alert(error)
    //       console.error(error);
    //     });
    // }

    const logoDetectionAPI = async (file_url) => {
      console.log(file_url)
      const url = "https://api.edenai.run/v2/video/logo_detection_async";
      const headers = {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzE2MDVhOWMtMzEwNS00NmNhLTg0NDYtMTZiOWY3YTllZmRiIiwidHlwZSI6ImFwaV90b2tlbiJ9.0NM6mpSSsmfU4GV8zbiMxpUVPDF5zuESd-hK21xfnjE" // Replace YOUR_API_KEY with your actual API key
      };
      const jsonPayload = {
          "providers": ["google"], // Ensure providers is an array
          "file_url": file_url
      };

      try {
          const response = await fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  ...headers
              },
              body: JSON.stringify(jsonPayload)
          });

          if (!response.ok) throw new Error('Network response was not ok.');

          const result = await response.json();
          alert(result)
      } catch (error) {
          // setError(error.message);
          alert("There was an error with the logo detection API:", error);
      }
    };

  return (
    <div>
      {downloadURL ? (
          <div>
              <p>Download URL:</p>
              <a href={downloadURL} target="_blank" rel="noopener noreferrer">{downloadURL}</a>
          </div>
      ) : (
          <p>No URL found.</p>
      )}
      <button
        className='btn'
         onClick={() => logoDetectionAPI(downloadURL)}>
        Detect Logos
      </button>
    </div>
  )
}
