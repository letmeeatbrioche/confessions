'use client'

import React, { useEffect, useState } from 'react'

const subheadings: string[] = [
  "What's on your mind?",
  'What are you thinking?',
  'What are you feeling?',
  'Penny for your thoughts?',
  'Tell me something.',
  'Give me something good.',
  'Give me something juicy.',
  'Get that monkey off your back.',
  'Say something to the ether.',
  'Manifest your thought onto this website.',
  'What does the world need to know?',
  'Gift me the poetry of your soul.',
  'What is your mind saying?',
  'What is your heart saying?',
  'Confess something.'
]

const Subheading = () => {
  const [subheading, setSubheading] = useState(subheadings[0]);


  const getRandomSubheading = () => {
    const randomIndex = Math.floor(Math.random() * subheadings.length);
    setSubheading(subheadings[randomIndex]);
  }

  useEffect(() => {
    const getNextSubheading = () => {
      const subheadingIndex = subheadings.indexOf(subheading);
      if (subheadingIndex === subheadings.length - 1) {
        setSubheading(subheadings[0]);
      } else {
        setSubheading(subheadings[subheadingIndex + 1]);
      }
    }
    const intervalId = setInterval(getNextSubheading, 5000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [setSubheading, subheading]);

  return (
    <>
      <h2 className="subheading">{subheading}</h2>
    </>
  )
}

export default Subheading