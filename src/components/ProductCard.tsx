import Icons from "@/assets/Icons/Index";
import ShinyButtonCart from "@/components/ui/ShinyButtonCart";
import React from "react";

interface ProductCardProps {
  title: string;
  image: string;
  price: number;
  warehouseStatus: "in_stock" | "limited" | "out_of_stock";
}

const getStatusInfo = (
  warehouseStatus: "in_stock" | "limited" | "out_of_stock"
) => {
  switch (warehouseStatus) {
    case "in_stock":
      return { text: "موجود است", className: "text-green-500" };
    case "limited":
      return { text: "محدود", className: "text-orange-500" };
    case "out_of_stock":
      return { text: "ناموجود", className: "text-red-500" };
    default:
      return { text: "", className: "" };
  }
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  price,
  warehouseStatus
}) => {
  const { text: statusText, className: statusClassName } =
    getStatusInfo(warehouseStatus);

  return (
    <div className="flex flex-col items-center text-center justify-center border-x-[1px] p-3 h-[15rem]">
      <img className="my-1 w-auto h-[10vh]" src={image || Icons.Edit} alt={title} />
      <h1 className="text-sm my-1">{title}</h1>
      <h2 className={`text-xs my-1 ${statusClassName}`}>{statusText}</h2>
      <div className="flex flex-row justify-center items-center text-center my-3">
        <h3 className="text-xs mx-1">{price} تومان</h3>
        <ShinyButtonCart className="mr-1">اضافه به سبد</ShinyButtonCart>
      </div>
    </div>
  );
};

export default ProductCard;
