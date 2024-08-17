import { LightningElement, wire, track } from 'lwc';
import getProjects from '@salesforce/apex/ProjectController.getProjects';

const columns = [
    { label: 'Nombre', fieldName: 'Name' },
    { label: 'Fecha de Inicio', fieldName: 'fechaInicio__c' },
    { label: 'Fecha de Finalización Estimada', fieldName: 'fechaFinalizacionEstimada__c' },
    { label: 'Estado', fieldName: 'Estado__c' }
];

export default class ListaProyectosXEstado extends LightningElement {
    @track estados;
    columns = columns;
    selectedEstado = '';

    
    estadoOptions = [
        { label: 'Todos los Estados', value: '' },
        { label: 'Planeado', value: 'Planeado' },
        { label: 'En Proceso', value: 'En Proceso' },
        { label: 'Completado', value: 'Completado' },
        
    ];

    @wire(getProjects, { estado: '$selectedEstado' })
    wiredEstados({ error, data }) {
        if (data) {
            this.estados = data;
        } else if (error) {
            this.estados = undefined;
            console.error('Error al mostrar Estados:', error);
        }
    }

    handleEstadoChange(event) {
        this.selectedEstado = event.detail.value;
    }
}