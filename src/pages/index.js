import Spinner from "../components/Spinner";
import data from "../data.json";

import cover from "../images/cover.png";

const Index = () => {
  return (
    <div className="wrapper">
      <Spinner
        spinTime={5000}
        spinSpeed={3}
        items={data.items}
        index={data.randomIndex}
        itemWidth={240}
      />

      <div className="cover" style={{ backgroundImage: `url(${cover})` }} />
    </div>
  );
};

export default Index;
