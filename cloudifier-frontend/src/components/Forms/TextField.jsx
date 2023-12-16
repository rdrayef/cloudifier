
function TextField({label, size, type, callback, setter, ...className}){


    return (
        <div className="text-field" {...className} >
            <label htmlFor={label} >{label} : </label>
            <input id={label} type={type} size={size} onChange={(e)=>callback(e.target.value,setter)}  />
        </div>
    );
}

export default TextField;