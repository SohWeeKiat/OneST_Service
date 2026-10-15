'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { useState } from "react";
import type { SubmitEvent } from "react";

export default function Page() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function CheckUEN(uen: string) {
        setIsSubmitting(true);
        await fetch("/api/v1/uen-service/validate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ uen: uen }),
        }).then(async (response) => {
            if (!response.ok) {
                if (response.status === 400) {
                    const errorData = await response.json();
                    if (errorData.message && Array.isArray(errorData.message) && errorData.message.length > 0) {
                        toast.add({
                            title: "Bad Request",
                            description: errorData.message[0]

                        });
                    } else {
                        toast.add({
                            title: "Bad Request",
                            description: "An error occurred while processing your request.",
                        });
                    }
                } else
                    throw new Error(`HTTP error! status: ${response.status}`);
            }
            else {
                const data = await response.json();
                if (data.status === "success") {
                    toast.add({
                        title: "Success",
                        description: data.message
                    });
                }
                else {
                    toast.add({
                        title: "Error",
                        description: data.message
                    });
                }
            }

        }).catch((error) => {
            if (error.message !== null) {
                toast.add({
                    title: "Error",
                    description: error.message
                });
            }
        });
        setIsSubmitting(false);
    }

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const uen = formData.get("uen") as string;
        CheckUEN(uen);
    };

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
                    <form className="grid gap-4" onSubmit={handleSubmit}>
                        <div className="grid gap-2">
                            <Label htmlFor="uen">UEN</Label>
                            <Input id="uen" name="uen" type="text" autoCapitalize="none" autoComplete="off"
                                autoCorrect="off" disabled={isSubmitting} />
                        </div>
                        <Button type="submit" disabled={isSubmitting}>
                            Check
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}