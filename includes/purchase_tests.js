module.exports = (date_start,date_end,ga4,config) => {
    const all_purchases = publish("all_purchases",config).query(ctx =>`
        select 
            event_date
            ,user_pseudo_id
            ,(select value.int_value from unnest(event_params) where key = "ga_session_id") as ga_session_id
            ,ecommerce
            ,items
        from
            ${ctx.ref(ga4.table)}
        where
            _table_suffix between "${date_start}" and "${date_end}"
            and event_name = "purchase"       
    `);
    const bad_purchases = assert("bad_purchases",config).query(ctx => 
        `SELECT 
            ecommerce.transaction_id as transaction_id
            ,count(*) as transaction_ids
        FROM 
            ${ctx.ref("all_purchases")}
        group by
            1
        having transaction_ids > 1

    `);

    return {all_purchases,bad_purchases}
}