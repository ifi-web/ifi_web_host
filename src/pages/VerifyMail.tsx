import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ShinyButtonGreen from "@/components/ui/ShinyButtonGreen";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "حداقل کد وارد شده باید 6 کاراکتر باشد",
  }),
});

export function InputOTPForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { email } = useParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  useEffect(() => {
    if (!email) return;

    const handleSendCode = async () => {
      try {
        await axios.post("http://localhost:8000/api/send-verification-code/", {
          email,
        });
      } catch (error) {
        // Fail silently
      }
    };

    // Automatically send the code when the component is mounted
    handleSendCode();
  }, [email]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSubmitted && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            navigate("/profile");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isSubmitted, countdown, navigate]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/api/verify-code/", {
        email,
        code: data.pin,
      });
      setIsSubmitted(true);
      toast({
        variant: "default",
        title: "کد با موفقیت ارسال شد",
        description: "شما به‌زودی از صفحه خارج خواهید شد",
        action: <ToastAction altText="Try again">باشه</ToastAction>,
      });
    } catch (error) {
      // Handle submission failure if necessary
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="Form backdrop-blur-[50px] rounded-2xl space-y-4 flex flex-col m-auto p-8"
      >
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>کد تایید ایمیل</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup className="mx-10">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                کد تایید ارسال شده به ایمیل خود را وارد کنید
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <ShinyButtonGreen
          type="submit"
          disabled={loading}
          className="mx-[100px]"
        >
          {loading ? "در حال بررسی..." : "ثبت کد"}
        </ShinyButtonGreen>
        {isSubmitted && (
          <h1 className="VerifyIco text-[--text-color-pr] text-sm">
            ایمیل شما با موفقیت تایید شد
            <h2 className="VerifyIco text-[--text-color-pr] text-xs my-1">
              خروج در {countdown} ثانیه دیگر
            </h2>
          </h1>
        )}
      </form>
    </Form>
  );
}

export default function VerifyMail() {
  return (
    <div className="flex justify-center items-center text-center h-[70vh]">
      <InputOTPForm />
    </div>
  );
}
