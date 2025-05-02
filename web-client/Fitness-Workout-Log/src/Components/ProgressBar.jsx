import React,{useState,useEffect} from 'react'

export default function ProgressBar() {
    const [scrollPercentage,setScrollPercentage]=useState(0);

    useEffect(()=>{
        const handleScroll =()=>{
            const scrollTop=window.scrollY;
            const docHeight=document.body.offsetHeight-window.innerHeight;
            const scrollPercent=(scrollTop/docHeight)*100;
            setScrollPercentage(scrollPercent);
        };
        window.addEventListener('scroll',handleScroll);
        return ()=>{
            window.removeEventListener('scroll', handleScroll);
        };
    },[]);

  return (
    <div className='fixed top-0 left-0 h-2.5 border-none rounded-[2px] bg-green-500 z-50 ' style={{width:`${scrollPercentage}%`}}></div>
  )
}
