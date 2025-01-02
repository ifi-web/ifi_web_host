import Icons from "@/assets/Icons/Index";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ShinyButtonGreen from "@/components/ui/ShinyButtonGreen";
import NumberTicker from "@/components/ui/number-ticker";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext.tsx";
import axios from "axios";

import ProfileSummaryActivity from "@/components/ProfileSummaryActivity";
import ProfilePlus from "@/components/ProfilePlus.tsx";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  token: string;
  phone_number?: number;
  wallet_balance: number;
  buy_score: number;
  is_verified: boolean;
  gmail: string;
}

export default function Profile() {
  const [activeComponent, setActiveComponent] = useState<
    "summary" | "plus" | null
  >("summary");

  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate("/login");
  };

  const { user } = useAuth() as { user: User | null };
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:8000/api/profiles/", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          const userProfile = response.data.find(
            (profile: User) => profile.username === user.username,
          );
          setProfile(userProfile);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }
  }, [user]);

  const handleSummaryClick = () => {
    setActiveComponent((prev) => (prev === "summary" ? null : "summary"));
  };

  const handlePlusClick = () => {
    setActiveComponent((prev) => (prev === "plus" ? null : "plus"));
  };

  return (
    <ScrollArea className="ProfileContainer h-[80vh]">
      {profile ? (
        <div className="GridContainer grid h-full grid-cols-6" dir="rtl">
          {/* rg */}
          <div className="RightGrid right-section-full flex flex-col border-[1px] rounded-xl p-4 col-span-2 mr-4 my-2 h-min lg:sticky lg:top-2">
            <div className="Info flex justify-between mb-1">
              <div className="Info flex flex-row text-center items-center">
                <h1 className=" ml-3">{profile?.username}</h1>
                <h2 className="mt-1 text-neutral-400">
                  {profile?.phone_number || "N/A"}
                </h2>
              </div>
              <div className="EditInfo flex flex-row text-center items-center">
                <a href="" className="flex">
                  <h1 className="text-xs mx-1 mb-1 text-neutral-400">ویرایش</h1>
                  <img className="AuthIcon size-5" src={Icons.Edit} alt="" />
                </a>
              </div>
            </div>
            <div className="Info flex justify-between mb-1">
              <div className="Info flex flex-row text-center items-center">
                <h1 className=" ml-3">کیف پول</h1>
                <NumberTicker
                  className="mt-1"
                  value={profile?.wallet_balance ?? 0}
                />
                <h2 className="text-xs text-neutral-300 mx-1">تومان</h2>
              </div>
              <div className="EditInfo flex flex-row text-center items-center">
                <a href="" className="flex">
                  <h1 className="text-xs mx-1 mb-1 text-neutral-400">
                    افزایش موجودی
                  </h1>
                  <img
                    className="AuthIcon size-5"
                    src={Icons.WalletAdd}
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div className="Info flex justify-between mb-1">
              <div className="Info flex flex-row text-center items-center">
                <h1 className="ml-3">امتیاز خرید</h1>
                <h2 className="mt-1 text-neutral-400">
                  {profile?.buy_score || "0"}
                </h2>
              </div>
              <div className="EditInfo flex flex-row text-center items-center">
                <a href="" className="flex">
                  <h1 className="text-xs mx-1 mb-1 text-neutral-400">
                    افزایش امتیازات
                  </h1>
                  <img
                    className="AuthIcon size-5"
                    src={Icons.MoneyRecive}
                    alt=""
                  />
                </a>
              </div>
            </div>

            <Separator className="my-2 bg-neutral-700" />
            <div className="flex flex-row justify-center items-center text-center">
              <Link to={`/verification/${profile?.gmail}`}>
                {!profile?.is_verified && (
                  <ShinyButtonGreen className="" onClick={handleProfileClick}>
                    احراز هویت حساب کاربری
                  </ShinyButtonGreen>
                )}
              </Link>
            </div>
            {!profile?.is_verified && (
              <Separator className="my-2 bg-neutral-700" />
            )}

            <div className="Links flex flex-col justify-start items-start -mr-3">
              <Button
                variant="link"
                className="my-1"
                onClick={handleSummaryClick}
              >
                <img
                  className="AuthIcon size-7"
                  src={Icons.Category}
                  alt="ProfileSummaryActivity"
                />
                خلاصه فعالیت ‌ها
              </Button>

              <Button
                variant="link"
                className="my-1 text-violet-500"
                onClick={handlePlusClick}
              >
                <img className="AuthIcon size-7" src={Icons.Plus} alt="" />
                پلاس
              </Button>
              <Button variant="link" className="my-1">
                <img className="AuthIcon size-7" src={Icons.Bag} alt="" />
                سفارش‌ها
              </Button>
              <Button variant="link" className="my-1">
                <img className="AuthIcon size-7" src={Icons.NoteFav} alt="" />
                لیست‌های من
              </Button>
              <Button variant="link" className="my-1">
                <img className="AuthIcon size-7" src={Icons.Message} alt="" />
                دیدگاه‌ها و پرسش‌ها
              </Button>
              <Button variant="link" className="my-1">
                <img className="AuthIcon size-7" src={Icons.Map} alt="" />
                آدرس‌ها
              </Button>
              <Button variant="link" className="my-1">
                <img className="AuthIcon size-7" src={Icons.Gift} alt="" />
                کارت‌های هدیه
              </Button>
              <Button variant="link" className="my-1">
                <img className="AuthIcon size-7" src={Icons.Clock} alt="" />
                بازدید‌های اخیر
              </Button>
              <Button variant="link" className="my-1">
                <img className="AuthIcon size-7" src={Icons.User} alt="" />
                اطلاعات حساب کاربری
              </Button>
              <Button variant="link" className="my-1 text-red-500">
                <img className="ExitIc size-7" src={Icons.UserRemove} alt="" />
                خروج
              </Button>
            </div>
          </div>
          {/* lg */}

          <div className="lg:col-span-4 col-span-6">
            {activeComponent === "summary" && <ProfileSummaryActivity />}
            {activeComponent === "plus" && <ProfilePlus />}
          </div>

          {/* <ProfileSummaryActivity /> */}
          {/* <ProfilePlus /> */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </ScrollArea>
  );
}
