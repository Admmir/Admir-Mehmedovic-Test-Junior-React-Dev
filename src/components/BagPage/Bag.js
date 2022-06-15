import { Component } from "react";
import classes from "./Bag.module.css";
import { connect } from "react-redux";
import { cartActions } from "../../store&slices/cartItemsSlice";
import BagItem from "./BagItem";

let keys = 0;

class Bag extends Component {
  constructor(props) {
    super();
    this.state = {
      noItems: false,
    };
  }
  noItems() {
    this.setState({ noItems: true });
  }
  pay() {
    this.props.checkOut();
    this.setState({ noItems: false });
  }
  render() {
    return (
      <div className={classes.container}>
        <h1 className={classes.title}>CART</h1>
        {this.props.cart.map((item) => {
          return <BagItem key={keys++} item={item} />;
        })}
        <hr></hr>
        {this.state.noItems && <p>No items to pay for</p>}
        {this.props.paid && <p className={classes.success}>Paid</p>}
        <div className={classes.valuesText}>
          <div>
            <p>Tax 21%:</p>
            <p>Quantity:</p>
            <p>Total:</p>
          </div>
          <div>
            <b>{(this.props.totals * 0.21).toFixed(2)}</b>
            <b>{this.props.quantity}</b>
            <b>
              {this.props.symbol}
              {this.props.totals}
            </b>
          </div>
          <button
            onClick={
              this.props.cart.length !== 0
                ? this.pay.bind(this)
                : this.noItems.bind(this)
            }
            className={classes.btnOrder}
          >
            ORDER
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    symbol: state.currencyReducer.currencySymbol,
    cart: state.cartItemsReducer.itemsSelected,
    quantity: state.cartItemsReducer.quantity,
    totals: state.cartItemsReducer.totalPrice,
    paid: state.cartItemsReducer.paid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (payload) => dispatch(cartActions.addItemToCart(payload)),
    checkOut: (payload) => dispatch(cartActions.checkOut(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bag);

//Not much to comment here
