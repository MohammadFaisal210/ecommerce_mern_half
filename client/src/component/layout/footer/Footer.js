import React from 'react'
import playicon from "./kindpng_1144091.png"
import appstore from "./kindpng_1143987 (1).png"
export default function Footer() {
    return (
        <div>
            <footer>
                <div className='footer'>
                    <div className="leftfooter">
                        <h4>download our ap4</h4>
                        <p>download app for android and ios mobile phone</p>
                        <img src={playicon} alt="" />
                        <img src={appstore} alt="" />
                    </div>
                    <div className="middle">
                        <h1>Ecommerce</h1>
                        <p>high quality is our first priority</p>

                        <p>copy right 2022 © Mohammad Faisal</p>
                    </div>
                    <div className="rightfooter">
                        <h4>follow us</h4>
                        <a href="https://www.instagram.com/mohammad_faisal210/?hl=en"><i title='Instagram' className="fa-brands fa-instagram"></i>Instagram</a>
                        <a href="https://www.youtube.com/"><i title='Youtube' className="fa-brands fa-youtube"></i>Youtube</a>
                        <a href="https://web.facebook.com/profile.php?id=100006729825786"><i title='Facebook' className="fa-brands fa-facebook"></i>Facebook</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
