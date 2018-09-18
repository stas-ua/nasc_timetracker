import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

var db = {};
db.common =  new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/common.db')
});
db.keyTargets =  new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/keyTargets.db')
});
db.activities =  new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/activities.db')
});
db.tasks =  new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/tasks.db')
  });
  db.projects =  new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/projects.db')
  });
  db.groupTasks =  new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/groupTasks.db')
  });
  db.requirements =  new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/requirements.db')
  });
  db.workOrders =  new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/workOrders.db')
  });
  db.supportTickets =  new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/supportTickets.db')
  });
  db.taskActions =  new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/taskActions.db')
  });
  db.hypotesis =  new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/hypotesis.db')
  });
  db.processes =  new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/processes.db')
  });
  db.deliverables =  new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/deliverables.db')
  });
  db.problems =  new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/problems.db')
  });

  export default db;