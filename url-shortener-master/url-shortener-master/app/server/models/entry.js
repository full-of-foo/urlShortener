import mongoose from './mongoose';
import {schemaOpts, addHelperFns} from './base';

const EntrySchema = new mongoose.Schema({
    url: {type: String, required: true},
    shortenerHash: {type: String},
}, schemaOpts);

EntrySchema.set('toJSON', {getters: true, virtual: true});
addHelperFns(EntrySchema);

export default mongoose.model('Entry', EntrySchema);
