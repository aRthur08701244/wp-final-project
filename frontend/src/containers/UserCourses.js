import { CAMPUS_QUERY, COURSE_SUBSCRIPTION, CREATE_COURSE_MUTATION } from "../graphql";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useDisplay } from "./hooks/useDisplay";
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import ButtonMUI from '@mui/material/Button';
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const UserCourses = () => {
    /* global google */
    const { campus, userObj, me, signedIn,  allCourse, setProfessor, setCourseName} = useDisplay()

    const [rows, setRows] = useState([]);

    const columns = [
        {
            field: 'Enter',
            renderCell: (cellValues) => {
                const id = cellValues?.row.profName + "_" + cellValues?.row.courseName.replace(' ', '-')
                const route = "chatroom/" + id;
                return (
                    <NavLink to={route}>
                        <ButtonMUI variant="contained" color="primary" onClick={(e) => {
                            if (!me) {
                                alert("Please Sign In First");
                                return;
                            }
                            setProfessor(cellValues.row.profName);
                            setCourseName(cellValues.row.profName + "_" + cellValues.row.courseName);
                        }}>
                            Link
                        </ButtonMUI>
                    </NavLink>
                )
            },
            width: '120',
            align: "left"
        },
        {
            field: 'profName',
            headerName: 'Professor',
            width: 150,
            align: "left"
        },
        {
            field: 'courseName',
            headerName: 'Course',
            width: 315,
            align: "left",
        },
    ];



    useEffect(() => {
        if (allCourse) {
            setRows(allCourse.filter(value => value.author === me).map((val, i) => {
                return (
                    {id: i, profName: val.prof, courseName: val.name.split('_')[1]}
                )
            }));

        }
    }, [signedIn]);

    return (
        <Container  maxWidth="lg" sx={{ mt: 4, mb: 4 }} style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <h1 style={{display: "flex", alignItems: "center", justifyContent: "center", borderRight: "2"}}>Created By You</h1>
            <br></br>
            <Grid container spacing={3}>
                <Box sx={{ height: 700, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={15}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                </Box>
            </Grid>
        </Container>
    )
}

export default UserCourses;