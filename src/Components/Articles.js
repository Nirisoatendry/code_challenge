import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MediaCard from "./Card";
import TextField from '@mui/material/TextField';

export default function Articles() {
  const url =
    "https://api.nytimes.com/svc/topstories/v2/science.json?api-key=Gwxln5M3geWlhR6UE0TY1FUWKSG3wCil";
  const [data, setData] = useState({});
  useEffect(() => {
    getArticles()
  }, []);

  const getArticles = (keyword=null) =>  {

    fetch(url)
      .then((res) => res.json())
      .then((jsonData) => {
        let allData = jsonData.results;
        const filteredData = filterByKeyWord(allData, keyword);
        const groupedData = groupBySection(filteredData);
        setData(groupedData);
    })
    .catch((error) => {
        console.error("Error message: ", error)
        setData({});
    });

  }

  const groupBySection = (data) => {
    return data.reduce((acc, curr) => {
      const section = curr.section;
      if (!acc[section]) {
        acc[section] = [];
      }
      acc[section].push(curr);
      return acc;
    }, {});
  };

  const filterByKeyWord = (data, keyword) => {
    return keyword && keyword != '' ? 
        data.filter((item)=>{
            return item.section?.toLowerCase().includes(keyword.toLowerCase()) || item.byline?.toLowerCase().includes(keyword.toLowerCase()) || item.title?.toLowerCase().includes(keyword.toLowerCase())
        }) : data
  }

  const search = (e) => {
    const keyword = e.target.value ?? ''
    if(keyword !== ''){
        getArticles(keyword)
    }else{
        getArticles()
    }
  }

  return (
    <Container maxWidth="lg">
        <Grid container>
            <Grid item xs={9}>
                <h1>The most popular New York Times science articles</h1>
            </Grid>
            <Grid item xs={3}>
                <TextField id="standard-basic" label="Recherche" variant="standard" onChange={search}/>
            </Grid>
        </Grid>
        {Object.keys(data).map((section) => (
            <div key={section}>
                <Grid container>
                <h2>Section : {section}</h2>
                </Grid>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {data[section].map((item, index) => (
                    <Grid item xs={3}>
                        <MediaCard key={index} data={item} />
                    </Grid>
                    ))}
                </Grid>
            </div>
        ))}
    </Container>
  );
}
