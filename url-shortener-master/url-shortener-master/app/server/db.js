import mongoose from './models/mongoose';

const DB_URI = 'mongodb://mongo/url-shortener';

export default function(config, callback) {
    console.log(`Creating DB: ${DB_URI}`);
    mongoose.connect(DB_URI);

    const connection = mongoose.connection;

    connection.on('disconnected', () => {
        console.log('Conn disconnected');
    });

    connection.on('error', err => {
        throw err;
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

    connection.on('connected', () => {
        console.log(`Conn open to ${DB_URI}`);
        callback();
    });
};
