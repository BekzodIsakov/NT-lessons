import Button from "../button/Button";
import { FaCartShopping } from "react-icons/fa6";

const Card = ({ product }) => {
  return (
    <div>
      <img height={"60%"} src={product.image_url} alt={product.product_name} />
      <h4>{product.product_name}</h4>
      <p>{product.description}</p>
      <strong>{product.price}</strong>
      <div>
        <Button>
          <FaCartShopping />
          <span style={{marginLeft: "0.8em"}}>Add to Cart</span>
        </Button>
      </div>
    </div>
  );
};

export default Card;
