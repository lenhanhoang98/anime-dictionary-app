import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://api.jikan.moe/v4'

const createRequest = (url) => ({ url })

export const jikanApi = createApi({
    reducerPath: 'jikanApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getAnimeFull: builder.query({
            query: () => createRequest(`/anime`)
        }),
        getUpComingAnime: builder.query({
            query: (pages) => createRequest(`/seasons/upcoming?letter=&page=${pages}`)
        }),
        getTop: builder.query({
            query: ({type, pages}) => createRequest(`/top/${type}?letter=&page=${pages}`)
        }),
        getRecommendations: builder.query({
            query: () => createRequest(`/recommendations/anime`)
        }),
        getFullById: builder.query({
            query: ({ type, id }) => createRequest(`/${type}/${id}/full`)
        }),
        getRandomAnime: builder.query({
            query: () => createRequest(`/random/anime`)
        }),
        getAnimeSearch: builder.query({
            query: (input) => createRequest(`/anime?q=${input}`)
        }),
        getSchedulesAnime: builder.query({
            query: (day) => createRequest(`/schedules/${day}`)
        }),
    })
})

export const {
    useGetAnimeFullQuery,
    useGetUpComingAnimeQuery,
    useGetTopQuery,
    useGetRecommendationsQuery,
    useGetFullByIdQuery,
    useGetRandomAnimeQuery,
    useGetAnimeSearchQuery,
    useGetSchedulesAnimeQuery,
} = jikanApi;