import { Plus } from "lucide-react";
import DropDown from "./Dropdown";

const DoubleInputDropDown = ({
    register,
    name1,
    name2,
    placeholder1,
    placeholder2,
    error1,
    error2,
    options,
    hideIcon = true,
}) => {
    return (
        <div className="mb-3 w-full">
            <div className="flex w-full">
                {/* Select + error */}
                <div className="flex justify-center items-baseline gap-4 mb-4 w-1/2">
                    <div className="relative w-full">
                        <select
                            id={name1}
                            {...register(name1, { required: `${placeholder1} es requerido` })}
                            className={`block px-2.5 py-2.5 w-full text-sm rounded-lg border text-[#9F9E9B] 
                                ${error1 ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-black"} 
                                appearance-none focus:outline-none peer transition-colors duration-200`}
                            defaultValue=""
                        >
                            <option value="" disabled hidden>
                                {placeholder1}
                            </option>
                            {options.map((opt) => (
                                <option
                                    key={opt._id}
                                    value={opt._id}
                                    className="text-gray-700 text-sm"
                                >
                                    {opt.label}
                                </option>
                            ))}
                        </select>

                        <div className="mt-1 min-h-[1.25rem]">
                            {error1 && <p className="text-sm text-red-500">{error1}</p>}
                        </div>
                    </div>

                    {!hideIcon && (
                        <div className="cursor-pointer text-gray-500">
                            <Plus size={18} />
                        </div>
                    )}
                </div>

                {/* Input + error */}
                <div className="w-1/2">
                    <input
                        id={name2}
                        type="text"
                        placeholder={placeholder2}
                        {...register(name2, { required: `${placeholder2} es requerido` })}
                        className={`block px-2.5 py-2.5  w-full text-sm rounded-lg border 
                            ${error2 ? "border-red-500" : "border-gray-300"} 
                            focus:outline-none transition-colors duration-200`}
                    />
                    <div className="mt-1 min-h-[1.25rem]">
                        {error2 && <p className="text-sm text-red-500">{error2}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoubleInputDropDown;
