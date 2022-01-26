import React from "react";
import { useParams } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import NewsHeader from "./NewsHeader";
import CommentsTree from "./CommentsTree";


function NewsPage(props){
    let params = useParams();
    console.log(params.articleId);
    return (
        <div>
            <AppNavbar/>
            <NewsHeader ident={params.articleId}/>
            <CommentsTree ident={params.articleId}/>
        </div>
    )
}


export default NewsPage;