import * as React from "react"
import {Logo} from './Logo.tsx'

// import { SearchForm } from '@/components/search-form'
// import { VersionSwitcher } from '@/components/version-switcher'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar'

// This is sample data.
const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "#",
            items: [
                {
                    title: "Forecast",
                    url: "/ml",
                    isActive: true,
                },
                {
                    title: "Overview",
                    url: "/",
                },
                {
                    title: "Windy Generator",
                    url: "/windy",
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            items: [
                {
                    title: "Train",
                    url: "/ml",
                },
                {
                    title: "Predict",
                    url: "/ml",
                },
                {
                    title: "History",
                    url: "#",
                },
            ],
        },
        {
            title: "Data",
            url: "#",
            items: [
                {
                    title: "Weather",
                    url: "#",
                },
                {
                    title: "Import",
                    url: "#",
                },
            ],
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                {/*<VersionSwitcher*/}
                {/*    versions={data.versions}*/}
                {/*    defaultVersion={data.versions[0]}*/}
                {/*/>*/}
                {/*<SearchForm />*/}
                <Logo />
            </SidebarHeader>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={item.isActive}>
                                            <a href={item.url}>{item.title}</a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
