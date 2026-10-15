'use client'
import {
    Card, CardHeader, CardTitle,
    CardDescription, CardContent
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner"
import LocationSelect, { AreaData } from "./LocationSelect";
import { useEffect, useState } from "react";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";

type ForecastAreaData = {
    area: string;
    forecast: string;
};

export default function Page() {
    const [selectedLocation, setSelectedLocation] = useState<AreaData | null>(null);
    const [forecastData, setForecastData] = useState<ForecastAreaData | null>(null);

    const handleLocationChange = async (location: AreaData) => {
        setSelectedLocation(location);
    }

    useEffect(() => {
        async function fetchForecast() {
            if (!selectedLocation) return;
            setForecastData(null);
            await fetch(`/api/v1/weather/forecast?area=${encodeURIComponent(selectedLocation.name)}`)
                .then(async (response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setForecastData(data);
                }).catch((error) => {
                    console.error("Error fetching forecast data:", error);
                });
        }
        fetchForecast();
    }, [selectedLocation]);

    return (
        <div className="justify-center flex">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Weather Forecast</CardTitle>
                    <CardDescription>
                        Get the 2 hour forecast for your location.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LocationSelect onLocationChange={handleLocationChange} />
                    {forecastData && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">Forecast for {forecastData.area}:</h3>
                            <p>{forecastData.forecast}</p>
                        </div>
                    )}
                    {!forecastData && selectedLocation && (
                        <div className="mt-4">
                            <Item variant="muted">
                                <ItemMedia>
                                    <Spinner />
                                </ItemMedia>
                                <ItemContent>
                                    <ItemTitle className="line-clamp-1">Loading forecast data...</ItemTitle>
                                </ItemContent>
                            </Item>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}