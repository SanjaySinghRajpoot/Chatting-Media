import * as actionTypes from './types';

/* User Action Types*/
export const setUser = user => {
    return {
        type: actionTypes.SET_USER,
        payload: {
            currentUser: user
        }
    }
}

export const clearUser = () => {
    return{
        type: actionTypes.CLEAR_USER
    }
}

/* Channels Action Types */
export const setCurrentChannel = channel => {
    return{
        type: actionTypes.SET_CURRENT_CHANNEL,
        payload: {
            currentChannel: channel
        }
    }
}

export const setPrivateChannel = isPrivateChannel => {
    return{
      type : actionTypes.SET_PRIVATE_CHANNEL,
      payload: {
        isPrivateChannel
      }
    }
}