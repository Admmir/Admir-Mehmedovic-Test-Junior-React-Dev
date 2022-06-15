import { Component, Fragment } from "react";
import classes from "./CartItem.module.css";

class CartItemAttributes extends Component {
  render() {
    return (
      <div>
        {this.props.attributes.map((attributes) => {
          return (
            <Fragment key={attributes.id}>
              <p
                className={classes.attributeName}>
                {attributes.name}:
              </p>
              <div
                key={Math.random()}
                className={classes.sizeAndQuantity}
              >
                {attributes.type === "swatch"
                  ? attributes.items.map((item) => {
                      return (
                        <div
                          id={attributes.name}
                          key={item.value}
                          className={
                            this.props.item.attributes.some(
                              (cartItem) =>
                                item.value === cartItem.value &&
                                cartItem.name === attributes.name
                            )
                              ? classes.selectedColor
                              : item.value === "#FFFFFF"
                              ? classes.colorWhite
                              : classes.color
                          }
                          style={{ backgroundColor: `${item.value}` }}
                        ></div>
                      );
                    })
                  : attributes.items.map((item) => {
                      return (
                        <div
                          id={attributes.name}
                          key={item.value}
                          className={
                            this.props.item.attributes.some(
                              (cartItem) => cartItem.name === attributes.name &&
                              item.value === cartItem.value
                            ) ? classes.selectedAttribute
                              : classes.sizes
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
      </div>
    );
  }
}

export default CartItemAttributes;
