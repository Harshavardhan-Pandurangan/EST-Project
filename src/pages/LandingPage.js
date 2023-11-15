import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Grid } from "@mui/material";

export default function LandingPage() {
    const [year, setYear] = useState(1975);
    const [type, setType] = useState("general");

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
                        Map goes here
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
