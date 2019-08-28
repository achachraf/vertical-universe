import React,{Fragment} from 'react'
import TitleComponent from './TitleComponent';

const NotFound = (props)=>{
    let url;
    if(props.location.state) url = props.location.state.url;
    else url = window.location.pathname
    return(
        <Fragment>
            <TitleComponent title={"خطأ في الصفحة"} />
            <h1 className="my-5 black-text text-center title"><strong className="mx-2 pink-text">{url}</strong>  غير متوفر</h1>
        </Fragment>
    )
}
export default NotFound