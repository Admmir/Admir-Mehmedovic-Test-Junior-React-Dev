import { Component, Fragment } from "react";
import classes from "./ProductPage.module.css";

class ProductImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: "",
    };
  }
  MainImagehandler(event) {
    this.setState({ selectedImage: event.target.currentSrc });
  }
  render() {
    return (
      <Fragment>
        <div className={classes.images}>
          {this.props.data.product.gallery.map((image) => {
            return (
              <div key={image}>
                <img
                  className={
                    image === this.state.selectedImage
                      ? classes.selectedImg
                      : ""
                  }
                  onClick={this.MainImagehandler.bind(this)} //This function sets main (display) Image
                  src={image}
                  alt="all images"
                  key={image}
                />
              </div>
            );
          })}
        </div>
        <div className={classes.mainImgContainer}>
          <div className={classes.mainImg}>
            <img
              src={
                this.state.selectedImage === ""
                  ? this.props.data.product.gallery[0]
                  : this.state.selectedImage
              }
              //If state is unset it shows first image in array
              alt="all images"
            ></img>
          </div>
          {!this.props.data.product.inStock && (
            <div className={classes.outStock}>
              <h2>OUT OF STOCK</h2>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

export default ProductImages;
