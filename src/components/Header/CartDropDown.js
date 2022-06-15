import { Component, Fragment } from "react";
import classes from "./CartDropDown.module.css";
import CartItem from "./CartItem";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../../store&slices/cartItemsSlice";

let keys = 0;

class CartDropDown extends Component {
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
      <Fragment>
        <div onClick={this.props.stateManager} className={classes.modal}></div>
        <div className={classes.dropdown}>
          <div className={classes["dropdown-content"]}>
            <h3>
              My Bag,
              <span className={classes.quantity}>
                {this.props.quantity} items
              </span>
            </h3>
            {this.props.cart.map((item) => {    
              return <CartItem key={keys++} item={item} />;
            })}
            {this.state.noItems && <p>No items to pay for</p>}
            {this.props.paid && <p className={classes.success}>Paid</p>}
            <div className={classes.justifySpaceBetween}>
              <b>Totals</b>
              <b>
                {this.props.symbol}
                {this.props.totals}
              </b>
            </div>
            <div className={classes.justifySpaceBetween}>
              <Link to="/bag" onClick={this.props.stateManager}>
                <button className={classes.btnBag}>VIEW BAG</button>
              </Link>
              <button
                onClick={
                  this.props.cart.length !== 0
                    ? this.pay.bind(this)
                    : this.noItems.bind(this)
                }
                className={classes.btnCheckOut}
              >
                CHECK OUT
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currency: state.currencyReducer.currencySelected,
    symbol: state.currencyReducer.currencySymbol,
    cart: state.cartItemsReducer.itemsSelected,
    quantity: state.cartItemsReducer.quantity,
    totals: state.cartItemsReducer.totalPrice,
    paid: state.cartItemsReducer.paid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTotals: (payload) => dispatch(cartActions.addItemToCart(payload)),
    checkOut: (payload) => dispatch(cartActions.checkOut(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartDropDown);
