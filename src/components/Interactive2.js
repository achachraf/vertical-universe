import React,{useState,useEffect,Fragment} from 'react'
import { stat } from 'fs';

const Interactive2 = ({text,speed})=>{
    const [state, setState] = useState({
        text: "",
        stopped : null,
        speed : 0
    })
    useEffect(() => {
        //console.log("okk")
            setState({
                text,
                speed,
                stopped: true
            })
        
    }, [text])

    const printData = (char)=>{
        return new Promise(resolve=>{
            setTimeout(()=>{
                document.getElementById("liveText").textContent += char;
                resolve();
            },speed)
        })
    }

    const asyncCall = async (text)=>{
        let index = 0;
        for(let char of text){
            await printData(char)
            index++;
            // const stopped = (document.getElementById("change").getAttribute("stopped") == "true")
            // console.log(stopped)
            if(state.stopped === true){
                document.getElementById("change").setAttribute("index",index)
                break;
            }
        }
    }

    useEffect(()=>{
        const change = document.getElementById("change");
        // const stopped = change.getAttribute("stopped");
        // console.log(change.getAttribute("stopped"))
        if(state.stopped && change.getAttribute("index") != 0){
            console.log("eeeeeeeeee")
            // document.getElementById("change").setAttribute("stopped","false")
            setState({
                stopped:false
            })
            asyncCall(state.text);
        }
    },[state.text,state.stopped])

    const handleClick = async () =>{
        const change = document.getElementById("change");
        // const stopped = (change.getAttribute("stopped") == "true")
        // console.log(stopped)
        if(!state.stopped){
            //we stop it
            change.textContent = "تشغيل"
            // change.setAttribute("stopped","true")
            setState({
                stopped: true
            })
        }
        else{
            change.textContent = "إيقاف";
            let index = parseInt(change.getAttribute("index"),10);
            //await asyncSetState(state.text.substr(index))
            setState({
                ...state,
                text: state.text.substr(index)
            })
        }
    }


    return(
        <Fragment>
            <button class="btn btn-primary" index="0" id="change"  onClick={handleClick}>تشغيل</button>
            <p style={{fontSize:"20px"}} className="card-text" id="liveText" ></p>
        </Fragment>
    )
}   
export default Interactive2