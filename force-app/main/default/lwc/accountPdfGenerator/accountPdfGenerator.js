import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import jsPDF from '@salesforce/resourceUrl/jsPDF';
import { loadScript } from 'lightning/platformResourceLoader';

const FIELDS = [
    'Account.Name',
    'Account.Phone',
    'Account.Industry'
];

export default class AccountPdfGenerator extends LightningElement {
    @api recordId;
    account;
    isModalOpen = false;
    pdfDataUrl = '';

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    accountRecord({ error, data }) {
        if (data) {
            this.account = data;
            console.log('Account data loaded:', this.account);
        } else if (error) {
            console.error('Error loading account data:', error);
        }
    }

    renderedCallback() {
        Promise.all([
            loadScript(this, jsPDF)
        ])
        .then(() => {
            console.log('jsPDF loaded successfully');
        })
        .catch(error => {
            console.error('Error loading jsPDF:', error);
        });
    }

    handleGeneratePdf() {
        const { Name, Phone, Industry } = this.account.fields;

        const doc = new jsPDF();
        doc.text(`Name: ${Name.value}`, 10, 10);
        doc.text(`Phone: ${Phone.value}`, 10, 20);
        doc.text(`Industry: ${Industry.value}`, 10, 30);

        this.pdfDataUrl = doc.output('datauristring');
        this.isModalOpen = true;
    }

    handleCloseModal() {
        this.isModalOpen = false;
    }
}
