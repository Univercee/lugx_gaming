import { Breadcrumbs } from "./breadcrumbs"
export function BreadcrumbsBanner({title, currentPageName}:{title: string, currentPageName?: string}){
    return (
        <div className="flex flex-col gap-4 justify-between items-center ">
            <h1 className="uppercase font-semibold text-center" style={{fontSize: "3rem"}}>{currentPageName?currentPageName:title}</h1>
            <Breadcrumbs currentPageName={currentPageName}></Breadcrumbs>
        </div>
    )
}