import { useEffect, useRef, useState } from "react";

const Spinner = ({
  spinTime = 5000,
  spinSpeed = 1.3, //null or Speed 0.1 to 2.0
  items = ["Money", "Gift", "Points", "Rewards", "Jackpot", "Hattrick"],
  index = null,
  isSpinAgain = false,
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

  const setReel = (itemIndex) => {
    let reelArray = "";
    if (index || index === 0) {
      reelArray = itemIndex[index];
    } else if (isSpinAgain) {
      reelArray = itemIndex[itemLength.current - 1];
    }

    return reelArray;
  };

  const handleClick = () => {
    if (!state.isSpinStarted) {
      if (onSpinStart) {
        onSpinStart();
      }

      setState((s) => ({
        ...s,
        speeds: state.speeds || Math.random() + 0.5,
        reelArray:
          state.reelArray ||
          (((Math.random() * itemLength.current) | 0) * state.width) /
            itemLength.current,
        isSpinStarted: true,
      }));

      if (typeof window !== "undefined") {
        window.requestAnimationFrame(animate);
      }
    }
  };

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
          speeds: spinSpeed,
          reelArray: setReel(state.itemIndex),
          isSpinStarted: false,
        }));

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
    <div className="spinner">
      <div className="slots" ref={spinnerSlots}>
        <ul className="items">
          {items.map((row, i) => {
            return (
              <li key={i}>
                <img src={row} alt="" />
              </li>
            );
          })}
          {items.map((row, i) => {
            return (
              <li key={i}>
                <img src={row} alt="" />
              </li>
            );
          })}
        </ul>
      </div>

      <button
        onClick={handleClick}
        type="button"
        class="justify-center py-2 px-10 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Spin
      </button>
    </div>
  );
};

export default Spinner;
