import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Grid } from "@mui/material";

export default function CountryDetails(props) {
    const { country_param, year_param, type_param } = useParams();
    console.log(country_param, year_param, type_param);

    let navigate = useNavigate();

    const [country, setCountry] = useState("ivory");
    const [year, setYear] = useState(1975);
    const [type, setType] = useState("general");

    useEffect(() => {
        setCountry(country_param);
        setYear(year_param);
        setType(type_param);
    }, [country_param, year_param, type_param]);

    // listen for key clicks
    useEffect(() => {
        let years = [1975, 2000, 2013];
        let types = ["general", "forest"];

        const handleKeyDown = (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    let prevYear = (years.indexOf(+year) + 2) % 3;
                    navigate(
                        `/country_stats/${country}/${
                            years[prevYear] + ""
                        }/${type}`
                    );
                    break;
                case "ArrowRight":
                    let nextYear = (years.indexOf(+year) + 1) % 3;
                    navigate(
                        `/country_stats/${country}/${
                            years[nextYear] + ""
                        }/${type}`
                    );
                    break;
                case "ArrowUp":
                    let nextType = (types.indexOf(type) + 1) % 2;
                    navigate(
                        `/country_stats/${country}/${year}/${types[nextType]}`
                    );
                    break;
                case "ArrowDown":
                    let prevType = (types.indexOf(type) + 1) % 2;
                    navigate(
                        `/country_stats/${country}/${year}/${types[prevType]}`
                    );
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [year, type]);

    return (
        <div
            style={{
                backgroundColor: "#F2FFE9",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
            }}
        >
            <div
                style={{
                    width: "80%",
                    textAlign: "center",
                    marginBottom: "6vh",
                }}
            >
                <Grid
                    container
                    style={{
                        backgroundColor: "#A6CF98",
                        borderRadius: 20,
                        margin: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        border: "0.5rem solid #A6CF98",
                    }}
                    width={"100%"}
                >
                    <Typography variant="h3" xs={12}>
                        {country}
                    </Typography>
                    <Typography variant="h2" xs={12}>
                        Blah
                    </Typography>
                    <Typography variant="h3" xs={12}>
                        {year}
                    </Typography>
                </Grid>
            </div>

            <div style={{ width: "90%", height: "70%" }}>
                <Grid
                    container
                    spacing={2}
                    style={{
                        backgroundColor: "#A6CF98",
                        borderRadius: 20,
                        margin: 0,
                    }}
                    height={"100%"}
                    width={"100%"}
                >
                    <Grid item xs={12} md={4}>
                        Reasoning goes here
                        {/* use the country, type and states to show data */}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        Map goes here
                        {/* use the country, year and type states to show data */}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        Cumulative graphs go here
                        {/* use the country, year and type states to show data */}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
