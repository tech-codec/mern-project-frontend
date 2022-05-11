import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/user.action';
import { isEmpty } from '../../utils';

const FollowlHandler = ({idTofollow, type}) => {
    const userData = useSelector((state)=>state.userReducer)
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch()
    const handleFollow = ()=>{
        setIsFollowed(true);
        dispatch(followUser(userData._id,idTofollow));
        
    }

    const handleUnFollow = ()=>{
        dispatch(unfollowUser(userData._id,idTofollow));
        setIsFollowed(false);

    }

    useEffect(()=>{
        if(!isEmpty(userData.following)){
            if(userData.following.includes(idTofollow)){
                setIsFollowed(true);
            }else setIsFollowed(false);
        }

    },[userData,idTofollow])

    return (
        <>
            {isFollowed && !isEmpty(userData) &&(
                <span onClick={handleUnFollow}>
                    {type==="suggestion" && (<button className='unfollow-btn'>Abonné</button>)}
                    {type==="card" && <img src="./img/icons/checked.svg" alt='checked' />}
                </span>
            )}

            {isFollowed ===false && !isEmpty(userData) &&(
                <span onClick={handleFollow}>
                    {type==="suggestion" && <button className='follow-btn'>Suivre</button>}
                    {type==="card" && <img src="./img/icons/check.svg" alt='check' />}
                </span>
            )}
            
        </>
    );
};

export default FollowlHandler;