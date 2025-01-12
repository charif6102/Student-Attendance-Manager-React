// pages/api/login.js
import User from '@/models/user';
import connectDB from '../../../db';
import { setCookie } from '@/tools/util';




connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      
      console.log('req.body='+JSON.stringify(req.body));
      const user = await User.findOne({ username, password });
      console.log('user='+JSON.stringify(user));

      if (!user) {
        console.log('user='+JSON.stringify(user));
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      
      res.status(200).json({ message: 'Authentication successful', user });
     
    } catch (error) {
      console.error('Error during authentication:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
