import React, { useEffect, useState } from "react";
import axios from "axios"; // <-- Import axios
import { Progress } from "@/components/ui/progress";
<<<<<<< HEAD
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
=======
import ShinyPlusButton from "./ui/ShinyPlusButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Icons from "@/assets/Icons/Index";
>>>>>>> 6545968a96e97406180cfc69c6858a1b48acff8c

interface ArrowLeftIconProps {
  className?: string;
}
const ArrowLeftIcon: React.FC<ArrowLeftIconProps> = ({ className }) => {
  return (
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
};

interface PlusCardHeaderProps {
  isPremium: boolean;
  profileData?: ProfileData | null;
}

const PlusCardHeader: React.FC<PlusCardHeaderProps> = ({
  isPremium,
  profileData,
}) => {
  const [progress, setProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState<string | null>(null);

  useEffect(() => {
    if (
      isPremium &&
      profileData?.premium_start_date &&
      profileData?.premium_end_date
    ) {
      const startDate = new Date(profileData.premium_start_date);
      const endDate = new Date(profileData.premium_end_date);
      const now = new Date();

      const totalDuration = endDate.getTime() - startDate.getTime();
      const elapsedTime = now.getTime() - startDate.getTime();
      const progressPercentage = Math.min(
        (elapsedTime / totalDuration) * 100,
        100,
      );

      setProgress(progressPercentage);

      const remainingTimeMillis = endDate.getTime() - now.getTime();

      if (remainingTimeMillis <= 0) {
        setRemainingTime("زمان اشتراک شما به پایان رسیده است");
      } else {
        const remainingDays = Math.floor(
          remainingTimeMillis / (1000 * 3600 * 24),
        );
        const remainingHours = Math.floor(
          (remainingTimeMillis % (1000 * 3600 * 24)) / (1000 * 3600),
        );
        const remainingMinutes = Math.floor(
          (remainingTimeMillis % (1000 * 3600)) / (1000 * 60),
        );

        let timeString = "";

        if (remainingDays > 0) {
          timeString += `${remainingDays} روز `;
        }

        timeString += `${remainingHours} ساعت ${remainingMinutes} دقیقه`;

        setRemainingTime(timeString);
      }
    }
  }, [isPremium, profileData]);

  return (
    <div className="PlusCard flex flex-col justify-start items-start text-start px-6 py-4 border-[1px] rounded-lg">
      {isPremium ? (
        <div>
          <h1 className="mb-4">اشتراک ویژه شما فعال است</h1>
          <h2 className="text-xs mb-2">
            زمان باقی‌مانده : {remainingTime || "در حال بارگیری..."}
          </h2>
          <div className="w-full">
            <Progress value={100 - progress} />
          </div>
          <div className="flex flex-row mt-3">
            <h3 className="text-xs text-zinc-500 ml-5">
              شروع :{" "}
              {profileData?.premium_start_date
                ? new Date(profileData.premium_start_date).toLocaleDateString()
                : ""}
            </h3>
            <h3 className="text-xs text-zinc-500">
              انقضا :{" "}
              {profileData?.premium_end_date
                ? new Date(profileData.premium_end_date).toLocaleDateString()
                : ""}
            </h3>
          </div>
        </div>
      ) : (
        <>
          <h1 className="mb-4">اشتراک فعال ندارید</h1>
          <ShinyPlusButton>خرید اشتراک</ShinyPlusButton>
        </>
      )}
    </div>
  );
};

interface ActivitySummaryProps {
  iconSrc: string;
  amount: number | string;
  description: string;
}

const ActivitySummary: React.FC<ActivitySummaryProps> = ({
  iconSrc,
  amount,
  description,
}) => {
  return (
    <div className="flex items-center text-start my-1">
      <img className="size-16 ml-6" src={iconSrc} alt="" />
      <div className="">
        <h1 className="text-sm ml-6">{amount} تومان</h1>
        <h2 className="text-xs text-zinc-400 ml-6">{description}</h2>
      </div>
      <a
        className="hover-link flex text-center items-center text-xs text-[#9094ff]"
        href=""
      >
        جزئیات
        <ArrowLeftIcon className="hover-icon size-4 mt-[1px]" />
      </a>
    </div>
  );
};

interface PlusButtonProps {
  buttonText: string;
}

const PlusButton: React.FC<PlusButtonProps> = ({ buttonText }) => {
  return (
    <Button
      className="flex flex-row items-center justify-between"
      variant="link"
    >
      <div className="flex flex-row justify-center items-center text-center">
        <img className="size-10" src={Icons.History} alt="" />
        <h1 className="mx-4">{buttonText}</h1>
      </div>
      <ArrowLeftIcon className="hover-icon size-4 mt-[1px]" />
    </Button>
  );
};

interface ProfileData {
  is_premium: boolean;
  wallet_balance: number;
  buy_score: number;
  premium_start_date: string;
  premium_end_date: string;
}

export default function ProfilePlus() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const response = await axios.get("https://amirabbasixi234.pythonanywhere.com/api/profiles/");
        if (response.data.length > 0) {
          setProfileData(response.data[0]);
        } else {
          setFetchError("No profile data found.");
        }
      } catch (error: any) {
        console.error("Error fetching profile data:", error);
        setFetchError("Failed to load profile data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
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
    <div className="LeftGrid grid h-0 col-span-4 mx-4 ml-4">
      <div className="border-[1px] rounded-xl p-4 my-2">
        <div className="flex justify-between">
          <h1 className="flex px-1">اشتراک ویژه پلاس</h1>
        </div>
        <div className="flex justify-start text-start items-start mt-5">
          <PlusCardHeader
            isPremium={profileData?.is_premium || false}
            profileData={profileData}
          />
        </div>
      </div>
      <h1 className="my-3">جمع‌بندی فعالیت‌های شما در پلاس تا کنون</h1>
      <div className="left-section-middle flex flex-col border-[1px] rounded-xl p-4 my-2 mb-10">
        <div className="left-section-con flex flex-row">
          <ActivitySummary
            iconSrc={Icons.ConvertCart}
            amount={profileData?.wallet_balance || 0}
            description="مبلغ نقدی دریافت شده"
          />
          <Separator className="Separator mx-10" orientation="vertical" />
          <ActivitySummary
            iconSrc={Icons.FreeDelivery}
            amount={profileData?.buy_score || 0}
            description="تعداد بهره‌گیری از ارسال رایگان"
          />
        </div>
        <hr className="my-4" />
        <PlusButton buttonText="سوابق اشتراک‌های شما" />
      </div>
    </div>
  );
}
