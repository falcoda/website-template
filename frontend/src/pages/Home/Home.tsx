import "./Home.scss";

import React from "react";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  return (
    <div className="root">
      <div className="homePageDiv">HOME</div>
    </div>
  );
};

export default Home;
