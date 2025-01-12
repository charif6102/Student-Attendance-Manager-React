// pages/api/deleteGrade.js

import Student from "@/models/student";
import connectDB from "../../../db";

connectDB(); // Connect to MongoDB

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
      try {
        const { _id, gradeId } = req.query; // Utiliser _id au lieu de studentId
  
        // Trouver l'étudiant par _id et supprimer la note de l'array des notes
        const updatedStudent = await Student.findByIdAndUpdate(
          _id,
          { $pull: { grades: { _id: gradeId } } },
          { new: true }
        );
  
        if (!updatedStudent) {
          return res.status(404).json({ message: 'Student not found' });
        }
  
        res.status(200).json({ message: 'Grade deleted successfully', student: updatedStudent });
      } catch (error) {
        console.error('Error deleting grade:', error);
        res.status(500).json({ message: 'Server error' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
