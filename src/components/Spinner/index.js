import { useEffect, useRef, useState } from "react";
import cover from "../../images/cover.png";
import SpinnerCard from "./Card";

const Spinner = ({
  spinTime = 5000,
  spinSpeed = 1.3,
  items,
  onSpinStart = null,
  onSpinComplete = null,
  itemWidth = 200,
}) => {
  const begin = useRef(undefined);
  const itemLength = useRef(items.length || 7);
  const spinnerSlots = useRef();

  const [state, setState] = useState({
    width: itemWidth * itemLength.current,
    itemIndex: {},
    reelArray: "",
    speeds: spinSpeed,
    maxTime: spinTime,
    isSpinStarted: false,
  });

  /**
   * This callback will run when the component mounted
   * The "itemIndex" holds the position of each items
   */
  useEffect(() => {
    let itemIndex = (() => {
      let temp = {};
      for (let i in items) {
        if (Number(i) === 0) {
          temp[i] = state.width - itemWidth;
        } else if (Number(i) === 1) {
          temp[i] = 0;
        } else {
          temp[i] = itemWidth * (i - 1);
        }
      }
      return temp;
    })();

    setState((s) => ({
      ...s,
      itemIndex,
      reelArray: setReel(itemIndex),
    }));
  }, []);

  /**
   * Generate random index of prizes
   * Then it finds position of each items and return it
   */
  const setReel = (itemIndex) => {
    const randIndex = Math.floor(Math.random() * itemLength.current);
    return itemIndex[randIndex];
  };

  /**
   * This function is responsible for starting the spinner after clicking the button
   */
  const handleClick = () => {
    if (!state.isSpinStarted) {
      if (onSpinStart) {
        onSpinStart();
      }

      spinnerSlots.current.classList.remove("win");

      setState((s) => ({
        ...s,
        speeds: state.speeds,
        isSpinStarted: true,
      }));

      if (typeof window !== "undefined") {
        window.requestAnimationFrame(animate);
      }
    }
  };

  /**
   * This function is responsible for animating the spinner by HandleClick function
   */
  const animate = (now) => {
    if (!begin.current) {
      begin.current = now;
    }

    let { maxTime, reelArray, speeds, width } = state;
    var t = now - begin.current || 0;

    let position =
      ((speeds / maxTime / 2) * (maxTime - t) * (maxTime - t) + reelArray) %
        width |
      0;
    if (spinnerSlots.current) {
      spinnerSlots.current.scrollLeft = position;

      if (t < maxTime && typeof window !== "undefined") {
        window.requestAnimationFrame(animate); // animate callback
      } else {
        begin.current = undefined;

        setState((s) => ({
          ...s,
          reelArray: setReel(state.itemIndex),
          isSpinStarted: false,
        }));

        spinnerSlots.current.classList.add("win");

        if (onSpinComplete) {
          let tempIndex = "";
          for (let i in state.itemIndex) {
            if (state.itemIndex[i] === position) {
              tempIndex = i;
              break;
            }
          }

          onSpinComplete(tempIndex);
        }
      }
    }
  };

  return (
    <div className="wrapper m-auto text-center relative">
      <div className="spinner text-center relative w-full	h-full">
        <div
          className="slots p-0 my-0 mx-auto overflow-hidden text-center absolute left-1/2 right-1/2"
          ref={spinnerSlots}
        >
          <ul className="items flex relative p-0 m-0 items-center">
            {items.map((row, i) => {
              return (
                <li key={i}>
                  <SpinnerCard row={row} />
                </li>
              );
            })}
            {items.map((row, i) => {
              return (
                <li key={i}>
                  <SpinnerCard row={row} />
                </li>
              );
            })}
          </ul>
        </div>

        <button
          onClick={handleClick}
          type="button"
          className="btn-spin absolute bottom-0 left-1/2 right-1/2 z-10 text-center py-2 px-10 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Spin
        </button>
      </div>

      <div
        className="absolute left-0 top-0 w-full	h-full"
        style={{ backgroundImage: `url(${cover})` }}
      />
    </div>
  );
};

export default Spinner;
