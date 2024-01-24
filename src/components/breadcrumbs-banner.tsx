import { Breadcrumbs } from "./breadcrumbs"
export function BreadcrumbsBanner({title}:{title: string}){
    return (
        <div className="flex flex-col gap-4 justify-between items-center ">
            <h1 className="uppercase font-semibold" style={{fontSize: "3rem"}}>{title}</h1>
            <Breadcrumbs></Breadcrumbs>
        </div>
    )
}