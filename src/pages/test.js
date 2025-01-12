
import { useEffect } from "react";



const Page = () => {

    const  getStudents = async  () => {
        fetch(`/api/student`)
        .then(res => res.json())
        .then(res => {console.log(JSON.stringify(res));
            
        })
        .catch((error) => console.error('Error fetching data:', error));
    }

    const creatStudent = async (data) => {
        try {

            data={
                firstName : 'Charif',
                lastName : 'Abdou',
                stdClassName: 'Informatique 100',
            }
          const response = await fetch(`/api/student`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data),
          });
    
          if (response.ok) {
            // Handle success, e.g., show a success message or redirect
            console.log("Record added successfully");
            console.log("new student="+ JSON.stringify(response));
          } else {
            // Handle error, e.g., show an error message
            console.error("Error adding record");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      const setStudentGrade = async (data) => {
        try {
            const id = '6611c3c7347be427dcd6d0ee',
            data={
                
                grades :[{
                    subjectName : 'Math',
                    examDate : '20112023',
                    coef : 1,
                    grade : 20,
                }]
            }
          const response = await fetch(`/api/student/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data),
          });
    
          if (response.ok) {
            // Handle success, e.g., show a success message or redirect
            console.log("Record updated successfully");
            console.log("new student="+ JSON.stringify(response));
          } else {
            // Handle error, e.g., show an error message
            console.error("Error updating record");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      const setStudentAbsence= async (data) => {
        try {
            const id = '6611c3c7347be427dcd6d0ee',
            data={
                
                absences :[{
                    subjectName : 'Math',
                    absTime : '19112023',
                    raison : 'malade',
                    raisonOK : 1,
                }]
            }
          const response = await fetch(`/api/student/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data),
          });
    
          if (response.ok) {
            // Handle success, e.g., show a success message or redirect
            console.log("Record updated successfully");
            console.log("new student="+ JSON.stringify(response));
          } else {
            // Handle error, e.g., show an error message
            console.error("Error updating record");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      const delData = () => {
        const id = '6611c47f221727188da3d7c1';
        fetch(`/api/student/${id}`, { method: "DELETE" })
        .then( () => console.log("Record deleted successfully") )
          .catch((error) => console.error("Error fetching data:", error));
      };
    
     
    
    useEffect(() => {  
        delData();
    }, []);

return  ( 
    <> 
       hello
   </>
    
);
}

Page.getLayout = function getLayout(page) {
    return (
      
        <Dashboard>{page}</Dashboard>
   
    )
  };
  export default Page;