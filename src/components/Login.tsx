import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
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
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Cookies from "js-cookie";

// Define schema using Zod
const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "نام کاربری باید حداقل ۳ کاراکتر باشد." })
    .max(50),
  password: z
    .string()
    .min(2, { message: "رمز عبور باید حداقل ۲ کاراکتر باشد." })
    .max(50),
});

// Define the type for the form values
type FormValues = z.infer<typeof formSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useAuth();

  // Handle case where context is null
  if (!authContext) {
    return <div>Loading...</div>; // or some other fallback
  }

  const { setUser } = authContext;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        username: values.username,
        password: values.password,
      });

      if (response.status === 200) {
        const userData = response.data;
        setUser(userData);
        Cookies.set("user", JSON.stringify(userData), { expires: 7 });

        toast({
          variant: "default",
          title: "ورود موفقیت آمیز",
          description: "شما با موفقیت وارد شدید.",
          action: <ToastAction altText="باشه">باشه</ToastAction>,
        });

        navigate("/profile");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        variant: "destructive",
        title: "ورود ناموفق",
        description: "لطفاً نام کاربری و رمز عبور خود را بررسی کنید.",
        action: <ToastAction altText="Try again">تلاش مجدد</ToastAction>,
      });
    }
  };

  return (
    <div className="Login flex justify-center items-center h-[70vh]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="Form p-6 w-80 backdrop-blur-[50px] rounded-2xl"
          dir="rtl"
        >
          <h2 className="text-lg font-semibold mb-4 text-center">ورود</h2>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام کاربری</FormLabel>
                <FormControl>
                  <Input
                    className={`InputAuth ${
                      form.formState.errors.username ? "border-red-500" : ""
                    }`}
                    placeholder="نام کاربری"
                    {...field}
                  />
                </FormControl>
                {form.formState.errors.username && (
                  <FormMessage>
                    {form.formState.errors.username.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رمز عبور</FormLabel>
                <FormControl>
                  <Input
                    className={`InputAuth ${
                      form.formState.errors.password ? "border-red-500" : ""
                    }`}
                    type="password"
                    placeholder="رمز عبور"
                    {...field}
                  />
                </FormControl>
                {form.formState.errors.password && (
                  <FormMessage>
                    {form.formState.errors.password.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <Link to="/signup">
            <h1 className="flex flex-row items-center text-sm text-right mt-3 text-[#ffffffb3]">
              حساب کاربری ندارید؟
            </h1>
          </Link>

          <div className="flex flex-row justify-center items-center mt-4">
            <Button
              type="submit"
              className="w-full bg-[#087c58] text-white py-2 rounded hover:bg-[#0d4b37] transition-all duration-3000"
            >
              ورود
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;
