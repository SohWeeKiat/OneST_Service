'use client'
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useEffect, useState } from "react";

export type LocationData = {
    latitude: number;
    longitude: number;
};

export type AreaData = {
    name: string;
    label_location: LocationData;
};

export default function LocationSelect({ onLocationChange }: { onLocationChange: (location: AreaData) => void }) {
    const [locations, setLocations] = useState<AreaData[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<AreaData | null>(null);

    const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLocation = locations.find(location => location.name === e.target.value);
        if (selectedLocation) {
            setSelectedLocation(selectedLocation);
            onLocationChange(selectedLocation);
        }
    };

    useEffect(() => {
        async function fetchLocations() {
            await fetch("/api/v1/weather/locations")
                .then(async (response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setLocations(data);
                }).catch((error) => {
                    toast.add({
                        title: "Error fetching locations",
                        description: error.message
                    });
                });
        }
        fetchLocations();
    }, []);

    return (
        <>
            {locations.length > 0 ? (
                <NativeSelect onChange={handleLocationChange} defaultValue={selectedLocation?.name || ""}>
                    <NativeSelectOption value="">Select a location</NativeSelectOption>
                    {locations.map((location) => (
                        <NativeSelectOption key={location.name} value={location.name}>
                            {location.name}
                        </NativeSelectOption>
                    ))}
                </NativeSelect>
            ) : (
                <div className="mt-4">
                    <Item variant="muted">
                        <ItemMedia>
                            <Spinner />
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle className="line-clamp-1">Loading locations...</ItemTitle>
                        </ItemContent>
                    </Item>
                </div>
            )}
        </>
    )
}