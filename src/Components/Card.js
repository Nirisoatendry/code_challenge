import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MediaCard(props) {
  let data = props.data;
  if(data.multimedia && data.multimedia.length>0){
    data.image = data.multimedia[0]
  }
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        sx={{ height:150 }}
        image={data?.image?.url}
        title={data?.image?.caption}
      />
      <CardContent>
        <Typography variant="body3" color="text.secondary">
        {data.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {data.abstract}
        </Typography>
      </CardContent>
    </Card>
  );
}
