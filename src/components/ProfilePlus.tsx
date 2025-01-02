import { useEffect, useState } from "react";
import Icons from "@/assets/Icons/Index";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import ShinyPlusButton from "./ui/ShinyPlusButton";
import axios from "axios"; // For making API requests

// Define the type for the profile data
interface ProfileData {
  is_premium: boolean;
  wallet_balance: number;
  buy_score: number;
}

export default function ProfilePlus() {
  // State to store profile data with defined type
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  // State to track loading state
  const [loading, setLoading] = useState(true);

  // Fetch the profile data from the API
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/profiles/")
      .then((response) => {
        setProfileData(response.data[0]); // Get the first profile from the array
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      });
  }, []);

  // Check if profileData is loaded and contains premium status
  const isPremium = profileData ? profileData.is_premium : false;

  if (loading) {
    return <div>Loading...</div>; // Show loading text while data is being fetched
  }

  return (
    <div className="LeftGrid grid h-0 col-span-4 mx-4 ml-4">
      <div className="left-section-top border-[1px] rounded-xl p-4 my-2">
        <div className="flex justify-between">
          <h1 className="flex px-1">اشتراک ویژه پلاس</h1>
        </div>
        <div className="PlusCard flex justify-start text-start items-start mt-5">
          <div className="PlusCard-Header flex flex-col justify-start items-start text-start px-10 py-4 border-[1px] rounded-lg">
            {isPremium ? (
              <h1 className="mb-4">اشتراک ویژه شما فعال است</h1>
            ) : (
              <>
                <h1 className="mb-4">اشتراک فعال ندارید</h1>
                <ShinyPlusButton>خرید اشتراک</ShinyPlusButton>
              </>
            )}
          </div>
        </div>
      </div>

      <h1 className="my-3">جمع‌بندی فعالیت‌های شما در پلاس تا کنون</h1>
      <div className="left-section-middle flex flex-col border-[1px] rounded-xl p-4 my-2 mb-10">
        {/* You can check the premium status and show data accordingly */}
        <div className="left-section-con flex flex-row">
          <div className="left-section-content flex items-center text-start my-1">
            <img
              className="IcoLeftSec size-16 ml-6"
              src={Icons.ConvertCart}
              alt=""
            />
            <div className="">
              <h1 className="text-sm ml-6">
                {profileData?.wallet_balance || "0"} تومان
              </h1>
              <h2 className="text-xs text-zinc-400 ml-6">موجودی کیف پول</h2>
            </div>
            <a
              className="hover-link flex text-center items-center text-xs text-[#9094ff]"
              href=""
            >
              جزئیات
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
          <Separator className="Separator mx-10" orientation="vertical" />
          <div className="left-section-content flex items-center text-start my-1">
            <img
              className="IcoLeftSec size-16 ml-6"
              src={Icons.FreeDelivery}
              alt=""
            />
            <div className="">
              <h1 className="text-sm ml-6">
                {profileData?.buy_score || "0"} عدد
              </h1>
              <h2 className="text-xs text-zinc-400 ml-6">امتیاز خرید</h2>
            </div>
            <a
              className="hover-link flex text-center items-center text-xs text-[#9094ff]"
              href=""
            >
              جزئیات
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
        </div>
        <hr className="my-4" />
        <Button
          className="flex flex-row items-center justify-between"
          variant="link"
        >
          <div className="flex flex-row justify-center items-center text-center">
            <img className="size-10" src={Icons.History} alt="" />
            <h1 className="mx-4">سوابق اشتراک‌های شما</h1>
          </div>
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
        </Button>
      </div>
    </div>
  );
}
