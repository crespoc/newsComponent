import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Industry', fieldName: 'Industry' },
    { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency' }
];

export default class AccountDatatable extends LightningElement {
    @track accounts;
    columns = columns;
    selectedIndustry = '';

    // Example industry options, ideally these should be dynamic
    industryOptions = [
        { label: 'All Industries', value: '' },
        { label: 'Agriculture', value: 'Agriculture' },
        { label: 'Apparel', value: 'Apparel' },
        { label: 'Banking', value: 'Banking' },
        // Add more options as needed
    ];

    @wire(getAccounts, { industry: '$selectedIndustry' })
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
        } else if (error) {
            this.accounts = undefined;
            console.error('Error fetching accounts:', error);
        }
    }

    handleIndustryChange(event) {
        this.selectedIndustry = event.detail.value;
    }
}
