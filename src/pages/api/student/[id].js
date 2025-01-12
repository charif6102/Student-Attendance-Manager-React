import Student from "@/models/student";
import connectDB from "../../../../db";




connectDB();
export default async function handler(req, res) {

  if (req.method === 'GET') {
    try {
        const { id } = req.query;
        const student = await Student.findOne({ _id: id });
        res.status(200).json(student);
      } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ message: 'Server error' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }

  if (req.method === 'PUT') {
    try {
        const { id } = req.query;
        const updatedData = await Student.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedData);
      } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ message: 'Server error' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }

     
    if (req.method === 'DELETE') {
        try {
          const { id } = req.query;
          await Student.findByIdAndDelete(id);
          res.status(200).json({ message: 'Data deleted successfully' });
        } catch (error) {
          console.error('Error deleting data:', error);
          res.status(500).json({ message: 'Server error' });
        }
      } else {
        res.status(405).json({ message: 'Method not allowed' });
      }


}