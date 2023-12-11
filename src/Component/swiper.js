import React from 'react';
import { makeStyles } from '@mui/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Paper, Typography } from '@mui/material';
import 'swiper/swiper.min.css';

const useStyles = makeStyles((theme) => ({
  swiperContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  swiperSlide: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const ImageGallery = () => {
  const classes = useStyles();
  const images = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
  ];

  return (
    <Swiper
      className={classes.swiperContainer}
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {images.map((image, index) => (
        <SwiperSlide
          key={index}
          className={classes.swiperSlide}
        >
          <Paper
            elevation={3}
            sx={{ p: 2, textAlign: 'center' }}
          >
            <img
              src={image}
              alt={`Image ${index}`}
              className={classes.image}
            />
            <Typography variant='caption'>{`Image ${index + 1}`}</Typography>
          </Paper>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageGallery;
