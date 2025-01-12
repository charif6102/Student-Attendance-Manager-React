import { Stack, Button, Card, CardHeader, Box, Dialog, private_excludeVariablesFromRoot } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AddGrade from "./add";
import { useEffect, useState } from "react";

const Grades = (props) => {
    const {studentId, data} =props;
    const [selectedGrade, setSelectedGrade]=useState([]);


    const [grades, setGrades]=useState([]);
  
    const [openAddGrade, setOpenAddGrade] = useState(false);
    const columns= [
      

        {
          field: 'subjectName',
          headerName: 'Subject',
          type: 'string',
          editable: true,
          align: 'left',
          headerAlign: 'left',
        },
        {
          field: 'examDate',
          headerName: 'Exam Date',
          type: 'string',
          editable: true,
          align: 'left',
          headerAlign: 'left',
        },
        {
            field: 'coef',
            headerName: 'Coef',
            type: 'number',
            editable: true,
            align: 'left',
            headerAlign: 'left',
          },
          {
            field: 'grade',
            headerName: 'Grade',
            type: 'number',
            editable: true,
            align: 'left',
            headerAlign: 'left',
          }
      
      ];

      const addGrade = async (data) => {
        try {      
          const response = await fetch(`/api/addGrades?studentId=${studentId}`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
          });
      
          if (response.ok) {
            const responseData = await response.json();
            console.log("Record added successfully =", responseData.student);
            const newData = responseData.student.grades.map(element => ({ ...element, id: element._id }));
            setGrades(newData);
          } else {
            // Handle the case where the request failed
            console.error("Failed to add grade:", response.status, response.statusText);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      const deleteGrade = async (studentId, gradeId) => {
        try {
          const response = await fetch(`/api/delGrade?_id=${studentId}&gradeId=${gradeId}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            const responseData = await response.json();
            const newData = responseData.student.grades.map(element => ({ ...element, id: element._id }));
            setGrades(newData);
          } else {
            console.error('Failed to delete grade:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Error deleting grade:', error);
        }
      };

      const onAdd = (formData) => {
        console.log("formData="+JSON.stringify(formData));
         addGrade(formData);
         setOpenAddGrade(false);
         
      } 

      useEffect(() => {
        // Transform data by adding an 'id' property to each element
        const newData = data.map(element => ({ ...element, id: element._id }));
        // Set the transformed data in the state
        setGrades(newData);
      }, [data]);
    
    return  ( 
        <> 
          
          <Card sx={{m:1, p:1}} variant="outlined">
            <CardHeader
          
            title={"grade"}
            
        />
         <Stack  direction="row-reverse" spacing={2}>
                
                
                <Button color={'success' }variant="contained" 
                        startIcon = {<AddIcon />}
                        onClick ={ () => setOpenAddGrade(true)} 
                    >
                    Add
                    </Button>  
                    <Button color={'error' }variant="contained" 
                        startIcon = {<DeleteIcon />}
                        onClick ={ () => deleteGrade(studentId,selectedGrade[0] )} 
                    >
                    Del
                    </Button>     
                </Stack>
          <Box sx={{mt:2}}>
            <DataGrid  rows={grades} columns={columns} 
            rowSelectionModel={selectedGrade}
            onRowSelectionModelChange={(newRowSelectionModel) => {
                setSelectedGrade(newRowSelectionModel)}}
            
            />
          </Box>
          </Card>


          <Dialog
        fullWidth={true}

        maxWidth={"xs"}
        open={openAddGrade}
        onClose={() => setOpenAddGrade(false)}
      >
        <AddGrade onSubmit={onAdd} onCancel={() => setOpenAddGrade(false)}
        />
      </Dialog>
       </>
        
    );
    };



export default Grades;