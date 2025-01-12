// pages/api/getGrades.js
import Student from "@/models/student";
import connectDB from "../../../db";


connectDB(); // Connect to MongoDB

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { _id } = req.query;

      // Find the student by _id and select the grades field
      const student = await Student.findById(_id).select('grades');

      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      res.status(200).json({ grades: student.grades });
    } catch (error) {
      console.error('Error fetching grades:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
