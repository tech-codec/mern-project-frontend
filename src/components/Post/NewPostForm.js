import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, timestampParser } from '../../utils';
import {NavLink} from 'react-router-dom'
import { addPost, getPosts } from '../../actions/post.action';

const NewPostForm = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [postPicture, setPostPicture] = useState(null);
    const [video, setVideo] = useState('');
    const [file, setFile] = useState();
    const userData = useSelector((state)=>state.userReducer);

    const dispatch = useDispatch();
    const error = useSelector((state)=>state.errorReducer.postError)

    const handlePicture = (e)=>{
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        setVideo('');
    }

    const handlePost = async ()=>{
        if(message || postPicture || video){
            const data = new FormData();
            data.append('posterId', userData._id);
            data.append('message',message);
            if(file) data.append('file',file);
            data.append('video',video)
            await dispatch(addPost(data));
            dispatch(getPosts);
            cancelPost();
        }else{
            alert("veullez entrer un message")
        }
    }

    const cancelPost = ()=>{
        setMessage('');
        setVideo('');
        setPostPicture('');
        setFile('');
    }

    useEffect(()=>{
        if(!isEmpty(userData)) setIsLoading(false);
        const handlevideo = ()=>{
            let findLink = message.split(' ') ;
            for(let i=0; i<findLink.length; i++){
                if(findLink[i].includes("https://www.yout") || findLink[i].includes("https://yout")){
                    let embed = findLink[i].replace('watch?v=', "embed/")
                    setVideo(embed.split('&')[0]);
                    findLink.splice(i,1)
                    setMessage(findLink.join(" "))
                    setPostPicture('');
                }
            }
        }
        handlevideo()
    },[userData, message, video])

    


    return (
        <div className='post-container'>
           {isLoading ? (
               <i className='fas fa-spinner fa-pulse'></i>
           ):(
               <>
                    <div className='data'>
                        <p>
                            <span>{userData.following ? userData.following.length:0}
                            </span>{''}
                            Abonnements
                        </p>
                        <p>
                            <span>{userData.followers ? userData.followers.length:0}
                            </span> {''}
                            Abonnés
                        </p>
                    </div>
                    <NavLink exact={"true"} to="profil">
                        <div className='user-info'>
                            <img src={userData.picture} alt="user-img" />
                        </div>
                    </NavLink>
                    <div className='post-form'>
                        <textarea 
                            name='"message'
                            id="message"
                            placeholder='Quoi de neuf ?'
                            onChange={(e)=>setMessage(e.target.value)}
                            value = {message}
                        />
                        {message || postPicture || video.length>20 ?(
                            <li className='card-container'>
                                <div className='card-left'>
                                    <img src={userData.picture} alt='img' />
                                </div>
                                <div className='card-right'>
                                    <div className='card-header'>
                                        <div className='pseudo'>
                                            <h3>{userData.pseudo}</h3>
                                        </div>
                                        <span>{timestampParser(Date.now())}</span>
                                    </div>
                                    <div className='container'>
                                        <p>{message}</p>
                                        <img src={postPicture} alt="" />
                                        {video && (
                                            <iframe
                                            src={video}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={video}
                                        ></iframe>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ):null}
                    <div className='footer-form'>
                        <div className='icon'>
                            {isEmpty(video) && (
                                <>
                                    <img src='./img/icons/picture.svg' alt='img' />
                                    <input type='file' id="file-upload" 
                                    name='file' accept='jpg, png, jpeg' 
                                    onChange={(e)=>handlePicture(e)}
                                    />
                                </>
                            )}
                            {video && (
                                <button onClick={()=>setVideo('')}>Supprimer video</button>
                            )}
                        </div>
                        {!isEmpty(error.format) && <p>{error.format}</p>}
                        {!isEmpty(error.maxsize) && <p>{error.maxsize}</p>}
                        <div className='btn-send'>
                                {message|| postPicture || video ? (
                                    <button className='cancel' onClick={cancelPost} >Annuler Message</button>
                                ):null}
                            <button className='send' onClick={handlePost}>Envoyer</button>
                        </div>
                    </div>
                    </div>
               </>
           )}
        </div>
    );
};

export default NewPostForm;