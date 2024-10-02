import { useParams } from "react-router-dom";

export default function SingleCountry() {
  const params = useParams();
  console.log(params);

  return <div>SingleCountry</div>;
}
