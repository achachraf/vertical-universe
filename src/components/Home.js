import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StoryCard from "./layouts/StoryCard";
import axios from "axios";
import TitleComponent from "./layouts/TitleComponent";

const Home = () => {
  const [state, setState] = useState({
    stories: [],
    readyData: []
  });

  //call API
  useEffect(() => {
    try {
      const callAPI = async () => {
        const response = await axios.get("https://shrouded-sands-99444.herokuapp.com/data");
        setState({
          ...state,
          stories: response.data.stories
        });
      };
      callAPI()
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if(state.stories){
      let pair = [];
      let readyData = [];
      let i = 0;
      for (let story of state.stories) {
        pair = [...pair, story];
        if (i % 2) {
          readyData = [...readyData, pair];
          pair = [];
        }
        i++;
      }
      setState({
        ...state,
        readyData
      });
    }
  }, [state.stories]);
  return (
    <Fragment>
      <TitleComponent />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="my-5 text-center">
              <h1 className="title">كون عمودي</h1>
            </div>
          </div>
        </div>
        {state.readyData.map((pair, i) => {
          return (
            <div className="row mb-5" key={i}>
              <div className="card-deck">
                {pair.map((story,j ) => {
                  return(
                  <StoryCard story={story} index={2*i+j}  key={10 * i + j} />
                )
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Home;
