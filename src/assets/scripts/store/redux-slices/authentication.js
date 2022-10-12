import { createSlice } from "@reduxjs/toolkit";


let user = localStorage.getItem("user");
if(!user){
  user={
    connected: false,
    token: null,
    id:null,
    data:{}
  }
}else{
  try{
    user = JSON.parse(user);
    // instance.defaults.headers.common['Authorization'] = 'Bearer ' + user.token
  }catch{
    user={
      connected: false,
      token: null,
      id:null,
      data:{}
    }
  }  
}

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    connected: user.connected,
    token: user.token,
    id: user.id,
    data: user.data,
  },
  reducers: {
    setConnected: (state, action) => {
      state.connected = true;
      state.token = action.payload.token;
      state.id = action.payload.userID;
      console.log(action);
      localStorage.setItem('user', JSON.stringify({
        connected: state.connected,
        token: state.token,
        id: state.id,
        data: state.data,
      }));
    },
    setData: (state, action) => {
      state.id = action.payload._id;
      state.data = action.payload;
    },
  },
});

export const { setConnected, setData } = authenticationSlice.actions;

export default authenticationSlice.reducer;
