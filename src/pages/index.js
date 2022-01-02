import Spinner from "../components/Spinner";

// TODO: Changing it with API data is possible
import data from "../data.json";

const Index = () => {
  return (
    <div className="container mx-auto">
      <Spinner
        spinTime={5000}
        spinSpeed={3}
        /* TODO: List of items as images of an array */
        items={data.items}
        /* TODO: ItemWith is the width of the item plus its padding */
        itemWidth={240}
        /* TODO: This callback will run when spin complete */
        onSpinComplete={(index) => {
          console.log("prize index", index);
        }}
      />
    </div>
  );
};

export default Index;
