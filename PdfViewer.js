import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import axios from 'axios';

const PdfViewer = () => {
  const { id } = useParams();
  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/pdfs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPdf(response.data);
    };
    fetchPdf();
  }, [id]);

  if (!pdf) return <div>Loading...</div>;

  return (
    <div>
      <Document file={`/${pdf.path}`}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default PdfViewer;
