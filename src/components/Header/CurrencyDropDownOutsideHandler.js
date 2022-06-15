import React, { Component } from "react";
import PropTypes from "prop-types";
import { currencyActions } from "../../store&slices/currencySlice";
import { connect } from "react-redux";

class OutsideAlerter extends Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.props.DontShowDropDown();
    }
  }

  render() {
    return <div ref={this.wrapperRef}>{this.props.children}</div>;
  }
}

OutsideAlerter.propTypes = {
  children: PropTypes.element.isRequired,
};

const mapStateToProps = (state) => {
  return {
    dropdownShown: state.currencyReducer.currencyDropdownIsShown,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    DontShowDropDown: () => dispatch(currencyActions.currencyDropdownClose()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutsideAlerter);
