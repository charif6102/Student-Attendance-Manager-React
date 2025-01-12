
import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
subjectName : String,
examDate : String,
coef : Number,
grade : Number,
});

const absenceSchema = new mongoose.Schema({
    subjectName : String,
    absTime : String,
    raison : String,
    raisonOK : Number,
    });

const StudentSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    stdClassName: String,
    grades : [gradeSchema],
    absences : [absenceSchema]
    });



const Student =  mongoose.models["Student"] ?? mongoose.model('Student', StudentSchema);

export default Student;