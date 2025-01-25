export default function Select({ 
    onChange, 
    values, 
    name,
    value,
    placeholder = '---' 
}: { 
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, 
    values: { value: string, label: string }[], 
    name?: string,
    value?: string,
    placeholder?: string 
}) {

    return (
        <select className="text-white bg-slate-900 p-2 rounded"
            onChange={onChange}
            name={name}
            value={value}
            >
            <option value="">{placeholder}</option>
            {values.map(({ value, label }) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </select>
    )

}