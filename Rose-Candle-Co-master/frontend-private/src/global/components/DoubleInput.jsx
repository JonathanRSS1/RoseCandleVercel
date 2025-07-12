const DoubleInput = ({ register, name1, name2, placeholder1, placeholder2, error1, error2 }) => {
    return (
        <div className="mb-3 w-full">
            <div className="flex w-full">
                {/* Primer input con error */}
                <div className="flex justify-center items-baseline gap-4 mb-4 w-1/2">
                    <div className="relative w-full">
                        <input
                            id={name1}
                            type="text"
                            placeholder={placeholder1}
                            {...register(name1, { required: `${placeholder1} es requerido` })}
                            className={`block px-2.5 py-2.5 w-full text-sm rounded-lg border 
                                ${error1 ? "border-red-500" : "border-gray-300"} 
                                focus:outline-none transition-colors duration-200`}
                        />
                        <div className="mt-1 min-h-[1.25rem]">
                            {error1 && <p className="text-sm text-red-500">{error1}</p>}
                        </div>
                    </div>
                </div>

                {/* Segundo input con error */}
                <div className="w-1/2">
                    <input
                        id={name2}
                        type="text"
                        placeholder={placeholder2}
                        {...register(name2, { required: `${placeholder2} es requerido` })}
                        className={`block px-2.5 py-2.5 w-full text-sm rounded-lg border 
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

export default DoubleInput;
