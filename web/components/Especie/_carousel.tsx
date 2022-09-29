import { Image } from "@mantine/core";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box } from "@mantine/core";
import { randomId } from "@mantine/hooks";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function CarouselFotos(props: any) {
  console.log(props);

  var photoUrls = props.imageList as string[];
  return (
    <Carousel
      swipeable={false}
      draggable={false}
      // centerMode={true}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      // infinite={true}
      autoPlay={false}
      // autoPlaySpeed={3000}
      // keyBoardControl={true}
      // customTransition="all .5"
      // transitionDuration={500}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {photoUrls.map((url) => (
        <Box key={randomId()}>
          <Image
            src={process.env.AMAZON_BUCKET_URL + url}
            alt="Foto Especie"
            height={250}
          />
        </Box>
      ))}
    </Carousel>
  );
}
