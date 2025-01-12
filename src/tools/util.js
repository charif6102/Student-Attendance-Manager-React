import Document from "next/document";

export function calculateWeightedSum(student) {
  const totalNotesPonderees=student.grades.reduce((total, { grade, coef }) => total + (grade * coef), 0);
  console.log("total="+totalNotesPonderees);
  const totalCoefficients =student.grades.reduce((total, {coef} ) => total + coef, 0);
  console.log("total1="+totalCoefficients);
  if (totalCoefficients > 0){
  return (totalNotesPonderees / totalCoefficients ).toFixed(2);
}else{
  return 0
}
  ;
  }
  
  // Fonction pour calculer la somme des notes d'un étudiant
  export function calculateTotalAbsences(student) {
    return student.absences.length;
  }

  export const getCookie = (name) => {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return '';
  };

  export const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };
  

  export default calculateWeightedSum;
  