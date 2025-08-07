  import OverviewPage from "./overview/page";

export default function TaxpayerOverviewPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 text-lg">
          Quick insights into your certificate management system
        </p>
      </div>

      <OverviewPage />
    </div>
  );
}
