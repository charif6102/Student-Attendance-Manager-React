
import { useEffect } from "react";



const Page = () => {

    const  getProfs= async  () => {
        fetch(`/api/prof`)
        .then(res => res.json())
        .then(res => {console.log(JSON.stringify(res));
            
        })
        .catch((error) => console.error('Error fetching data:', error));
    }

    const creatProf = async (data) => {
        try {

            data={
                firstName : 'Abdel',
                lastName : 'BECH',
                subjectName : 'Math',
                stdClassesName : ['INFORMATIQUE 100', 'INFORMATIQUE 200']
            }
          const response = await fetch(`/api/prof`, {
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

      
      const addClassToProf= async () => {
        try {
            const id = '6611d025114467958a48f8a3',
            data={
                
                stdClassesName : ['INFORMATIQUE 100', 'INFORMATIQUE 200', 'INFORMATIQUE 300']
            }
          const response = await fetch(`/api/prof/${id}`, {
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
        const id = '6611cee3221727188da3d7d2';
        fetch(`/api/prof/${id}`, { method: "DELETE" })
        .then( () => console.log("Record deleted successfully") )
          .catch((error) => console.error("Error fetching data:", error));
      };
    
     
    
    useEffect(() => {  
      getProfs();
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