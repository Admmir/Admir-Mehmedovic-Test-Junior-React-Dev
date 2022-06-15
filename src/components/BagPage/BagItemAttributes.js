import { Component, Fragment } from "react";
import classes from "./BagItem.module.css";
import { connect } from "react-redux";

class BagItemAttributes extends Component {
  render() {
    return (
      <div>
        {this.props.attributes.map((attributes) => {
          return (
            <Fragment key={attributes.name}>
              <b className={classes.attributeName}>
                {attributes.name.toUpperCase()}:
              </b>
              <div key={attributes.name} className={classes.attributeDivs}>
                {attributes.type === "swatch"
                  ? attributes.items.map((item) => {
                      return (
                        <div
                          key={item.value}
                          id={attributes.name}
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
                          style={{
                            backgroundColor: `${item.value}`,
                          }}
                        ></div>
                      );
                    })
                  : attributes.items.map((item) => {
                      return (
                        <div
                          key={item.value}
                          id={attributes.name}
                          className={
                            this.props.item.attributes.some(
                              (cartItem) =>
                                item.value === cartItem.value &&
                                cartItem.name === attributes.name
                            )
                              ? classes.selectedAttribute
                              : classes.attributes
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

const mapStateToProps = (state) => {
  return {
    currency: state.currencyReducer.currencySelected,
    symbol: state.currencyReducer.currencySymbol,
    cart: state.cartItemsReducer.itemsSelected,
  };
};

export default connect(mapStateToProps)(BagItemAttributes);
