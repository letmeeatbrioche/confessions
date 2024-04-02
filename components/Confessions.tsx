'use client'
import React, { useEffect, useState } from 'react'
import { Confession } from '@/db/models'

type Props = {}

const Confessions = (props: Props) => {
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [confessions, setConfessions] = useState([]);

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
    setConfessions(confessions);
    return confessions;
  }

  return (
    <>
      <input type='text' placeholder='Confess something' value={text} onChange={handleChange} />

      <button onClick={() => handleSubmit()}>Submit</button>

      {confessions.map((confession: Confession) => {
        return (
          <div key={confession._id}>
            <p>{confession.text}</p>
          </div>
        );
      })}
    </>
  )
}

export default Confessions