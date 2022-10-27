import React from 'react'

import { CircularProgress, Grid } from '@mui/material'

const Loader = () => {
  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center">
        <CircularProgress />
      </Grid>
    </div>
  )
}

export default Loader