import Spinner from "../components/Spinner";
import data from "../data.json";

const Index = () => {
  return (
    <Spinner
      spinTime={5000}
      spinSpeed={3}
      items={data.items}
      index={data.randomIndex}
      itemWidth={240}
    />
  );
};

export default Index;
