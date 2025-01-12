

import Profs from '@/models/profs';
import connectDB from '../../../db';



connectDB();
export default async function handler(req, res) {
  const { firstName } = req.query;
  if (req.method === 'GET') {
    // Get all users
    const profs = await Profs.findOne({ firstName });
    res.status(200).json(profs);
  }

  if (req.method === 'POST') {    
    try {   

        const newData = new Profs(req.body);
        await newData.save();
        res.status(201).json(newData);
    } catch (error) {
      console.error('Error creating data:', error);
      res.status(500).json({ message: 'Server error' });
    }

  }


}