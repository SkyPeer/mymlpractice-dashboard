import {SidebarProvider, SidebarTrigger, SidebarInset} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/app-sidebar"

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }>
            <AppSidebar variant="inset"/>
            <SidebarInset>
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <main>
                    {/*<div>11111111112312312312312312123123123123</div>*/}
                    <SidebarTrigger />
                    {children}
                </main>
                        </div>
                    </div>
                </div>
            </SidebarInset>

        </SidebarProvider>
    )
}