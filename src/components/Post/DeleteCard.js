import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/post.action';

const DeleteCard = ({id}) => {

    const dispatch = useDispatch();

    const deleteQuote = ()=>{
        dispatch(deletePost(id))
    }

    return (
        <div onClick={() =>{
            if(window.confirm("Voulez-vous supprimer cet article ?")){
                deleteQuote();
            }
                
        }}>
            <img src='./img/icons/trash.svg' alt='trash' />
        </div>
    );
};

export default DeleteCard;