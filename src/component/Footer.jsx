import React from "react";
import { BsTwitter,BsLinkedin,BsGithub,BsGlobe } from "react-icons/bs";
export default function Footer()
{
    return(
        <>
        <div className="container bg-dark">
  <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div className="col-md-4 d-flex align-items-center">
      <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
        
      </a>
      <span className="text-light">© {new Date().getFullYear()} Abdul Alim</span>
    </div>

    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li className="ms-3"><a className="text-light" target="_blank" href="https://www.linkedin.com/in/abdul-alim-35149a18a">{<BsLinkedin />}</a></li>
      <li className="ms-3"><a className="text-light" target="_blank" href="https://www.github.com/abdul891">{<BsGithub />}</a></li>
      <li className="ms-3"><a className="text-light" target="_blank" href="https://abdul891.github.io/abdulresume">{<BsGlobe />}</a></li>
      <li className="ms-3"><a className="text-light" href="#">{<BsTwitter />}</a></li>
    </ul>
  </footer>
</div>
        </>
    )
}