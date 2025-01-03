import Icons from "@/assets/Icons/Index";

export default function ProfileCurrentOrder() {
  return (
    <div className="CurrentOrder flex flex-col justify-center items-center text-center">
      <h1>هنوز هیچ سفارشی ندادید</h1>
      <img className="size-32" src={Icons.Docu} alt="" />
    </div>
  );
}
