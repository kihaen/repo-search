import React, { ReactNode } from "react";
import styles from '@/styles/Home.module.css'

type Props = {
    children : ReactNode
}

const Layout = (props : Props): JSX.Element =>{
    return(
        <div className={styles.layout}>{props.children}</div>
    )
}

export default Layout;