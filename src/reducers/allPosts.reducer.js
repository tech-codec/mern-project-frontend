import { GET_ALL_POSTS } from "../actions/post.action";

const initialSate = {};

export default function allPostsReducer(state=initialSate,action){
    switch(action.type){
        case GET_ALL_POSTS:
            return action.payload
        default:
            return state
    }
}