import mongoose from 'mongoose';

const ProfSchema = new mongoose.Schema({
firstName : String,
lastName : String,
subjectName : String,
stdClassesName : [String]
});

const Profs =  mongoose.models["Profs"] ?? mongoose.model('Profs', ProfSchema);

export default Profs;