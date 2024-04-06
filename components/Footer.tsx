import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  let currentDate = new Date();
  let currentYear = currentDate. getFullYear();
  return (
    <footer>
      <p className="disclaimer">Admin reserves the right to remove any confession at their discretion.</p>
      <p className="copyright">© {currentYear} CONFíT</p>
    </footer>
  )
}

export default Footer