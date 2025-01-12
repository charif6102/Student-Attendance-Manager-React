

import connectDB from '../../../db';
import Student from '@/models/student';


connectDB();
export default async function handler(req, res) {
  const { stdClassName } = req.query;
  if (req.method === 'GET') {
    // Get all users
    const students = await Student.find({stdClassName});
    res.status(200).json(students);
  }

  /*
  if (req.method === 'POST') {    
    try {   

        const newData = new Student(req.body);
        await newData.save();
        res.status(201).json(newData);
    } catch (error) {
      console.error('Error creating data:', error);
      res.status(500).json({ message: 'Server error' });
    }

  }  */


}