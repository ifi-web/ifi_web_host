import Icons from "@/assets/Icons/Index";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/ProductCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z"
      clipRule="evenodd"
    />
  </svg>
);

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  warehouse_status: "in_stock" | "limited" | "out_of_stock";
  cart: any[];
}

interface SummaryCardProps {
  cardTitle: string;
  firstIconSrc: string;
  secondIconSrc: string;
  thirdIconSrc: string;
  currentOrdersStatus: string;
  returnedOrdersStatus: string;
  deliveredOrdersStatus: string;
}
interface ListCardProps {
  listTitle: string;
  productList?: Product[];
}

function SummaryCard({
  cardTitle,
  firstIconSrc,
  secondIconSrc,
  thirdIconSrc,
  currentOrdersStatus,
  returnedOrdersStatus,
  deliveredOrdersStatus,
}: SummaryCardProps) {
  return (
    <div className="border-[1px] rounded-xl p-4 my-2">
      <div className="flex justify-between">
        <h1 className="flex px-1">{cardTitle}</h1>
        <a
          className="hover-link flex text-center items-center text-xs text-[#9094ff]"
          href=""
        >
          مشاهده همه
          <ArrowLeftIcon className="hover-icon size-4 mt-[1px]" />
        </a>
      </div>
      <div className="flex flex-row justify-around text-center items-center">
        <img className="w-16" src={firstIconSrc} alt="" />
        <img className="w-16" src={secondIconSrc} alt="" />
        <img className="w-16" src={thirdIconSrc} alt="" />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4 text-center">
        <div className="text-xs backdrop-blur-md border-[1.1px] border-[#919191] rounded-md p-2">
          <h1>جاری</h1>
          <Separator className="my-1 bg-neutral-600" />
          <h2>{currentOrdersStatus}</h2>
        </div>
        <div className="text-xs backdrop-blur-md border-[1.1px] border-[#919191] rounded-md p-2">
          <h1>مرجوع شده</h1>
          <Separator className="my-1 bg-neutral-600" />
          <h2>{returnedOrdersStatus}</h2>
        </div>
        <div className="text-xs backdrop-blur-md border-[1.1px] border-[#919191] rounded-md p-2">
          <h1>تحویل شده</h1>
          <Separator className="my-1 bg-neutral-600" />
          <h2>{deliveredOrdersStatus}</h2>
        </div>
      </div>
    </div>
  );
}

function ListCard({ listTitle, productList }: ListCardProps) {
  return (
    <div className="flex flex-col border-[1px] rounded-xl p-4 my-2">
      <h1 className="px-1">{listTitle}</h1>
      <ScrollArea dir="rtl" className="w-full mt-3 whitespace-nowrap pb-3">
        <div className="flex w-[1px] h-full">
          {productList && productList.length > 0 ? (
            productList.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                image={product.image}
                price={product.price}
                warehouseStatus={product.warehouse_status}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 w-full">
              آیتمی برای نمایش وجود ندارد.
            </p>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export default function ProfileSummaryActivity() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const response = await fetch("https://amirabbasixi234.pythonanywhere.com/api/products/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error: any) {
        console.error("Error fetching products:", error);
        setFetchError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
    <div className="LeftGrid grid grid-rows-1 col-span-4 mx-4 ml-4">
      <SummaryCard
        cardTitle="سفارش‌های من"
        firstIconSrc={Icons.BoxTime}
        secondIconSrc={Icons.BoxRemove}
        thirdIconSrc={Icons.BoxTick}
        currentOrdersStatus="0 - سفارش"
        returnedOrdersStatus="0 - سفارش"
        deliveredOrdersStatus="0 - سفارش"
      />
      <ListCard listTitle="از لیست‌های شما" productList={products} />
      <ListCard listTitle="خریدهای پرتکرار شما" />
    </div>
  );
}
