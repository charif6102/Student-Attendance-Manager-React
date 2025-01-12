// pages/api/addGrades.js

import Student from "@/models/student";
import connectDB from "../../../db";

 // Supposons que vous avez un modèle Student

connectDB; // Connexion à MongoDB

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { studentId } = req.query; // Utilisez studentId à la place de id
      const { subjectName, examDate, coef, grade } = req.body;

      // Créer un nouvel objet Grade
      const newGrade = { subjectName, examDate, coef, grade };

      // Trouver l'étudiant par _id et mettre à jour leurs notes
      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        { $push: { grades: newGrade } },
        { new: true }
      );

      if (!updatedStudent) {
        return res.status(404).json({ message: 'Étudiant non trouvé' });
      }

      res.status(200).json({ message: 'Note ajoutée avec succès', student: updatedStudent });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la note :', error);
      res.status(500).json({ message: 'Erreur du serveur' });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
