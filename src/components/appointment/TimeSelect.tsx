import { MenuItem, Select } from "@mui/material";

const hours = Array.from({ length: 24 }, (_, i) => i);

export default function TimeSelect({ value, onChange }: { value: string, onChange: Function }) {
    return (
        <Select variant="standard" name="location" id="location" className="h-[3em] w-[100px]"
            sx={{textAlign: 'center' }} displayEmpty
            renderValue={(selected: string) => (selected != "") ? selected + ":00" : ""}
            value={value} onChange={onChange as any}>
            {
                hours.map((hour) => (
                    <MenuItem value={hour}>{hour}:00</MenuItem>
                ))
            }
        </Select>
    );
}