import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { IMatch } from "../../interfaces";
import { IPlayer } from "../../interfaces/player";
import { FILTER } from "../../enums/filterType";
import PlayerOption from "./playerOption";
import MatchOption from "./matchOption";
import { getOptionString } from "./utils/utils";

interface FilterDropDownProps {
    dataList: IPlayer[] | IMatch[];
    filterType: FILTER;
    selectedItem: IPlayer | IMatch | null;
    setSelectedItem: React.Dispatch<React.SetStateAction<any>>;
}

export const FilterDropDown: React.FC<FilterDropDownProps> = ({
    dataList,
    filterType,
    selectedItem,
    setSelectedItem,
}) => {
    return (
        <Listbox value={selectedItem} onChange={setSelectedItem}>
            {({ open }) => (
                <>
                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                        Filter By {filterType}
                    </Listbox.Label>
                    <div className="relative mt-2">
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 min-h-[40px]">
                            <span className="block truncate">
                                {selectedItem == null ? "" : getOptionString(selectedItem)}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {dataList.map((item) =>
                                    filterType === FILTER.BY_PLAYER ? (
                                        <PlayerOption player={item as IPlayer} />
                                    ) : (
                                        <MatchOption match={item as IMatch} />
                                    )
                                )}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    );
};
