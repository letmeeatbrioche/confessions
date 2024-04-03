'use client'
import React, { useEffect, useState } from 'react'
import { Confession } from '@/db/models'
import { Box, Button, TextField } from '@mui/material'

type Props = {}

const Confessions = (props: Props) => {
  const [text, setText] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [confessions, setConfessions] = useState<[]>([]);
  const [textLengthColor, setTextLengthColor] = useState('black');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);

    if (text.length > 150) {
      setTextLengthColor('red');
    } else if (textLengthColor === 'red' && text.length <= 150) {
      setTextLengthColor('black');
    }
  }

  const handleSubmit = async () => {
    if (text.length > 150) {
      alert('Confession too long. Please keep it 150 characters and under.');
      return;
    }
    console.log('Submitting confession:', text);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/`, {
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

  useEffect(() => {
    if (text.length > 150) {
      setTextLengthColor('red');
    } else if (textLengthColor === 'red' && text.length <= 150) {
      setTextLengthColor('black');
    }
  }, [textLengthColor, text.length])


  const getConfessions = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/`);
    const confessions = await res.json();
    console.log('confessions:', confessions);
    setConfessions(confessions.reverse());
    return confessions;
  }

  return (
    <>
      <Box className='form-container'>

      <TextField multiline maxRows={4} style={{width: '100%'}} helperText="Submit a confession" label='Confess something' value={text} onChange={handleChange}>
      </TextField>

      <p>Character limit: <span style={{color: textLengthColor}}>{text.length}</span>/150</p>

      <Button variant='contained' className='submit-button' onClick={() => handleSubmit()}><span>Submit</span></Button>
        </Box>


      <div className="grid-container">
          {confessions.map((confession: Confession) => {
            return (
              <div className="grid-item" key={confession._id?.toString()}>
                <p>{confession.text}</p>
              </div>
            );
          })}
      </div>
    </>
  )
}

export default Confessions