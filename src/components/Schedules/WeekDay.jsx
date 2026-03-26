import React, { useState } from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import Schedules from './Schedules';

const WeekDay = () => {
    const day = new Date().toLocaleString("en", { weekday: "long" }).toLowerCase()
    const [weekday, setWeekday] = useState(day)
    const week = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ]

    return (
        <Box sx={{ py: 4 }}>
            <Container maxWidth="xl">
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                        Weekly Schedules
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Discover what's airing today and the rest of the week
                    </Typography>
                </Box>

                <Box 
                    sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: 2, 
                        justifyContent: 'center',
                        mb: 6,
                        px: 2
                    }}
                >
                    {week.map((item, idx) => {
                        const isSelected = item.toLowerCase() === weekday;
                        return (
                            <Button
                                key={idx}
                                size='large'
                                variant={isSelected ? "contained" : "outlined"}
                                onClick={() => setWeekday(item.toLowerCase())}
                                sx={{
                                    borderRadius: '24px',
                                    px: 3,
                                    py: 1,
                                    fontWeight: 600,
                                    textTransform: 'capitalize',
                                    boxShadow: isSelected ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
                                    borderColor: isSelected ? 'transparent' : 'divider',
                                    color: isSelected ? '#fff' : 'text.primary',
                                    bgcolor: isSelected ? 'primary.main' : 'transparent',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        bgcolor: isSelected ? 'primary.dark' : 'rgba(99, 102, 241, 0.04)',
                                    }
                                }}
                            >
                                {item}
                            </Button>
                        )
                    })}
                </Box>
                
                <Schedules weekday={weekday} />
            </Container>
        </Box>
    )
}

export default WeekDay