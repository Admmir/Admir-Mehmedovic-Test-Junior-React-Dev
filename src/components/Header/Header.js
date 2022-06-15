import { connect } from "react-redux";
import { Query } from "@apollo/react-components";
import { Component, Fragment } from "react";
import classes from "./Header.module.css";
import Logo from "../../Images-Icons/Logo.png";
import CartImg from "../../Images-Icons/Vector.png";
import Arrow from "../../Images-Icons/Vector2.png";
import { gql } from "@apollo/client";
import CartDropDown from "./CartDropDown";
import CurrencyDropDown from "./CurrencyDropDown";
import { categoriesActions } from "../../store&slices/categoriesSlice";
import OutsideAlerter from "./CurrencyDropDownOutsideHandler";
import { currencyActions } from "../../store&slices/currencySlice";
import { withParams } from "../HOC/HOC.js";
import { NavLink } from "react-router-dom";

const CATEGORIES_ALL = gql`
  query {
    categories {
      name
    }
  }
`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartShown: false,
    };
  }
  handlerCurrency() {
    this.setState({
      cartShown: false,
    });
    this.props.currencyDropdownOpen();
  }
  handlerCart() {
    this.setState({ cartShown: !this.state.cartShown });
  }
  handlerSelectedCategory(event) {
    this.props.select(event.target.innerText);
    //I knew that each onClick pass an event
  }

  render() {
    return (
      <Fragment>
        <header>
          <div className={classes.container}>
            <ul>
              <Query query={CATEGORIES_ALL}>
                {({ loading, error, data }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error</p>;

                  return data.categories.map((category) => {
                    return (
                      <NavLink
                        to={
                          category.name === "all"
                            ? "/"
                            : `${"/" + category.name}`
                        }
                        key={category.name + Math.random}
                        className={({ isActive }) =>
                          isActive
                            ? `${classes.selectedDiv} ${classes.link}`
                            : classes.link
                        }
                      >
                        <li onClick={this.handlerSelectedCategory.bind(this)}>
                          {category.name.toUpperCase()}
                        </li>
                      </NavLink>
                    );
                  });
                }}
              </Query>
            </ul>
            <div className={classes.imgContainer}>
              <img className={classes.imgLogo} src={Logo} alt="svg3" />
            </div>
            <div className={classes.cartCurrencyDiv}>
              <button
                onClick={this.handlerCurrency.bind(this)}
                className={classes.currencybtn}
              >
                <b>{this.props.symbol}</b>
                <img src={Arrow} alt="svg1" />
              </button>
              <button
                onClick={this.handlerCart.bind(this)}
                className={classes.cartbtn}
              >
                <img src={CartImg} alt="svg2" />
                {this.props.cart.length !== 0 && (
                  <div className={classes.badge}>{this.props.quantity}</div>
                )}
              </button>
            </div>
          </div>
        </header>

        <OutsideAlerter>
          {this.props.dropdownShown && (
            <CurrencyDropDown onSelect={this.handlerCurrency.bind(this)} />
          )}
        </OutsideAlerter>

        {this.state.cartShown && (
          <CartDropDown stateManager={this.handlerCart.bind(this)} />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.categoryReducer.categorySelected,
    symbol: state.currencyReducer.currencySymbol,
    cart: state.cartItemsReducer.itemsSelected,
    quantity: state.cartItemsReducer.quantity,
    currency: state.currencyReducer.currency,
    dropdownShown: state.currencyReducer.currencyDropdownIsShown,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    select: (payload) => dispatch(categoriesActions.categorySelector(payload)),
    DontShowDropDown: () => dispatch(currencyActions.currencyDropdownClose()),
    currencyDropdownOpen: () =>
      dispatch(currencyActions.currencyDropdownOpen()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withParams(Header));
