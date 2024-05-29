import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './PdfViewer.module.css'
import { ChevronLeft } from '@mui/icons-material';

function PdfViewer() {
  const filename = useParams();
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
        <button onClick={() => { navigate(`/petrecords/${url.id}/reports`) }} className={styles.backBtn}><ChevronLeft/>Back</button>
      </div>
      {pdfData ? (
        <iframe
          title="PDF Viewer"
          src={pdfData}
          style={{ width: '100%', height: '100%' }}
        ></iframe>
      ) : (<div className={styles.error}>Oops No Report Found ! ! !</div>)}
    </div>
  );
}

export default PdfViewer;
