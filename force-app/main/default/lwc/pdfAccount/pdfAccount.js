import { LightningElement, api, track } from 'lwc';
import generatePDF from '@salesforce/apex/AccountPDFGenerator.generatePDF';

export default class AccountPdfGenerator extends LightningElement {
    @api recordId;
    @track pdfLink;
    @track isModalOpen = false;

    handleGeneratePDF() {
        generatePDF({ accountId: this.recordId })
            .then((contentDocumentId) => {
                this.pdfLink = `/sfc/servlet.shepherd/document/download/${contentDocumentId}`;
            })
            .catch((error) => {
                console.error('Error generating PDF', error);
            });
    }

    handleViewPDF() {
        this.isModalOpen = true;
    }

    handleCloseModal() {
        this.isModalOpen = false;
    }
}
