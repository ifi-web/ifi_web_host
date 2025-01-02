import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "./ui/input";
import ShinyButton from "./ui/shiny-button";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import BlurFade from "./ui/blur-fade";
import SparklesText from "./ui/sparkles-text";
import Meteors from "./ui/meteors";
import { Drawer, DrawerContent } from "./ui/drawer";
import { Dock, DockIcon } from "./ui/dock";

export type IconProps = React.HTMLAttributes<SVGElement>;

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDarkMode)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;

    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  // Drawer
  const [isOpen, setIsOpen] = useState(false);
  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  // InputFocus
  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <nav className="Nav flex flex-col mb-5">
      <div className="NavTop flex justify-around m-4">
        <Meteors number={8} />
        <div className="NavButton flex justify-center space-x-4 ">
          <Link to="/signup">
            <ShinyButton className="NavLinks pt-[8px] rounded-lg hidden sc-sm:inline-flex">
              ثبت‌نام
            </ShinyButton>
          </Link>

          <Button
            className="NavLinks pt-[6px] rounded-lg hidden sc-large:inline-flex"
            onClick={() => navigate("/login")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4 -mx-1 mt-[2px]"
            >
              <path d="M4.75 2A2.75 2.75 0 0 0 2 4.75v6.5A2.75 2.75 0 0 0 4.75 14h3a2.75 2.75 0 0 0 2.75-2.75v-.5a.75.75 0 0 0-1.5 0v.5c0 .69-.56 1.25-1.25 1.25h-3c-.69 0-1.25-.56-1.25-1.25v-6.5c0-.69.56-1.25 1.25-1.25h3C8.44 3.5 9 4.06 9 4.75v.5a.75.75 0 0 0 1.5 0v-.5A2.75 2.75 0 0 0 7.75 2h-3Z" />
              <path d="M8.03 6.28a.75.75 0 0 0-1.06-1.06L4.72 7.47a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06l-.97-.97h7.19a.75.75 0 0 0 0-1.5H7.06l.97-.97Z" />
            </svg>
            ورود
          </Button>
        </div>
        <div className="NavSearch flex flex-row">
          <Input
            ref={inputRef}
            dir="rtl"
            className="InputSearch w-[60vw] rounded-lg"
            type="search"
            placeholder="جست‌جو"
          />
          <ShinyButton
            className="NavLinks mx-2 pt-[10px] px-3 rounded-lg hidden sc-large:inline-flex"
            onClick={toggleTheme}
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4"
              >
                <path d="M14.438 10.148c.19-.425-.321-.787-.748-.601A5.5 5.5 0 0 1 6.453 2.31c.186-.427-.176-.938-.6-.748a6.501 6.501 0 1 0 8.585 8.586Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4"
              >
                <path d="M8 1a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 1ZM10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM12.95 4.11a.75.75 0 1 0-1.06-1.06l-1.062 1.06a.75.75 0 0 0 1.061 1.062l1.06-1.061ZM15 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 15 8ZM11.89 12.95a.75.75 0 0 0 1.06-1.06l-1.06-1.062a.75.75 0 0 0-1.062 1.061l1.061 1.06ZM8 12a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 12ZM5.172 11.89a.75.75 0 0 0-1.061-1.062L3.05 11.89a.75.75 0 1 0 1.06 1.06l1.06-1.06ZM4 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 4 8ZM4.11 5.172A.75.75 0 0 0 5.173 4.11L4.11 3.05a.75.75 0 1 0-1.06 1.06l1.06 1.06Z" />
              </svg>
            )}
          </ShinyButton>
        </div>
        <div className="NavLogos">
          <Link to="/">
            <h1 className="NavLogo text-2xl font-bold">شت‌لاین</h1>
          </Link>
        </div>
      </div>
      <div className="NavBottom flex flex-row justify-between items-center">
        <div className="NavButtons flex flex-row items-center space-x-4 pt-1 mx-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4 -mx-2 mb-1 hidden sc-large:inline-flex"
          >
            <path
              fillRule="evenodd"
              d="m3.855 7.286 1.067-.534a1 1 0 0 0 .542-1.046l-.44-2.858A1 1 0 0 0 4.036 2H3a1 1 0 0 0-1 1v2c0 .709.082 1.4.238 2.062a9.012 9.012 0 0 0 6.7 6.7A9.024 9.024 0 0 0 11 14h2a1 1 0 0 0 1-1v-1.036a1 1 0 0 0-.848-.988l-2.858-.44a1 1 0 0 0-1.046.542l-.534 1.067a7.52 7.52 0 0 1-4.86-4.859Z"
              clipRule="evenodd"
            />
          </svg>
          <SparklesText
            className="text-neutral-500 text-sm hidden sc-large:inline-flex"
            text="24 ساعت و 7 روز هفته"
          />
          <ShinyButton
            className="NavLinks pt-[8px] rounded-lg hidden sc-large:inline-flex"
            onClick={handleProfileClick}
          >
            تماس باما
          </ShinyButton>
        </div>
        <div className="NavButtons flex flex-row space-x-10 pt-1 mx-12">
          <BlurFade direction="left" delay={0.3} duration={0.5} inView>
            <a
              href="#shop"
              className="hidden flex-row justify-center items-center text-center text-xs sc-large:inline-flex"
            >
              درباره‌ما
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4 mx-1"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </BlurFade>
          <BlurFade direction="left" delay={0.3} duration={0.5} inView>
            <a
              href="#blog"
              className="hidden flex-row justify-center items-center text-center text-xs sc-large:inline-flex"
            >
              بلاگ
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4 mx-1"
              >
                <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
              </svg>
            </a>
          </BlurFade>
          <BlurFade direction="left" delay={0.3} duration={0.5} inView>
            <a
              href="#menu"
              className="hidden flex-row justify-center items-center text-center text-xs sc-large:inline-flex"
            >
              فروشگاه
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4 mx-1"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </BlurFade>
          <BlurFade direction="left" delay={0.3} duration={0.5} inView>
            <a
              href="#aboutus"
              className="hidden flex-row justify-center items-center text-center text-xs sc-large:inline-flex"
            >
              صفحه اصلی
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4 mx-1"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
            </a>
          </BlurFade>

          {/* ========================= drop down part ============================= */}

          <BlurFade direction="left" delay={0.1} duration={0.5} inView>
            <DropdownMenu>
              <DropdownMenuTrigger className="hidden flex-row justify-center items-center text-center text-xs sc-large:inline-flex">
                دسته‌بندی کالاها
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4 mx-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 4.5A.75.75 0 0 1 3 3.75h14.25a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Zm0 4.5A.75.75 0 0 1 3 8.25h9.75a.75.75 0 0 1 0 1.5H3A.75.75 0 0 1 2.25 9Zm15-.75A.75.75 0 0 1 18 9v10.19l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 1 1 1.06-1.06l2.47 2.47V9a.75.75 0 0 1 .75-.75Zm-15 5.25a.75.75 0 0 1 .75-.75h9.75a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="text-xs text-center" dir="rtl">
                  محصولات
                </DropdownMenuLabel>

                <DropdownMenuItem className="text-xs" dir="rtl">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-row justify-between text-xs w-full text-start">
                      موبایل
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.78 4.22a.75.75 0 0 1 0 1.06L6.56 10.5h3.69a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75v-5.5a.75.75 0 0 1 1.5 0v3.69l5.22-5.22a.75.75 0 0 1 1.06 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-[190px] ">
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        برندهای مختلف موبایل
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        برندهای برتر
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        گوشی بر اساس قیمت
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        گوشی بر اساس عملکرد
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        گوشی بر اساس حافظه داخلی
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        رزولوشن دوربین
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        لوازم جانبی موبایل
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        تبلت
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        هدفون
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        ساعت و مچ‌بند هوشمند
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        داغ ترین ها
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DropdownMenuItem>

                {/*  */}

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-xs" dir="rtl">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-row justify-between text-xs w-full text-start">
                      کالای دیجیتال
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.78 4.22a.75.75 0 0 1 0 1.06L6.56 10.5h3.69a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75v-5.5a.75.75 0 0 1 1.5 0v3.69l5.22-5.22a.75.75 0 0 1 1.06 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-[190px] ">
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        لپ‌تاپ
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        تبلت
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        ساعت هوشمند
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        هدفون و هدست
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        پاوربانک
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        کنسول بازی
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        لوازم جانبی موبایل (شارژر، قاب، محافظ صفحه)
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        دوربین دیجیتال
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        مودم و روتر
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DropdownMenuItem>

                {/*  */}

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-xs" dir="rtl">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-row justify-between text-xs w-full text-start">
                      کتاب، لوازم‌تحریر و هنر
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.78 4.22a.75.75 0 0 1 0 1.06L6.56 10.5h3.69a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75v-5.5a.75.75 0 0 1 1.5 0v3.69l5.22-5.22a.75.75 0 0 1 1.06 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-[190px] ">
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        کتاب داستان
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        رمان
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        دفتر یادداشت
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        لوازم نقاشی (مداد رنگی، آبرنگ)
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        قلم خوشنویسی
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        ماژیک وایت‌برد
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        کتاب‌های علمی و آموزشی
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        تقویم و پلنر
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        ست اداری (پرگار، گونیا)
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        وسایل کاغذ و کاردستی
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DropdownMenuItem>

                {/*  */}

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-xs" dir="rtl">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-row justify-between text-xs w-full text-start">
                      خانه و آشپزخانه
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.78 4.22a.75.75 0 0 1 0 1.06L6.56 10.5h3.69a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75v-5.5a.75.75 0 0 1 1.5 0v3.69l5.22-5.22a.75.75 0 0 1 1.06 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-[190px] ">
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        ظروف آشپزخانه (قابلمه، ماهیتابه)
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        سرویس قاشق و چنگال
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        وسایل تزئینی (شمع، گلدان)
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        پرده
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        فرش و قالیچه
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        ماکروویو
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        چای‌ساز و قهوه‌ساز
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        میز و صندلی
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        ابزار نظافت (جارو، تی)
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        سرویس خواب
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DropdownMenuItem>

                {/*  */}

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-xs" dir="rtl">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-row justify-between text-xs w-full text-start">
                      لوازم خانگی برقی
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.78 4.22a.75.75 0 0 1 0 1.06L6.56 10.5h3.69a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75v-5.5a.75.75 0 0 1 1.5 0v3.69l5.22-5.22a.75.75 0 0 1 1.06 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-[190px] ">
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        یخچال
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        ماشین لباسشویی
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        ماشین ظرفشویی
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        اجاق گاز
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        جاروبرقی
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        پنکه
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        بخاری برقی
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        تلویزیون
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        کولر گازی
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        توستر
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DropdownMenuItem>

                {/*  */}

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-xs" dir="rtl">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-row justify-between text-xs w-full text-start">
                      مد و پوشاک
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.78 4.22a.75.75 0 0 1 0 1.06L6.56 10.5h3.69a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75v-5.5a.75.75 0 0 1 1.5 0v3.69l5.22-5.22a.75.75 0 0 1 1.06 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-[190px] ">
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        تی‌شرت
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        شلوار جین
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        مانتو
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        کفش ورزشی
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        کیف دستی
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        کت و شلوار
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        کمربند
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        لباس زیر
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        روسری و شال
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        ساعت مچی
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DropdownMenuItem>

                {/*  */}

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-xs" dir="rtl">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-row justify-between text-xs w-full text-start">
                      طلا و نقره
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.78 4.22a.75.75 0 0 1 0 1.06L6.56 10.5h3.69a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75v-5.5a.75.75 0 0 1 1.5 0v3.69l5.22-5.22a.75.75 0 0 1 1.06 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-[190px] ">
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        گردنبند طلا
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        انگشتر طلا
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        دستبند طلا
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        سرویس طلا
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        پلاک طلا
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        گوشواره طلا
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        گردنبند نقره
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        انگشتر نقره
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        دستبند نقره
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        سرویس نقره
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DropdownMenuItem>

                {/*  */}

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-xs" dir="rtl">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-row justify-between text-xs w-full text-start">
                      آرایشی و بهداشتی
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.78 4.22a.75.75 0 0 1 0 1.06L6.56 10.5h3.69a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75v-5.5a.75.75 0 0 1 1.5 0v3.69l5.22-5.22a.75.75 0 0 1 1.06 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-[190px] ">
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        کرم مرطوب‌کننده
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        شامپو
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        لوسیون بدن
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        رژ لب
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        کرم ضدآفتاب
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        ریمل
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        ماسک صورت
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        عطر و ادکلن
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        دستمال مرطوب
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        برس و شانه
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DropdownMenuItem>

                {/*  */}

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-xs" dir="rtl">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-row justify-between text-xs w-full text-start">
                      تجهیزات پزشکی و سلامت
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.78 4.22a.75.75 0 0 1 0 1.06L6.56 10.5h3.69a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75v-5.5a.75.75 0 0 1 1.5 0v3.69l5.22-5.22a.75.75 0 0 1 1.06 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-[190px] ">
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        ماسک
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        فشارسنج
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        دستگاه تست قند خون
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        دماسنج دیجیتال
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        ویلچر
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        اسپری ضدعفونی‌کننده
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        محلول شستشو
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        جوراب طبی
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        دستگاه بخور
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        مکمل‌های دارویی
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DropdownMenuItem>

                {/*  */}

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-xs" dir="rtl">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-row justify-between text-xs w-full text-start">
                      ورزش و سفر
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.78 4.22a.75.75 0 0 1 0 1.06L6.56 10.5h3.69a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75v-5.5a.75.75 0 0 1 1.5 0v3.69l5.22-5.22a.75.75 0 0 1 1.06 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-[190px] ">
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        کفش ورزشی
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        لباس ورزشی
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        کوله‌پشتی
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        چادر مسافرتی
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        قمقمه آب
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        توپ فوتبال
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        عینک شنا
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        بند یوگا
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        دوچرخه
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        کیف کمری
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DropdownMenuItem>

                {/*  */}

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-xs" dir="rtl">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-row justify-between text-xs w-full text-start">
                      خودرو و موتورسیکلت
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.78 4.22a.75.75 0 0 1 0 1.06L6.56 10.5h3.69a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75v-5.5a.75.75 0 0 1 1.5 0v3.69l5.22-5.22a.75.75 0 0 1 1.06 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-[190px] ">
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        روغن موتور
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        لاستیک
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        چراغ جلو
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        برف‌پاک‌کن
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        باتری ماشین
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        جک خودرو
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        کلاه ایمنی
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        آینه بغل
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        پدال گاز
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        کف‌پوش خودرو
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DropdownMenuItem>

                {/*  */}

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-xs" dir="rtl">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-row justify-between text-xs w-full text-start">
                      ابزار آلات و تجهیزات
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.78 4.22a.75.75 0 0 1 0 1.06L6.56 10.5h3.69a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75v-5.5a.75.75 0 0 1 1.5 0v3.69l5.22-5.22a.75.75 0 0 1 1.06 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-[190px] ">
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        دریل
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        پیچ‌گوشتی
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        انبردست
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        اره برقی
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        چکش
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        جعبه ابزار
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        متر لیزری
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        سیم‌چین
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        آچار فرانسه
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        تفنگ چسب حرارتی
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DropdownMenuItem>

                {/*  */}

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-xs" dir="rtl">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-row justify-between text-xs w-full text-start">
                      کارت هدیه و گیفت کارت
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.78 4.22a.75.75 0 0 1 0 1.06L6.56 10.5h3.69a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75v-5.5a.75.75 0 0 1 1.5 0v3.69l5.22-5.22a.75.75 0 0 1 1.06 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-[190px] ">
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        گیفت کارت گوگل پلی
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        گیفت کارت اپل
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        گیفت کارت استیم
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        گیفت کارت پلی‌استیشن
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        گیفت کارت ایکس‌باکس
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        کارت هدیه دیجی‌کالا
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        کارت هدیه آمازون
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        کارت هدیه بانکی
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        گیفت کارت اسپاتیفای
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        گیفت کارت نتفلیکس
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DropdownMenuItem>

                {/*  */}

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-xs" dir="rtl">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-row justify-between text-xs w-full text-start">
                      کالای خوراکی و اساسی
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.78 4.22a.75.75 0 0 1 0 1.06L6.56 10.5h3.69a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75v-5.5a.75.75 0 0 1 1.5 0v3.69l5.22-5.22a.75.75 0 0 1 1.06 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-[190px] ">
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        برنج
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        روغن
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        ماکارونی
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        چای
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        قند و شکر
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        حبوبات (لوبیا، عدس)
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        رب گوجه‌فرنگی
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        ادویه‌جات (زردچوبه، فلفل)
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        نان خشک
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px]" dir="rtl">
                        بیسکوییت و کیک
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DropdownMenuItem>
                {/*  */}
              </DropdownMenuContent>
            </DropdownMenu>
          </BlurFade>
        </div>
      </div>
      <div className="fixed bottom-4 w-full inline-flex sc-large:hidden z-[9998]">
        <Dock direction="middle" iconDistance={100}>
          <DockIcon onClick={handleProfileClick}>
            <Icons.Phone className="size-6" />
          </DockIcon>
          <DockIcon onClick={handleUserIconClick}>
            <Icons.User className="size-6" />
          </DockIcon>
          <DockIcon onClick={toggleTheme}>
            {isDarkMode ? (
              <Icons.SunIcon className="size-6" />
            ) : (
              <Icons.MoonIcon className="size-6" />
            )}
          </DockIcon>
          <DockIcon onClick={focusInput}>
            <Icons.SearchIcon className="size-6" />
          </DockIcon>
          <DockIcon onClick={openDrawer}>
            <Icons.menu className="size-6" />
          </DockIcon>
        </Dock>
      </div>
      {/* Drawer */}
      <Drawer open={isOpen} onClose={closeDrawer}>
        <DrawerContent className="Drawer flex justify-center items-center text-center z-[9999]">
          <div className="flex justify-end items-end text-end mx-6">
            <div className="Drawer flex justify-center items-center text-center">
              <div className="DrawerLinks flex flex-col justify-end items-end text-end text-lg">
                <a href="#aboutus" className="flex flex-row items-end mt-2">
                  صفحه اصلی
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 ml-3"
                  >
                    <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                    <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                  </svg>
                </a>
                <a href="#aboutus" className="flex flex-row items-end mt-4">
                  دسته‌بندی کالاها
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 ml-3"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#aboutus" className="flex flex-row items-end mt-4">
                  فروشگاه
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 ml-3"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#aboutus" className="flex flex-row items-end mt-4">
                  بلاگ
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 ml-3"
                  >
                    <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                  </svg>
                </a>
                <a href="#aboutus" className="flex flex-row items-end mt-4">
                  درباره‌ما
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 ml-3"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </nav>
  );
};

export default Navbar;

const Icons = {
  User: (_props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
        clipRule="evenodd"
      />
    </svg>
  ),
  Phone: (_props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
        clipRule="evenodd"
      />
    </svg>
  ),
  menu: (_props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
        clipRule="evenodd"
      />
    </svg>
  ),
  SunIcon: (_props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
    </svg>
  ),
  MoonIcon: (_props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
        clipRule="evenodd"
      />
    </svg>
  ),
  SearchIcon: (_props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-5"
    >
      <path
        fillRule="evenodd"
        d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
        clipRule="evenodd"
      />
    </svg>
  )
};
