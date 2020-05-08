import React from 'react'

const Header = ({pseudo}) => {
    const formatPseudo = pseudo => {
        return /[aeiouy]/i.test(pseudo[0]) ? 'd\'' : 'de '
    };


    return (
    <h1>La boîte à recette {formatPseudo(pseudo)}{pseudo}</h1>
    )
}

export default Header;
