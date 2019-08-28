import React,{useState,useEffect,Fragment} from 'react'
import {Redirect} from 'react-router-dom'
import {colors,btnColor} from "./../utils/functions"

const Interactive = ({text,speed,story})=>{
    
    const [state, setState] = useState({
        text,
        speed,
        redirect:null
    })
    useEffect(() => {
            setState({
                text,
                speed,
                redirect:false
            })
        
    }, [text])

    const sleep = (ms)=>{
        return new Promise(resolve=>{setTimeout(resolve,ms)})
    }

    const printData = (char)=>{
        
            return new Promise(resolve=>{
                setTimeout(()=>{
                    window.scrollTo(0,document.body.scrollHeight)
                    if(document.getElementById("liveText") !== null){
                        document.getElementById("liveText").textContent += char;
                        resolve();
                    }
                },speed)    
            })
    }

    const asyncCall = async (text)=>{
        let index = 0;
        for(let char of text){
                if(state.redirect) return 
                const data = await printData(char);
                index++;
                const stopped = (document.getElementById("change").getAttribute("stopped") == "true")
                if(stopped === true){
                    document.getElementById("change").setAttribute("index",index)
                    break;
                }                
        }
    }

    useEffect(()=>{
        document.getElementById("change").setAttribute("stopped","false")
        asyncCall(state.text);
        
    },[state.text])
    
    const handleClick = async () =>{
        // await sleep(50)
        const change = document.getElementById("change");
        const stopped = (change.getAttribute("stopped") == "true")
        if(!stopped){
            //we stop it
            change.textContent = "تشغيل"
            change.setAttribute("stopped","true")
        }
        else{
            change.textContent = "إيقاف";
            let index = parseInt(change.getAttribute("index"),10);
            setState({
                ...state,
                text: state.text.substr(index)
            })       
        }
    }
    const showAll = async ()=>{
        const change = document.getElementById("change");
        const stopped = (change.getAttribute("stopped") == "true")
        if(!stopped){
            change.click();
        }
        change.style.display = "none";
        await sleep(100)
        document.getElementById("liveText").textContent = "";
        document.getElementById("liveText").textContent = state.text;
    }
    return(
        <Fragment>
            {state.redirect && (<Redirect to="/"></Redirect>)}
            <button style={{color:"white"}} className={"btn "+btnColor(story)} index="0" id="change" stopped="true" onClick={handleClick}>إيقاف</button>
            <button onClick={showAll} style={{color:"white"}} className={"btn "+btnColor(story)}>إظهار الكل</button><br/>
            <p style={{fontSize:"20px"}} className="mt-3 story-text card-text" id="liveText" ></p>
        </Fragment>
    )
}   
export default Interactive