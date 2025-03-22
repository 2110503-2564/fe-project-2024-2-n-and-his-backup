export default function InputItem({title, type, isRequired}:{title:string, type:string, isRequired:boolean}) {
    return (
        <div>
            <label htmlFor={title}>{title}: </label>
            
            <input
                type={type}
                id={title}
                value={title}
                placeholder= {`Enter your ${title}`}
                required={isRequired}
            />
        </div>
    );
}