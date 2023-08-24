import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function BookItem({ book, onFavoriteToggle, isFavorite }) {
  const { volumeInfo } = book;
  const { title, authors, description, imageLinks } = volumeInfo;
  const thumbnail = imageLinks?.smallThumbnail;

  return (
    <Card style={{ margin: "20px" }}>
      <Grid container>
        <Grid
          item
          xs={3}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {thumbnail && (
            <CardMedia
              component="img"
              style={{ maxWidth: "100px", height: "auto" }}
              image={thumbnail}
              alt={title}
            />
          )}
        </Grid>
        <Grid item xs={9}>
          <CardContent>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {authors}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "10px 0" }}
              onClick={() => window.open(volumeInfo.previewLink, "_blank")}
            >
              Show More
            </Button>
            <Button
              variant="contained"
              color={isFavorite ? "secondary" : "primary"}
              startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              onClick={() => onFavoriteToggle(book)}
            >
              {isFavorite ? "Unfavorite" : "Favorite"}
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

export default BookItem;
