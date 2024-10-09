'use client'

import { HeaderComponent } from "@/components/header";
import MaskedAPIKey from "@/components/masked-api-key";
import RiskScoreCard from "@/components/risk-score-card";

export default function DashboardPage() {

    return (
        <>
            <HeaderComponent />
            <div className="flex flex-col min-h-screen items-center justify-center">
                <MaskedAPIKey/>
                <RiskScoreCard/>
            </div >
        </>
    );
}
