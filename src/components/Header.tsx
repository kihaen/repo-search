import React from "react";
import Link from "next/link";
import styles from '@/styles/Home.module.css'

const Header = () : JSX.Element =>{
    
    const generateLeftNav = (): JSX.Element =>{
        return(
            <div className={styles.navigation}>
                <Link href="/">
                    Github Repository Favorites
                </Link>
            </div>
        )
    }
    
    const generateRighttNav = (): JSX.Element =>{
        return(
            <div className={styles.navigation}>
            </div>
        )
    }
    let leftNavigation = generateLeftNav();
    let rightNavigation = generateRighttNav();
    return(
        <header className={styles.header}>
                {leftNavigation}
                {rightNavigation}
        </header>
    )
}

export default Header;
