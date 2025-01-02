import React from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";

// Define form values type
type SignupFormValues = {
  username: string;
  gmail: string;
  password: string;
  confirm_password: string;
};

// Define form schema with Zod
const formSchema = z
  .object({
    username: z
      .string()
      .min(4, { message: "نام کاربری باید حداقل ۴ کاراکتر باشد." })
      .max(51),
    gmail: z.string().email({ message: "لطفاً یک ایمیل معتبر وارد کنید." }),
    password: z
      .string()
      .min(7, { message: "رمز عبور باید حداقل ۷ کاراکتر باشد." })
      .max(51),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "رمز عبور و تأیید رمز عبور مطابقت ندارند.",
    path: ["confirm_password"],
  });

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      gmail: "",
      password: "",
      confirm_password: "",
    },
  });

  const { watch, handleSubmit, control, formState } = form;
  const { errors } = formState;

  const onSubmit: SubmitHandler<SignupFormValues> = async (values) => {
    try {
      const response = await axios.post("http://localhost:8000/api/signup/", {
        username: values.username,
        gmail: values.gmail,
        password: values.password,
        confirm_password: values.confirm_password,
      });

      if (response.status === 201) {
        toast({
          variant: "default",
          title: "ثبت‌نام موفقیت‌آمیز",
          description: "شما با موفقیت ثبت‌نام کردید.",
          action: <ToastAction altText="باشه">باشه</ToastAction>,
        });
        navigate("/login");
      }
    } catch (error: unknown) {
      // Type narrowing: asserting that error is an Axios error
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.data.error) {
            toast({
              variant: "destructive",
              title: "خطا در ثبت‌نام",
              description: error.response.data.error,
              action: <ToastAction altText="Try again">تلاش مجدد</ToastAction>,
            });
          } else {
            toast({
              variant: "destructive",
              title: "خطا در ثبت‌نام",
              description: "لطفاً دوباره تلاش کنید.",
              action: <ToastAction altText="Try again">تلاش مجدد</ToastAction>,
            });
          }
        } else {
          toast({
            variant: "destructive",
            title: "خطا در ثبت‌نام",
            description: "لطفاً دوباره تلاش کنید.",
            action: <ToastAction altText="Try again">تلاش مجدد</ToastAction>,
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "خطا در ثبت‌نام",
          description: "خطای غیرمنتظره‌ای رخ داده است.",
          action: <ToastAction altText="Try again">تلاش مجدد</ToastAction>,
        });
      }
    }
  };

  const getInputClass = (fieldName: keyof SignupFormValues) => {
    const isValid = !errors[fieldName] && watch(fieldName)?.length > 0;
    return `InputAuth ${isValid ? "border-2 border-[#087c58]" : ""}`;
  };

  return (
    <div
      className="Signup flex justify-center items-center h-[70vh] mt-[3vw]"
      dir="rtl"
    >
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="Form space-y-4 p-6 w-80 backdrop-blur-[50px] rounded-2xl"
        >
          <h2 className="text-lg font-semibold mb-4 text-center">ثبت‌نام</h2>

          <FormField
            control={control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام کاربری</FormLabel>
                <FormControl>
                  <Input
                    className={getInputClass("username")}
                    placeholder="نام کاربری"
                    {...field}
                  />
                </FormControl>
                {errors.username && (
                  <FormMessage>{errors.username.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="gmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ایمیل</FormLabel>
                <FormControl>
                  <Input
                    className={getInputClass("gmail")}
                    placeholder="ایمیل"
                    {...field}
                  />
                </FormControl>
                {errors.gmail && (
                  <FormMessage>{errors.gmail.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رمز عبور</FormLabel>
                <FormControl>
                  <Input
                    className={getInputClass("password")}
                    type="password"
                    placeholder="رمز عبور"
                    {...field}
                  />
                </FormControl>
                {errors.password && (
                  <FormMessage>{errors.password.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>تأیید رمز عبور</FormLabel>
                <FormControl>
                  <Input
                    className={getInputClass("confirm_password")}
                    type="password"
                    placeholder="تأیید رمز عبور"
                    {...field}
                  />
                </FormControl>
                {errors.confirm_password && (
                  <FormMessage>{errors.confirm_password.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <div className="SignButtons flex flex-row justify-center items-center">
            <Button
              type="button"
              className="SignCancel mx-4 px-8 mt-3 text-white py-2 rounded bg-[#b71833] hover:bg-[#751424] transition-all duration-3000"
              onClick={() => console.log("خروج کلیک شد!")}
            >
              خروج
            </Button>
            <Button
              type="submit"
              className="SignSubmit mx-4 px-8 mt-3 text-white py-2 rounded bg-[#087c58] hover:bg-[#0d4b37] transition-all duration-3000"
            >
              ثبت‌نام
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Signup;
