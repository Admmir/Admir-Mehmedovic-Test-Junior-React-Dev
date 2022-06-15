import classes from "./SelectItemFomPL.module.css";
import { Component, Fragment } from "react";
import ProductPage from "../ProductPage/ProductPage";

class SelectItemFomPLP extends Component {
  constructor(props) {
    super();
  }
  close(event) {
    this.props.show(event);
  }
  render() {
    return (
      <Fragment>
        <div onClick={this.close.bind(this)} className={classes.modal}></div>

        <div className={classes.dropdown}>
          <div className={classes["dropdown-content"]}>
            <div className={classes.exit}>
              <button onClick={this.close.bind(this)}></button>
            </div>
            <ProductPage close={this.close.bind(this)} />
          </div>
        </div>
      </Fragment>
    );
  }
}
//I reused component Product page component entirely to make it possible to add items from PLP
export default SelectItemFomPLP;
