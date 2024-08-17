trigger noPermiteFechaAnterior on Project__c (before insert, before update) {
    for(Project__c record : Trigger.new){
        if(record.fechaFinalizacionEstimada__c < record.fechaInicio__c) {
            record.fechaFinalizacionEstimada__c.addError('Debe ingresar una fecha posterior a la Fecha de Inicio');
        }
    }
}

