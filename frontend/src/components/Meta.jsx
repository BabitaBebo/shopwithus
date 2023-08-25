import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Shop With Us",
  description: "We sell the best products for cheap",
  keywords: "electronics, buy electronics,new electronics, cheap electroincs",
};

export default Meta;
