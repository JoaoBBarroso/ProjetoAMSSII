// var path = process.env.NODE_ENV === 'production' ? 'http://www.insticc.org/primoris' : 'http://www.insticc.org/primorisdev3';

//Path de produção muda?
var path = process.env.NODE_ENV === 'production' ? 'http://www.insticc.org/node/Statistics' : 'http://www.insticc.org/node/Statistics';

module.exports = path;