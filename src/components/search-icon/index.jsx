import React from 'react'
import { Link } from 'gatsby'
import tw, { css } from "twin.macro"
import { AiOutlineSearch } from "react-icons/ai"

import './index.scss'

export const SearchIcon = () => {
  return (
    <Link to={`/search`} aria-label={`search page`} className="search">
      <AiOutlineSearch size={32} css={tw`text-white my-auto w-8 h-8`} />
    </Link>
  )
}
