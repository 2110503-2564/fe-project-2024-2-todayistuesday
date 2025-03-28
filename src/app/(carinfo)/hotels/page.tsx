import getCars from "@/libs/getCars";
import CarCatalog from "@/components/CarCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import CarPanel from "@/components/CarPanel";

export default function Car() {
    const cars = getCars()
    
    return (
        <main className="text-center ">
            <h1 className="text-xl font-medium">Select Your Hotels</h1>
            <Suspense fallback={ <p>Loading ... <LinearProgress/></p> }>
                <CarCatalog carJson={cars}/>
            </Suspense>
        </main>
    );
}