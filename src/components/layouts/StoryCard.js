import React,{Fragment} from 'react'
import {Link} from 'react-router-dom'
import {titleAr,maskColor,btnColor} from './../../utils/functions'
const StoryCard = ({story:{story,desc,image},index})=>{
    const btnColors = ["peach-gradient","purple-gradient","tempting-azure-gradient","young-passion-gradient"]
    const maskColors = ["rgba-orange","rgba-purple","rgba-green","rgba-red"]
    return(
        <Fragment>
            <div className="card card-cascade narrower my-6">
                <div className="view view-cascade overlay">
                    <img src={image} className="card-img-top" width="400px" height="400px"/>
                    <Link to={"/story/"+story}>
                        <div className={"mask "+maskColors[index]+"-light"}></div>
                    </Link>
                </div>
                <div dir='rtl' className="card-body card-body-cascade text-center d-flex flex-column">
                    <h4 className="card-title">{titleAr(story)}</h4>
                    <p className="card-text">{desc}...</p>
                    <Link style={{color:"white"}} to={"/story/"+story}  className={"mt-auto btn "+btnColors[index]}>قراءة</Link>
                </div>
            </div>
        </Fragment>
    )
}

export default StoryCard