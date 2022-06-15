import { Component, Fragment } from "react";
import classes from "./CurrencyDropDown.module.css";
import { gql } from "@apollo/client";
import { connect } from "react-redux";
import { Query } from "@apollo/react-components";
import { currencyActions } from "../../store&slices/currencySlice";
import { cartActions } from "../../store&slices/cartItemsSlice";

const CURRENCY_ALL = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

class CurrencyDropDown extends Component {
  constructor(props) {
    super();
  }

  handlerSelectedCurrency(event) {
    this.props.select(event.target.innerText.substring(2).trim());
    this.props.selectedSymbol(event.target.innerText.substring(0, 2).trim());
    this.props.DontShowDropDown();
  }

  render() {
    return (
      <Fragment>
        {this.props.cart.length !== 0 && (
          <div className={classes.currencyError}>
            <p>Please select currency before selecting any items!</p>
          </div>
        )}
        {this.props.cart.length === 0 && (
          <div className={classes.currecyDropDown}>
            <Query query={CURRENCY_ALL}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;
                return data.currencies.map((currency) => {
                  return (
                    <span onClick={this.handlerSelectedCurrency.bind(this)}>
                      {currency.symbol.toUpperCase()}{" "}
                      {currency.label.toUpperCase()}
                    </span>
                  );
                });
              }}
            </Query>
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currencyReducer.currencySelected,
    cart: state.cartItemsReducer.itemsSelected,
    dropdownShown: state.currencyReducer.currencyDropdownIsShown,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    select: (payload) => dispatch(currencyActions.currencySelector(payload)),
    selectedSymbol: (payload) =>
      dispatch(currencyActions.symbolSelector(payload)),
    addTotals: () => dispatch(cartActions.addTotals()),
    DontShowDropDown: () => dispatch(currencyActions.currencyDropdownClose()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyDropDown);
