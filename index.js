const purchase_tests = require("./includes/purchase_tests");

module.exports = (params) => {
    params = {
        date_start: "20210115",
        date_end: "20210131",
        ga4:{
            project: "bigquery-public-data",
            dataset:"ga4_obfuscated_sample_ecommerce",
            table:"events_*"
        },
        ...params
    }

    const config = {
        schema: "ga4_testing_stuff"
    }
    const ga4_source_data = 
        declare({
            database: params.ga4.project,
            schema: params.ga4.dataset,
            name: params.ga4.table
        });
    let results = {
        ga4_source_data: ga4_source_data,
        purchase_tests: purchase_tests(params.date_start,params.date_end,params.ga4,config)
    }
    return results
}