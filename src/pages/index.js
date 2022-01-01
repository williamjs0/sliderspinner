import Spinner from "../components/Spinner";
import data from "../data.json";

const Index = () => {
  return (
    <div className="container mx-auto">
      <Spinner
        spinTime={5000}
        spinSpeed={3}
        items={data.items}
        index={data.randomIndex}
        itemWidth={240}
      />
    </div>
  );
};

export default Index;
