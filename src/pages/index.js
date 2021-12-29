import React, {useRef, useEffect} from 'react';
import { Link  } from 'react-router-dom'
import '../css/Astronaut.css'

function Astronaut() {
    const astronaut = useRef(null)
    const images = useRef(null)
    const img1 = useRef(null)
    const img2 = useRef(null)
    const img3 = useRef(null)
    const img4 = useRef(null)
    const img5 = useRef(null)
    const img6 = useRef(null)
    const img7 = useRef(null)
    const img8 = useRef(null)
    const img9 = useRef(null)
    const img10 = useRef(null)
    const img11 = useRef(null)
    const img12 = useRef(null)
    const img13 = useRef(null)
    const img14 = useRef(null)
    useEffect(() => {
        document.addEventListener('mousemove', e => {
            let mouseX = e.clientX
            let mouseY = e.clientY

            let img1x = img1.current.offsetLeft
            let img1y = img1.current.offsetTop

            let img3x = img3.current.offsetLeft
            let img3y = img3.current.offsetTop

            let img4x = img4.current.offsetLeft
            let img4y = img4.current.offsetTop

            let img5x = img5.current.offsetLeft
            let img5y = img5.current.offsetTop

            let diff1X = (mouseX - img1x) / 45
            let diff1Y = (mouseY - img1y) / 45


            let diff3X = (mouseX - img3x) / 18
            let diff3Y = (mouseY - img3y) / 18

            let diff4X = (mouseX - img4x) / 30
            let diff4Y = (mouseY - img4y) / 30

            let diff5X = (mouseX - img5x) / 8
            let diff5Y = (mouseY - img5y) / 8
            img1.current.style.transform = `translate(${diff1X}px,${diff1Y}px)`
            img3.current.style.transform = `translate(${diff3X}px,${diff3Y}px)`
            img4.current.style.transform = `translate(${diff4X}px,${diff4Y}px)`
            img5.current.style.transform = `translate(${diff5X}px,${diff5Y}px)`
        })
        images.current.addEventListener('scroll', function () {
            let top = images.current.scrollTop
            let img2x = 400 - top * 0.7
            let img3x = 400 - top * 0.7
            let img6x = 600 - top * 0.7
            let img6s = 1 + top * 0.0008
            let img6o = 1.3 - top * 0.0004
            let img10x = 0 - (top - 4600) * 2
            let img8x = -340 + (top - 3300) * 1
            let img9x = 340 - (top - 3300) * 1
            let img14x = (top - 5400) * 0.3 / Math.PI
            
            if (top >= 100) {
                if (img6x < -300) {
                    img6x = -300
                }
                img6.current.style.transform = `translate(${img6x}px,400px) scale(${img6s})`
                img6.current.style.opacity = img6o
                img10.current.style.transform = `translate(${img10x}px,2100px)`
                img14.current.style.transform = `translate(0px,200px) rotateZ(${img14x}deg)`
            }
            if (top >= 2000) {
                astronaut.current.style.background = '#15347b'
            }
            else {
                astronaut.current.style.backgroundImage = 'linear-gradient(to bottom,rgb(86, 71, 117),#000,#000)'
            }
            if (top >= 3600) {
                img8.current.style.transform = `translate(0px,2100px)`
                img9.current.style.transform = `translate(0px,2100px)`

            } else {
                img8.current.style.transform = `translate(1400px,2100px)`
                img9.current.style.transform = `translate(-1400px,2100px)`
            }
            if (top >= 5500) {
                img11.current.style.transform = `translate(0px,0px)`
                img12.current.style.transform = `translate(0px,0px)`
                img13.current.style.transform = `translate(0px,0px)`
            } else {
                img11.current.style.transform = `translate(0px,300px)`
                img12.current.style.transform = `translate(0px,300px)`
                img13.current.style.transform = `translate(0px,300px)`
            }
        })
    }, [])

    return <div className="Astronaut" ref={astronaut}>
        <div className="shell">
            <div className="content">
                <Link to={{pathname: '/blog'}}><img className="gotoBlog" src='../../static/img/logo.svg' title="去往blog"/></Link>
                <div className="images" ref={images}>
                    <h2>小博小屋<br />︾</h2>
                    <div className="img1" ref={img1}></div>
                    <div className="img2" ref={img2}></div>
                    <div className="img3" ref={img3}></div>
                    <div className="img4" ref={img4}></div>
                    <div className="img5" ref={img5}></div>
                    <div className="img6" ref={img6}></div>
                    <div className="img7" ref={img7}></div>
                    <div className="img8" ref={img8}></div>
                    <div className="img9" ref={img9}></div>
                    <div className="img10" ref={img10}></div>
                    <div className="image">
                        <div className="img11" ref={img11}></div>
                        <div className="img12" ref={img12}></div>
                        <div className="img13" ref={img13}></div>
                        <div className="img14" ref={img14}></div>
                        <Link to={{pathname: '/blog'}}> <span>去往wb小屋</span> </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>

}

export default Astronaut