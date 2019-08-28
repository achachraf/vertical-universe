import React,{Fragment,useState,useEffect} from 'react'
import axios from "axios"
import {titleAr,checkStory} from "../utils/functions"
import ChapterCard from './layouts/ChapterCard';
import {Redirect} from "react-router-dom"
import TitleComponent from './layouts/TitleComponent';

const Story = (props)=>{
    const {story} = props.match.params
    const [state, setState] = useState({
        chapters: [],
        readyData: [],
        redirect: false
    })

     useEffect(()=>{
        if(!checkStory(story))
            setState({
                ...state,
                redirect: true
            })
     })

    //call API
    useEffect(() => {
        const callAPI = async ()=>{
            try {
                const response = await axios.get("/data/"+story);
                setState({
                    ...state,
                    chapters: response.data.chapters
                })
            } catch (err) {
                console.log(err);
            }
        }
        callAPI();
    }, [])

    useEffect(()=>{
        if(state.chapters){
            let triple = [];
            let readyData = [];
            let i = 0;
            for(var chapter of state.chapters){
                if(!(i%3)){
                    readyData = [...readyData,triple];
                    triple = [];
                }
                triple = [...triple,chapter];
                i++;
            }
            readyData = [...readyData,triple]
            setState({
                ...state,
                readyData
            })
        }
    },[state.chapters])
    return(
        <Fragment>
            <TitleComponent title={titleAr(story)} />
            {state.redirect && (<Redirect to={{
                pathname: '/404',
                state: {url:titleAr(story)}
            }}  />)}
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="mt-5 mb-3 text-center">
                            <h1 className="title ">{titleAr(story)}</h1>
                        </div>
                    </div>
                </div>
                {state.readyData.map((triple,i)=>{
                    return(
                        <div className="row mb-5" key={i}>
                            <div className="card-deck">
                                {triple.map((chapter,j)=>{
                                    return(
                                        <ChapterCard chapter={chapter} story={story} key={10*i+j} />
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
}

export default Story