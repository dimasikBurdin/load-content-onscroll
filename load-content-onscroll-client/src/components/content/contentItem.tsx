import React from "react";

type TProps = {
    value: string
}

export const ContentItem:React.FC<TProps> = React.memo((props) => {
    return <div className="content-item-container">
        {props.value}
    </div>
})