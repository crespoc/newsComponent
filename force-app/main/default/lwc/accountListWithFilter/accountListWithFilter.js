import { LightningElement, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class AccountListWithFilter extends LightningElement {
    accounts;
    selectedIndustry = '';
    error;

    columns = [
        { label: 'Nombre de la cuenta', fieldName: 'Name', type: 'text' },
        { label: 'Industria', fieldName: 'Industry', type: 'text' },
        { label: 'Tipo', fieldName: 'Type', type: 'text' },
        { label: 'Teléfono', fieldName: 'Phone', type: 'phone' },
        { label: 'Sitio web', fieldName: 'Website', type: 'url' }
    ];

    @wire(getListUi, {
        objectApiName: ACCOUNT_OBJECT,
        listViewApiName: 'AllAccounts'
    })
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data.records.records;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.accounts = undefined;
        }
    }

    get industryOptions() {
        let options = [];
        // Obtener todas las industrias únicas de las cuentas
        if (this.accounts) {
            let industries = new Set();
            this.accounts.forEach(account => {
                industries.add(account.fields.Industry.value);
            });
            industries.forEach(industry => {
                options.push({ label: industry, value: industry });
            });
        }
        return options;
    }

    get filteredAccounts() {
        // Filtrar cuentas basadas en la industria seleccionada
        if (this.selectedIndustry === '') {
            return this.accounts;
        } else {
            return this.accounts.filter(account => account.fields.Industry.value === this.selectedIndustry);
        }
    }

    handleIndustryChange(event) {
        this.selectedIndustry = event.detail.value;
    }
}
