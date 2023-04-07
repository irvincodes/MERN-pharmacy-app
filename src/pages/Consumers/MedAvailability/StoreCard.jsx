import { toTitleCase } from "../../../utilities/utilities";

const StoreCard = ({ store }) => {
  return (
    <>
      <hr />
      <h1 className="text-lg font-bold">{store.name}</h1>
      <div className="pl-3 leading-none text-gray-400">
        <p>{toTitleCase(store.streetAddress)}</p>
        <p>{store?.unitNumber}</p>
        <p>{store.postalCode}</p>
      </div>
      <p className="text-wAqua">Medicine Available</p>
      {store.pharmacists.length > 0 ? (
        <ul className="text-wAqua">
          Pharmacists Available:
          {store?.pharmacists.map((p) => (
            <li className="text-black" key={p._id}>
              {toTitleCase(p.name)}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-wRed">Pharmacist Not Available</p>
      )}
    </>
  );
};

export default StoreCard;