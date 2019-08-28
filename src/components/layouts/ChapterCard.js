import React,{Fragment} from 'react'
import {Link} from 'react-router-dom'
import {titleAr,intToAr,colors,btnColor} from './../../utils/functions'


const ChapterCard = ({chapter:{chapter,desc,image},story})=>{
   
    return(
        <Fragment>
            <div dir="rtl" className="card col-lg-4 col-sm-4  card-cascade narrower mb-6">
                <div className="view view-cascade overlay">
                    <img src={image} className="card-img-top" width="400px" height="400px"/>
                    <Link to={"/chapter/"+story+"/"+chapter.replace(".txt","")}>
                        <div className={"mask rgba-"+colors(story)+"-slight"}></div>
                    </Link>
                </div>
                <div dir='rtl' className="card-body card-body-cascade text-center d-flex flex-column">
                    <h4 className="card-title">{titleAr(story)}</h4>
                    <h5 className={colors(story)+"-text"}><strong>الفصل {(intToAr(chapter.replace(".txt","")))} </strong></h5>
                    <p className="card-text">{desc}...</p>
                    <Link  style={{color:"white"}} to={"/chapter/"+story+"/"+chapter.replace(".txt","")}  className={"mt-auto btn "+btnColor(story)}>قراءة</Link>
                </div>
            </div>
        </Fragment>
    )
}

export default ChapterCard