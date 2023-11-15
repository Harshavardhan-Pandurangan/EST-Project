import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const [year, setYear] = useState(1975);
    const [type, setType] = useState("general");

    let navigate = useNavigate();

    // listen for key clicks
    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    setYear(year - 1);
                    break;
                case "ArrowRight":
                    setYear(year + 1);
                    break;
                case "ArrowUp":
                    if (type === "general") setType("forest");
                    else setType("general");
                    break;
                case "ArrowDown":
                    if (type === "general") setType("forest");
                    else setType("general");
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
                <Typography variant="h2">Blah</Typography>
            </div>

            <div style={{ width: "80%", height: "70%" }}>
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
                    <Grid item xs={12} md={6}>
                        <Grid item></Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                style={{
                                    margin: "2vh",
                                    zIndex: 100,
                                    backgroundColor: "#557C55",
                                }}
                                onClick={() => {
                                    navigate(
                                        "/country_stats/ivory/1975/general"
                                    );
                                }}
                            >
                                Ivory Coast
                            </Button>
                            <Button
                                variant="contained"
                                style={{
                                    margin: "2vh",
                                    zIndex: 100,
                                    backgroundColor: "#557C55",
                                }}
                                onClick={() => {
                                    navigate(
                                        "/country_stats/liberia/1975/general"
                                    );
                                }}
                            >
                                Liberia
                            </Button>
                            <Button
                                variant="contained"
                                style={{
                                    margin: "2vh",
                                    zIndex: 100,
                                    backgroundColor: "#557C55",
                                }}
                                onClick={() => {
                                    navigate(
                                        "/country_stats/senegal/1975/general"
                                    );
                                }}
                            >
                                Senegal
                            </Button>
                            <Button
                                variant="contained"
                                style={{
                                    margin: "2vh",
                                    zIndex: 100,
                                    backgroundColor: "#557C55",
                                }}
                                onClick={() => {
                                    navigate(
                                        "/country_stats/sierra/1975/general"
                                    );
                                }}
                            >
                                Sierra
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        Cumulative graphs go here
                        {/* use the year and type states to show data */}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
