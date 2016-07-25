module.exports = function(context) {
    var query = context.data.root.query;
    console.log(query);
    return query.name + query.suffix;
};