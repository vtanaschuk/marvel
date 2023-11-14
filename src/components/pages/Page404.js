import ErrorMessage from "../ErrorMessage/errorMessage";
import {Link} from "react-router-dom";

const Page404 = () =>{

    return(
        <div style={{maxWidth: '400px', width:'100%', margin:'0 auto'}}>
            <ErrorMessage />
            <p style={{fontSize: '24px', fontWeight: '600', margin:'20px 0'}}>Page does not exist</p>
            <Link style={{textDecoration:'underline'}} to='/'>Return back</Link>
        </div>
    )
}

export default Page404;