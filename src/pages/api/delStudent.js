

import Student from "@/models/student";
import connectDB from "../../../db";


connectDB(); // Connect to MongoDB

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const { studentId } = req.query;

      // Delete the student by ID
      const deletedStudent = await Student.findByIdAndDelete(studentId);

      if (!deletedStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }

      res.status(200).json({ message: 'Student deleted successfully', student: deletedStudent });
    } catch (error) {
      console.error('Error deleting student:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
