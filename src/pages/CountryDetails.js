import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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
    const [image_path, setImagePath] = useState("");

    const image_paths = {
        ivory: {
            general: {
                1975: "/assets/images/1975_ivory.svg",
                2000: "/assets/images/2000_ivory.svg",
                2013: "/assets/images/2013_ivory.svg",
            },
            forest: {
                1975: "/assets/images/1975_forest_ivory.png",
                2000: "/assets/images/2000_forest_ivory.png",
                2013: "/assets/images/2013_forest_ivory.png",
            },
        },
        liberia: {
            general: {
                1975: "/assets/images/1975_liberia.svg",
                2000: "/assets/images/2000_liberia.svg",
                2013: "/assets/images/2013_liberia.svg",
            },
            forest: {
                1975: "/assets/images/1975_forest_liberia.png",
                2000: "/assets/images/2000_forest_liberia.png",
                2013: "/assets/images/2013_forest_liberia.png",
            },
        },
        senegal: {
            general: {
                1975: "/assets/images/1975_senegal.svg",
                2000: "/assets/images/2000_senegal.svg",
                2013: "/assets/images/2013_senegal.svg",
            },
            forest: {
                1975: "/assets/images/1975_forest_senegal.png",
                2000: "/assets/images/2000_forest_senegal.png",
                2013: "/assets/images/2013_forest_senegal.png",
            },
        },
        sierra: {
            general: {
                1975: "/assets/images/1975_sierra.svg",
                2000: "/assets/images/2000_sierra.svg",
                2013: "/assets/images/2013_sierra.svg",
            },
            forest: {
                1975: "/assets/images/1975_forest_sierra.png",
                2000: "/assets/images/2000_forest_sierra.png",
                2013: "/assets/images/2013_forest_sierra.png",
            },
        },
    };

    useEffect(() => {
        setCountry(country_param);
        setYear(year_param);
        setType(type_param);

        setImagePath(image_paths[country_param][type_param][year_param]);
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
        <>
            <Button
                variant="contained"
                style={{
                    margin: "2vh",
                    position: "absolute",
                    zIndex: 100,
                    backgroundColor: "#557C55",
                }}
                onClick={() => {
                    navigate("/");
                }}
            >
                Back to Home
            </Button>
            <div
                style={{
                    position: "relative", // Set position to relative for the parent container
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
                        }}
                        width={"100%"}
                    >
                        <Grid
                            item
                            xs={12}
                            md={4}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography variant="h3">
                                {country.charAt(0).toUpperCase() +
                                    country.slice(1)}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h2">Blah</Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={4}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography variant="h3">{year}</Typography>
                        </Grid>
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
                        <Grid
                            item
                            xs={12}
                            md={3.7}
                            style={{
                                backgroundColor: "#557C55",
                                borderRadius: 20,
                                margin: 8,
                                color: "white",
                            }}
                        >
                            Reasoning goes here
                            {/* use the country, type and states to show data */}
                        </Grid>
                        <Grid item xs={12} md={4.2}>
                            <img
                                src={image_path}
                                alt="Country map"
                                style={{
                                    width: "90%",
                                    height: "90%",
                                    objectFit: "contain",
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={3.8}
                            style={{
                                backgroundColor: "#557C55",
                                borderRadius: 20,
                                margin: 8,
                                color: "white",
                            }}
                        >
                            Cumulative graphs go here
                            {/* use the country, year and type states to show data */}
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
}
