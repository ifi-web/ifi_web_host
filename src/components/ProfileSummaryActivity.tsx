import React, { useEffect, useState } from "react";
import Icons from "@/assets/Icons/Index";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/ProductCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function ProfileSummaryActivity() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/products/") // Fetch from the updated API endpoint
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Store the entire product list from the API
        const userCart =
          data.find((product) => product.title === "loq2024")?.cart || []; // Example condition for the user cart (you can change it as needed)
        setCartItems(userCart);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="LeftGrid grid grid-rows-1 col-span-4 mx-4 ml-4">
      {/* Orders Section */}
      <div className="left-section-top border-[1px] rounded-xl p-4 my-2">
        <div className="flex justify-between">
          <h1 className="flex px-1">سفارش‌های من</h1>
          <a
            className="hover-link flex text-center items-center text-xs text-[#9094ff]"
            href=""
          >
            مشاهده همه
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="hover-icon size-4 mt-[1px]"
            >
              <path
                fillRule="evenodd"
                d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
        <div className="BoxTime flex flex-row justify-around text-center items-center">
          <img className="AuthIcon w-16" src={Icons.BoxTime} alt="" />
          <img className="AuthIcon w-16" src={Icons.BoxRemove} alt="" />
          <img className="AuthIcon w-16" src={Icons.BoxTick} alt="" />
        </div>
        <div className="BoxTime grid grid-cols-3 gap-4 mt-4 text-center">
          <div className="text-xs backdrop-blur-md border-[1.1px] border-[#919191] rounded-md p-2">
            <h1>جاری</h1>
            <Separator className="my-1 bg-neutral-600" />
            <h2>0 - سفارش</h2>
          </div>
          <div className="text-xs backdrop-blur-md border-[1.1px] border-[#919191] rounded-md p-2">
            <h1>مرجوع شده</h1>
            <Separator className="my-1 bg-neutral-600" />
            <h2>0 - سفارش</h2>
          </div>
          <div className="text-xs backdrop-blur-md border-[1.1px] border-[#919191] rounded-md p-2">
            <h1>تحویل شده</h1>
            <Separator className="my-1 bg-neutral-600" />
            <h2>0 - سفارش</h2>
          </div>
        </div>
      </div>

      {/* User List Section */}
      <div className="left-section-middle flex flex-col border-[1px] rounded-xl p-4 my-2">
        <h1 className="px-1">از لیست‌های شما</h1>
        <ScrollArea dir="rtl" className="w-full mt-3 whitespace-nowrap pb-3">
          <div className="flex w-full h-full">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                image={product.image}
                price={product.price}
                description={product.description}
                warehouseStatus={product.warehouse_status} // Directly use warehouse_status from API
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Frequent Purchases Section (Empty) */}
      <div className="left-section-bottom flex flex-col border-[1px] rounded-xl p-4 my-2">
        خریدهای پرتکرار شما
        <ScrollArea dir="rtl" className="w-full mt-3 whitespace-nowrap pb-3">
          <div className="flex w-full h-full">
            <p className="text-center text-gray-500 w-full">
              آیتمی برای نمایش وجود ندارد.
            </p>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
