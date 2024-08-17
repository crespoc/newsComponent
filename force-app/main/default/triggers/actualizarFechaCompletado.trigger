trigger actualizarFechaCompletado on Project__c (before update) {
    for (Project__c record : Trigger.new) {
        Project__c oldRecord = Trigger.oldMap.get(record.Id);
        //se revisa si el estado es cambiado a completado
        if (record.Estado__c == 'completado' && oldRecord.Estado__c != 'Completado') {
            // se actualiza la fecha en que se hizo el cambio a completado.
            record.fechaFinalizacion__c = Datetime.now();
        }

    }
}







