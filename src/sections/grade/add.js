import React, { useState } from 'react';
import { TextField, Button, Grid, Card, CardHeader, Paper, Stack } from '@mui/material';

function AddGrade(props) {
    const {onSubmit, onCancel}=props;

  const [formData, setFormData] = useState({
    subjectName: '',
    examDate: '',
    coef: '',
    grade: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log(formData); // For demonstration purposes
    onSubmit(formData);
  };

  return (
    <Paper>
    <Card sx={{m:2, p:1}}> 
     <CardHeader
       
       title={"Add Student"}
       
   />     
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
       
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Subject Name"
            name="subjectName"
            value={formData.subjectName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Exam Date"
            name="examDate"
            type="date"
            value={formData.examDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Coefficient"
            name="coef"
            type="number"
            value={formData.coef}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Grade"
            name="grade"
            type="number"
            value={formData.grade}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} >
        <Stack direction="row-reverse" m={2} spacing ={2} > 
            <Button variant="contained" type="submit" size={'xl'}>
              {'Add'}
            </Button>
            <Button
              variant="text"
              sx={{ color: "#212121" }}
              size={'xl'}
              onClick={()=> onCancel()}
            >
              {'Cancel'}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
    </Card>
      </Paper>
  );
}

export default AddGrade;
