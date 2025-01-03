import Icons from "@/assets/Icons/Index";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProfileCurrentOrder from "@/components/ProfileOrder/ProfileCurrentOrder";
import ProfileDeliveredOrder from "@/components/ProfileOrder/ProfileDeliveredOrder";
import ProfileReturnedOrder from "@/components/ProfileOrder/ProfileReturnedOrder";
import ProfileCancelledOrder from "@/components/ProfileOrder/ProfileCancelledOrder";
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type OrderTab = "current" | "delivered" | "returned" | "cancelled";

const orderComponents = {
  current: ProfileCurrentOrder,
  delivered: ProfileDeliveredOrder,
  returned: ProfileReturnedOrder,
  cancelled: ProfileCancelledOrder
};

export default function ProfileOrders() {
  const [activeTab, setActiveTab] = useState<OrderTab>("current");
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [orderCounts, setOrderCounts] = useState<{ [key in OrderTab]: number }>(
    {
      current: 0,
      delivered: 0,
      returned: 0,
      cancelled: 0
    }
  );

  const fetchData = async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          resolve({
            data: {
              current: 3,
              delivered: 5,
              returned: 1,
              cancelled: 2
            }
          });
        }, 1000)
      );
      setOrderCounts(
        (response as { data: { [key in OrderTab]: number } }).data
      );
    } catch (error) {
      console.error("Error fetching orders data:", error);
      setFetchError("Failed to load orders. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const OrderComponent = orderComponents[activeTab] || (() => null);

  const tabs = [
    { label: "جاری", value: "current" },
    { label: "تحویل شده", value: "delivered" },
    { label: "مرجوع شده", value: "returned" },
    { label: "لغو شده", value: "cancelled" }
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg">
        <Alert className="w-fit">
          <AlertTitle className="m-auto">در حال بارگیری...</AlertTitle>
        </Alert>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg">
        <Alert className="w-fit text-red-600">
          <AlertTitle className="m-auto">خطا</AlertTitle>
          <AlertDescription className="m-auto">{fetchError}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="LeftGrid grid h-0 col-span-4 mx-4 ml-4">
      <div className="section-top border-[1px] rounded-xl p-4 my-2">
        <div className="section-top-header flex flex-row justify-between items-center text-center">
          <h1>تاریخچه سفارشات</h1>
          <Button variant="ghost" size="icon">
            <img src={Icons.Search} alt="Search Icon" />
          </Button>
        </div>
        <div className="section-top-head flex flex-row justify-start items-center mt-4">
          {tabs.map(({ label, value }) => (
            <Button
              key={value}
              variant={activeTab === value ? "secondary" : "ghost"}
              className="mx-1"
              onClick={() => setActiveTab(value as OrderTab)}
            >
              {label}
              <Badge variant="secondary" className="rounded-lg">
                {orderCounts[value as OrderTab]}
              </Badge>
            </Button>
          ))}
        </div>
        <hr className="my-3" />
        <OrderComponent />
      </div>
    </div>
  );
}
