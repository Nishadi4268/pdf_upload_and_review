import { Document, Page } from 'react-pdf';

function PdfComp({ pdfFile }) {
  return (
    <div>
      {pdfFile ? (
        <Document file={pdfFile}>
          <Page pageNumber={1} />
        </Document>
      ) : (
        <p>No PDF file selected</p>
      )}
    </div>
  );
}

export default PdfComp;
