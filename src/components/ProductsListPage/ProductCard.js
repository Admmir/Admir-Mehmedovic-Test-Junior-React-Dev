import { Component, Fragment } from "react";
import classes from "./ProductsPage&Card.module.css";
import CartImg from "../../Images-Icons/CartWhite.png";
import { connect } from "react-redux";
import { productsActions } from "../../store&slices/productsCardSlice";
import { Link } from "react-router-dom";
import SelectItemFomPLP from "./SelectItemOnLP";

class ProductCard extends Component {
  constructor(props) {
    super();
    this.state = {
      showSelectItem: false,
    };
  }
  handlerProductSelected() {
    this.props.selectProduct(this.props.product.id);
  }
  buttonHandler(event) {
    event.preventDefault();
    this.setState({ showSelectItem: !this.state.showSelectItem });
  }
  closeHandler() {
    this.setState({ showSelectItem: false });
  }
  render() {
    return (
      <Fragment>
        {this.state.showSelectItem && (
          <SelectItemFomPLP show={this.closeHandler.bind(this)} />
        )}

        <Link
          to={`/product/${this.props.product.id}`}
          //Until I figure out how to implement Link component with class compontents
          onClick={this.handlerProductSelected.bind(this)}
          className={`${classes.card} ${classes.removeUnderline}
        ${!this.props.product.inStock && classes.outStockName}`}
        >
          <img
            className={classes.imgProduct}
            src={this.props.product.gallery[0]}
            alt="img"
          />
          <button
            onClick={this.buttonHandler.bind(this)}
            className={classes.btnCart}
          >
            <img src={CartImg} alt="svg2" />
          </button>

          <p className={classes.name}>
            {this.props.product.brand} {this.props.product.name}
          </p>
          <b className={classes.bText}>
            {this.props.symbol}
            {
              this.props.product.prices.find(
                (price) => price.currency.label === this.props.currency
              ).amount
            }
          </b>
          {!this.props.product.inStock && (
            <div className={classes.outStock}>
              <h2>OUT OF STOCK</h2>
            </div>
          )}
        </Link>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currencyReducer.currencySelected,
    symbol: state.currencyReducer.currencySymbol,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectProduct: (payload) =>
      dispatch(productsActions.productSelector(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
