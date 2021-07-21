import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { WeatherResponse } from '../../models/WeatherResponse';
import '../../styles/weatherInfo.css';

type WeatherInfoProps = {
    weather: WeatherResponse;
};

const WeatherInfo = (props: WeatherInfoProps) => {

    const { weather } = props;

    return (
        <>
            <Typography className="weather-text">
                Current Weather
            </Typography>
            <Paper elevation={2} className="weather-box">
                <Grid container direction="column">
                    <Typography className="weather-text">
                        {weather.description}
                    </Typography>
                    <img
                        className="weather-image"
                        src={`${process.env.PUBLIC_URL}/images/weather/${weather.icon}.png`}
                        alt={`${weather.description} weather`}
                    />
                    <Typography className="weather-text">
                        {weather.degreesC} °C
                    </Typography>
                </Grid>
            </Paper>
        </>
    );
};

export default WeatherInfo;