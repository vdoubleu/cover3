"use client";

import Typography from "@/components/Typography";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelect } from "downshift";

export default function Dropdown({ 
  labelText,
  items, 
  itemToString,
  onChange,
}: { 
  labelText: string;
  items: any[];
  itemToString: (item: any) => string;
  onChange: (item: any) => void;
}) {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    items,
    itemToString,
    onSelectedItemChange: ({selectedItem}) => {
      onChange(selectedItem);
    },
    initialSelectedItem: items[0],
  })

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-1">
        <Typography type="basic" className="text-left">{labelText}</Typography>
        <div
          className="px-2 bg-white flex justify-between cursor-pointer border rounded-2xl py-2.5 mt-0."
          {...getToggleButtonProps()}
        >
          <span>{selectedItem || ""}</span>
          <span className="px-2">{isOpen ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}</span>
        </div>
      </div>
      <ul
        className={`absolute w-72 bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10 ${
          !isOpen && 'hidden'
        }`}
        {...getMenuProps()}
      >
        {isOpen && 
          items.map((item, index) => {
            const selectedClassName = selectedItem === item ? 'font-bold' : '';
            return (
              <li
                className={`${selectedClassName} py-2 px-3 shadow-sm flex flex-col`}
                key={item}
                {...getItemProps({item, index})}
              >
                <span>{item}</span>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}
