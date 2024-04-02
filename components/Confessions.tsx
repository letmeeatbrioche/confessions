'use client'
import React, { useEffect, useState } from 'react'
import { Confession } from '@/db/models'
import { Box, Grid, Paper, TextField } from '@mui/material'

type Props = {}

const Confessions = (props: Props) => {
  const [text, setText] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [confessions, setConfessions] = useState<[] | Confession>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  const handleSubmit = async () => {
    console.log('Submitting confession:', text);
    try {
      const res = await fetch("http://localhost:3000/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({ text }),
      })
      console.log('Successfully uploaded confession!: ', text);
      setSubmitted(!submitted);
      setText('');
    } catch (error) {
      console.error("Error posting confession from home page:", error);
    }
  }

  useEffect(() => {
    console.log('getting confessions in useEffect');
    getConfessions();
  }, [submitted]);

  const getConfessions = async () => {
    const res = await fetch("http://localhost:3000/api/");
    const confessions = await res.json();
    console.log('confessions:', confessions);
    setConfessions(confessions.reverse());
    return confessions;
  }

  return (
    <>
    <Box className='form-container'>
      <TextField multiline maxRows={4} style={{width: '100%'}} helperText="Submit a confession" label='Confess something'>
        <input className='input' type='text' placeholder='Confess something' value={text} onChange={handleChange} />
      </TextField>
      <p>Character limit: 200</p>
      <button onClick={() => handleSubmit()}>Submit</button>
    </Box>


      <Grid container className='confessions-container' rowSpacing={3} columnSpacing={3} style={{width: '70%', margin: '50px auto', alignItems: 'center'}}>
          {confessions.map((confession: Confession) => {
            return (
              // xs={12} sm={6} md={4} lg={3}
              <Grid item xs={12} sm={6} md={4} key={confession._id} style={{alignSelf: 'stretch'}}>
                <Paper className='paper' elevation={3} key={confession._id}>
                  <div className='container horizontal confessions-item' key={confession._id}>
                    <p className='child'>{confession.text}</p>
                  </div>
                </Paper>
              </Grid>
            );
          })}
      </Grid>
    </>
  )
}

export default Confessions