export function CardWrapper({ children }: { children: React.ReactNode }){
    return (
        <div className="wrapper w-full mt-20 flex justify-center">
            <div className="w-full md:max-w-96 p-8 rounded-3xl bg-muted">
                {children}
            </div>
        </div>
    )
}