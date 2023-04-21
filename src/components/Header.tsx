import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { Container } from "@chakra-ui/react";

const Header = () : JSX.Element =>{
    let leftNavigation = generateLeftNav();
    let rightNavigation = generateRighttNav();
    return(
        <header>
            <Container>
                {leftNavigation}
                {rightNavigation}
            </Container>
        </header>
    )
}

const isActive : (path : string) => boolean = (path) =>{
    const router = useRouter();
    return router.pathname === path
}

const generateLeftNav = (): JSX.Element =>{
    return(
        <div className="left-navigation">
            <Link href="/" data-active={isActive('/')}>
                Github Repository Searcher
            </Link>
        </div>
    )
}

const generateRighttNav = (): JSX.Element =>{
    return(
        <div className="right-navigation">
            <Link href="/favorite">
                Favorite
            </Link>
        </div>
    )
}

export default Header;
