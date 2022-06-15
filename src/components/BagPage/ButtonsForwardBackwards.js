import classes from "./BagItem.module.css";
import { Component } from "react";

class ButtonsForwardAndBackward extends Component {
  slideLeft() {
    this.props.slideLeft(this.props.images.length);
  }
  slideRight() {
    this.props.slideRight(this.props.images.length);
  }
  render() {
    return (
      <div className={classes.divForImagesBtn}>
        <button onClick={this.slideLeft.bind(this)}>{`<`}</button>
        <button onClick={this.slideRight.bind(this)}>{`>`}</button>
      </div>
    );
  }
}

export default ButtonsForwardAndBackward;
