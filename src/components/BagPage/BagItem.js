import { Query } from "@apollo/react-components";
import { gql } from "@apollo/client";
import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { cartActions } from "../../store&slices/cartItemsSlice";
import classes from "./BagItem.module.css";
import ButtonsForwardAndBackward from "./ButtonsForwardBackwards";
import BagItemPrice from "./BagItemPrice";
import BagItemAttributes from "./BagItemAttributes";
import BagItemButtonsQuantity from "./BagItemButtonsQuantity";

class BagItem extends Component {
  constructor() {
    super();
    this.state = {
      imgSelected: 0,
    };
  }
  addQuantityHandler(event) {
    this.props.addQuantity({
      id: event.target.id,
      item: this.props.item,
      value: event.target.value,
    });
  }

  removeQuantityHandler(event) {
    this.props.removeQuantity({
      id: event.target.id,
      item: this.props.item,
      value: event.target.value,
    });
  }
  slideLeft(prop) {
    if (this.state.imgSelected !== 0) {
      this.setState({ imgSelected: this.state.imgSelected - 1 });
    } else {
      this.setState({ imgSelected: prop - 1 });
    }
  }
  //prop is basicly image links array length so it allows sliding left/right when it comes to last, next element is 0 or highest
  slideRight(prop) {
    if (this.state.imgSelected !== prop - 1) {
      this.setState({ imgSelected: this.state.imgSelected + 1 });
    } else {
      this.setState({ imgSelected: 0 });
    }
  }
  render() {
    return (
      <Fragment>
        <hr></hr>
        <Query
          query={gql`
query {product(id: "${this.props.item.id}") {
            id
            name
            inStock
            gallery
            description
            category
              attributes {
              name
              type
              items {
                displayValue
                id
                value
              }
              id
            }
            prices {
              amount
              currency {
                label
                symbol
              }
            }
            brand
            }
            }
            `}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            return (
              <div className={classes.itemContainer}>
                <div>
                  <b className={classes.brand}>{data.product.brand}</b>
                  <p className={classes.name}> {data.product.name}</p>
                  <BagItemPrice prices={data.product.prices} />
                  <BagItemAttributes
                    attributes={data.product.attributes}
                    item={this.props.item}
                  />
                </div>
                <BagItemButtonsQuantity
                  prices={data.product.prices}
                  add={this.addQuantityHandler.bind(this)}
                  remove={this.removeQuantityHandler.bind(this)}
                  item={this.props.item}
                />
                <div>
                  <img
                    className={classes.displayedImg}
                    src={data.product.gallery[this.state.imgSelected]}
                    alt="displayed"
                  />
                  {data.product.gallery.length !== 1 && (
                    <ButtonsForwardAndBackward
                      images={data.product.gallery}
                      slideLeft={this.slideLeft.bind(this)}
                      slideRight={this.slideRight.bind(this)}
                    />
                  )}
                </div>
              </div>
            );
          }}
        </Query>
      </Fragment>
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

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (payload) => dispatch(cartActions.addItemToCart(payload)),
    addQuantity: (payload) => dispatch(cartActions.addQuantity(payload)),
    removeQuantity: (payload) => dispatch(cartActions.removeQuantity(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BagItem);
