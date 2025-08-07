import { Suspense } from "react";
import TaxpayerRegistrationGenerator from "@/components/tax/form";

export default function TaxpayerRegistration() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <TaxpayerRegistrationGenerator />
    </Suspense>
  );
}
