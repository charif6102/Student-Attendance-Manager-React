
import { useEffect, useState } from "react";
import calculateSum, { calculateTotalAbsences } from "@/tools/util";
import calculateWeightedSum from "@/tools/util";
import { DataGrid } from "@mui/x-data-grid";
import { Divider, Typography , Grid, Box, MenuItem, InputLabel, FormControl, Select,  SelectChangeEvent  ,
  Card, CardHeader, Stack, Paper, Button, IconButton, Dialog} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AddStudent from "../student/add";
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/router";



const Classrooms = () => {
    
    const [classroom, setClassroom] = useState('');
    const [classroomName, setClassroomName ]=useState('');
    const [listCls, setListCls] = useState([]);
    const [students, setStudents]=useState([]);
    const [studentsA, setStudentsA]=useState([]);
    const [summaries, SetSummaries]=useState({'nbr_students': ''
    , 'all_average_grade':''
    , 'max_grade':''
    ,'min_grade' :'' });
    const [openAdd, setOpenAdd] = useState(false);

    const [selectedStudent, setSelectedStudent]=useState([]);
    const router=useRouter();

    const handleChange = (event) => {
        setClassroom(event.target.value);
        setClassroomName(listCls[event.target.value] );

        getStudents(listCls[event.target.value]);
    };
    
    const prof='Mohammed';


const columns= [
  {
    field: 'firstName',
    headerName: 'First Name',
    type: 'string',
    editable: true,
    width: 180,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    type: 'string',
    width: 180,
    editable: true,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'stdClassName',
    headerName: 'Classroom',
    type: 'string',
    width: 180,
    editable: false,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'averageGrades',
    headerName: 'Average Grades',
    type: 'number',
    editable: false,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'totalAbsences',
    headerName: 'Nbr Absence',
    type: 'number',
    editable: false,
    align: 'left',
    headerAlign: 'left',
  },

];


    const  getProfs= async  () => {
        
        fetch(`/api/prof?firstName=${prof}`, {headers: {
            'Cache-Control': 'no-cache', // Disable caching
            // Optionally add other headers as needed
          }})
        .then(res => res.json())
        .then(res => { 

            console.log("res="+JSON.stringify(res));
            setListCls(prev=> res.stdClassesName ?? []);
            if (res.stdClassesName.length ){
                setClassroom(0);
                setClassroomName(res.stdClassesName[0]);
                getStudents(res.stdClassesName[0]);
            }      
        })
        .catch((error) => console.error('Error fetching data:', error));
    }

    const creatStudent = async (data) => {
        try {

           
          const response = await fetch(`/api/addStudent`, {
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

      const deleteStudent = async (studentId) => {
        try {
          const response = await fetch(`/api/delStudent?studentId=${studentId}`, {
            method: 'DELETE',
          });
         
          console.log('Student deleted successfully:', response.data);
          getStudents(classroomName);
          // Update state or perform other actions as needed
        } catch (error) {
          console.error('Error deleting student:', error);
        }
      };

    const  getStudents = async  (selClassRoom) => {
        
        fetch(`/api/studentByClassRoom?stdClassName=${selClassRoom}`, {headers: {
            'Cache-Control': 'no-cache', // Disable caching
            // Optionally add other headers as needed
          }})
        .then(res => res.json())
        .then(res => {setStudents(prev => res);
           
            let a=res;
            a.forEach(ele => {
                if (ele.grades != undefined || ele.grades !=null ){
                    let averageTotal =calculateWeightedSum(ele);
                    ele["averageGrades"]=averageTotal;
                }

            })
            a.forEach(ele => {
                if (ele.absences != undefined || ele.absences !=null ){
                    let totalAbsences =calculateTotalAbsences(ele);
                    ele["totalAbsences"]=totalAbsences;
                    
                }
                ele["id"]=ele._id;

            })

            let all_average_grade;
            let max_grade;
            let min_grade;
            let nbr_students=a.length;
            if (a.length > 0){
            
                all_average_grade=(a.reduce((total, { averageGrades }) => total + averageGrades, 0)/nbr_students).toFixed(2);
                max_grade=(Math.max(...a.map(({ averageGrades }) => averageGrades)).toFixed(2));
                min_grade = (Math.min(...a.map(({ averageGrades }) => averageGrades))).toFixed(2);
            }else{
                all_average_grade = '';
                max_grade='';
                min_grade='';
            }

            SetSummaries({'nbr_students': nbr_students
                    , 'all_average_grade':all_average_grade
                , 'max_grade':max_grade
                ,'min_grade' :min_grade })
            console.log("a="+JSON.stringify(a));
            setStudentsA(prev => a);               
        })
        .catch((error) => console.error('Error fetching data:', error));
    }

    useEffect(() => {  
        
        getProfs();

    }, []);

return (
<>
<Paper sx={{mt:8}}>
<Box m={2}>

<Typography
                  variant="h5"
                  sx={{ minWidth: "180px", fontWeight: "bold" }}
                >
                  Student's Management
                </Typography>
                
</Box>
<Grid container spacing={2}>
<Grid item xs={12} >
<Box sx={{ minWidth: 120 }}>

      <FormControl sx={ {m: 2, width: { xs: 150, sm: 150, md: 250 }}}>
        <InputLabel id="listClasse_1">Select one classroom</InputLabel>
        <Select
          labelId="label_10"
          id="cls_10"
          value={classroom}
          label="List of classrooms"
          onChange={handleChange}
        >
          {listCls.map((el, index)  =>
          <MenuItem value={index} key={index}>{el} </MenuItem>
          )
          }
        </Select>
      </FormControl>
    </Box>
    </Grid>
   
    <Grid item xs={12} md={4}>
          <Card sx={{m:1}} variant="outlined">
            <CardHeader
          
            title={"Summary" } 
           
        />
        
         <Divider/>
    <Box m={1}>
                <Typography
                  variant="body2"
                  sx={{ minWidth: "180px", fontWeight: "bold" }}
                >
                  Number of students
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ minWidth: "180px", color: "#65748B" }}
                >
                     {summaries.nbr_students}
             </Typography>
             </Box>
             <Divider />
             <Box m={1}>
                <Typography
                  variant="body2"
                  sx={{ minWidth: "180px", fontWeight: "bold" }}
                >
                 Class Average Grade
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ minWidth: "180px", color: "#65748B" }}
                >
                     {summaries.all_average_grade}
             </Typography>
             </Box>
             <Divider />
             <Box m={1} >
                <Typography
                  variant="body2"
                  sx={{ minWidth: "180px", fontWeight: "bold" }}
                >
                  Best Grande
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ minWidth: "180px", color: "#65748B" }}
                >
                     {summaries.max_grade}
             </Typography>
             </Box>
             <Divider />
             <Box m={1} >
                <Typography
                  variant="body2"
                  sx={{ minWidth: "180px", fontWeight: "bold" }}
                >
                   Lower Grade
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ minWidth: "180px", color: "#65748B" }}
                >
                    {summaries.min_grade}
             </Typography>
             </Box>
             </Card>
         </Grid>
         <Grid xs={12} item md={8}>
          <Card sx={{m:2, p:1}} variant="outlined">
            <CardHeader
          
            title={"Students List"}
            
        />
         <Stack  direction="row-reverse" spacing={2}>
                <Button color={'success' }variant="contained" 
                        startIcon = {<AddIcon />}
                        onClick ={ () => setOpenAdd(true)} 
                    >
                    Add
                    </Button>  
                    <Button color={'error' }variant="contained" 
                        startIcon = {<DeleteIcon />}
                        onClick ={ () => deleteStudent(selectedStudent[0])} 
                    >
                    Del
                    </Button>       
                </Stack>
          <Box sx={{mt:2}}>
            <DataGrid rows={studentsA} columns={columns}
            rowSelectionModel={selectedStudent}
            onRowSelectionModelChange={(newRowSelectionModel) => {
                setSelectedStudent(newRowSelectionModel)}}
                onRowDoubleClick={()=> router.push(`/student/view?studentId=${selectedStudent}`) }
            />
          </Box>
          </Card>
         </Grid>
         </Grid>

         <Dialog
        fullWidth={true}
        fullHeight={true}
        maxWidth={"xl"}
        open={openAdd}
        onClose={() => setOpenAdd(false)}
      >
        <AddStudent classroom={classroomName} onCancel={()=> setOpenAdd(false)}  onSubmit={(data)=>{    
            creatStudent(data).then(() => {getStudents(classroomName); setOpenAdd(false)})

        } }
        />
      </Dialog>
    

         </Paper>
  </>

)



};
export default Classrooms;