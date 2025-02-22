import React from "react";

//defines the shape of the data the component expects.
interface Card {
    id: number;
    name: string;
    email: string;
}

//React.FC → This is a React Functional Component type.
//{ card: Card } → The component expects a prop named card of type Card.
//Destructuring → It extracts the card object from the props.

const CardComponent: React.FC<{ card: Card }> = ({ card }) => {
    return (
        <div className="bg-white w-full shadow-lg rounded py-2 px-4 hover:bg-gray-100">
            <div className="text-sm text-gray-600">ID: {card.id}</div>
            <div className="text-lg font-semibold text-gray-800">{card.name}</div>
            <div className="text-md text-gray-700">{card.email}</div>
        </div>
    );
};
// This allows the component to be imported into other files without using curly braces.
export default CardComponent;