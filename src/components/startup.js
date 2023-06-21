import React, { useEffect } from 'react';
import './startup.css';
import smallLogo from './imgs/small-logo.png'; // Assuming the image file is in the same directory as your component file

import svgBg from './imgs/bg-wave.svg';
import { useNavigate } from 'react-router-dom';


export default function Startup( {onFinish} ) {
    const navigate = useNavigate();
    useEffect(() => {
        const addEffectClass = () => {
            logoElement.classList.add('effect');
            shadowElement.classList.add('effect2');
            setTimeout(() => {
                endEffectClass();
            }, 12000);
        };

        const container = document.querySelector('.startup-container');

        const endEffectClass = () => {
            setTimeout(() => {
                shadowElement.style.opacity = '0';
            }, 500);
            setTimeout(() => {
                container.classList.add('containerhide');
                setTimeout(() => {
                    onFinish();
                    const body = document.querySelector('body');
                    body.classList.add("bodyT");
                    navigate('/dashboard/home')
                }, 2000);
            }, 3000);
            logoElement.classList.add('end');
            scaleElement.classList.add('end2');
        };

        const delay = 2500; // 2.5 seconds

        const logoElement = document.querySelector('.logo');
        const shadowElement = document.querySelector('.shadow');
        const scaleElement = document.querySelector('.scale');

        setTimeout(addEffectClass, delay);

        setTimeout(() => {
            shadowElement.style.opacity = '.5';
        }, delay - 1000);
    });

    return (
        <main className='startup-container'>
<div className='bgstartup'>
    <img src={svgBg} alt='a' style={{ width: '100%', height: '100%'}}></img>
</div>

            <div className="scale">
                <div className="shadow"></div>
                <img src={smallLogo} alt="" className="logo"></img>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"
                viewBox="-25 -25 250 250" className="float">
                <path d="M198.47564580258106 82.60611648410278 C182.41177422363512 38.135949120478145 46.140912824796935 20.80588040945735 11.652967432510309 53.151287781637855 C-8.329159036927557 71.8920394693552 6.388810242506862 139.58335894997262 21.750860684181376 162.26614004684734 C33.341439662911 179.38016833094557 75.06798447566024 203.76779838275235 95.37108614213756 199.89280833221423 C133.71950421874595 192.57374246031898 211.73937396854123 119.32455067396174 198.47564580258106 82.60611648410278Z" stroke="none" fill="#ff0000" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"
                viewBox="-25 -25 250 250" className="rotate">
                <path d="M192.79015989868205 62.71748095987856 C189.28315274366562 49.735349127903724 170.4657377676516 28.54536559312239 160.051074389972 20.038331279230732 C152.70964889997694 14.041617195305946 135.05764189839186 6.1091064583176 125.96490496318623 3.429695505022309 C119.1332688016863 1.4165765848896945 104.7978512677338 -0.23435970536960882 97.68057351661562 0.026902314731813703 C89.23117811901069 0.33706389439858 72.29930193132395 3.2793430987725247 64.48890613406624 6.517583404980158 C53.9627131929778 10.881810665360334 34.48153338321112 23.67384697946165 26.689536773414105 31.98841288792478 C19.23379017559145 39.94417821852741 6.5323585615492865 58.90979206014265 4.713562366903844 69.66034273110394 C0.7064414194286606 93.3456555315854 10.85380624194804 143.3199392855256 23.133974667430934 163.96572636633505 C27.866552127653428 171.92227738435167 42.928476468168064 184.53703999702333 51.68148208884808 187.55181795296824 C75.63744816548926 195.80291724057625 129.5297012643856 194.36774799572842 152.99265931436895 184.80435165008473 C161.66652897277572 181.26892132552442 176.1983539741061 167.6775815683495 180.48420310734724 159.34890942700866 C191.6271885571321 137.6947938476286 199.141237435729 86.22770555212108 192.79015989868205 62.71748095987856Z" stroke="none" fill="#ff0000" />
            </svg>
            <div className="bg">
            </div>
        </main>

    );
}
