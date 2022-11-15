import React from "react";

type Props = {
  title: string;
  content: React.ReactNode;
};

const HotelInformation = ({ title, content }: Props) => {
  return (
    <li className="grid grid-cols-2 gap-x-1 mb-3">
      <span className="text-darkerGray font-medium">{title}</span>
      <span>{content}</span>
    </li>
  );
};
export default HotelInformation;
