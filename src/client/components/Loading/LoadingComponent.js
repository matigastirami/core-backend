import React, { Component } from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import { ScaleLoader } from 'react-spinners';
import { Grid } from '@material-ui/core'


export const LoadingSpinerComponent = (props) => {
    const { promiseInProgress } = usePromiseTracker();
 
    return (
        <div>
            {
                (promiseInProgress === true) ?
                <Grid style={{
                    position: "absolute",
                    zIndex: 80000,
                    backgroundColor: "#000",
                    width: "100%",
                    height: "100%",
                    opacity: 0.5,
                    textAlign: "center",
                }}
                    container
                    direction="row"
                    alignItems="center"
                    justify="center"
                >
                    <ScaleLoader
                        sizeUnit={"px"}
                        size={150}
                        color={'#123abc'}
                    />
                </Grid>
                : null
            }
        </div>
    )
};