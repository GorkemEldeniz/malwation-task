import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../index'

// Define a type for the slice state
enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface UserState {
  id : string,
  name: string,
  email : string,
  phone : number,
  role : Role
  password : string,
  active: boolean
}

interface ErrorState {
  message : string | null | undefined,
  error : boolean,
  status : string | null | undefined
}


// Define the initial state using that type
const initialState = {
  user : JSON.parse(localStorage.getItem('user') as string) as UserState  || {
    name: '',
    email : '',
    phone : 0,
    role : Role.USER,
    password : '',
  } as UserState,
  serverError : {
    message : '',
    error : false,
    status : ''
  } as ErrorState,
  users : JSON.parse(localStorage.getItem('users') as string) as UserState[] || [] as UserState[],
  selectedUser : JSON.parse(localStorage.getItem('selectedUser') as string) as UserState  || {} as UserState
}


//update user by id
export const updateUserById = createAsyncThunk('user/update/:id', async (args:any[]) => {

  const [payload,id] = args;

  return fetch(`http://localhost:3000/user/${id}`,{
    headers : {
      'Content-Type' : 'application/json'
    },
    method:'PUT',
    body:JSON.stringify(payload)
  }).then(data => data.json()).catch(er => er)
})

//delete user by id
export const deleteUserById = createAsyncThunk('user/delete/:id', async (id:string):Promise<UserState | any > => {
  
  let user = await fetch(`http://localhost:3000/user/${id}`,{
    headers : {
      'Content-Type' : 'application/json'
    },
    method:'DELETE',
  })
  user =  await user.json();
  return user;
})


export const getUserById = createAsyncThunk('user/:id', async (id:string):Promise<UserState | any> => {
  
  let user = await fetch(`http://localhost:3000/user/${id}`,{
    headers : {
      'Content-Type' : 'application/json'
    },
  })
  user = await user.json()
  return user;
})

//get all users
export const getUsers = createAsyncThunk('users/all',async ():Promise<UserState[] | any> => {
  let users = await fetch('http://localhost:3000/all',{
    headers : {
      'Content-Type' : 'application/json'
    }
  })
  users = await users.json()
  return users
}) 

//create user
export const createUser = createAsyncThunk('user/create',async (args:object):Promise<UserState | any> => {

  let user = await fetch('http://localhost:3000',{
    headers : {
      'Content-Type' : 'application/json'
    },
    method:'POST',
    body:JSON.stringify(args)
  })
  user = await user.json();
  return user;
}) 

//login user
export const loginUser = createAsyncThunk('user/login',async (args:object):Promise<UserState | any> => {
  let user = await fetch('http://localhost:3000/login',{
    headers : {
      'Content-Type' : 'application/json'
    },
    method:'POST',
    body:JSON.stringify(args)
  });
  user = await user.json();
  return user;
}) 


export const {reducer,actions} = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut : (state) => {
      state.user = { 
      id : '',
      active:false,  
      name: '',
      email : '',
      phone : 0,
      role : Role.USER,
      password : ''}
      localStorage.removeItem('user');
      localStorage.removeItem('users');
      localStorage.removeItem('selectedUser');
    }
  },
  extraReducers:(builder) => {
    builder.addCase(createUser.fulfilled,(state,action) => {
      if(action.payload.error){
        state.serverError = {...action.payload}
      }
      else {
        state.user = {...action.payload};
        localStorage.setItem('user',JSON.stringify(state.user))
      }
    })
    builder.addCase(createUser.rejected,(state,action) => {
      state.serverError = {message : action.error.message , error:true,status:action.error.code};
    })

    builder.addCase(loginUser.fulfilled,(state,action) => {
      if(action.payload.error){
        state.serverError = {...action.payload}
      }
      else {
        state.user = {...action.payload};
        localStorage.setItem('user',JSON.stringify(state.user))
      }
    })
    builder.addCase(loginUser.rejected,(state,action) => {
      state.serverError = {message : action.error.message , error:true,status:action.error.code};
    })

    builder.addCase(getUsers.fulfilled,(state,action) => {
      state.users = action.payload;
    })
    builder.addCase(getUsers.rejected,(state,action) => {
      state.serverError = {message : action.error.message , error:true,status:action.error.code};
    })
    

    builder.addCase(getUserById.fulfilled,(state,action) => {
      state.selectedUser = action.payload;
    })
    builder.addCase(getUserById.rejected,(state,action) => {
      state.serverError = {message : action.error.message , error:true,status:action.error.code};
    })

    builder.addCase(updateUserById.fulfilled,(state,action) => {
      state.selectedUser = action.payload;
    })
    builder.addCase(updateUserById.rejected,(state,action) => {
      state.serverError = {message : action.error.message , error:true,status:action.error.code};
    })

    builder.addCase(deleteUserById.fulfilled,(state,action) => {
      state.users = state.users.filter(user => user.id !== action.payload.id);
    })
    builder.addCase(deleteUserById.rejected,(state,action) => {
      state.serverError = {message : action.error.message , error:true,status:action.error.code};
    })
  }
}) 


export const {logOut} = actions;
export const selectUser = (state: RootState) => state.user;
