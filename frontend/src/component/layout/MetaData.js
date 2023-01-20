import React from "react";
import Helmet from "react-helmet";


// whichever page we open and pass this component we will get that title only which we pass here
const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default MetaData;