import { createTheme, CssBaseline, MenuItem, Select, ThemeProvider } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TimeSelect from "./TimeSelect";

export default function Page2({ fns, visible }: { fns: any, visible: boolean }) {
    const [branch, setBranch] = fns.branch;
    const [branchData, setBranchData] = fns.branchData;
    const [service, setService] = fns.service;
    const [date, setDate] = fns.date
    const [timeBegin, setTimeBegin] = fns.timeBegin;
    const [timeEnd, setTimeEnd] = fns.timeEnd;

    let serviceAll: any[] = [];
    for (let x of branchData) {
        if (x._id == branch) {
            serviceAll = x.service;
            break;
        }
    }

    const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
    });

    return (
        <div className={"h-full text-white flex-col items-center w-full p-2 gap-5 " + (visible ? "flex" : "hidden")}>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <h2 className="text-3xl m-5 font-bold">Your Preferred</h2>
                <Select variant="standard" name="location" id="location" className="h-[3em] w-[300px] text-center"
                    sx={{ fontFamily: "Montserrat Alternates, sans-serif", fontWeight: 600, minWidth: '300px'}} displayEmpty
                    renderValue={(selected: string) => selected ? selected : "Select a Service"}
                    value={service} onChange={(e) => setService(e.target.value)}>
                    {
                        serviceAll.map((item) => (
                            <MenuItem value={item.name}>{item.name}</MenuItem>
                        ))
                    }
                </Select>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker disablePast value={date} onChange={(newValue) => { setDate(newValue) }} />
                </LocalizationProvider>
                <div className="flex justify-center w-full gap-5">
                    <div className="flex flex-col">
                        <div className="font-bold">Time Begin</div>
                        <TimeSelect value={timeBegin} onChange={(e: any) => { setTimeBegin(e.target.value) }} />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-bold">Time End</div>
                        <TimeSelect value={timeEnd} onChange={(e: any) => { setTimeEnd(e.target.value) }} />
                    </div>
                </div>
            </ThemeProvider>
        </div>
    );
}