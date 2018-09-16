import api from '../api';
import db from '../datastore';

export default {

    setSyncTask(){
        var intervalID = setInterval(this.loadAll,30000);
    },
    removeAll(){
        db.tasks.remove({}, { multi: true }, function (err, numRemoved) {
        });
    },
    
    
}