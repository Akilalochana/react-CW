import React from 'react'
import "./Footer.css";

function Footer() {
  return (
    <div>
       
        <footer className='footer'>
            <div className='footerContainer'>
                <div className='footer-about'>
                    <h3>About Us</h3>
                    <p>Passionate web development specializing in front-end design. Dedicated to creating interactive and user-friendly websites.</p>
                </div>

                <div className='footerContact'>
                    <h3>Contact</h3>
                    <p>Email: akilalochana7@gmail.com</p>
                    <p>Phone: +94778823415</p>
                    <p>Location: wellawathte, Colombo, Sri Lanka</p>
                </div>

                <div className='footerSocial'>
                    <h3>Connect with Us</h3>
                    <a href="https://www.linkedin.com/in/akila-lochana-6b50512a0/" target="_blank">LinkedIn</a> |
                    <a href="https://github.com/akila-lochana" target="_blank">GitHub</a> |
                    <a href="https://x.com/aki32726" target="_blank">Twitter</a>|
                    <a href="https://stackoverflow.com/users/27077280/akila-lochana?tab=profile" target="_blank">Stack Overflow</a>|
                    <a href="https://medium.com/@akilalochana7" target="_blank">Medium</a>

                </div>
            </div>

            <div className='footerBottom'>
                <p>&copy; 2024 Akila Lochana. All rights reserved.</p>
            </div>
    </footer>
       
    </div>
  )
}

export default Footer