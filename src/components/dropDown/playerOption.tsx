import { Listbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { IPlayer } from "../../interfaces";

function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(" ");
}

type PlayerFilterProps = {
    player: IPlayer;
};

const PlayerOption: React.FC<PlayerFilterProps> = ({ player }) => {
    return (
        <Listbox.Option
            key={player.playerId}
            className={({ active }) =>
                classNames(
                    active ? "bg-indigo-600 text-white" : "text-gray-900",
                    "relative cursor-default select-none py-2 pl-8 pr-4"
                )
            }
            value={player}
        >
            {({ selected, active }) => (
                <>
                    <span
                        className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                        )}
                    >
                        {player.playerName}
                    </span>

                    {selected ? (
                        <span
                            className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 left-0 flex items-center pl-1.5"
                            )}
                        >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                    ) : null}
                </>
            )}
        </Listbox.Option>
    );
};

export default PlayerOption;
