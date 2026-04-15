import {useContext, Fragment} from "react";
import {LoadingContext} from "./context.ts";
import {
    Item,
    ItemContent,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"

export default function Progress() {
    const {loading} = useContext(LoadingContext);
    const {status, text} = loading;

    return (
        <Fragment>
            {status && <>
            <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
                <Item variant="muted">
                    <ItemMedia>
                        <Spinner />
                    </ItemMedia>
                    <ItemContent>
                        <ItemTitle className="line-clamp-1">Training model...</ItemTitle>
                    </ItemContent>
                    <ItemContent className="flex-none justify-end">
                        <span className="text-sm tabular-nums">in progress</span>
                    </ItemContent>
                </Item>
            </div>
        </>}
    </Fragment>);
}
