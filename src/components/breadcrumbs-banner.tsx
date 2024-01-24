import Image from "next/image";
import bannerImage from "~/banner-image.jpg";

export function BreadcrumbsBanner(){
    return (
        <div className="flex gap-10 justify-between items-center max-lg:flex-col max-lg:text-center">
            <p>this is breadcrumbs</p>
        </div>
    )
}