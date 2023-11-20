import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as d3 from 'd3'
import tippy from 'tippy.js'

export default function LandingPage() {
    const [year, setYear] = useState(1975);
    const [type, setType] = useState("general");
    const [country, setCountry] = useState("west_africa");
    const [rendercount, setRendercount] = useState(0);

    let navigate = useNavigate();

    // listen for key clicks
    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    d3.select("#svgid0").remove()
                    d3.select("#svgid1").remove()
                    setRendercount(0)
                    if (year == 1975) setYear(2013);
                    else if (year == 2000) setYear(1975);
                    else if (year == 2013) setYear(2000)
                    break;
                case "ArrowRight":
                    d3.select("#svgid0").remove()
                    d3.select("#svgid1").remove()
                    setRendercount(0)
                    if (year == 1975) setYear(2000);
                    else if (year == 2000) setYear(2013);
                    else if (year == 2013) setYear(1975)
                    break;
                case "ArrowUp":
                    d3.select("#svgid0").remove()
                    d3.select("#svgid1").remove()
                    setRendercount(0)
                    if (type === "general") setType("forest");
                    else setType("general");
                    break;
                case "ArrowDown":
                    d3.select("#svgid0").remove()
                    d3.select("#svgid1").remove()
                    if (type === "general") setType("forest");
                    else setType("general");
                    break;
                default:
                    break;
            }
        };

        graphs();

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [year, type, country]);

    var m;
    var colours;
    var margin = {top: 50, right: 0, bottom: 60, left: 50},
            width = 300 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;
    useEffect(() => {

    // remove svg if exists
    // if (loaded){
    // d3.select("#svgid0").remove()
    var svg = d3.select("#my_dataviz")
    .append("svg")
        // .style("background-color", "#A6CF98")
        .attr("width", width + margin.left + margin.right + 150)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", `svgid${rendercount}`)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    console.log(svg)
    m = new Map()
    colours = new Map()
    colours.set("forest", 'darkgreen')
    colours.set("grassland", 'lightgreen')
    colours.set("desert", 'brown')
    colours.set("settlements", 'red')
    colours.set("agriculture", 'yellow')
    colours.set("water bodies", 'blue')
    colours.set("degraded forest", 'purple')
    m.set("forest", 0)
    m.set("grassland", 0)
    m.set("desert", 0)
    m.set("settlements", 0)
    m.set("agriculture", 0)
    m.set("water bodies", 0)
    m.set("degraded forest", 0)

    // setLoaded(true)}
    setRendercount(rendercount+1)

    // graphs();

    }, [year, type, country]);

    
    const graphs = async function ()
    {
        console.log(year)
        m = new Map()
        m.set("forest", 0)
        m.set("grassland", 0)
        m.set("desert", 0)
        m.set("settlements", 0)
        m.set("agriculture", 0)
        m.set("water bodies", 0)
        m.set("degraded forest", 0)

        var svg = d3.select("#svgid0")
        const data = await d3.csv(`https://raw.githubusercontent.com/Harshavardhan-Pandurangan/EST-Project/main/src/dataset/${country}.csv`)
        var categories = []

        // const year = 2000
        const data2 = []
        var scale = 0.00001

        for(var i=0; i<data.length; i++)
        {             
            if (!categories.includes(data[i]["Category"]))
            {
                categories.push(data[i]["Category"])
            }
            data2.push({"Category": data[i]["Category"], "Area": scale * parseFloat(data[i][`Area-${year}`]), "Perc": parseFloat(data[i][`Perc-${year}`])})

        }

        var round = 1
        const y = d3.scaleBand()
                .range([100, 100+width])
                .domain(categories.map(function(d) { return d }))
                .padding(0.2)

            
            svg.append("g")
                .attr("id", "xaxis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(y))
                .selectAll("text")
                    .attr("transform", "translate(-10,0)rotate(-45)")
                    .style("text-anchor", "end");

const max_area = d3.max(data2, function(d) { return d["Area"]; }) / scale
            const x = d3.scaleLinear()
                .domain([0, max_area])
                .range([ height, 0])
            svg.append("g")
                .attr("id", "yaxis")
                .attr("transform", "translate(100,0)")
                .call(d3.axisLeft(x))
            

            var bar = svg.selectAll("mybar")
                .data(data2)
                .enter()
                .append("rect")
                    .attr("id", function(d) {return "c"+categories.indexOf(d["Category"])})
                    .attr("x", function(d) { return y(d['Category']); })
                    .attr("width", y.bandwidth())
                    .attr("fill", function(d) {return colours.get(d["Category"].toLowerCase());})
                    // no bar at the beginning thus:
                    .attr("height", function(d) {return m.get(d["Category"].toLowerCase()); }) // always equal to 0
                    .attr("y", function(d) {return height - m.get(d["Category"].toLowerCase()); })
            bar.transition()
                .duration(1000)
                .attr("y", function(d) { m.set(d["Category"].toLowerCase(), parseFloat(d["Area"]*height));return height - d["Area"]/scale * height/max_area; })
                .attr("height", function(d) { return d["Area"]/scale * height/max_area; })
                .delay(function(d,i){return(0*100)})

            bar.on("mouseover", function (d, f) {
                tippy("#c"+categories.indexOf(f["Category"]), {
                    content: "Category: "+f["Category"]+"\nArea: "+Math.round(f["Area"]/scale)+"\nPercentage: "+Math.round(f["Perc"])
                })
            })
            
            svg.append("text")
            .attr("id", "xtitle")
            .attr("text-anchor", "end")
            .attr("x", width/2 + 120)
            .attr("y", height + margin.top + 35)
            .text("Land classes");

            svg.append("text")
            .attr("id", "overtext")
            .attr("text-anchor", "center")
            .attr("x", width/2 + 60)
            .attr("y", margin.top)

            // Y axis label:
            svg.append("text")
                .attr("id", "ytitle")
                .attr("text-anchor", "end")
                .attr("transform", "rotate(-90)")
                .attr("y", 30)
                .attr("x", -30)
                .text("Area (in sq. km)")

            if (data2.length != 0)
            {
                svg.selectAll("#overtext").text("Year: "+year)
            }
    }


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
                <Typography variant="h2">Deforestation in West Africa</Typography>
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
                        <Grid
                            item
                            style={{
                                marginTop: "3vh",
                                width: "100%",
                                height: "80%",
                            }}
                        >
                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    height: "100%",
                                }}
                            >
                                <img
                                    src="/assets/legend.png"
                                    style={{
                                        zIndex: 10,
                                        width: "17%",
                                        height: "30%",
                                        objectFit: "contain",
                                        position: "absolute",
                                        marginLeft: "80%",
                                    }}
                                />
                                <img
                                    src={image_paths["ivory"][type][year]}
                                    style={{
                                        zIndex: 3,
                                        width: "90%",
                                        height: "90%",
                                        objectFit: "contain",
                                        position: "absolute",
                                    }}
                                />
                                <img
                                    src={image_paths["liberia"][type][year]}
                                    style={{
                                        zIndex: 4,
                                        width: "90%",
                                        height: "90%",
                                        objectFit: "contain",
                                        position: "absolute",
                                    }}
                                />
                                <img
                                    src={image_paths["senegal"][type][year]}
                                    style={{
                                        zIndex: 5,
                                        width: "90%",
                                        height: "90%",
                                        objectFit: "contain",
                                        position: "absolute",
                                    }}
                                />
                                <img
                                    src={image_paths["sierra"][type][year]}
                                    style={{
                                        zIndex: 6,
                                        width: "90%",
                                        height: "90%",
                                        objectFit: "contain",
                                        position: "absolute",
                                    }}
                                />
                            </div>
                        </Grid>
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
                    <div id="my_dataviz" style={{'p': 10}}></div>
                        {/* use the year and type states to show data */}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
