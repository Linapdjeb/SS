import React from 'react';
// import { useSelector } from 'react-dom';

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
// import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';

import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';
import LabelIcon from '@mui/icons-material/Label';
import StarIcon from '@mui/icons-material/Star';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';

const Task = () => {
    // const { task, loading } = useSelector(state => state.task);

    const card = (
        <React.Fragment>
            <CardHeader
                avatar={
                    false ? (
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    ) : (
                        <Avatar sx={{ bgcolor: red[500] }}>
                            lee
                        </Avatar>
                    )
                }
                action={
                    true ? (
                        <>
                            <LabelImportantIcon/>
                            <StarIcon />
                            <LabelIcon/>
                            <LockIcon />
                        </>
                    ) : (
                        <>
                            <LabelIcon />
                            <PublicIcon />
                        </>
                    )
                }
                
                title={false ? (
                        <Skeleton
                        animation="wave"
                        height={10}
                        width="75%"
                        style={{ marginBottom: 6 }}
                        />
                    ) : ("assigned to")
                }
                subheader={false ? (
                    <Skeleton animation="wave" height={10} width="40%" />
                  ) : ("due date: 00/00/00")}
            />
          
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2, mr: 2 }}>
                    {false ? <Skeleton /> : 'Task name (workspace)'}
                </Typography>
            
                <Typography variant="body1">
                    {false ? <Skeleton /> : 'description of the task. yk.'}
                    {/* <br /> */}
                </Typography>
            
            </CardContent>
            <CardActions>
                <Button size="small">edit</Button>
                <Button size="small">delete</Button>
            </CardActions>
        </React.Fragment>
    );


    return (
        // {loading ? <>cat</> : <>dog</>}
        <Box sx={{ minWidth: 243 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    )
};

export default Task;