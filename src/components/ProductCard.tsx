import Icons from "@/assets/Icons/Index";
import ShinyButtonCart from "@/components/ui/ShinyButtonCart";

interface ProductCardProps {
  title: string;
  image: string;
  price: number;
  warehouseStatus: "in_stock" | "limited" | "out_of_stock";
}

export default function ProductCard({
  title,
  image,
  price,
  warehouseStatus,
}: ProductCardProps) {
  return (
    <div className="ProductCard flex flex-col items-center text-center justify-center border-x-[1px] p-3 h-[16rem]">
      <img
        className="AuthIcon w-full h-[8rem] object-contain"
        src={image || Icons.Edit}
        alt={title}
      />
      <h1 className="text-sm mt-3">{title}</h1>
      <h2
        className={`text-xs mt-3 ${
          warehouseStatus === "in_stock"
            ? "text-green-500"
            : warehouseStatus === "limited"
              ? "text-orange-500"
              : "text-red-500"
        }`}
      >
        {warehouseStatus === "in_stock"
          ? "موجود است"
          : warehouseStatus === "limited"
            ? "محدود"
            : "ناموجود"}
      </h2>
      <div className="flex flex-row justify-between items-center text-center w-full mt-5">
        <div className="flex items-center justify-start space-x-2"> </div>
        <h3 className="text-xs">{price} تومان</h3>
        <ShinyButtonCart>اضافه به سبد</ShinyButtonCart>
      </div>
    </div>
  );
}
