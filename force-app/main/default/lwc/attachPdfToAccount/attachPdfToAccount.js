import { LightningElement, api } from 'lwc';
import generateAndAttachPdf from '@salesforce/apex/PdfController.generateAndAttachPdf';

export default class AttachPdfToAccount extends LightningElement {
    @api recordId; // This will hold the Case Id

    generatePdf() {
        generateAndAttachPdf({ caseId: this.recordId })
            .then(result => {
                // Handle success, e.g., show a toast message
                console.log('PDF generado y adjunto con éxito.');
            })
            .catch(error => {
                // Handle error
                console.error('Error al generar y adjuntar el PDF:', error);
            });
    }
}
