
import { useEffect, useState } from "react";
import calculateSum, { calculateTotalAbsences } from "@/tools/util";
import calculateWeightedSum from "@/tools/util";
import { DataGrid } from "@mui/x-data-grid";
import { Divider, Typography , Grid, Box, MenuItem, InputLabel, FormControl, Select,  SelectChangeEvent  ,
  Card, CardHeader, Stack, Paper, Button, IconButton, Dialog} from "@mui/material";
import Grades from "../grade/list";
import AddGrade from "../grade/add";



function ViewStudent({ id}) {
  const [student, setStudent]=useState({});

const  getStudentById= async  (id) => {

    
        
    fetch(`/api/student/${id}`, {headers: {
      'Cache-Control': 'no-cache', // Disable caching
      // Optionally add other headers as needed
    }})
    .then(res => res.json())
    .then(res => { 
      console.log("res student="+JSON.stringify(res));
        if (res != undefined && res !=null){
           res.id=res._id;
           if (res.grades != undefined && Array.isArray(res.grades)){
            res.grades.forEach(element => {
              element.id=element._id;
            });
           }
           console.log("res student="+JSON.stringify(res));
          setStudent(prev=> res);
        }

    })
    .catch((error) => console.error('Error fetching data:', error));
}


useEffect(() => {  
        
  getStudentById(id);

}, []);
    return (
<Paper sx={{mt:8}}>
<Box m={2}>

<Typography
                  variant="h5"
                  sx={{ minWidth: "180px", fontWeight: "bold" }}
                >
                  Student's Detail
                </Typography>
                
</Box>
<Box m={2}>
<Grid container spacing={2}>
<Grid item xs={12} md={6}>
          <Card sx={{m:1}} variant="outlined">
            <CardHeader
          
            title={"Main Information" } 
           
        />
        
         <Divider/>
    <Box m={1}>
                <Typography
                  variant="body2"
                  sx={{ minWidth: "180px", fontWeight: "bold" }}
                >
                  First Name
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ minWidth: "180px", color: "#65748B" }}
                >
                     {student.firstName}
             </Typography>
             </Box>
             <Divider />
             <Box m={1}>
                <Typography
                  variant="body2"
                  sx={{ minWidth: "180px", fontWeight: "bold" }}
                >
                 Last Name
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ minWidth: "180px", color: "#65748B" }}
                >
                     {student.lastName}
             </Typography>
             </Box>
             <Divider />
             <Box m={1} >
                <Typography
                  variant="body2"
                  sx={{ minWidth: "180px", fontWeight: "bold" }}
                >
                  Classroom
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ minWidth: "180px", color: "#65748B" }}
                >
                     {student.stdClassName}
             </Typography>
             </Box>
             
             </Card>
             </Grid>
             <Grid item xs={12} md={6}>

         <Grades studentId={id} data={student.grades ?? []}/>
         </Grid>
        
             <Grid item xs={12} md={6}>
<Box></Box>
         
         </Grid>
         </Grid>

</Box>


</Paper>


    );


};
export default ViewStudent;