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
        /* TODO: An index of images array randomly for prize */
        index={data.randomIndex}
        /* TODO: ItemWith is the width of the item plus its padding */
        itemWidth={240}
      />
    </div>
  );
};

export default Index;
