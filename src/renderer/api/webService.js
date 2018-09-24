import soap from 'soap';


  //var soap = require('soap');
  var url = 'http://pm.nasctech.com/api/v1/custom_objects/timetracker.wsdl';
  

  export async function getToken(login, password){
    //   return new Promise(resolve, reject){

    //   }

    //, password: '214365870912'
    var args = {login: login};
    return new Promise(function(resolve, reject){
        soap.createClientAsync(url,{disableCache:true}).then((client) => {
            // console.log(client.describe());
             var options = {
                hasNonce: true,
                actor: 'actor'
              };
              var wsSecurity = new soap.WSSecurity(login, password, options)
              client.setSecurity(wsSecurity);
              client//.service.api_v1_custom_objects_soap_port_timetracker
              .get_user_token_new(args,function(err, result) {
                        //console.log(err);
                        //console.log(result);
                        if(err){
                            if(err.message=='Server: Unauthorized'){
                                reject(new Error('Incorrect login or password'));
                            }else{
                                reject(err);
                            }
                            
                        }else if (!result.success.$value){
                            reject(new Error(result.errorMsg.$value));
                        }else{
                            resolve({
                                token:result.token.$value,
                                systemUserId:result.systemUserId.$value,
                                customUserId:result.customUserId.$value,
                            });
                        }                            

            });
          });

    });
    
  }
//   soap.createClientAsync(url).then((client) => {
//     return client.MyFunctionAsync(args);
//   }).then((result) => {
//     console.log(result);
//   });