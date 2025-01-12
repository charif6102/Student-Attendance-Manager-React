
import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Card, CardHeader, Stack, Typography } from '@mui/material';
function AddStudent({ classroom, onSubmit, onCancel }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSubmit({ 'firstName':firstName , 'lastName': lastName, 'stdClassName': classroom });
      // Reset form fields
      setFirstName('');
      setLastName('');
    };
  
    return (
        <Paper>
       <Card sx={{m:2, p:1}}> 
        <CardHeader
          
          title={"Add Student"}
          
      />     
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="First Name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
          <TextField
              fullWidth
              label="Classroom"
              value={classroom}
              readOnly={true}
            />
          </Grid>
          <Grid item xs={12}>
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
  
  export default AddStudent;