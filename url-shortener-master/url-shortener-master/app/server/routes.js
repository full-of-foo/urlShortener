import Boom from 'boom';
import Joi from 'joi';
import Entry from './models/entry';
import mongoose from './models/mongoose';
import createHash from './createHash';

const ValidationError = mongoose.Error.ValidationError;

export default [
    {
        method: 'GET',
        path: '/entry/',
        handler(req, reply) {
            Entry.find({}).sort('-createdAt').exec()
                .then(entries => reply({data: entries}))
                .error(err => reply(Boom.badImplementation(err)));
        }
    }, {
        method: 'POST',
        path: '/entry/',
        config: {
            validate: {
                payload: {
                    url: Joi.string()
                            .regex(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)
                            .required()
                }
            },
            handler(req, reply) {
                const hash = createHash(8);
                const data = Object.assign(req.payload, {shortenerHash: hash});

                Entry.create(data)
                    .then(entry => reply(entry).created(`/entry/${entry._id}`))
                    .catch(ValidationError, err => reply(Boom.badData(err)))
                    .error(err => reply(Boom.badImplementation(err)));
            }
        }
    }, {
        method: 'GET',
        path: '/entry/{hash}',
        handler(req, reply) {
            Entry.findOne({shortenerHash: req.params.hash}).exec()
                .then(entry => {
                    if(!entry) reply(Boom.notFound());
                    reply(entry);
                })
                .error(err => reply(Boom.badImplementation(err)));
        }
    }
];
