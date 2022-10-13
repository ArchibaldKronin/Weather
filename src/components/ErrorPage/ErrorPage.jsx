import React from "react";
import styles from "./ErrorPage.module.css"

export const ErrorPage = ({ errorObj }) => {
    return (
        <div className={styles.errorFont}>
            {errorObj}
        </div>
    )
}