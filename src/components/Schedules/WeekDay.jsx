import React from 'react'
import { useState } from 'react';
import { Grid, Button, Container } from '@mui/material'
import Schedules from './Schedules';

const WeekDay = () => {
    const day = new Date().toLocaleString("en", { weekday: "long" }).toLowerCase()
    const [weekday, setWeekday] = useState(day)
    const week = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ]

    const changeDay = (props) => {
        setWeekday(props)
    }

    const renderButton = (buttonItems) => {
        return buttonItems.map((items, idx) => (
            items.toLowerCase() === weekday
                ? < Button
                    key={idx}
                    size='large'
                    variant="contained"
                > {items}
                </Button >
                : < Button
                    key={idx}
                    size='large'
                    variant="outlined"
                    onClick={() => changeDay(items.toLowerCase())}
                > {items}
                </Button >
        ))
    }
    return (
        <Container sx={{ py: 0 }} maxWidth="false">
            <Grid container justifyContent="center">
                <Grid
                    maxWidth='md'
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="flex-start"
                    marginBottom='20px'
                >
                    {renderButton(week)}
                </Grid>
            </Grid>
            <Schedules weekday={weekday} />
        </Container>
    )
}

export default WeekDay