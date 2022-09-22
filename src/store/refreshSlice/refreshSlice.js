import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const selectRefresh = (state) => (state.refresh);

const initialState = {
    refreshTimerId: null,
    refreshFlagForTimer: false,
    refreshFlagForUseEffect: false,
}

const refreshSlice = createSlice({
    name: 'refresh',
    initialState,
    reducers: {
        changedTimer(state, action) {
            state.refreshFlagForTimer = !state.refreshFlagForTimer;
        },
        timerStarted(state, action) {
            state.refreshTimerId = action.payload;
        },
        timerCanceled(state, action) {
            clearTimeout(state.refreshTimerId);
            state.refreshTimerId = null;
        },
        changedFlagUseEffect(state, action) {
            state.refreshFlagForUseEffect = !state.refreshFlagForUseEffect;
        }
    },
});

export const { changedTimer, timerCanceled, timerStarted, changedFlagUseEffect } = refreshSlice.actions;
export const refreshReducer = refreshSlice.reducer;

export const startedTimer = createAsyncThunk('refresh/startedTimer', async (_, { dispatch, getState }) => {
    function startShit() {

        const refreshTimer = setTimeout(function refresh() {
            dispatch(changedTimer());
            console.log('jjj')
            dispatch(changedFlagUseEffect());
        }, 3600000);
        return refreshTimer;
    }

    const refreshTimerId = startShit();
    dispatch(timerStarted(refreshTimerId));
})

