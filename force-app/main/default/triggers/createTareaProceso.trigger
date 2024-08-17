trigger createTareaProceso on Project__c (after update) {
    List<Task> tareaProceso = new List<Task>();
    for(Project__c record : Trigger.new) {
            Project__c oldRecord = Trigger.oldMap.get(record.Id);
            // se revisa si el Estado se cambia a En Proceso.
            if (record.Estado__c == 'En Proceso' && (oldRecord == null || oldRecord.Estado__c != 'En Proceso')) {
                // crear tarea
                Task newTask = new Task();
                newTask.WhatId = record.Id;
                newTask.Subject = 'Llamar al Cliente';
                newTask.ActivityDate = Date.today()+1;
                newTask.Status = 'Not Started';
                tareaProceso.add(newTask);
            }
        
        if (!tareaProceso.isEmpty()) {
            insert tareaProceso;
        }
    }
}    