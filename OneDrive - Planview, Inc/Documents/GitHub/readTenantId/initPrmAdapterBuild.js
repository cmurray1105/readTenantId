const fs = require('fs');
const ini = require('ini');
const jenkins = require('jenkins')
var axios = require('axios');
const FormData = require('form-data');
var data = new FormData();
let sql = require('mssql')


const initPrmAdapterBuild = (server, db, internalId) => {
    let prefix = server.split('').slice(0,5).join("")
    let customer = server.split('').slice(5, 8).join("")
    let srvNo = server.split('').slice(11,14).join("")
    let sqlServer = prefix + customer + 'sql'+ srvNo

    const sqlConfig = { 
        server: `${sqlServer}`,
        database: `${db}`,
        user: 'a-cwmurray',
        password: 'Lo9-yYFoDyG>',
        port: 1433
    }
    var dbConn = new sql.Connection(sqlConfig);
    dbConn.connect().then(()=>{
        let request = new sqlConfig.Request(dbConn);
        request.query('select * from ip.ip_user')
        .then((recordSet)=>{
            console.log(recordSet)
            dbConn.close()
        })
        .catch((err)=>{
            console.log("error:", err)
        })
    })

    // try {
    //     // `\\${server}\\F:\\Planview\\WebApp\\Objects\\PRM_Adapter_Config.ini`, "utf-8"
    //     let jenkinsUser = 'a-cwmurray@planview.world';
    //     let jenkinsPass = 'Lo9-yYFoDyG>'

    //     // if (server.split('').slice(0,2).join("") === 'fr' || server.split('').slice(0,2).join("") === 'au') {
    //     //     jenkinsUser = 'aws-cwmurray'
    //     //     jenkinsPass = '@ChangeMe123!'
    //     // } else if{ server.split('').slice(0,2).join("") === 'sg' {
    //     //     jenkinsUser = 'a-cwmurray@planview.world'
    //     //     jenkinsPass = 'Lo9-yYFoDyG>'
    //     // } else {
    //     //     jenkinsPrefix =  
    //     //     jenkinsUser = 'a-cwmurray@planview.world'
    //     //     jenkinsPass = 'Lo9-yYFoDyG>'
    //     // }
    //     let awsAPIToken = '11db8b3538208a7c1b0634a8d73c476a9b'
    //     let usAPIToken = '115b31221f2817a0e3b1fdd89527ea07e5'

    //     let data = ini.parse(fs.readFileSync(`C:\\Users\\ChristopherMurray\\Documents\\PRM_Adapter_Config.ini`, "utf-8"))
    //     let envId = data[`${db}`].hub_environment_id;
    //     let tenantId = data[`${db}`].hub_system_tenant_id;
    //     console.log('environment id:', envId)
    //     console.log('tenant id: ', tenantId)

    //     // notice the URL has build not buildWithParameters if the job has file parameters. ^
    //     let userName = `${jenkinsUser}`;
    //     let password = `${jenkinsPass}`
    //     console.log("customer", customer, " server ", server)
    //     let params = {
    //         "parameter": [
    //             // list all input parameters for Jenkins build
    //             { "name": "TARGET_SERVER_FQDN", "value": `${server}` },
    //             { "name": "DSN", "value": `${db}` },
    //             { "name": "CUSTOMER_CODE", "value": `${customer}` },
    //             { "name": "INTHUB_NONPRM_PRODUCT_CODE", "value": `pp` },
    //             { "name": "INTHUB_NONPRM_PRODUCT_ENV_ID", "value": `projectplace-site-se-sb` },
    //             { "name": "INTHUB_NONPRM_PRODUCT_TENANT_ID", "value": `${internalId}` },
    //             { "name": "INTHUB_ENV_ID", "value": `${envId}` },
    //             { "name": "INTHUB_TENANT_ID", "value": `${tenantId}` },
    //             { "name": "INTHUB", "value": `prod.pvintegrations.net` }
    //         ]
    //     }
        
    //     let jenkinsUrl = `https://jenkins.us.planview.world/job/deploy_prm_adapter/buildWithParameters?token=${usAPIToken}&parameter=${JSON.stringify(params)}`;
    //     // data.append('json', JSON.stringify(params));
        
    //     console.log("PARAM AND STUFF", JSON.stringify(params))

    //     axios.post(jenkinsUrl)
    //         .then(function (response) {
    //             console.log(JSON.stringify(response.data));

    //         })
    //         .catch((err)=>{
    //             console.log(err)
    //         })
    // }

    // catch (e) {
    //     console.log(e)
    // }
}
initPrmAdapterBuild('sgpvmhstpve17', 'HSTPROD', '123456789')