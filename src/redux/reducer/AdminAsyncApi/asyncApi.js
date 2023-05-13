import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { services } from 'services/async_api'

// First, create the thunk
export const fetchUserListing = createAsyncThunk(
  'users/fetchUserListing',
  async () => {
    try {
      const response = await services.user_listing()
      console.log(response.data)
      return response.data
    } catch (err) {
      console.log("err", err)
      return err.response.data
    }
  }
)

// add new user
export const addNewUser = createAsyncThunk(
  'users/addNewUser',
  async (data) => {
    try {
      const response = await services.add_new_user(data)
      return response.data
    } catch (err) {
      console.log("err", err)
      return err.response.data
    }
  }
)

// update user
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (data) => {
    try {
      const response = await services.update_user(data)
      return response.data
    } catch (err) {
      return err.response.data
    }
  }
)

// get user by id
export const getUserByID = createAsyncThunk(
  'users/getUserById',
  async (data) => {
    try {
      const response = await services.getUserById(data)
      return response.data
    } catch (err) {
      return err.response.data
    }
  }
)

// make inactive user
export const makeInactiveUser = createAsyncThunk(
  'users/makeInactiveUser',
  async (data) => {
    try {
      const response = await services.make_incative_user(data)
      return response.data
    } catch (err) {
      return err.response.data
    }
  }
)

// make is Admin
export const makeIsAdmin = createAsyncThunk(
  'users/makeIsAdmin',
  async (data) => {
    try {
      const response = await services.make_is_admin(data)
      return response.data
    } catch (err) {
      return err.response.data
    }
  }
)
// user listing
export const orderListing = createAsyncThunk(
  'users/orderListing',
  async (data) => {
    try {
      const response = await services.orderlisting(data)
      return response.data
    } catch (err) {
      return err.response.data
    }
  }
)

// user details
export const orderDetails = createAsyncThunk(
  'users/orderDetails',
  async (data) => {
    try {
      const response = await services.orderDetails(data)
      return response.data
    } catch (err) {
      return err.response.data
    }
  }
)

// get order by id
export const getOrderByID = createAsyncThunk(
  'users/getOrderByID',
  async (data) => {
    try {
      const response = await services.get_order_by_id(data)
      return response.data
    } catch (err) {
      return err.response.data
    }
  }
)


// download pdf
export const download_pdf = createAsyncThunk(
  'users/downloadPdf',
  async (data) => {
    try {
      return services.downloadPdf(data)
    } catch (err) {
      return err.response.data
    }
  }
)

// download all pdf
export const downloadAllPdf = createAsyncThunk(
  'users/downloadAllPdf',
  async (data) => {
    try {
      return services.download_all_pdf(data)
    } catch (err) {
      return err.response.data
    }
  }
)

// download single report 
export const downloadReport = createAsyncThunk(
  'users/downloadReport',
  async (data) => {
    try {
      return services.download_report(data)
    } catch (err) {
      return err.response.data
    }
  }
)

// download all reports
export const downloadAllReport = createAsyncThunk(
  'users/downloadAllReport',
  async (data) => {
    try {
      return services.download_all_report(data)
    } catch (err) {
      return err.response.data
    }
  }
)

// order in process
export const orderInProcess = createAsyncThunk(
  'users/orderInProcess',
  async (data) => {
    try {
      const response = await services.order_in_process(data)
      return response.data
    } catch (err) {
      return err.response.data
    }
  }
)

const initialState = {
  user_listing: {},
  addUpdateUser: {},
  getUserDataById: {},
  order_listing: {},
  order_details: {},
  order_In_Process: {},
  loading: false,
  error: {},
  getOrderDetails:{},
  focusId: null
}

