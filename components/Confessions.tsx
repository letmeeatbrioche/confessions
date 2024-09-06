'use client'
import React, {SetStateAction, useEffect, useState } from 'react'
import { Confession } from '@/db/models'
import { Box, Button, TextField } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

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

  const notify = (message: string) => toast(message, {
    position: "top-center",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    style: { backgroundColor: '#db5246', color: '#fff' }
  });

  const handleSubmit = async () => {
    if (text.length > 150) {
      notify('Confession too long. Please keep it 150 characters and under!');
      return;
    }
    if (text.length === 0) {
      notify('Confession cannot be blank!');
      return;
    }
    console.log('Submitting confession:', text);
    try {
      const res = await fetch(`../api/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({ text }),
      })
      console.log('handleSubmit res:', res);
      console.log('Successfully uploaded confession!: ', text);
      setSubmitted(!submitted);
      setText('');
    } catch (error) {
      console.error("Error posting confession from home page:", error);
    }
  }

  const shuffle = (confessions: object[]) => {
    for (let i = confessions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [confessions[i], confessions[j]] = [confessions[j], confessions[i]];
    }
    return confessions;
  };

  useEffect(() => {
    console.log('getting confessions in useEffect');
    getConfessions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  useEffect(() => {
    if (text.length > 150) {
      setTextLengthColor('red');
    } else if (textLengthColor === 'red' && text.length <= 150) {
      setTextLengthColor('black');
    }
  }, [textLengthColor, text.length])


  const getConfessions = async () => {
    console.log('getting confessions...');
    try {
      const res = await fetch(`../api/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })
      console.log('getConfessions res:', res);
      const confessions = await res.json();
      console.log('confessions:', confessions);
      const shuffledConfessions = shuffle(confessions);
      setConfessions(shuffledConfessions as SetStateAction<[]>);
    } catch (error) {
      console.error("Error getting confessions:", error);
    }
    return confessions;
  }

  return (
    <>
      <Box className='form-container'>

        <TextField multiline maxRows={5} style={{width: '100%'}} helperText="Submit a confession" label='Confess something' value={text} onChange={handleChange}>
        </TextField>

        <p>Character limit: <span style={{color: textLengthColor}}>{text.length}</span>/150</p>

        <Button variant='contained' className='submit-button' onClick={handleSubmit}><span>Submit</span></Button>

        <Button variant='contained' className='refresh-button' onClick={getConfessions}><span>Refresh</span></Button>

        <ToastContainer />
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