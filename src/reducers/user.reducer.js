import { FOLLOW_USER, GET_USER, UNFOLLOW_USER, UPDATE_BIO, UPLOAD_PICTURE } from "../actions/user.action";
//import produce from "immer";

const initState = {};
 
export default function userReducer(state=initState,action){
    
    switch(action.type){
        case GET_USER:
            return action.payload;
        case UPLOAD_PICTURE:
            return{
                ...state,
                picture: action.payload
            }
        case UPDATE_BIO:
            return {
                ...state,
                bio: action.payload
            }
        case FOLLOW_USER:
            return{
                ...state,
                following: [action.payload.idTofollow, ...state.following]
            }
        case UNFOLLOW_USER:
            return{ 
                ...state,
                following:state.following.filter((id)=>id!== action.payload.idToUnfollow)
            }
                
        default:
            return state;
    }

    /*return produce(state, (draft)=>{
        switch(action.type){
            case GET_USER:
                return action.payload;
            case UPLOAD_PICTURE:
                return draft.picture = action.payload
                case UPDATE_BIO:
                    return draft.bio = action.payload;
                    
                case FOLLOW_USER:
                    return draft.following.add(action.payload.idTofollow)
                    
                case UNFOLLOW_USER:
                    return draft.following.filter((id)=> id!==action.payload.idToUnfollow)

            default:
                return state;
        }
    })*/


    
}