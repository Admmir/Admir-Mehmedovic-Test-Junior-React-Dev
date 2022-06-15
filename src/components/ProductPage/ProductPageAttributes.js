import { Component, Fragment } from "react";
import classes from "./ProductPage.module.css";

class ProductPageAttributes extends Component {
  render() {
    return (
      <Fragment>
        {this.props.data.product.attributes.map((attributes) => {
          return (
            <Fragment key={this.props.data.product.id}>
              <b key={attributes.name + Math.random()}>
                {attributes.name.toUpperCase()}:
              </b>
              <div
                key={attributes.name + attributes.id}
                className={classes.sizesAndColors}
              >
                {attributes.type === "swatch"
                  ? attributes.items.map((item) => {
                      return (
                        <div
                          key={item.value}
                          onClick={this.props.selectAttribute}
                          id={attributes.name}
                          className={
                            this.props.selectedAttributes.some(
                              (selectedAttribute) =>
                                selectedAttribute.name === attributes.name &&
                                selectedAttribute.value === item.value
                            )
                              ? classes.selectedColor
                              : item.value === "#FFFFFF"
                              ? classes.colorWhite
                              : classes.color
                          }
                          style={{ backgroundColor: `${item.value}` }}
                        >
                          {item.value}
                        </div>
                      );
                    })
                  : attributes.items.map((item) => {
                      return (
                        <div
                          key={item.value}
                          onClick={this.props.selectAttribute}
                          id={attributes.name}
                          className={
                            this.props.selectedAttributes.some(
                              (selectedAttribute) =>
                                selectedAttribute.name === attributes.name &&
                                selectedAttribute.value === item.value
                            )
                              ? classes.selectedAttribute
                              : classes.attribute
                            //most of the time I prefer using .map instead but it returns new array, and I needed bool as return value
                            //I could put both types of attributes as same return I would shorten the code by bit, but it would add more complexity
                          }
                        >
                          {item.value}
                        </div>
                      );
                    })}
              </div>
            </Fragment>
          );
        })}
      </Fragment>
    );
  }
}

export default ProductPageAttributes;
