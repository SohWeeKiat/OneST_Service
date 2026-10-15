import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
    return (
        <div className="justify-center flex">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Verify UEN</CardTitle>
                    <CardDescription>
                        Enter your UEN below to verify
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="uen">UEN</Label>
                            <Input id="uen" type="text" autoCapitalize="none" autoComplete="off"
                                autoCorrect="off" />
                        </div>
                        <Button type="submit">Check</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}