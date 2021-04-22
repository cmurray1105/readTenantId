const fs = require ('fs');
const ini = require('ini');
// const jenkins = require('jenkins')

const readTenantId = (server, db, internalId)=>{
try{
    // `\\${server}\\F:\\Planview\\WebApp\\Objects\\PRM_Adapter_Config.ini`, "utf-8"
let data =  ini.parse(fs.readFileSync(`C:\\Users\\ChristopherMurray\\Documents\\PRM_Adapter_Config.ini`, "utf-8"))
let envId = data[`${db}`].hub_environment_id;
let tenantId = data[`${db}`].hub_system_tenant_id;
console.log("environment id:", envId)
console.log("tenant id: ", tenantId)
}
catch(e) {
    console.log(e)
}
}
readTenantId(null, 'REGSANDBOX1', null)