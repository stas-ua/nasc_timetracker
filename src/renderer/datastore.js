import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

var db = {};
const autocompactionInterval = 30 * 60 * 1000; //30 min

db.users =  new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/users.db')
});
db.users.persistence.setAutocompactionInterval(autocompactionInterval);

db.sprintItems =  new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/sprintItems.db')
});
db.sprintItems.persistence.setAutocompactionInterval(autocompactionInterval);

db.activitiesDeleted =  new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/activitiesDeleted.db')
});
db.activitiesDeleted.persistence.setAutocompactionInterval(autocompactionInterval);

db.common =  new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/common.db')
});
db.common.persistence.setAutocompactionInterval(autocompactionInterval);

db.keyTargets =  new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/keyTargets.db')
});
db.keyTargets.persistence.setAutocompactionInterval(autocompactionInterval);

db.activities =  new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/activities.db')
});
db.activities.persistence.setAutocompactionInterval(autocompactionInterval);

db.tasks =  new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/tasks.db')
  });
  db.tasks.persistence.setAutocompactionInterval(autocompactionInterval);

  db.projects =  new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/projects.db')
  });
  db.projects.persistence.setAutocompactionInterval(autocompactionInterval);

  db.groupTasks =  new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/groupTasks.db')
  });
  db.groupTasks.persistence.setAutocompactionInterval(autocompactionInterval);

  db.requirements =  new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/requirements.db')
  });
  db.requirements.persistence.setAutocompactionInterval(autocompactionInterval);

  db.workOrders =  new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/workOrders.db')
  });
  db.workOrders.persistence.setAutocompactionInterval(autocompactionInterval);

  db.supportTickets =  new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/supportTickets.db')
  });
  db.supportTickets.persistence.setAutocompactionInterval(autocompactionInterval);

  db.taskActions =  new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/taskActions.db')
  });
  db.taskActions.persistence.setAutocompactionInterval(autocompactionInterval);

  db.hypotesis =  new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/hypotesis.db')
  });
  db.hypotesis.persistence.setAutocompactionInterval(autocompactionInterval);

  db.processes =  new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/processes.db')
  });
  db.processes.persistence.setAutocompactionInterval(autocompactionInterval);

  db.deliverables =  new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/deliverables.db')
  });
  db.deliverables.persistence.setAutocompactionInterval(autocompactionInterval);

  db.problems =  new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/problems.db')
  });
  db.problems.persistence.setAutocompactionInterval(autocompactionInterval);


  export default db;