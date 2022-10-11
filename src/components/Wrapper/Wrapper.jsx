import React from "react";
import styles from "./Wrapper.module.css"
import cn from "classnames";


export const Wrapper = ({ children, className, ...divAttrs }) => {
    return (
        <div className={cn(styles.wrapper, className)} {...divAttrs}>
            {children}
        </div>
    )
}