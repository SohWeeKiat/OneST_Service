import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Cron } from '@nestjs/schedule';

export type LocationData = {
    latitude: number;
    longitude: number;
};

export type AreaData = {
    name: string;
    label_location: LocationData;
};

export type ForecastAreaData = {
    area: string;
    forecast: string;
};

type ForecastPeriod = {
    update_timestamp: string;
    timestamp: string;
    valid_period: {
        start: string;
        end: string;
        text: string;
    };
};

type ForecastData = ForecastPeriod & {
    forecasts: ForecastAreaData[];
};

@Injectable()
export class WeatherService implements OnModuleInit {
    private readonly NEA_API_URL: string = 'https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast';
    private AreaData: AreaData[] = [];
    private ForecastMap: Map<string, ForecastAreaData> = new Map();
    private ForecastData: ForecastData | null = null;

    constructor(private readonly httpService: HttpService) { }

    @Cron('*/5 * * * *')
    private async LoadData(): Promise<void> {
        try {
            const data = await firstValueFrom(
                this.httpService.get<any>(this.NEA_API_URL)
            );
            if (data.status !== 200) {
                console.error(`Failed to fetch weather data. Status code: ${data.status}`);
                return;
            }
            const responseData = data.data;
            this.AreaData = responseData.data.area_metadata;
            const forecasts = responseData.data.items as ForecastData[];
            if (forecasts && forecasts.length > 0) {
                const forecastData = forecasts[0];
                this.ForecastMap.clear();
                for (const forecast of forecastData.forecasts) {
                    this.ForecastMap.set(forecast.area, forecast);
                }
                this.ForecastData = forecastData;
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            console.log('Retrying in 3 seconds...');
            setTimeout(() => this.LoadData(), 3000);
        }
    }

    async onModuleInit(): Promise<void> {
        await this.LoadData();
    }

    getWeatherLocations(): AreaData[] {
        return this.AreaData;
    }

    getWeatherForecast(area: string): ForecastAreaData | undefined {
        return this.ForecastMap.get(area);
    }

    getLastUpdateTimestamp(): string | null {
        return this.ForecastData ? this.ForecastData.update_timestamp : null;
    }
}
