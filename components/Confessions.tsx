'use client'
import React, {SetStateAction, useEffect, useState } from 'react'
import { Confession } from '@/db/models'
import { Box, Button, TextField } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

type Props = {}

const Confessions = (props: Props) => {
  const [text, setText] = useState<string>('');
  const [submitted, setSubmitted] = useState<number>(0);
  const [confessions, setConfessions] = useState<[]>([]);
  const [textLengthColor, setTextLengthColor] = useState<string>('black');
  const [pseudoText, setPseudoText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);


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
    setPseudoText(text);
    try {
      const res = await fetch(`../api/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({ text }),
      })
      setSubmitted(submitted + 1);
      setText('');
    } catch (error) {
      console.error("Error posting confession from home page:", error);
    }
  }

  // POSSIBLE ITERATION:
  // Set a state array for pseudo-confessions objects
  // Modify the getConfessions function to add the pseudo-confession object to the pseudo-confessions state array
  // Modify the shuffle function to reset the pseudo-confessions state array

  const shuffle = (confessions: object[]) => {
    for (let i = confessions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [confessions[i], confessions[j]] = [confessions[j], confessions[i]];
    }
    return confessions;
  };

  useEffect(() => {
    console.log('getting confessions in useEffect based on SUBMITTED');
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


  const getConfessions = async (justShuffling?: boolean) => {
    // console.log('getting confessions...');
    try {
      const res = await fetch(`../api/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })
      // console.log('getConfessions res:', res);
      const confessions = await res.json();

      if (submitted > 0) {
        let newConfessionCollection: object[] = [];

        if (!justShuffling) {
          const newConfession = {
            _id: submitted,
            text: pseudoText
          };
          newConfessionCollection.push(newConfession);
        }

        const newConfessions = [...newConfessionCollection, ...shuffle(confessions)];
        setConfessions(newConfessions as SetStateAction<[]>);
      } else {
        const shuffledConfessions = shuffle(confessions);
        setConfessions(shuffledConfessions as SetStateAction<[]>);
      }
    } catch (error) {
      console.error("Error getting confessions:", error);
    }
    return confessions;
  }

  return (
    <>
      <Box className='form-container'>

        <TextField multiline maxRows={5} style={{width: '100%'}} label='Your words are valuable' value={text} onChange={handleChange}>
        </TextField>

        <p>Character limit: <span style={{color: textLengthColor}}>{text.length}</span>/150</p>

        <Button variant='contained' className='submit-button' onClick={handleSubmit}><span>Submit</span></Button>

        <Button variant='contained' className='shuffle-button' onClick={() => getConfessions(true)}><span>Shuffle</span></Button>

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