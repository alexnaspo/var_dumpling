var connect = require('connect');
connect.createServer(
    connect.static("/Users/Alex/Sites/var_dumpling/")
).listen(8080);