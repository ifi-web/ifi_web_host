import Icons from "@/assets/Icons/Index";

export default function ProfileCancelledOrder() {
  return (
    <div className="CancelledOrder flex flex-col justify-center items-center text-center">
      <h1>هنوز هیچ سفارشی ندادید</h1>
      <img className="size-32" src={Icons.Docu} alt="" />
    </div>
  );
}
