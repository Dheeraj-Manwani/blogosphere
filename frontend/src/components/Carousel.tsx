import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const ReactCarousel = () => {
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlay={true}
      autoPlaySpeed={0.2}
      centerMode={false}
      className=""
      containerClass="container-with-dots"
      customTransition="all 1s linear"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite={true}
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 3,
          partialVisibilityGutter: 40,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 30,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 2,
          partialVisibilityGutter: 30,
        },
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={2}
      swipeable
      transitionDuration={40000}
    >
      <div>aaaaaaaaaaaa</div>
      <div>aaaaaaaaaaaa</div>
      <div>aaaaaaaaaaaa</div>
      <div>aaaaaaaaaaaa</div>
    </Carousel>
  );
};
