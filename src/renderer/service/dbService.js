import db from '../datastore';
var log = require('electron-log');


export default {
    async  removeItemsAsync(dbName, predicateObj ){
        predicateObj = predicateObj||{};
        return new Promise(function(resolve,reject){
            if(! db[dbName]){
                reject(new Error("There is no such dbName" + dbName));
            }            
            else{
                db[dbName].remove(predicateObj, { multi: true }, function (err, numRemoved) {
                        if(err){
                            reject(err);
                        }else{
                            resolve(numRemoved);
                        }
                            
                });
            }
           
        });
    },

    async  insertItemsAsync(dbName, items ){
        
        return new Promise(function(resolve,reject){
            if(! db[dbName]){
                reject(new Error("There is no such dbName" + dbName));
            }              
            else{
                db[dbName].insert(items, function (err) {
                    if(err){
                        reject(err);
                    }else{
                        resolve(items);
                    }
                    
                });
            }
           
        });
    }

}