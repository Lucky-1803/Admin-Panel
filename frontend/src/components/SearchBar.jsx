export default function SearchBar({value , onChange}){
    return (
        <input
        placeholder="Search by email or name..."
        value={value}
        onChange={(e)=>{onChange(e.target.value)}}
        className="p-3 w-[50%] m-10 border"
         />
    )
}