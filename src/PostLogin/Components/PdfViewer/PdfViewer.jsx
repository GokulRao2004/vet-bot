import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './PdfViewer.module.css'

function PdfViewer() {
    const  filename  = useParams();
    const [pdfData, setPdfData] = useState(null);
    const navigate = useNavigate();
    const url = useParams();
    console.log('url: ', url.id);


    useEffect(() => {
        const fetchPdf = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/pdf?filename=${filename.fileName}.pdf`, {
              responseType: 'arraybuffer' // Set the responseType to 'arraybuffer' to receive binary data
            });
            // Create a Blob from the binary PDF data
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            // Create a URL for the Blob object
            const pdfUrl = URL.createObjectURL(pdfBlob);
            setPdfData(pdfUrl);
          } catch (error) {
            console.error('Error fetching PDF:', error);
          }
        };
        fetchPdf();
      }, [filename]);

    return (
        <div className={styles.container}>
          <div>
            <button onClick={() => {navigate(`/petrecords/${url.id}/reports`)}}>Back</button>
          </div>
            {pdfData && (
        <iframe
          title="PDF Viewer"
          src={pdfData}
          style={{ width: '100%', height: '100%' }}
        ></iframe>
      )}
        </div>
    );
}

export default PdfViewer;
