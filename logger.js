const fs = require("fs");

class Logger {
    path = "./serverLog.txt";

     print = async (req, res, next) => {
        await new Promise((resolve, reject) => {
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            const dateString = new Date().toLocaleString();
            const data = dateString + ", " + "from " + ip + "\r\n";
            fs.appendFile(this.path, data, (err) => {
                if (err) next(new Error(err));
                next();
            })
        })
    }
}

module.exports = Logger;