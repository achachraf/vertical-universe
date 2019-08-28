import React, { useState, Fragment, useEffect } from "react";
import { intToAr, titleAr, completeTitle, colors,checkChapter } from "../utils/functions";
import axios from "axios";
import Interactive from "./Interactive";
import {Redirect} from 'react-router-dom'
import TitleComponent from "./layouts/TitleComponent";

const Chapter = ({match:{params:{story,chapter}}}) => {
  const [state, setState] = useState({
    story,
    chapter: parseInt(chapter, 10),
    image: "",
    text: "",
    redirect:null,
    loading: true
  });

  //check page
  useEffect(()=>{
    if(!checkChapter(story,chapter)){
      setState({
        ...state,
        redirect: true
      })
    }
  },[state.text])
  // call the API
  useEffect(() => {
    const callAPI = async () => {
      
      try {
        const response = await axios.get("/data/" + story + "/" + chapter);
        
        if (response.status === 404) {
          setState({
            ...state,
            text: "Chapter or story not exists"
          });
        } else {
          setState({
            ...state,
            text: response.data.story.text,
            image: response.data.story.image,
            loading: false
          });
         
        }
      } catch (err) {
        console.log(err);
      }
    };

    callAPI();
  }, []);


  return (
    <Fragment>
      {state.redirect && (<Redirect to={{
        pathname: '/404',
        state: {url:" الفصل " + chapter + " من " + titleAr(story)}
      }} />)}
      <TitleComponent title={completeTitle(story,chapter)} />
      {!state.loading && (
        <div className="container ">
        <div className="row justify-content-md-center">
          <div className="card card-cascade wider reverse w-100">
            <div className="view view-cascade overlay">
              <img
                className="card-img-top  z-depth-1"
                src={state.image}
                alt="Card image cap "
                height="400px"
              />
              <a href="#!">
                <div className={"mask flex-center rgba-"+colors(state.story)+"-slight"}>
                  <h4 className={"mask-title white-text"} dir="rtl">
                    {completeTitle(state.story, state.chapter)}
                  </h4>
                </div>
              </a>
            </div>
            <div className="card-body card-body-cascade text-center">
                <h2 className="subtitle card-title">
                  <strong>{titleAr(state.story)} </strong>
                </h2>
                <h5 className={"subtitle font-weight-bold "+colors(state.story)+"-text py-2"}>
                  الفصل : {intToAr(state.chapter)}
                </h5> 
                <Interactive text={state.text} speed={100} story={state.story} />
                
              </div>
            </div>
          </div>
        </div>
        )}
      
    </Fragment>
  );
};

export default Chapter;
