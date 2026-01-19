import { createSlice } from "@reduxjs/toolkit";

const BannersSlice = createSlice({
    name: 'banners',
    initialState: {
        collections: [],
        currentlyLoadingCollectionNames: []
    },
    reducers: {
        updateCollectionLoadingState: (state, action) => {
            const { collectionName, isLoading } = action.payload;
            if (!isLoading) {
                state.currentlyLoadingCollectionNames = state.currentlyLoadingCollectionNames.filter(l => l !== collectionName);
            } else {
                state.currentlyLoadingCollectionNames.push(collectionName);
            }
        },
        setBannerGroups: (state, action) => {
            const { collectionName, bannerGroups } = action.payload;
            state.collections.push({ name: collectionName, banners: bannerGroups });
        },
    }
});

export default BannersSlice.reducer;

export const {
    updateCollectionLoadingState,
    setBannerGroups,
} = BannersSlice.actions;