// Then, handle actions in your reducers:
const adminSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    removeMessage: (state) => {
      state.addUpdateUser = {}
    },
    focusElement: (state, payload) => {
      state.focusId = payload
    },
    tableDes: (state, payload) => {
      state.order_details = {}
    },
    removeUserList: (state, payload) => {
      state.user_listing = {}
    },
  },
  
  extraReducers: (builder) => {
    //  get user listing insde Admin 
    builder.addCase(fetchUserListing.fulfilled, (state, action) => {
      state.user_listing = action.payload
      state.loading = false
    })
    builder.addCase(fetchUserListing.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
    builder.addCase(fetchUserListing.pending, (state) => {
      state.loading = true
    })

    // create user inside Admin
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      state.addUpdateUser = action.payload
      state.loading = false
    })
    builder.addCase(addNewUser.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
    builder.addCase(addNewUser.pending, (state) => {
      state.loading = true
    })

    // update user
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.addUpdateUser = action.payload
      state.loading = false
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true
    })

    // get user by id
    builder.addCase(getUserByID.fulfilled, (state, action) => {
      state.getUserDataById = action.payload
      state.loading = false
    })
    builder.addCase(getUserByID.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
    builder.addCase(getUserByID.pending, (state) => {
      state.loading = true
    })

    // make inactive
    builder.addCase(makeInactiveUser.fulfilled, (state, action) => {
      state.addUpdateUser = action.payload
      state.loading = false
    })
    builder.addCase(makeInactiveUser.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
    builder.addCase(makeInactiveUser.pending, (state) => {
      state.loading = true
    })

    // make admin
    builder.addCase(makeIsAdmin.fulfilled, (state, action) => {
      state.addUpdateUser = action.payload
      state.loading = false
    })
    builder.addCase(makeIsAdmin.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
    builder.addCase(makeIsAdmin.pending, (state) => {
      state.loading = true
    })

    // get order listing
    builder.addCase(orderListing.fulfilled, (state, action) => {
      state.order_listing = action.payload
      state.loading = false
    })
    builder.addCase(orderListing.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
    builder.addCase(orderListing.pending, (state) => {
      state.loading = true
    })

    // get order details
    builder.addCase(orderDetails.fulfilled, (state, action) => {
      state.order_details = action.payload
      state.loading = false
    })
    builder.addCase(orderDetails.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
    builder.addCase(orderDetails.pending, (state) => {
      state.loading = true
    })

    // order in process
    builder.addCase(orderInProcess.fulfilled, (state, action) => {
      state.order_In_Process = action.payload
      state.loading = false
    })
    builder.addCase(orderInProcess.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
    builder.addCase(orderInProcess.pending, (state) => {
      state.loading = true
    })

    // download pdf
    builder.addCase(download_pdf.fulfilled, (state, action) => {
      state.loading = false
    })
    builder.addCase(download_pdf.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
    builder.addCase(download_pdf.pending, (state) => {
      state.loading = true
    })

    // download all pdf
    builder.addCase(downloadAllPdf.fulfilled, (state, action) => {
      state.loading = false
    })
    builder.addCase(downloadAllPdf.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
    builder.addCase(downloadAllPdf.pending, (state) => {
      state.loading = true
    })

    // download report
    builder.addCase(downloadReport.fulfilled, (state, action) => {
      state.loading = false
    })
    builder.addCase(downloadReport.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
    builder.addCase(downloadReport.pending, (state) => {
      state.loading = true
    })

    // download all report
    builder.addCase(downloadAllReport.fulfilled, (state, action) => {
      state.loading = false
    })
    builder.addCase(downloadAllReport.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
    builder.addCase(downloadAllReport.pending, (state) => {
      state.loading = true
    })

    // get order by id
    builder.addCase(getOrderByID.fulfilled, (state, action) => {
      state.getOrderDetails = action.payload
      state.loading = false
    })
    builder.addCase(getOrderByID.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
    builder.addCase(getOrderByID.pending, (state) => {
      state.loading = true
    })

  },
})
export const { removeMessage, focusElement ,tableDes ,removeUserList } = adminSlice.actions
export default adminSlice.reducer
