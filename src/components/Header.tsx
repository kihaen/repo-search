import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css'

const Header = () : JSX.Element =>{
    const isActive : (path : string) => boolean = (path) =>{
        const router = useRouter();
        return router.pathname === path
    }
    
    const generateLeftNav = (): JSX.Element =>{
        return(
            <div className={styles.navigation}>
                <Link href="/" data-active={isActive('/')}>
                    Github Repository Searcher
                </Link>
            </div>
        )
    }
    
    const generateRighttNav = (): JSX.Element =>{
        return(
            <div className={styles.navigation}>
                <Link href="/favorite">
                    Favorite
                </Link>
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
