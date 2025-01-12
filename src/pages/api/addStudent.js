


import connectDB from '../../../db';
import Student from '@/models/student';



connectDB();
export default async function handler(req, res) {
 
  if (req.method === 'POST') {    
    try {   

        const newData = new Student(req.body);
        await newData.save();
        res.status(201).json(newData);
    } catch (error) {
      console.error('Error creating student:', error);
      res.status(500).json({ message: 'Server error' });
    }

  }


}