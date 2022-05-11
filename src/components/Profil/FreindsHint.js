import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../../utils';
import FollowlHandler from './FollowlHandler';

const FreindsHint = () => {
    const [isLoading, setIsLoading]= useState(true);
    const [playOnce, setPlayOnce] = useState(true);
    const [FreindsHint, setFriendsHint] = useState([]);
    const userData = useSelector((state)=>state.userReducer);
    const usersData = useSelector((state)=>state.usersReducer)
    
    useEffect(()=>{
        const notFriendList = ()=>{
            let array = [];
            usersData.map((user)=>{
                if(user._id !== userData._id && !user.followers.includes(userData._id))
                    return array.push(user._id);
            })
            array.sort(()=>0.5-Math.random()) 
            if(window.innerHeight>780){
                array.length = 5;
            }else if(window.innerHeight> 720){
                array.length = 3;
            }else if(window.innerHeight>615){
                array.length = 2;
            }else if(window.innerHeight>540){
                array.length = 1;
            }else{
                array.length=0;
            }
            setFriendsHint(array)
        }
        if(playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)){
            notFriendList();
            setIsLoading(false);
            setPlayOnce(false)
        }
    },[usersData,userData,playOnce])


    return (
        <div className='get-friends-container'>
            <h4>Suggestions</h4>
            {isLoading ? (
                <div className='icon'>
                    <i className='fas fa-spinner fa-pulse'></i>
                </div>
            ):(
                <ul>
                    {FreindsHint && FreindsHint.map((user)=>{
                        for(let i =0; i<usersData.length; i++ ){
                            if(user=== usersData[i]._id){
                                return (
                                    <li className='user-hint' key={user}>
                                        <img src={usersData[i].picture} alt="user-pic" />
                                        <p>{usersData[i].pseudo}</p>
                                        <FollowlHandler idTofollow={usersData[i]._id} type={"suggestion"} />
                                    </li>
                                )
                            }
                        }
                    })}
                </ul>
            )}
        </div>
    );
};

export default FreindsHint;