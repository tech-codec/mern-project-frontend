import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getTrends } from '../actions/post.action';
import postReducer from '../reducers/posts.reducer';
import { isEmpty } from '../utils';

const Trends = () => {

    const posts = useSelector((state)=>state.allPostsReducer);
    const userData = useSelector((state)=>state.userReducer)
    const dispatch = useDispatch();
    const trendList = useSelector((state)=>state.trendingReducer)

    useEffect(()=>{
        if(!isEmpty(posts[0])){
            const postsArr = Object.keys(posts).map((i)=>posts[i]);
            let sorteArray = postsArr.sort((a,b)=>{
                return b.likers.length - a.likers.length;
            })
            sorteArray.length = 3
            dispatch(getTrends(sorteArray))
        }
    },[posts,dispatch])

    return (
        <div className='trending-container'>
            <NavLink exact={"true"} to="/trending">
                <ul>
                    {trendList.length && 
                    trendList.map((post)=>{
                        return(
                            <li key={post._id}>
                                <div>
                                    {post.picture && <img src={post.picture} alt="post-pic" /> }
                                    {post.video && (
                                        <iframe
                                            src={post.video}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={post._id}
                                        ></iframe>
                                    )}
                                    {isEmpty(post.picture) && isEmpty(post.video) && (
                                        <img src={userData[0] && userData.map((user)=>{
                                            if(user._id === post.posterId){
                                                return user.picture;
                                            }else return null;
                                        }).join("")
                                    } alt="profil-pic"/>
                                    )}
                                </div>
                                <div className='trend-content'>
                                    <p>{post.message}</p>
                                    <span>Lire</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </NavLink>
        </div>
    );
};

export default Trends;